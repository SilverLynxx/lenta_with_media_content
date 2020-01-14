import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '../../contexts';
import { actions } from '../../actions';
import CreateRecordFormView from './view';
import autosize from 'autosize';


const CreateRecordForm = (props) => {

  const apiService = React.useContext(ApiContext);

  const {
    recordHeadline,
    recordTags,
    recordText,
    inputRecordHeadline,
    inputRecordTags,
    inputRecordText } = props;

  const history = useHistory();

  const handleRecordHeadlineChange = (e) => {
    e.preventDefault();
    inputRecordHeadline(e.target.value);
  };

  const handleRecordTagsChange = (e) => {
    e.preventDefault();
    inputRecordTags(e.target.value);
  };

  const handleRecordTextChange = (e) => {
    e.preventDefault();
    inputRecordText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService.create_record(
      {
        tags: recordTags.match(/[a-zA-Z0-9_]{3,100}/g), 
        record_text: recordText, 
        record_headline: recordHeadline
      }
    )
    .then(r => {
      console.log(r);
      inputRecordText('');
      inputRecordTags('');
      inputRecordHeadline('');
      history.push(`/record/${r.data.data.recordid}`);})
    .catch(r => console.log(r));
  };
  
  React.useEffect(() => {
    autosize(document.querySelector('.create-record-form__record-text > textarea'));}, [true,]);

  return (
    <CreateRecordFormView {
      ...{
        recordHeadline,
        recordTags,
        recordText,
        handleRecordHeadlineChange,
        handleRecordTagsChange,
        handleRecordTextChange,
        handleSubmit,
        tagsParse: recordTags.match(/[a-zA-Z0-9_]{3,100}/g)
                   ?recordTags.match(/[a-zA-Z0-9_]{3,100}/g).map(tag => `#${tag}`)
                   :[]
      }
    }/>
  )
};


const mapStateToProps = (store) => {
  return {
    recordHeadline: store.records.createRecordForm.recordHeadline,
    recordTags: store.records.createRecordForm.recordTags,
    recordText: store.records.createRecordForm.recordText,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('Records', dispatch)

  return {
    inputRecordHeadline: dispatchActions.inputRecordHeadline,
    inputRecordTags: dispatchActions.inputRecordTags,
    inputRecordText: dispatchActions.inputRecordText,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateRecordForm)