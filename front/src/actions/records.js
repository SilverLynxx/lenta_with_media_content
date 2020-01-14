
const records = {

  fetchRecordsList(payload) {
    return {
      type: 'FETCH_RECORDS_LIST',
      payload
    }
  },

  fetchRecordsLenta(payload) {
    return {
      type: 'FETCH_RECORDS_LENTA',
      payload
    }
  },

  inputRecordHeadline(payload) {
    return {
      type: 'INPUT_RECORD_HEADLINE',
      payload
    }
  },

  inputRecordTags(payload) {
    return {
      type: 'INPUT_RECORD_TAGS',
      payload
    }
  },

  inputRecordText(payload) {
    return {
      type: 'INPUT_RECORD_TEXT',
      payload
    }
  },

  searchRecordsInputUsername(payload) {
    return {
      type: 'SEARCH_RECORDS_INPUT_USERNAME',
      payload
    }
  },

  searchRecordsInputSearchTerms(payload) {
    return {
      type: 'SEARCH_RECORDS_INPUT_SEARCH_TERMS',
      payload
    }
  },

  searchRecordsInputTags(payload) {
    return {
      type: 'SEARCH_RECORDS_INPUT_TAGS', 
      payload
    }
  },
  fetchRecordDetails(payload) {
    return {
      type: 'FETCH_RECORD_DETAILS',
      payload
    }
  },
  fetchRecordMedia(payload) {
    return {
      type: 'FETCH_RECORD_MEDIA',
      payload
    }
  },
  
  setCurrentMedia(payload) {
    return {
      type: 'SET_CURRENT_MEDIA',
      payload
    }
  },

  searchRecordsInputSubscriptionName(payload) {
    return {
      type: 'SEARCH_RECORDS_INPUT_SUBSCRIPTION_NAME',
      payload
    }
  },

  inputMediaType(payload) {
    return {
      type: 'INPUT_MEDIA_TYPE',
      payload
    }
  },

  inputEmbeddedVideoUrl(payload) {
    return {
      type: 'INPUT_EMBEDDED_VIDEO_URL',
      payload
    }
  },

  inputDescription(payload) {
    return {
      type: 'INPUT_DESCRIPTION',
      payload
    }
  },
};

export default records; 

