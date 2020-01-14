

const reducerSession = (state, action) => {

  switch (action.type) {
    case 'SESSION_START': {
      return {
        ...state,
        anonymous: false,
        accountid: action.payload.accountid,
        username: action.payload.username,
        email: action.payload.email,
      };
    }
    case 'SESSION_RESET': {
      return {
        ...state,
        anonymous: true,
        accountid: null,
        username: null,
        email: null,
      };
    }
    default: {
      return state;
    }
  }
};


export default reducerSession;