
const authForms = {

  inputLoginUsername(payload) {
    return {
      type: 'INPUT_LOGIN_USERNAME',
      payload
    }
  },
  
  inputLoginPassword(payload) {
    return {
      type: 'INPUT_LOGIN_PASSWORD',
      payload
    }
  },

  inputRegisterUsername(payload) {
    return {
      type: 'INPUT_REGISTER_USERNAME',
      payload
    }
  },

  inputRegisterEmail(payload) {
    return {
      type: 'INPUT_REGISTER_EMAIL',
      payload
    }
  },
  
  inputRegisterPassword(payload) {
    return {
      type: 'INPUT_REGISTER_PASSWORD',
      payload
    }
  },
  
  inputRegisterPasswordAgain(payload) {
    return {
      type: 'INPUT_REGISTER_PASSWORD_AGAIN',
      payload
    }
  },

};

export default authForms;