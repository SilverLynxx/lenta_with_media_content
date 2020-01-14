import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '../../contexts';
import { SearchContext } from '../../contexts';
import { actions } from '../../actions';
import SearchRecordView from './view';
import RecordsList from '../records_list';
import SubscriptionsList from '../subscriptions_list';
import CreateRecordForm from '../create_record_form';


const SearchRecord = (props) => {

  const apiService = React.useContext(ApiContext);
  const searchService = React.useContext(SearchContext);

  const {
    anonymous,
    searchTerms,
    username,
    tags,
    fetchRecordsList,
    searchRecordsInputSearchTerms,
    searchRecordsInputUsername,
    searchRecordsInputTags,
    subscriptionName,
    searchRecordsInputSubscriptionName,
    fetchSubscriptionsList,

    loading,
    loaded } = props;


  const initialState = {
    refreshed: false,
    formToggle: anonymous?true:false,
    subscriptionToggle: false};

  const [toggle, changeToggle] = React.useState(initialState);


  const handleInputSearchTerms = (e) => {
    e.preventDefault();
    searchRecordsInputSearchTerms(e.target.value);

    console.log(e.target.value.match(/\W?(\w{3,}|\d+)\W?/), e.target.value);

    if (e.target.value.match(/\W?(\w{3,}|\d+)\W?/) || tags || username) {
      searchService.getRecordsList(
        { username, 
          search_terms: e.target.value, tags: tags.match(/[a-zA-Z0-9_]{3,100}/g)}, fetchRecordsList)
    } else {
      fetchRecordsList([]);
    }
  };

  const handleInputUsername = (e) => {
    e.preventDefault();
    searchRecordsInputUsername(e.target.value);
    if (e.target.value || tags || searchTerms.match(/\W?(\w{3,}|\d+)\W?/)) {
      searchService.getRecordsList(
        { search_terms: searchTerms,
          username: e.target.value, tags: tags.match(/[a-zA-Z0-9_]{3,100}/g)}, fetchRecordsList)
    } else {
      fetchRecordsList([]);
    }
  };

  const handleInputTags = (e) => {
    e.preventDefault();
    searchRecordsInputTags(e.target.value);
    if (e.target.value.match(/[a-zA-Z0-9_]{3,100}/g) || username || searchTerms.match(/\W?(\w{3,}|\d+)\W?/)) {
    searchService.getRecordsList(
      { username,
        search_terms: searchTerms, tags: e.target.value.match(/[a-zA-Z0-9_]{3,100}/g)}, fetchRecordsList)
    } else {
      fetchRecordsList([]);
    }
  };

  const handleInputSubscriptionName = (e) => {
    e.preventDefault();
    searchRecordsInputSubscriptionName(e.target.value)
  };

  const handleClear = (e) => {
    e.preventDefault();
    searchRecordsInputSearchTerms('');
    searchRecordsInputTags('');
    searchRecordsInputUsername('');
    searchRecordsInputSubscriptionName('');
    fetchRecordsList([]);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    loading();
    apiService.create_subscription(
      {username, name: subscriptionName, tags: tags.match(/[a-zA-Z0-9_]{3,100}/g)})
    .then(r => {
      apiService.get_subscriptions()
      .then(r => fetchSubscriptionsList(r.data.data))
      .catch(r => console.log(r));
      loaded();
      searchRecordsInputTags('');
      searchRecordsInputUsername('');
      searchRecordsInputSubscriptionName('');
      changeToggle(initialState);
    })
    .catch(r => {
      loaded();
      console.log(r);})
  };

  const handleFormTogle = (e) => {
    e.preventDefault();
    changeToggle({...toggle, formToggle: !toggle.formToggle});
    fetchRecordsList([]);
  };
  const handleSubscriptionTogle = (e) => {
    e.preventDefault();
    changeToggle({...toggle, subscriptionToggle: !toggle.subscriptionToggle});
  };

  const recordsList = <RecordsList />;
  const subscriptionsList = <SubscriptionsList />;
  
  if (!toggle.refreshed) {
    fetchRecordsList([]);
    changeToggle({...toggle, refreshed: true});
  };

  return (
    <SearchRecordView {
      ...{
        anonymous,
        searchTerms,
        username,
        tags,
        handleInputSearchTerms,
        handleInputUsername,
        handleInputTags,
        recordsList,
        subscriptionsList,

        subscriptionName,
        handleClear,
        handleSubscribe,
        handleInputSubscriptionName,

        handleFormTogle,
        handleSubscriptionTogle,
        formToggle: toggle.formToggle,
        subscriptionToggle: toggle.subscriptionToggle,
      }
    }/>
  )
};


const mapStateToProps = (store) => {
  return {
    anonymous: store.session.anonymous,
    recordsList: store.records.recordsList,
    username: store.records.searchRecords.username,
    tags: store.records.searchRecords.tags,
    searchTerms: store.records.searchRecords.searchTerms,
    subscriptionName: store.records.searchRecords.subscriptionName,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('Records', dispatch);

  return {
    fetchRecordsList: dispatchActions.fetchRecordsList,
    searchRecordsInputUsername: dispatchActions.searchRecordsInputUsername,
    searchRecordsInputTags: dispatchActions.searchRecordsInputTags,
    searchRecordsInputSearchTerms: dispatchActions.searchRecordsInputSearchTerms,
    searchRecordsInputSubscriptionName:dispatchActions.searchRecordsInputSubscriptionName,
    fetchSubscriptionsList: actions('Subscriptions', dispatch).fetchSubscriptionsList,
    loading: actions('Loading', dispatch).loading,
    loaded: actions('Loading', dispatch).loaded,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchRecord)