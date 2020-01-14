
// const reducerLoading = (state, action) => {

//   switch (action.type) {
//     case 'LOADING': {
//       return true;
//     }
//     default: {
//       return state;
//     }
//   }
//   switch (action.type) {
//     case 'LOADED': {
//       return false;
//     }
//     default: {
//       return state;
//     }
//   }
// };



const _loading = {

  loading(payload) {
    return {
      type: 'LOADING',
      payload
    }
  },
  loaded(payload) {
    return {
      type: 'LOADED',
      payload
    }
  },
}

export default _loading