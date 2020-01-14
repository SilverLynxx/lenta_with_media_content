import React from 'react';



const MediaContentEditView = (props) => {

  const { 
    toggle,
    currentMediaType,
    mediaTypeList,
    mediaTypeDict,
    embeddedVideoUrl,
    description,
    handleToggle,
    handleChangeMediaType, 
    handleChangeDescription,
    handleChangeEmbeddedVideoUrl,
    handleSubmitEmbeddedVideo,
    handlePreviewEmbeddedVideo } = props;


  return (
    <div className="media-content-edit">
      <div className="media-content-edit__toggle">
        <button
          onClick={(e) => handleToggle(e)}></button>
      </div>
      { 
        toggle
        ?<div className="media-content-edit__add-media">
          <button
            className="media-content-edit__add-media-close"
            onClick={(e) => handleToggle(e)}></button>
          <div className="media-content-edit__select-media-type">
            { mediaTypeList.map(
                mediaType => 
                  <button 
                    className={`${(currentMediaType == mediaType)?'selected':''}`}
                    onClick={(e) => handleChangeMediaType(e, mediaType)}>
                    { mediaTypeDict[mediaType] }
                  </button>) }
          </div>
          {
            (() => {
              switch (currentMediaType) {
                case 'embedded_video': {
                  return (
                    <div className="media-content-edit__input-data">
                      <div className="media-content-edit__input-embedded-video-url">
                        <input
                          value={embeddedVideoUrl}
                          onChange={(e) => handleChangeEmbeddedVideoUrl(e)}
                          placeholder="Embedded video url" />
                      </div>
                      <div className="media-content-edit__input-description">
                        <textarea
                          value={description}
                          onChange={(e) => handleChangeDescription(e)}
                          placeholder="Description" />
                      </div>
                      <div className="media-content-edit__submit-embedded-video">
                        <button onClick={(e) => handleSubmitEmbeddedVideo(e)} >submit</button>
                      </div>                      
                    </div>)
                }
                default:
                  return <div></div>
              }
            })()
          }
        </div>
        :null
      }
    </div>
  )
};

export default MediaContentEditView;