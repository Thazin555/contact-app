/*
useReducer
store => view
reducer =>
*/

const initialState = {
  auth: false,
  data: null,
  loading: false,
  error: null,
};

export const authReducer = (store = initialState, action) => {
  switch (action.type) {
    case "process": {
      return (store = { loading: true, ...store });
    }
    case "error": {
      return (store = { loading: false, error: action.payload, ...store });
    }
    case "register": {
      return (store = {
        loading: false,
        error: null,
        auth: true,
        data: action.payload,
      });
    }
    case "login": {
      return (store = {
        loading: true,
        error: null,
        auth: true,
        data: action.payload,
      });
    }
    case "logout": {
      return (store = { auth: false, data: null });
    }
    default:
      return store;
  }
};
