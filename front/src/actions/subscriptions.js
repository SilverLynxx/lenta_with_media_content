

const subscriptions = {


  inputCreateSubscriptionName(payload) {
    return {
      type: 'INPUT_CREATE_SUBSCRIPTION_NAME',
      payload: payload,
    }
  },

  inputCreateSubscriptionUsername(payload) {
    return {
      type: 'INPUT_CREATE_SUBSCRIPTION_USERNAME',
      payload: payload,
    }
  },

  inputCreateSubscriptionTags(payload) {
    return {
      type: 'INPUT_CREATE_SUBSCRIPTION_TAGS',
      payload: payload,
    }
  },

  fetchSubscriptionsList(payload) {
    return {
      type: 'FETCH_SUBSCRIPTIONS_LIST',
      payload: payload,
    }
  },

};


export default subscriptions;
