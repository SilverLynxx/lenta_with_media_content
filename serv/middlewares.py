from aiohttp.web import middleware
from aiohttp_session import get_session, new_session

@middleware
async def sessions(request, handler):
    session = await get_session(request)
    if session.get('anonymous') is None:
        session = await new_session(request)
        session['anonymous'] = True

    return await handler(request)


middlewares = [sessions, ]