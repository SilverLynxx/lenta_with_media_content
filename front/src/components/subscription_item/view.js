import React from 'react';



const SubscriptionItemView = (props) => {

  const {
    name,
    username,
    tags,
    handleSelect,
    handleDelete } = props;

  return (
    <div
      onClick={(e) => handleSelect(e)} 
      className="subscription-item">

      <div className="subscription-item__head">
        <div className="subscription-item__control">
          <button 
            className="subscription-item__delete"
            onClick={(e) => handleDelete(e)}></button>
        </div>
        { name?<div className="subscription-item__name">{ name }</div>:null }
      </div>
      <div className="subscription-item__options">
        { username?<div className="subscription-item__username">{ username }</div>:null }        
        { tags
          ?tags.map(tagname => <div className="subscription-item__tagname">{ tagname }</div>)
          :null }        
      </div>
    </div>
    )
};


export default SubscriptionItemView;