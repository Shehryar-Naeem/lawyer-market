import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProfileType: "",
};

export const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    switchProfileType: (state, action) => {
      state.currentProfileType =
        action.payload;
    },
  },
});

export const { switchProfileType } = profileReducer.actions;
