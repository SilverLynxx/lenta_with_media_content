import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import SubscrioptionItem from '../subscription_item';
import Loading from '../loading';
import SubscriptionsListView from './view';




const SubscriptionsList = (props) => {

  const {
    subscriptionsList,
    fetchSubscriptionsList } = props;

  const apiService = React.useContext(ApiContext);

  const [loaded, changeLoaded] = React.useState('loading');

  React.useEffect(() => {
    (loaded == 'loading')
    ?apiService.get_subscriptions()
    .then(r => {
      fetchSubscriptionsList(r.data.data);
      changeLoaded('loaded');})
    .catch(r => console.log(r))
    :null;
  })

  const subList = subscriptionsList.map(item => {

    return (
      <SubscrioptionItem 
        key={item.subgroupid}
        {...{
          subgroupid: item.subgroupid,
          name: item.subgroupname, 
          username: item.username, 
          tags:item.tags}}/>)
  });
  
  if (loaded == 'loaded') {
    return (
      <SubscriptionsListView {...{ subList }}/>)
  } else {
    return (
      <Loading />)
  }
};



const mapStateToProps = (store) => {

  return {
    subscriptionsList: store.subscriptions.subscriptionsList
  }
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('Subscriptions', dispatch);

  return {
    fetchSubscriptionsList: dispatchActions.fetchSubscriptionsList }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsList);