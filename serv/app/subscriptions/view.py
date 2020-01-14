from aiohttp_session import get_session
from asyncpg.exceptions import UniqueViolationError
from hashlib import md5
import datetime
from random import randint

from custom_lib.permissions import authorize
from custom_lib.json_view import json_response



class IncorrectDataException(Exception):
    pass

def subid_gen():
    return 'subid_' + md5(
        (
            str(datetime.datetime.now()) + \
            str(randint(1000, 9999))
        ).encode('utf-8')).hexdigest()



async def make_qurey_to_subscriptions_by_username(username_self, db=None):

    subscriptions_groups_table_s = db.table('subscriptions_groups')
    subscriptions_groups_table = db.table('subscriptions_groups')
    accounts_subscriptions_table = db.table('accounts_subscriptions') 
    tags_subscriptions_table = db.table('tags_subscriptions')
    q = db.Q\
        .from_(subscriptions_groups_table_s.as_('subgr'))\
        .select(
            subscriptions_groups_table.as_('subgr').subgroupid, 
            subscriptions_groups_table.as_('subgr').subgroupname,
            accounts_subscriptions_table.as_('accsub').username,
            tags_subscriptions_table.as_('tagsub').tagname )\
        .left_join(accounts_subscriptions_table.as_('accsub'))\
        .on_field('subgroupid')\
        .left_join(tags_subscriptions_table.as_('tagsub'))\
        .on_field('subgroupid')\
        .where(subscriptions_groups_table.as_('subgr').username == db.P('$1'))\
        .where(subscriptions_groups_table.as_('subgr').active == True)

    result = await db.fetch(q, [username_self, ])

    subid0 = ''
    final_result = []
    for item in result:
        subid = item['subgroupid']
        if subid == subid0:
            if item['tagname']:
                final_result[-1]['tags'].append(item['tagname'])
        else:
            final_result.append({
                'subgroupid': item['subgroupid'],
                'subgroupname': item['subgroupname'],
                'username': item['username'],
                'tags': []})
            if item['tagname']:
                final_result[-1]['tags'].append(item['tagname'])
        subid0 = subid


    return final_result




@authorize
async def create_subscription(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]
    session = await get_session(request)

    async def read_incoming_data():

        user_info = session.get('user')
        username_self = user_info.get('username')
        request_data = await request.json()
        username_sub = request_data.get('username')
        tags_sub = request_data.get('tags')
        subgroupname = request_data.get('name')
        
        username_sub_lower, tags_sub_lower = None, None
        if username_sub:
            username_sub_lower = username_sub.lower()
        if tags_sub:
            tags_sub_lower = [t.lower() for t in tags_sub]

        return [username_self, username_sub_lower, tags_sub_lower, subgroupname]     

    async def verify_incoming_data(username_sub, tags_sub, subgroupname):

        try:
            assert username_sub or tags_sub
            if username_sub:
                assert isinstance(username_sub, str)
                q = db\
                    .from_table('accounts')\
                    .select('username')\
                    .where(db.T('accounts').username == db.P('$1'))

                res = await db.fetch(q, [username_sub, ])
                assert len(res) == 1
            if tags_sub:
                assert isinstance(tags_sub, list)
                for tag in tags_sub:
                    assert isinstance(tag, str)
                    await db.insert_to_table('tags', {'tagname': tag}, ignore_conflict=['tagname',])
            if subgroupname:
                assert isinstance(subgroupname, str)
            return True
        except AssertionError:
            return False

    async def write_data_to_db(username_self ,username_sub, tags_sub, subgroupname):

        subgroupid = subid_gen()
        subscriptions_groups_data = {'subgroupid': subgroupid,'username': username_self}
        if subgroupname:
            subscriptions_groups_data['subgroupname'] = subgroupname
        await db.insert_to_table('subscriptions_groups', subscriptions_groups_data)
        if username_sub:
            await db.insert_to_table(
                'accounts_subscriptions', {'subgroupid': subgroupid, 'username': username_sub})
        if tags_sub:
            for tag in tags_sub:
                await db.insert_to_table(
                    'tags_subscriptions', {'subgroupid': subgroupid, 'tagname': tag})
        return subgroupid

    try:
        username_self, username_sub, tags_sub, subgroupname = await read_incoming_data()
    except:
        return json_response({'info': 'Incorrect data'}, status=400)

    if not await verify_incoming_data(username_sub, tags_sub, subgroupname):
        return json_response({'info': 'Incorrect data'}, status=400)

    subgroupid =  await write_data_to_db(username_self ,username_sub, tags_sub, subgroupname)

    return json_response({'info': 'Created', 'data': {'subgroupid': subgroupid}})



@authorize
async def get_subscriptions(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]
    session = await get_session(request)

    username_self = session.get('user').get('username')

    result = await make_qurey_to_subscriptions_by_username(username_self, db=db)
    return json_response({'info': 'Subscriptions', 'data': result})



@authorize
async def delete_subscription(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]
    session = await get_session(request)

    username_self = session.get('user').get('username')

    incoming_data = await request.json()
    subgroupid = incoming_data.get('subgroupid')

    if not isinstance(subgroupid, str):
        return json_response({'Incorrect data'}, status=400)

    updating_table = db.table('subscriptions_groups')
    q = db.Q\
        .update(updating_table).set(updating_table.active, False)\
        .where((updating_table.username == username_self) & (updating_table.subgroupid == db.P('$1')))

    result = await db.execute(q, [subgroupid, ])

    return json_response({'info': 'Deleted'})


@authorize
async def get_subscriptions_records(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]


    def generate_query_to_search_records(rec_username, rec_tags, db=None, arg_counter=0, args=[]):

        
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

        # q = q.orderby('post_date', order=db.Order.desc)
        return (q, args, arg_counter) 


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

    session = await get_session(request)

    username_self = session.get('user').get('username')

    subscriptions_self = await make_qurey_to_subscriptions_by_username(username_self, db=db)

    q = None
    arg_counter = 0
    args = []
    for sub in subscriptions_self:
        if q:
            new_q, new_args, new_arg_counter = generate_query_to_search_records(
                sub['username'], sub['tags'], db=db, arg_counter=arg_counter, args=[])
            q = q + new_q
            args.extend(new_args)
            arg_counter = new_arg_counter
        else:
            new_q, new_args, new_arg_counter = generate_query_to_search_records(
                sub['username'], sub['tags'], db=db, arg_counter=arg_counter, args=[])
            q = new_q
            args.extend(new_args)
            arg_counter = new_arg_counter

    if q:
        q = q.orderby('post_date', order=db.Order.desc)
        result = result_handle(await db.fetch(q, args))


        return json_response({'info': 'Subscriptions', 'data': result})
    return json_response({'info': 'Subscriptions', 'data': []})
