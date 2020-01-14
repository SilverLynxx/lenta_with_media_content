import React from 'react';



const ProfilePageView = (props) => {

  const {
    subscriptionsList,
    recordsList,
    recordsLenta } = props;

  return (
    <div className="profile-page">
      <div className="profile-page__subscriptions-list">
        { subscriptionsList }
      </div>
      <div className="profile-page__records-lenta">
        { recordsLenta }
      </div>
    </div>
  )
};


export default ProfilePageView;