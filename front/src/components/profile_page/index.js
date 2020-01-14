import React from 'react';
import ProfilePageView from './view';
import SubscrioptionsList from '../subscriptions_list';
import RecordsList from '../records_list';
import RecordsLenta from '../records_lenta';



const ProfilePage = (props) => {

  const subscriptionsList = <SubscrioptionsList />
  const recordsList = <RecordsList />
  const recordsLenta = <RecordsLenta />

  return (
    <ProfilePageView {...{
      subscriptionsList,
      recordsList,
      recordsLenta }}/>
  )
};



export default ProfilePage;