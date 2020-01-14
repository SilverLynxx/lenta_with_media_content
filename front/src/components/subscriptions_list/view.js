import React from 'react';



const SubscriptionsListView = (props) => {

  const { subList } = props;

  return (
    <div className="subscriptions-list">
      <div className="subscriptions-list__list-container">
        { 
          (subList.length == 0)
          ?<div className="subscriptions-list__placeholder">placeholder</div>
          :subList }
      </div>
    </div>
  )
};


export default SubscriptionsListView;