import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../../actions';
import { SearchContext } from '../../contexts';
import { ApiContext } from '../../contexts';
import SubscriptionItemView from './view';



const SubscriptionItem = (props) => {

  const {
    fetchRecordsList,
    fetchRecordsLenta,
    loading,
    loaded } = props;

  const searchService = React.useContext(SearchContext);
  const apiService = React.useContext(ApiContext);
  const history = useHistory();

  const {
    name,
    username,
    tags,
    subgroupid,
    fetchSubscriptionsList, } = props;

  const handleSelect = (e) => {
    e.preventDefault();
    loading();
    searchService.getRecordsList(
      {username, tags}, (r) => {
        loaded();
        history.push('/search');
        fetchRecordsList(r);}, loaded)
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    apiService.delete_subscription({subgroupid, })
    .then(r => {
      apiService.get_subscriptions()
      .then(r => {
        fetchSubscriptionsList(r.data.data);
        apiService.get_subscriptions_records()
        .then(r => fetchRecordsLenta(r.data.data.map(item => {
          return {
            recordid: item.recordid,
            recordHeadline: item.record_headline,
            username: item.username,
            postDate: item.post_date,
            recordText: item.record_text}})))
        .catch(r => console.log(r))
      })
      .catch(r => console.log(r))
    })
    .catch(r => {
      loaded();
      console.log(r)})
  }

  return (
    <SubscriptionItemView {...{
      name,
      username,
      tags,
      handleSelect,
      handleDelete }} />)
};


const mapStateToProps = (store) => {

  return {
  }
};

const mapDispatchToProps = (dispatch) => {


  return {
    fetchRecordsList: actions('Records', dispatch).fetchRecordsList,
    fetchRecordsLenta: actions('Records', dispatch).fetchRecordsLenta,
    fetchSubscriptionsList: actions('Subscriptions', dispatch).fetchSubscriptionsList,
    loading: actions('Loading', dispatch).loading,
    loaded: actions('Loading', dispatch).loaded,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionItem);