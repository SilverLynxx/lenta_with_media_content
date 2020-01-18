import React from 'react';
import axios from 'axios';


    // web.get('/admin/api/get_all_tables', get_all_tables),
    // web.post('/admin/api/get_table_columns', get_table_columns),
    // web.post('/admin/api/get_table_values', get_table_values),
    // web.post('/admin/api/update_table_values', update_table_values),
    // web.post('/admin/api/insert_values', insert_values),

const api_routes = {
  get_all_tables: '/admin/api/get_all_tables',
  get_table_columns: '/admin/api/get_table_columns',
  get_table_values: '/admin/api/get_table_values',
  update_table_values: '/admin/api/update_table_values',
  insert_values: '/admin/api/insert_values',
};




class ApiService {

  constructor({routes,}) {
    this.routes = routes;
  }

  get_all_tables() {
    return axios({
      url: this.routes.get_all_tables,
      method: 'get',
    })
  }

  get_table_columns({table_name,}) {
    return axios({
      url: this.routes.get_table_columns,
      method: 'post',
      data: {
        table_name,
      }
    })
  }
  

  get_table_values({table_name, limit, offset, order_by, asc_desc, conditions}) {
    return axios({
      url: this.routes.get_table_values,
      method: 'post',
      data: {
        table_name, // str
        limit, //int, default 100
        offset, //int, default 0
        order_by, //str, column name, required
        asc_desc, //str, default 'desc', two possible options - 'asc' and 'desc'
        conditions //dict, not required, {%column_name%: [%value%, %condition%, %data_type%]}
                  //condition may have values: '=', '<', '>', '<=', '>=', '!=', 'like', 'ilike'
                  //data_type`s: boolean, int, varchar, timestamp (required string in isoformat)
      }
    })
  }
  

  update_table_values({table_name, conditions, value}) {
    return axios({
      url: this.routes.update_table_values,
      method: 'post',
      data: {
        table_name, // str
        conditions, //dict, required, {%column_name%: %column_value%}
        value //dict, required, {%column_name%: %column_value%}
      }
    })
  }

    // table_name = incoming_data.get('table_name')
    // values = incoming_data.get('values')

  insert_values({table_name, values}) {
    return axios({
      url: this.routes.insert_values,
      method: 'post',
      data: {
        table_name, // str
        values //dict, required, {%column_name%: %column_value%}
      }
    })
  }



};



const apiService = new ApiService({routes: api_routes,});

const ApiContext = React.createContext();
const ApiProvider = ApiContext.Provider;
const ApiConsumer = ApiContext.Consumer;

export { ApiContext, ApiConsumer, ApiProvider, apiService };