import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuthenticated:false,
  loading: true,
  isAdmin: false,
};

export const userReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated= true;

    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated=false;

    },
  },
});

export const { userExist, userNotExist } = userReducer.actions;
