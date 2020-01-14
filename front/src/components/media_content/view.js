import React from 'react';



const MediaContentView = (props) => {

  const { 
  	mediaList,
  	myselfIsOwner,
  	mediaContentEdit } = props;

  return (
    <div className="media-content">
	    <div className="media-content__media-root">
		    <div id="media-root">
			    <div className="media-root__placeholder"></div>
		    </div>
	    </div>
	    <div className="media-content__media-list">
	      { mediaList }
	    </div>
	    {
	    	myselfIsOwner
		    ?<div className="media-content__edit">{mediaContentEdit}</div>
		    :null
		  }
    </div>)
};

export default MediaContentView;