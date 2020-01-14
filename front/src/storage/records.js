

const reducerRecords = (state, action) => {

  switch (action.type) {
    case 'FETCH_RECORDS_LIST': {
      return {
        ...state,
        recordsList: action.payload,
      };
    }
    case 'FETCH_RECORDS_LENTA': {
      return {
        ...state,
        recordsLenta: action.payload,
      };
    }
    case 'INPUT_RECORD_HEADLINE': {
      return {
        ...state,
        createRecordForm: {
          ...state.createRecordForm,
          recordHeadline: action.payload,
        }
      };
    }
    case 'INPUT_RECORD_TAGS': {
      return {
        ...state,
        createRecordForm: {
          ...state.createRecordForm,
          recordTags: action.payload,
        }
      };
    }
    case 'INPUT_RECORD_TEXT': {
      return {
        ...state,
        createRecordForm: {
          ...state.createRecordForm,
          recordText: action.payload,
        }
      };
    }
    case 'SEARCH_RECORDS_INPUT_SEARCH_TERMS': {
      return {
        ...state,
        searchRecords: {
          ...state.searchRecords,
          searchTerms: action.payload
        }
      }
    }
    case 'SEARCH_RECORDS_INPUT_USERNAME': {
      return {
        ...state,
        searchRecords: {
          ...state.searchRecords,
          username: action.payload
        }
      }
    }
    case 'SEARCH_RECORDS_INPUT_TAGS': {
      return {
        ...state,
        searchRecords: {
          ...state.searchRecords,
          tags: action.payload
        }
      }
    }
    case 'SEARCH_RECORDS_INPUT_SUBSCRIPTION_NAME': {
      return {
        ...state,
        searchRecords: {
          ...state.searchRecords,
          subscriptionName: action.payload
        }
      }
    }
    case 'FETCH_RECORD_DETAILS': {
      return {
        ...state,
        recordDetails: {
          ...state.recordDetails,
          recordid: action.payload.recordid,
          recordHeadline: action.payload.recordHeadline,
          postDate: action.payload.postDate,
          username: action.payload.username,
          recordText: action.payload.recordText,
          tags: action.payload.tags,
        }
      }
    }
    case 'FETCH_RECORD_MEDIA': {
      return {
        ...state,
        recordDetails: {
          ...state.recordDetails,
          recordMedia: action.payload,
        }
      }
    }
    case 'SET_CURRENT_MEDIA': {
      return {
        ...state,
        recordDetails: {
          ...state.recordDetails,
          currentMedia: action.payload,
        }
      }
    }
    case 'INPUT_MEDIA_TYPE': {
      return {
        ...state,
        editMedia: {
          ...state.editMedia,
          currentMediaType: action.payload,
        }
      }
    }
    case 'INPUT_EMBEDDED_VIDEO_URL': {
      return {
        ...state,
        editMedia: {
          ...state.editMedia,
          embeddedVideoUrl: action.payload,
        }
      }
    }
    case 'INPUT_DESCRIPTION': {
      return {
        ...state,
        editMedia: {
          ...state.editMedia,
          description: action.payload,
        }
      }
    }
    default: {
      return state;
    }
  }
};


export default reducerRecords;


