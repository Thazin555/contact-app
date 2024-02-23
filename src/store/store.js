// import { authReducer } from "./reducer/auth.reducer";
// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { thunk } from "redux-thunk";

// const reducer = combineReducers({ auth: authReducer });

// export const store = createStore(reducer, {}, applyMiddleware(thunk));

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth.slice";
import { ApiService } from "./services/Api.service";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [ApiService.reducerPath]: ApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiService.middleware),
});
