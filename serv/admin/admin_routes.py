from aiohttp import web
from admin import get_all_tables, get_table_columns, get_table_values, \
    update_table_values, insert_values

from custom_lib.permissions import admin, authorize


@authorize
@admin
async def admin_main_page(request):

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
            <div id="root"></div>
            <script src="/static/main_admin.js"></script>
        </body>
        </html>

    '''

    return web.Response(text=page, content_type='text/html', charset='utf-8')

admin_routes = [
    web.get('/admin/api/get_all_tables', get_all_tables),
    web.post('/admin/api/get_table_columns', get_table_columns),
    web.post('/admin/api/get_table_values', get_table_values),
    web.post('/admin/api/update_table_values', update_table_values),
    web.post('/admin/api/insert_values', insert_values),
    web.get('/admin', admin_main_page),
    web.get('/admin/{route:.*}', admin_main_page)
]