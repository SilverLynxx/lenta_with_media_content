
from aiohttp_session import get_session, new_session
from asyncpg.exceptions import UndefinedTableError

from custom_lib.permissions import authorize, admin
from custom_lib.json_view import json_response
import datetime


async def normalize_result(result):

    result_list = []
    for item in result:
        item_dict = dict(item)
        item_dict_final = {}
        for key in item_dict:
            if isinstance(item_dict[key], datetime.datetime):
                item_dict_final[key] = item_dict[key].timestamp()
            else:
                item_dict_final[key] = item_dict[key]
        result_list.append(item_dict_final)

    return result_list




@authorize
@admin
async def get_all_tables(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]


    try:
        information_schema = db.S('information_schema')
        tables = db.T('tables')
        q = db.Q\
            .from_(information_schema.tables)\
            .select('*')\
            .where(tables.table_schema == db.P('$1'))

        result = await db.fetch(q, [cfg.SCHEMA_NAME,])
        result_list = await normalize_result(result)

        return json_response({'info': 'Tables list', 'data': result_list})
    except Exception as e:
        return json_response({'info': 'error', 'data': str(e)})


@authorize
@admin
async def get_table_columns(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]

    async def fetch_columns(table_name):
        information_schema = db.S('information_schema')
        columns = db.T('columns')
        q = db.Q\
            .from_(information_schema.columns)\
            .select('*')\
            .where(columns.table_schema == db.P('$1'))\
            .where(columns.table_name == db.P('$2'))

        result = await db.fetch(q, [cfg.SCHEMA_NAME, table_name])

        if len(result) > 0:
            return await normalize_result(result)
        return None

    try:
        table_name = (await request.json()).get('table_name')
        assert isinstance(table_name, str)
    except:
        return json_response({'info': 'Incorrect data'}, status=400)
    
    try:
        result = await fetch_columns(table_name)
        if result:
            return json_response({'info': 'Columns list', 'data': result})
        return json_response({'info': 'Not found'}, status=404)

    except UndefinedTableError:
        return json_response({'info': 'Table not found'}, status=404)
    except Exception as e:
        return json_response({'info': 'error', 'data': str(e)})


@authorize
@admin
async def get_table_values(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]

    try:
        incoming_data = await request.json()
        table_name = incoming_data.get('table_name')
        limit = incoming_data.get('limit')
        offset = incoming_data.get('offset')
        order_by = incoming_data.get('order_by')
        asc_desc = incoming_data.get('asc_desc')
        conditions = incoming_data.get('conditions') #list of ['%column_name%', '%condition%','%value%', %data_type%]}
        if not limit:
            limit = 100
        if not offset:
            offset = 0
        assert isinstance(table_name, str)
        assert len(table_name) > 0
        assert isinstance(order_by, str)
        assert len(order_by) > 0
        assert isinstance(limit, int)
        assert isinstance(offset, int)
        if conditions:
            assert isinstance(conditions, list)
        if not (asc_desc == 'asc' or asc_desc == 'desc'):
            asc_desc == 'desc'
    except AssertionError:
        return json_response({'info': 'Incorrect data'}, status=400)

    if asc_desc == 'desc':
        order = db.Order.desc
    else:
        order = db.Order.asc

    try:
        table_s = db.table(table_name)
        table = db.T(table_name)
        q = db.Q\
            .from_(table_s)\
            .select('*')

        args_counter = 0
        args_list = []
        if conditions:
            for cond in conditions:
                args_counter += 1
                if cond[1] == '=':
                    q = q.where(table.__getattr__(cond[0]) == db.P('$' + str(args_counter)))
                elif cond[1] == '<':
                    q = q.where(table.__getattr__(cond[0]) < db.P('$' + str(args_counter)))
                elif cond[1] == '>':
                    q = q.where(table.__getattr__(cond[0]) > db.P('$' + str(args_counter)))
                elif cond[1] == '>=':
                    q = q.where(table.__getattr__(cond[0]) >= db.P('$' + str(args_counter)))
                elif cond[1] == '<=':
                    q = q.where(table.__getattr__(cond[0]) <= db.P('$' + str(args_counter)))
                elif cond[1] == '!=':
                    q = q.where(table.__getattr__(cond[0]) != db.P('$' + str(args_counter)))
                elif cond[1] == 'like':
                    q = q.where(table.__getattr__(cond[0]).like(db.P('$' + str(args_counter))))
                elif cond[1] == 'ilike':
                    q = q.where(table.__getattr__(cond[0]).ilike(db.P('$' + str(args_counter))))

                if cond[3] == 'timestamp':
                    args_list.append(datetime.datetime.fromisoformat(cond[2]))
                else:
                    args_list.append(cond[2])
        
        args_counter += 1
        q = q.orderby(table.__getattr__(order_by), order=order)\
            .limit('$' + str(args_counter)).offset('$' + str(args_counter + 1))

        args_list.append(limit)
        args_list.append(offset)

        result = await db.fetch(q, args_list)

        result_list = await normalize_result(result)


        return json_response({'info': 'Columns list', 'data': result_list})
    except UndefinedTableError:

        return json_response({'info': 'Table not found'}, status=404)
    # except Exception as e:
    #     return json_response({'info': 'error', 'data': str(e)})

