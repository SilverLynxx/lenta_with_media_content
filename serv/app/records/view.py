import aiohttp
from aiohttp_session import get_session
from asyncpg.exceptions import UniqueViolationError
from hashlib import md5
import datetime
from random import randint
import re
import ujson

from custom_lib.permissions import authorize
from custom_lib.json_view import json_response



class IncorrectDataException(Exception):
    pass

def recid_gen():
    return 'recid_' + md5(
        (
            str(datetime.datetime.now()) + \
            str(randint(1000, 9999))
        ).encode('utf-8')).hexdigest()

def mediaid_gen():
    return 'media_' + md5(
        (
            str(datetime.datetime.now()) + \
            str(randint(1000, 9999))
        ).encode('utf-8')).hexdigest()


@authorize
async def create_record(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]
    session = await get_session(request)

    user_data = session.get('user')

    tags_lower = []
    try:
        incoming_data = await request.json()
        record_text = incoming_data.get('record_text')
        tags = incoming_data.get('tags')
        record_headline = incoming_data.get('record_headline')
        assert isinstance(tags, list)
        assert isinstance(record_text, str)
        assert len(tags) > 0 and len(tags) < 11
        for tag in tags:
            assert re.match(r'^[a-zA-Z0-9_]{3,100}$', tag)
            tags_lower.append(tag.lower())
        assert len(record_text) <= 1000
    except:
        return json_response({'info': 'Incorrect data'}, status=400)

    recid = recid_gen()
    record = {
        'recordid': recid,
        'username': user_data['username'],
        'record_text': record_text
    }

    if record_headline:
        record['record_headline'] = record_headline

    await db.insert_to_table('records', record)
    for tag in tags_lower:
        try:
            await db.insert_to_table('tags', {'tagname': tag}, ignore_conflict=['tagname',])
        except UniqueViolationError:
            pass
        try:
            await db.insert_to_table('records_tags', {'tagname': tag, 'recordid': recid})
        except UniqueViolationError:
            pass


    return json_response({
        'info': 'Created',
        'data': record
    })



async def search_records(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]


    def db_request_generate(rec_username, rec_tags, search_terms):

        if not (rec_username or rec_tags or search_terms):
            raise IncorrectDataException

        arg_counter = 0
        args = []
        
        records_table = db.T('records')
        records_tags_table = db.table('records_tags')
        q = db\
            .from_table('records')\
            .select('recordid', 'username', 'post_date', 'record_headline', 'record_text')\
            .distinct()

        if rec_tags and isinstance(rec_tags, list):
            tags_counter = 0
            for tag in rec_tags:
                if not isinstance(tag, str):
                    raise IncorrectDataException
                tags_counter += 1
                q = q.join(records_tags_table.as_('tag' + str(tags_counter))).on_field('recordid')
            tags_counter = 0
            for tag in rec_tags:
                tags_counter += 1
                arg_counter += 1
                q = q.where(records_tags_table.as_('tag' + str(tags_counter)).tagname.ilike(db.P('$' + str(arg_counter))))
                args.append(tag)



        if rec_username:
            if not isinstance(rec_username, str):
                raise IncorrectDataException
            arg_counter += 1
            q = q.where(records_table.username.ilike(db.P('$' + str(arg_counter))))
            args.append(rec_username)

        if search_terms:
            if not isinstance(search_terms, str):
                raise IncorrectDataException
            if len(search_terms) < 1:
                raise IncorrectDataException
            search_iter = re.finditer(r'\W?(\w+)\W?', search_terms)
            for term in search_iter:
                arg_counter += 1
                q = q.where(
                    records_table.record_text.ilike(db.P('$' + str(arg_counter))) | 
                    records_table.record_headline.ilike(db.P('$' + str(arg_counter))))
                args.append(f'%{term.group(1).lower()}%')

        q = q.where(records_table.active == True)
        q = q.orderby('post_date', order=db.Order.desc)
        return (q, args)        

    def result_handle(result_raw):
        result_list = list(result_raw)
        result = []
        for record in result_list:
            result.append({
                'recordid': record.get('recordid'),
                'username': record.get('username'),
                'post_date': (record.get('post_date')).isoformat(),
                'record_headline': record.get('record_headline'),
                'record_text': record.get('record_text')})
        return result     


    incoming_data = await request.json()
    rec_username = incoming_data.get('username')
    rec_tags = incoming_data.get('tags')
    search_terms = incoming_data.get('search_terms')
    print(rec_username, rec_tags, search_terms)

    try:
        q, args = db_request_generate(rec_username, rec_tags, search_terms)
        print(q, args)
    except IncorrectDataException:
        return json_response({'info': 'Incorrect data'}, status=400)

    result = await db.fetch(q, args)

    return json_response({
        'info': 'Results', 
        'data': result_handle(result)
    })


