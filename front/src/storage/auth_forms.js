

const reducerAuthForms = (state, action) => {
  
  switch (action.type) {
    case 'INPUT_LOGIN_USERNAME': {
      return {
        ...state,
        loginUsername: action.payload
      }
    }
    case 'INPUT_LOGIN_PASSWORD': {
      return {
        ...state,
        loginPassword: action.payload
      }
    }
    case 'INPUT_REGISTER_USERNAME': {
      return {
        ...state,
        registerUsername: action.payload
      }
    }
    case 'INPUT_REGISTER_EMAIL': {
      return {
        ...state,
        registerEmail: action.payload
      }
    }
    case 'INPUT_REGISTER_PASSWORD': {
      return {
        ...state,
        registerPassword: action.payload
      }
    }
    case 'INPUT_REGISTER_PASSWORD_AGAIN': {
      return {
        ...state,
        registerPasswordAgain: action.payload
      }
    }
    default:
      return state;
  }
};


export default reducerAuthForms;