import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import RecordDetailsView from './view';
import MediaContent from '../media_content';
import Loaging from '../loading';
import DateTime from '../date_time';

const RecordDetails = (props) => {
  
  const recordid = props.match.params.recordid;

  const {
    recordHeadline,
    postDate,
    username,
    recordText,
    tags,
    fetchRecordDetails,
    selfusername } = props;

  const isOwner = (selfusername == username);

  const apiService = React.useContext(ApiContext);

  const history = useHistory();

  const [loading, changeLoading] = React.useState('loading')

  const handleDelete = (e) => {
    e.preventDefault(e);
    confirm('Are you shure?')
    ?apiService.delete_record({recordid, })
    .then(r => {
      history.push('/');})
    .catch(r => console.log(r))
    :null;
  };

  if (loading == 'loading') {
    apiService.get_record({recordid,})
    .then(r => {
      fetchRecordDetails({
        recordid: r.data.data.record.recordid,
        recordHeadline: r.data.data.record.record_headline,
        postDate: r.data.data.record.post_date,
        username: r.data.data.record.username,
        recordText: r.data.data.record.record_text,
        tags: r.data.data.tags, });
      changeLoading('loaded')
    })
    .catch(r => console.log(r));
    return <Loaging />
  } else if (loading == 'loaded'){

    const mediaContent = <MediaContent recordid={recordid} username={username}/>

    const formattedDate = <DateTime date={postDate}/>

    return (
      <RecordDetailsView {...{
        recordHeadline,
        formattedDate,
        username,
        recordText,
        tags,
        mediaContent,
        isOwner,
        handleDelete }}/>)
  }
};

const mapStateToProps = (store) => {

  return {
    recordHeadline: store.records.recordDetails.recordHeadline,
    postDate: store.records.recordDetails.postDate,
    username: store.records.recordDetails.username,
    recordText: store.records.recordDetails.recordText,
    tags: store.records.recordDetails.tags,
    selfusername: store.session.username,
  }
};

const mapDispatchToProps = (dispatch) => {

  return {
    fetchRecordDetails: actions('Records', dispatch).fetchRecordDetails,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordDetails);