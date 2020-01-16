from aiohttp import web
from app.api_routes import api_routes
from admin.admin_routes import admin_routes
import os


STATIC_FOLDER = f'{os.path.abspath(__file__)}/../../static'

async def main_page(request):

    page = '''

        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="description" content="Example page">
            <meta name="keywords" content="HTML,CSS,XML,JavaScript">
            <meta name="author" content="Patchouli">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="/static/flaticon.css">
            <title id="title">Index</title>
        </head>
        <body>
            <div id="root-loading"></div>
            <script src="/static/loading.js"></script>
            <div id="root"></div>
            <script src="/static/main.js"></script>
        </body>
        </html>

    '''

    return web.Response(text=page, content_type='text/html', charset='utf-8')


def make_routes_table():
    routes = []
    routes.extend(api_routes)
    routes.extend(admin_routes)
    routes.extend(
        [
            web.static('/static', STATIC_FOLDER),
            web.get('/{route:.*}', main_page)
        ]
    )
    return routes