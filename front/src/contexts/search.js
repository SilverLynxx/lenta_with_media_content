import React from 'react';
import { apiService } from './network';






class SearchService {

  constructor({api,}) {
    this.apiService = api;
  }

  getRecordsList({username, tags, search_terms}, callback, errorCallback) {

    const handleIncomingData = (dataList) => {
      return dataList.map(item => {
        return {
          recordid: item.recordid,
          recordHeadline: item.record_headline,
          username: item.username,
          postDate: item.post_date,
          recordText: item.record_text
       }
     })
    }

    const requestParams = {};
    if (username && typeof(username) == 'string') {requestParams['username'] = username};
    if (tags && typeof(tags == 'object')) {requestParams['tags'] = tags};
    if (search_terms && typeof(search_terms == 'string')) {requestParams['search_terms'] = search_terms};
    this.apiService.search_records(requestParams)
    .then(r => callback(handleIncomingData(r.data.data)))
    .catch(r => {
      if (typeof(errorCallback) == 'function') {
        errorCallback(r);
      }
      console.log(r)})
  }
};



const searchService = new SearchService({api: apiService,});



const SearchContext = React.createContext();
const SearchProvider = SearchContext.Provider;
const SearchConsumer = SearchContext.Consumer;

export { SearchContext, SearchConsumer, SearchProvider, searchService };