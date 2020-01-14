

const reset = {

  resetAll() {
    return {
      type: 'RESET_ALL',
    }
  },

  resetAllExceptSession() {
    return {
      type: 'RESET_ALL_EXCEPT_SESSION',
    }
  }
};


export default reset;
