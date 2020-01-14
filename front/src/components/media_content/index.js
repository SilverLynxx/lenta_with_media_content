import React from 'react';
import { connect } from 'react-redux';
import { ApiContext } from '../../contexts';
import { actions } from '../../actions';
import MediaContentView from './view';
import MediaContentItem from '../media_content_item';
import Loading from '../loading';
import MediaContentEdit from '../media_content_edit';


const MediaContent = (props) => {

  const {
    recordid,
    username,
    selfusername,
    recordMedia,
    fetchRecordMedia } = props;

  const apiService = React.useContext(ApiContext);
  const myselfIsOwner = (username == selfusername);

  const [loaded, changeLoaded] = React.useState('loading');


  if (loaded == 'loading') {
    apiService.get_record_media({recordid,})
    .then(r => {
      fetchRecordMedia(r.data.data);
      changeLoaded('loaded'); })
    .catch(r => console.log(r));
    console.log('loading');
    return <Loading />
  } else {

    const mediaList = recordMedia.map(item => {
      item.recordid = recordid;
      return (
        <MediaContentItem key={item.mediaid} {...item}/>)
    })

    const mediaContentEdit = <MediaContentEdit recordid={recordid}/>

    return (
      <MediaContentView {...{
        mediaList,
        myselfIsOwner,
        mediaContentEdit
      }}/>)
  }
};


const mapStateToProps = (store) => {

  return {
    selfusername: store.session.username,
    recordid: store.records.recordDetails.recordid,
    recordMedia: store.records.recordDetails.recordMedia,
  }
};

const mapDispatchToProps = (dispatch) => {

  return {
    fetchRecordMedia: actions('Records', dispatch).fetchRecordMedia,
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(MediaContent)