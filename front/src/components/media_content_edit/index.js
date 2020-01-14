import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import { mountContent } from '../../lib';
import MediaContentEditView from './view';
import autosize from 'autosize';


const MediaContentEdit = (props) => {

  const apiService = React.useContext(ApiContext);

  const {
    currentMediaType,
    embeddedVideoUrl,
    description,
    recordid,
    inputMediaType,
    inputEmbeddedVideoUrl,
    inputDescription,
    fetchRecordMedia,
    loaded,
    loading } = props;

  const mediaTypeList = ['embedded_video',];
  const mediaTypeDict = {
    embedded_video: 'Embedded video'
  };


  const [toggle, changeToggle] = React.useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    changeToggle(!toggle);
  };

  const handleChangeMediaType = (e, mediaType) => {
    e.preventDefault();
    inputMediaType(mediaType);
  };


  const handleChangeDescription = (e) => {
    e.preventDefault();
    inputDescription(e.target.value);
  };


  const handleChangeEmbeddedVideoUrl = (e) => {
    e.preventDefault();
    inputEmbeddedVideoUrl(e.target.value);
    try {
      if (e.target.value.match(/^https?\:\/\/([\w\.]*)\/\S*$/)) {
        const media_type = currentMediaType;
        const media_data = JSON.stringify({url: e.target.value});
        const mediaRoot = 'media-root';
        mountContent(media_type, media_data, mediaRoot);
        // console.log(media_type, media_data);
      } 
    } catch {}

  };


  const handleSubmitEmbeddedVideo = (e) => {
    e.preventDefault();
    if (embeddedVideoUrl.match(/https?\:\/\/([\w\.]*)\/\S*/)) {
      loading();
      const media_type = currentMediaType;
      const media_data = {url: embeddedVideoUrl};
      const media_description = description;
      apiService.set_record_media({recordid, media_type, media_data, media_description})
      .then(r => {
        loaded();
        apiService.get_record_media({recordid, })
        .then(r => {
          fetchRecordMedia(r.data.data);
          inputEmbeddedVideoUrl('');
          inputDescription('');
          changeToggle(false);})
        .catch(r => console.log(r));
      })
      .catch(r => {
        loaded();
        console.log(r)})
    } else { console.log('Incorrect url') }
  };


  const handlePreviewEmbeddedVideo = (e) => {
    e.preventDefault();
    if (embeddedVideoUrl.match(/https?\:\/\/([\w\.]*)\/\S*/)) {
      const media_type = currentMediaType;
      const media_data = JSON.stringify({url: embeddedVideoUrl});
      const mediaRoot = 'media-root';
      mountContent(media_type, media_data, mediaRoot);
      // console.log(media_type, media_data);
    } else { console.log('Incorrect url') }
  };

  React.useEffect(() => {
    autosize(document.querySelector('.media-content-edit__input-description > textarea'))});

  return (
    <MediaContentEditView {...{ 
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
      handlePreviewEmbeddedVideo }}/>
  )
};


const mapStateToProps = (store) => {

  return {
    currentMediaType: store.records.editMedia.currentMediaType,
    embeddedVideoUrl: store.records.editMedia.embeddedVideoUrl,
    description: store.records.editMedia.description,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('Records', dispatch);

  return {
    fetchRecordMedia: dispatchActions.fetchRecordMedia,
    inputMediaType: dispatchActions.inputMediaType,
    inputEmbeddedVideoUrl: dispatchActions.inputEmbeddedVideoUrl,
    inputDescription: dispatchActions.inputDescription,
    loading: actions('Loading', dispatch).loading,
    loaded: actions('Loading', dispatch).loaded,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MediaContentEdit)