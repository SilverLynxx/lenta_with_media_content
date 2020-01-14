import React from 'react';


const RecordDetailsView = (props) => {

  const {
    recordHeadline,
    formattedDate,
    username,
    recordText,
    tags,
    mediaContent,
    isOwner,
    handleDelete } = props;

  return (
    <div className="record-details">
      {
        isOwner
        ?<div className="record-details__control">
          <button
            onClick={(e) => handleDelete(e)}
            className="record-details__delete">delete</button>
        </div>:null
      }
      <div className="record-details__top">
        { recordHeadline
          ?<div className="record-details__record-headline">{recordHeadline}</div>
          :<div className="record-details__record-headline">Details</div>}
        <div className="record-details__post-date">
          { formattedDate }
        </div>
      </div>
      <div className="record-details__username-tags">
        <div className="record-details__username">
          { username }
        </div>
        <div className="record-details__tags">
          { tags.map(tag => <span>{tag}</span>) }
        </div>
      </div>
      <div className="record-details__record-text">
        { recordText }
      </div>
      <div className="record-details__media-content">
        { mediaContent }
      </div>
    </div>
    )
};


export default RecordDetailsView;