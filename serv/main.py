from aiohttp import web, ClientSession
import asyncpg
import aioredis
from motor.motor_asyncio import AsyncIOMotorClient
from aiohttp_session import setup as setup_session
from aiohttp_session.redis_storage import RedisStorage
from routes import make_routes_table
from config import Config
from custom_lib import DbHandler
from middlewares import middlewares



async def init_app():
    
    cfg = Config()
    pg_pool = await asyncpg.create_pool(cfg.DB_ADDRESS)
    db_handler = DbHandler(pg_pool=pg_pool, cfg=cfg)

    app = web.Application()
    app.add_routes(make_routes_table())
    app['cfg'] = cfg
    app[cfg.DB_HANDLER] = db_handler

    redis_pool = await aioredis.create_redis_pool(('localhost', 6379))
    setup_session(app, RedisStorage(redis_pool, cookie_name='CURRENT_SESSION'))
    async def dispose_pools(app):
        redis_pool.close()
        await redis_pool.wait_closed()
        await pg_pool.close()
    app.on_cleanup.append(dispose_pools)
    app.middlewares.extend(middlewares)

    mongo_client = AsyncIOMotorClient('localhost', 27017)
    app[cfg.MONGO_DB] = mongo_client[cfg.MONGO_DB_NAME]

    http_session = ClientSession()
    app['http_session'] = http_session
    async def close_http_session(app):
        await http_session.close()
    app.on_cleanup.append(close_http_session)

    return app



if __name__ == '__main__':
    web.run_app(init_app())