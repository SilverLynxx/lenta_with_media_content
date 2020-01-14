from aiohttp_session import get_session

from custom_lib.json_view import json_response



def authorize(handler):
    async def wrapper(request):

        session = await get_session(request)
        if not session.get('anonymous') is False:
            return json_response({'info': 'Permission denied'}, status=403)

        return await handler(request)
    return wrapper