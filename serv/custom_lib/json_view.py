from aiohttp import web
import ujson



def json_response(data, **kwargs):
	kwargs.setdefault('content_type', 'application/json')
	return web.Response(text=ujson.dumps(data), **kwargs)


def json_view(handler):
	async def json_wrapper(request):
		return await json_response(await handler(request))
	return json_wrapper
