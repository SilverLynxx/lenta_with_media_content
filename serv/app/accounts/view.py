from asyncpg.exceptions import UniqueViolationError
from aiohttp_session import new_session, get_session
import re
import hashlib

from custom_lib.json_view import json_response
from custom_lib.generate_pass_hash import generate_pass_hash



async def validate_user_data(incoming_data: dict):

    username = incoming_data.get('username')
    email = incoming_data.get('email')
    password = incoming_data.get('password')


    try:
        assert username and password and email
        assert re.match(r'^[a-zA-Z0-9_]{3,30}$', username)
        assert re.match(r'.+@.+\..+', email)
        assert re.match(r'^[a-zA-Z0-9_]{6,20}$', password)
        username_lower = username.lower()
        return {
            'username': username_lower,
            'email':email,
            'pass_sha3_512': await generate_pass_hash(username_lower, password)
        }
    except AssertionError:
        return None




async def register(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]

    try:
        incoming_data = await request.json()
        valid_user_data = await validate_user_data(incoming_data)
    except:
        return json_response({'info': 'Incorrect data'}, status=400)

    if valid_user_data:

        try:
            await db.insert_to_table('accounts', valid_user_data)
            await db.insert_to_table(
                'permission_groups_accounts', 
                {'username': valid_user_data['username'], 'groupname': 'user'})
            return json_response({'info': 'Now you are registered here'})
        except UniqueViolationError:
            return json_response({'info': 'Already exists'}, status=409) 

    return json_response({'info': 'Incorrect data'}, status=400)


async def login(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]

    try:
        incoming_data = await request.json()
        username = incoming_data.get('username')
        username_lower = username.lower()
        password = incoming_data.get('password')
        pass_sha3_512 = await generate_pass_hash(username_lower, password)
    except:
        return json_response({'info': 'Incorrect data'}, status=400)
        

    q = db\
        .from_table('accounts')\
        .select('accountid','username', 'email')\
        .where(
            (db.T('accounts').username == db.P('$1')) & \
            (db.T('accounts').pass_sha3_512 == db.P('$2')))
    args = [username_lower, pass_sha3_512]
    result = await db.fetch(q, args)

    if len(result) == 1:

        user_data = {
            'accountid': result[0].get('accountid'), 
            'username': result[0].get('username'), 
            'email': result[0].get('email')
        }


        q = db\
            .from_table('permission_groups_accounts')\
            .select('username', 'groupname')\
            .where( db.T('permission_groups_accounts').username == db.P('$1') )\
            .where( db.T('permission_groups_accounts').active == True )
        args = [user_data['username'], ]
        result = await db.fetch(q, args)

        groupname = result[-1].get('groupname')

        session = await new_session(request)
        session['anonymous'] = False
        session['user'] = user_data
        session['group'] = groupname
        print(groupname)

        return json_response({
            'info': 'You are logged in', 
            'data': user_data
        })

    return json_response({'info': 'User not found or incorrect data'}, status=404)


async def logout(request):
    
    session = await get_session(request)

    if session.get('anonymous') is False:
        session = await new_session(request)
        session['anonymous'] = True

    return json_response({'info': 'You are anonymous'})


async def session_info(request):

    session = await get_session(request)

    anonymous = session.get('anonymous')

    if anonymous:
        return json_response({'info': 'Session info', 'data': {'anonymous': True}})

    return json_response({
        'info': 'Session info',
        'data': {
            'anonymous': False,
            'accountid': session.get('user').get('accountid'),
            'username': session.get('user').get('username'),
            'email': session.get('user').get('email')
        }
    })

