// reducer.js
const initialState = {
    user: null,
    cart: [],
    // other state properties
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGOUT':
        return {
          ...state,
          user: null,
        };
      // other cases
      default:
        return state;
    }
  };
  
  export default rootReducer;