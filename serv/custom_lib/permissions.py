from aiohttp_session import get_session

from custom_lib.json_view import json_response



def authorize(handler):
    async def wrapper(request):

        session = await get_session(request)
        if not session.get('anonymous') is False:
            return json_response({'info': 'Permission denied'}, status=403)

        return await handler(request)
    return wrapper




def admin(handler):
    async def wrapper(request):

        cfg = request.app['cfg']
        db = request.app[cfg.DB_HANDLER]
        session = await get_session(request)
        username = session.get('user').get('username')

        premission_groups_accounts_s = db.table('permission_groups_accounts')
        premission_groups_accounts = db.T('permission_groups_accounts')
        q = db.Q\
            .from_(premission_groups_accounts_s)\
            .select('groupname')\
            .where(premission_groups_accounts.username == db.P('$1'))\
            .where(premission_groups_accounts.active == True)

        result = await db.fetch(q, [username, ])

        if len(result) > 0:
            if result[0].get('groupname') == 'admin':
                return await handler(request)
        return json_response({'info': 'Permission denied'}, status=403)

    return wrapper