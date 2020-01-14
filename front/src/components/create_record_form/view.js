import React from 'react';




const CreateRecordFormView = (props) => {

  const {
    recordHeadline,
    recordTags,
    recordText,
    handleRecordHeadlineChange,
    handleRecordTagsChange,
    handleRecordTextChange,
    handleSubmit,
    tagsParse } = props;

  return (
    <div className="create-record-form">
      <div className="create-record-form__record-headline">
        <input 
          value={recordHeadline}
          onChange={(e) => handleRecordHeadlineChange(e)}
          placeholder="Headline"/>
      </div>
      <div className="create-record-form__record-tags">
        <input 
          value={recordTags}
          onChange={(e) => handleRecordTagsChange(e)}
          placeholder="#tags"/>
      </div>
      <div className="create-record-form__record-tags-parse">
        { tagsParse.map(tag => <span>{tag}</span>) }
      </div>
      <div className="create-record-form__record-text">
        <textarea 
          value={recordText}
          onChange={(e) => handleRecordTextChange(e)}
          placeholder="Description"/>
      </div>
      <div className="create-record-form__submit">
        <button
          onClick={(e) => handleSubmit(e)} ></button>
      </div>      
    </div>
  )
};

export default CreateRecordFormView;