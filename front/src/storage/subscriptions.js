

const reducerSubscriptions = (state, action) => {

  switch (action.type) {
    case 'INPUT_CREATE_SUBSCRIPTION_NAME': {
      return {
        ...state,
        createSubscription: {
          ...state.createSubscription,
          name: action.payload
        }
      }
    }
    case 'INPUT_CREATE_SUBSCRIPTION_USERNAME': {
      return {
        ...state,
        createSubscription: {
          ...state.createSubscription,
          username: action.payload
        }
      }
    }
    case 'INPUT_CREATE_SUBSCRIPTION_TAGS': {
      return {
        ...state,
        createSubscription: {
          ...state.createSubscription,
          tags: action.payload
        }
      }
    }
    case 'FETCH_SUBSCRIPTIONS_LIST': {
      return {
        ...state,
        subscriptionsList: action.payload
      }
    }
    default:
      return state;
  }
}

export default reducerSubscriptions;
