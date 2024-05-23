import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  notifications: {},
};

export const conversationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notifications = {
        ...state.notifications,
        [action.payload.conversationId]: true,
      };
    },
    clearNotification: (state, action) => {
      state.notifications = {
        ...state.notifications,
        [action.payload.conversationId]: false,
      };
    },
  },
});

export const { setNotification, clearNotification } = conversationSlice.actions;
