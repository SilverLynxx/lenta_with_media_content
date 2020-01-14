import React from 'react';



const MediaContentItemView = (props) => {

  const {
    myselfIsOwner,
    mediaRoot,
    username,
    media_description,
    handleClick,
    handleDelete,
    handleEdit } = props;

  return (
    <div 
      onClick={(e) => handleClick(e)}
      className="media-content-item">
     {  myselfIsOwner
        ?<div className="media-content-item__control">
          <button
            onClick={(e) => handleDelete(e)}
            className="media-content-item__delete"></button>
        </div>
        :null
      }
      <div className="media-content-item__media-description">{media_description}</div>
      <div className="media-content-item__username">{username}</div>
    </div>)
}

export default MediaContentItemView;