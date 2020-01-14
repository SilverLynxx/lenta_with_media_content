import React from 'react';




const SearchRecordView = (props) => {

  const {
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

    formToggle,
    handleFormTogle,

    handleSubscriptionTogle,
    subscriptionToggle, } = props;

  return (
    <div className="search-record">

      <div className="search-query">
        
        <div className={`search-query__form ${(formToggle || anonymous)?'':'hidden'}`}>
          <div className="search-query__search-terms">
            <input 
              value={searchTerms}
              onChange={(e) => handleInputSearchTerms(e)}
              placeholder="Search..."/>
          </div>
          <div className="search-query__username">
            <input 
              value={username}
              onChange={(e) => handleInputUsername(e)}
              placeholder="@username"/>
          </div>
          <div className="search-query__tags">
            <input 
              value={tags}
              onChange={(e) => handleInputTags(e)}
              placeholder="#tags"/>
          </div>
          {
            subscriptionToggle
            ?<div className="search-query__make-subscription">

              <button
                onClick={(e) => handleSubscribe(e)}
                className="search-query__subscribe"></button>
              <input 
                value={subscriptionName}
                onChange={(e) => handleInputSubscriptionName(e)}
                placeholder="name for new subscription"
                className="search-query__subscription-name"/>
            </div>
            :null
          }
          <div className="search-query__control">
            <button
              onClick={(e) => handleClear(e)}
              className="search-query__clear"></button>
            { 
              (!anonymous)
              ?<button
                onClick={(e) => handleSubscriptionTogle(e)}
                className="search-query__subscription-toggle"></button>:null
            }
          </div>
        </div>
        {
          anonymous
          ?null
          :<div className={`search-query__subscriptions-list-contaner ${(formToggle || anonymous)?'hidden':''}`}>
            {subscriptionsList}
          </div>
        }
        {
          anonymous
          ?null
          :<button
            onClick={(e) => handleFormTogle(e)}
            className={`search-query__toggle ${formToggle?'subscriptions':'search'}`}></button>
        }
      </div>
      <div className="search-record__record-list">
        { recordsList }
      </div>
    </div>
  )
};


export default SearchRecordView;