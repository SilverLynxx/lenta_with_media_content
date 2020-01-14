import React from 'react';
import axios from 'axios';



const api_routes = {
  register: '/api/register',
  login: '/api/login',
  logout: '/api/logout',
  session_info: '/api/session_info',
  create_record: '/api/create_record',
  get_record: '/api/get_record',
  get_record_media: '/api/get_record_media',
  set_record_media: '/api/set_record_media',
  delete_record_media: '/api/delete_record_media',
  search_records: '/api/search_records',
  create_subscription: '/api/create_subscription',
  delete_subscription: '/api/delete_subscription',
  get_subscriptions: '/api/get_subscriptions',
  get_subscriptions_records: '/api/get_subscriptions_records',
};




class ApiService {

  constructor({routes,}) {
    this.routes = routes;
  }

  register({username, email, password}) {
    return axios({
      url: this.routes.register,
      method: 'post',
      data: {
        username,
        email,
        password
      }
    })
  }

  login({username, password}) {
    return axios({
      url: this.routes.login,
      method: 'post',
      data: {
        username,
        password
      }
    })
  }

  logout() {
    return axios({
      url: this.routes.logout,
      method: 'get',
    })
  }

  session_info() {
    return axios({
      url: this.routes.session_info,
      method: 'get',
    })
  }

  create_record({tags, record_text, record_headline}) {
    const data = {};
    tags?(data['tags'] = tags):null;
    record_text?(data['record_text'] = record_text):null;
    record_headline?(data['record_headline'] = record_headline):null;
    return axios({
      url: this.routes.create_record,
      method: 'post',
      data: data
    })
  }

  search_records({tags, username, search_terms}) {
    const data = {};
    tags?(data['tags'] = tags):null;
    username?(data['username'] = username):null;
    search_terms?(data['search_terms'] = search_terms):null;
    return axios({
      url: this.routes.search_records,
      method: 'post',
      data: data
    })
  }

  get_record({recordid, }) {
    const data = {};
    recordid?(data['recordid'] = recordid):null;
    return axios({
      url: this.routes.get_record,
      method: 'post',
      data: data
    })
  }

  get_record_media({recordid, }) {
    const data = {};
    recordid?(data['recordid'] = recordid):null;
    return axios({
      url: this.routes.get_record_media,
      method: 'post',
      data: data
    })
  }

  delete_record_media({mediaid, }) {
    const data = {};
    mediaid?(data['mediaid'] = mediaid):null;
    return axios({
      url: this.routes.delete_record_media,
      method: 'post',
      data: data
    })
  }

  set_record_media({recordid, media_type, media_data, media_description}) {
    const data = {};
    recordid?(data['recordid'] = recordid):null;
    recordid?(data['media_type'] = media_type):null;
    recordid?(data['media_data'] = media_data):null;
    recordid?(data['media_description'] = media_description):null;
    return axios({
      url: this.routes.set_record_media,
      method: 'post',
      data: data
    })
  }


  create_subscription({username, tags, name}) {
    const data = {};
    username?(data['username'] = username):null;
    tags?(data['tags'] = tags):null;
    name?(data['name'] = name):null;
    return axios({
      url: this.routes.create_subscription,
      method: 'post',
      data: data
    })
  }

  delete_subscription({subgroupid, }) {
    const data = {};
    subgroupid?(data['subgroupid'] = subgroupid):null;
    return axios({
      url: this.routes.delete_subscription,
      method: 'post',
      data: data
    })
  }

  get_subscriptions() {
    return axios({
      url: this.routes.get_subscriptions,
      method: 'get'
    })
  }

  get_subscriptions_records() {
    return axios({
      url: this.routes.get_subscriptions_records,
      method: 'get'
    })
  }


};



const apiService = new ApiService({routes: api_routes,});

const ApiContext = React.createContext();
const ApiProvider = ApiContext.Provider;
const ApiConsumer = ApiContext.Consumer;

export { ApiContext, ApiConsumer, ApiProvider, apiService };