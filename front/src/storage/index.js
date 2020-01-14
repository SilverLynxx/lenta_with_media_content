import { createStore } from 'redux';
import reducerSession from './session';
import reducerAuthForms from './auth_forms';
import reducerRecords from './records';
import reducerSubscriptions from './subscriptions';


const initial_state = {
  loadingState: false,
  session: {
    anonymous: true,
    accountid: null,
    username: null,
    email: null
  },
  authForms: {
    loginUsername: '',
    loginPassword: '',
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordAgain: ''
  },
  records: {
    recordsList: [],
    recordsLenta: [],
    createRecordForm: {
      recordHeadline: '',
      recordTags: '',
      recordText: '',
    },
    searchRecords: {
      username: '',
      tags: '',
      searchTerms: '',
      subscriptionName: ''
    },
    recordDetails: {
      recordid: '',
      recordHeadline: '',
      postDate: '',
      username: '',
      recordText: '',
      tags: [],
      recordMedia: [],
      currentMedia: ''
    },
    editMedia: {
      currentMediaType: 'embedded_video',
      embeddedVideoUrl: '',
      description: '' 
    }
  },
  subscriptions: {
    createSubscription: {
      username: '',
      name: '',
      tags: '',
    },
    subscriptionsList: []
  },
  mainMenu: {
    links: [
      {name: 'Home', link: '/'},
      {name: 'Search', link: '/search'},
      {name: 'Record create form', link: '/create_record_form'},
    ],
  }
};


const reducerLoading = (state, action) => {

  switch (action.type) {
    case 'LOADING': {
      return true;
    }
    case 'LOADED': {
      return false;
    }
    default: {
      return state;
    }
  }
};

export const reducer = (state=initial_state, action) => {

  if (action.type == 'RESET_ALL') {
    return initial_state;
  };

  if (action.type == 'RESET_ALL_EXCEPT_SESSION') {
    return {
      ...initial_state,
      session: state.session
    };
  };

  return {
    loadingState: reducerLoading(state.loadingState, action),
    session: reducerSession(state.session, action),
    authForms: reducerAuthForms(state.authForms, action),
    records: reducerRecords(state.records, action),
    subscriptions: reducerSubscriptions(state.subscriptions, action),
    mainMenu: state.mainMenu
  };
};


export const store = createStore(reducer);