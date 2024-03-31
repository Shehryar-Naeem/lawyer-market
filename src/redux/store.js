import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";

// export const server = process.env.REACT_APP_API_URL;
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userReducer.name]: userReducer.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