@authorize
@admin
async def update_table_values(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]

    async def fetch_columns(table_name):
        information_schema = db.S('information_schema')
        columns = db.T('columns')
        q = db.Q\
            .from_(information_schema.columns)\
            .select('*')\
            .where(columns.table_schema == db.P('$1'))\
            .where(columns.table_name == db.P('$2'))

        result = await db.fetch(q, [cfg.SCHEMA_NAME, table_name])

        if len(result) > 0:
            return await normalize_result(result)
        return None

    incoming_data = await request.json()

    value = incoming_data.get('value')
    conditions = incoming_data.get('conditions')
    table_name = incoming_data.get('table_name')

    try:
        assert isinstance(value, dict)
        assert isinstance(conditions, dict)
        assert isinstance(table_name, str)
    except AssertionError:
        return json_response({'info': 'Incorrect data'}, status=400)

    columns = await fetch_columns(table_name)

    conditions_filter = {}

    for column in columns:
    #     if column['data_type'] == 'integer':
    #         if conditions[column['column_name']]:
    #             conditions_filter[column['column_name']] = conditions[column['column_name']]
    #     elif column['data_type'] == 'character varying':
    #         if conditions[column['column_name']]:
    #             conditions_filter[column['column_name']] = conditions[column['column_name']]
    #     elif column['data_type'] == 'boolean':
    #         if conditions[column['column_name']] is True:
    #             conditions_filter[column['column_name']] = True
    #         if conditions[column['column_name']] is False:
    #             conditions_filter[column['column_name']] = False
    # try:


        if column['ordinal_position'] == 1:
            conditions_filter[column['column_name']] = conditions[column['column_name']]

    updating_table = db.table(table_name)
    


    print(value, conditions_filter, table_name)
    value_key = None
    for key in value.keys():
        value_key = key
        break

    args = [value[value_key],]

    q = db.Q\
        .update(updating_table).set(updating_table.__getattr__(value_key), db.P('$1'))
    args_counter = 1
    for key in conditions_filter.keys():
        args_counter += 1
        q = q.where(updating_table.__getattr__(key) == db.P('$' + str(args_counter)))
        args.append(conditions_filter[key])

    res = await db.execute(q, args)


    return json_response({'info': 'Updated', 'data': str(res)})
    # except Exception as e:
    #     return json_response({'info': 'error', 'data': str(e)})



@authorize
@admin
async def insert_values(request):

    cfg = request.app['cfg']
    db = request.app[cfg.DB_HANDLER]

    incoming_data = await request.json()

    table_name = incoming_data.get('table_name')
    values = incoming_data.get('values')

    try:
        assert isinstance(table_name, str)
        assert isinstance(values, dict)
    except AssertionError:
        return json_response({'info': 'Incorrect data'}, status=400)


    # try:
    res = await db.insert_to_table(table_name, values)
    return json_response({'info': 'Inserted', 'data': str(res)})
    # except Exception as e:
    #     return json_response({'info': 'error', 'data': str(e)})