import asyncpg, asyncio
from config import Config
from db_conf import db_00, db_01, db_02, db_03


cfg = Config()



async def create_schema(schema_name):

    try:
        conn = await asyncpg.connect(cfg.DB_ADDRESS)
        await conn.execute(f'''
            CREATE SCHEMA {schema_name}
        ''')
        print(f'Schema {schema_name} created')
    except Exception as e:
        print(f'Error: {e}')
    await conn.close()


async def create_table(schema_name, table_name, columns):

    try:
        conn = await asyncpg.connect(cfg.DB_ADDRESS)
        await conn.execute(f'''
            CREATE TABLE {schema_name}.{table_name}({columns})
        ''')
        print(f'Table {table_name} in {schema_name} created')
    except Exception as e:
        print(f'Error: {e}')
    await conn.close()



async def init_00():

    await create_schema(cfg.SCHEMA_NAME)
    for table in db_00:
        await create_table(cfg.SCHEMA_NAME, table['table_name'], table['columns'])

async def init_01():

    for table in db_01:
        await create_table(cfg.SCHEMA_NAME, table['table_name'], table['columns'])

async def init_02():

    for table in db_02:
        await create_table(cfg.SCHEMA_NAME, table['table_name'], table['columns'])

async def init_03():

    for table in db_03:
        await create_table(cfg.SCHEMA_NAME, table['table_name'], table['columns'])


if __name__ == '__main__':
    # asyncio.run(init_00())
    # asyncio.run(init_01())
    # asyncio.run(init_02())
    asyncio.run(init_03())
    # pass
