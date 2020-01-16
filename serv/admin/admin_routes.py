from aiohttp import web
from admin import get_all_tables, get_table_columns, get_table_values, \
    update_table_values, insert_values

admin_routes = [
    web.get('/admin/get_all_tables', get_all_tables),
    web.post('/admin/get_table_columns', get_table_columns),
    web.post('/admin/get_table_values', get_table_values),
    web.post('/admin/update_table_values', update_table_values),
    web.post('/admin/insert_values', insert_values),
]