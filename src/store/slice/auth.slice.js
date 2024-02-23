import { createSlice } from "@reduxjs/toolkit";

/*
name
initialState = store
reducer
immer library >> no need to return
*/

const initialState = {
  auth: false,
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    processing: (state) => {
      state.loading = true;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    register: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
      state.auth = true;
    },
    login: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
      state.auth = true;
    },
    logout: (state) => {
      state.loading = false;
      state.error = null;
      state.auth = false;
    },
  },
});

export const { processing, error, register, login, logout } = authSlice.actions;
export default authSlice.reducer;
