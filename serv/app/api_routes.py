from aiohttp import web
from app.accounts import register, login, logout, session_info
from app.records import create_record, search_records, \
    get_record, delete_record, set_record_media, get_record_media, delete_record_media
from app.subscriptions import create_subscription, get_subscriptions, delete_subscription, \
    get_subscriptions_records

api_routes = [
    web.post('/api/register', register),
    web.post('/api/login', login),
    web.get('/api/logout', logout),
    web.get('/api/session_info', session_info),
    web.post('/api/create_record', create_record),
    web.post('/api/get_record', get_record),
    web.post('/api/delete_record', delete_record),
    web.post('/api/get_record_media', get_record_media),
    web.post('/api/set_record_media', set_record_media),
    web.post('/api/delete_record_media', delete_record_media),
    web.post('/api/search_records', search_records),
    web.post('/api/create_subscription', create_subscription),
    web.get('/api/get_subscriptions', get_subscriptions),
    web.get('/api/get_subscriptions_records', get_subscriptions_records),
    web.post('/api/delete_subscription', delete_subscription),

]