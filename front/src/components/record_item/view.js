import React from 'react';




const RecordItemView = (props) => {

  const {
    recordHeadline,
    username,
    postDate,
    recordText,
    handleClick,
    formattedDate } = props;

  return (
    <div
      onClick={(e) => handleClick(e)} 
      className="record-item">
      <div className="record-item__record-top">
      <div className="record-item__record-headline">
          { recordHeadline }
        </div>
        <div className="record-item__username">
          { username }
        </div>
        <div className="record-item__post-date">
          { formattedDate }
        </div>
      </div>
      <div className="record-item__record-text">
        { recordText }
      </div>
    </div>
  )
};

export default RecordItemView;