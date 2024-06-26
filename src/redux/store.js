import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { profileReducer } from "./reducer/profileSlice";
import { conversationSlice } from "./reducer/conversation";


// export const server = process.env.REACT_APP_API_URL;
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [profileReducer.name]:profileReducer.reducer,
    [conversationSlice.name]:conversationSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});