async def get_record(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]

    incoming_data = await request.json()
    recordid = incoming_data.get('recordid')

    if not isinstance(recordid, str):
        return json_response({'info': 'Incorrect data'}, status=400)

    q = db\
        .from_table('records')\
        .select('recordid', 'username', 'post_date', 'record_headline', 'record_text')\
        .where(db.T('records').recordid == db.P('$1'))\
        .where(db.T('records').active == True)

    result = await db.fetch(q, [recordid, ])

    if len(result) != 1:
        return json_response({'info': 'Not found', }, status=404)

    record = {
        'recordid': result[0].get('recordid'),
        'username': result[0].get('username'),
        'post_date': (result[0].get('post_date')).isoformat(),
        'record_headline': result[0].get('record_headline'),
        'record_text': result[0].get('record_text')
    }

    q = db\
        .from_table('records_tags')\
        .select('tagname')\
        .where((db.T('records_tags').recordid == db.P('$1')) & \
               (db.T('records_tags').active == True))

    result = await db.fetch(q, [recordid, ])

    tags = [_.get('tagname') for _ in result]

    return json_response({
        'info': 'Record', 
        'data': {
            'record': record,
            'tags': tags
        }
    })


@authorize
async def delete_record(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]
    session = await get_session(request)

    username_self = session.get('user').get('username')

    incoming_data = await request.json()
    recordid = incoming_data.get('recordid')

    if not isinstance(recordid, str):
        return json_response({'Incorrect data'}, status=400)


    updating_table = db.table('records')
    q = db.Q\
        .update(updating_table).set(updating_table.active, False)\
        .where((updating_table.username == username_self) & (updating_table.recordid == db.P('$1')))

    result = await db.execute(q, [recordid, ])

    return json_response({'info': 'Deleted'})



@authorize
async def set_record_media(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]
    http_session = request.app['http_session']


    
    async def read_incoming_data(incoming_data):

        media_type = incoming_data.get('media_type')
        media_data = incoming_data.get('media_data')
        media_description = incoming_data.get('media_description')

        assert isinstance(media_type, str)
        assert isinstance(media_data, dict)

        return [media_type, media_data, media_description]

    
    session = await get_session(request)
    username = session.get('user').get('username')

    incoming_data = await request.json()
    recordid = incoming_data.get('recordid')

    if not isinstance(recordid, str):
        return json_response({'info': 'Incorrect data'}, status=400)

    q = db\
        .from_table('records')\
        .select('recordid', 'username', 'post_date', 'record_headline', 'record_text')\
        .where(db.T('records').recordid == db.P('$1'))\
        .where(db.T('records').active == True)

    result = await db.fetch(q, [recordid, ])

    if len(result) != 1:
        return json_response({'info': 'Not found', }, status=404)
    if result[0].get('username') != username:
        return json_response({'info': 'Permission denied', }, status=403)


    try:
        media_type, media_data, media_description = await read_incoming_data(incoming_data)
    except AssertionError:
        return json_response({'info': 'Incorrect data'}, status=400)

    media_data_dict = {}
    if media_type == 'embedded_video':
        url = media_data.get('url')
        if isinstance(url, str):
            if re.search(r'^https?\:\/\/([\w\.]*)\/\S*$', url):
                try:
                    async with http_session.get(url) as resp:
                        if resp.status == 200:
                            if not resp.headers.get('X-Frame-Options'):
                                media_data_dict['url'] = url
                                mediaid = mediaid_gen()
                                inserting_data = {
                                    'mediaid': mediaid, 
                                    'media_type': media_type, 
                                    'media_data': ujson.dumps(media_data_dict),
                                    'username': username }
                                if media_description:
                                    inserting_data['media_description'] = media_description
                                await db.insert_to_table('media', inserting_data)
                                await db.insert_to_table(
                                    'records_media', 
                                    {'recordid': recordid, 'mediaid': mediaid}, 
                                    ignore_conflict=['recordid', 'mediaid'])
                                return json_response({'info': 'Created'})
                except:
                    return json_response({'info': 'Incorrect data'}, status=400)
    return json_response({'info': 'Incorrect data'}, status=400)


async def get_record_media(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]

    incoming_data = await request.json()
    recordid = incoming_data.get('recordid')

    q = db\
        .from_table('records')\
        .select('recordid', 'username', 'post_date', 'record_headline', 'record_text')\
        .where(db.T('records').recordid == db.P('$1'))\
        .where(db.T('records').active == True)

    result = await db.fetch(q, [recordid, ])

    if len(result) != 1:
        return json_response({'info': 'Not found', }, status=404)


    media_table = db.T('media')
    records_media_table = db.T('records_media')
    q = db.Q\
        .from_(db.table('media').as_('m'))\
        .select(
            media_table.as_('m').mediaid,
            media_table.as_('m').media_type,
            media_table.as_('m').media_data,
            media_table.as_('m').username,
            media_table.as_('m').media_description)\
        .join(db.table('records_media').as_('rm'))\
        .on_field('mediaid')\
        .where(records_media_table.as_('rm').recordid == db.P('$1'))\
        .where(records_media_table.as_('rm').active == True)\
        .where(media_table.as_('m').active == True)

    result = await db.fetch(q, [recordid, ])

    result_dict = [dict(_) for _ in result]

    return json_response({'info': 'Media data', 'data': result_dict})





@authorize
async def delete_record_media(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]
    session = await get_session(request)

    username_self = session.get('user').get('username')

    incoming_data = await request.json()
    mediaid = incoming_data.get('mediaid')

    if not isinstance(mediaid, str):
        return json_response({'Incorrect data'}, status=400)


    updating_table = db.table('media')
    q = db.Q\
        .update(updating_table).set(updating_table.active, False)\
        .where((updating_table.username == username_self) & (updating_table.mediaid == db.P('$1')))

    result = await db.execute(q, [mediaid, ])

    return json_response({'info': 'Deleted'})