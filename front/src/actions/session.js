
const session = {

  sessionStart(payload) {
    return {
      type: 'SESSION_START',
      payload: payload,
    }
  },

  sessionReset() {
    return {
      type: 'SESSION_RESET',
    }
  }
};


export default session;
