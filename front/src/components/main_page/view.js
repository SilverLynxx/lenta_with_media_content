import React from 'react';


const MainPageView = (props) => {

  const {
    anonymous,
    subscriptinsList,
    recordsLenta,
    loginForm,
    registerForm,
    newsListItems } = props;

  return (
    <div className="main-page">
        <div className="main-page__head">
          head
        </div>
        <div className="main-page__site-news">
          <div className="main-page__site-news-head">
            News
          </div>
          { newsListItems }
        </div>
        {
          anonymous
          ?null
          :<div className="main-page__lenta">
            <div className="main-page__lenta-head">
              Lenta
            </div>
            { recordsLenta }
          </div>
        }
        {
          anonymous
          ?null
          :<div className="main-page__subscriptions">
            <div className="main-page__subscriptions-head">
              Subscriptions
            </div>
            { anonymous?null:subscriptinsList }
          </div>
        }
    </div>)
};

export default MainPageView;