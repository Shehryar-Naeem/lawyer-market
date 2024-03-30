import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/user/`,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "login-or-register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    login : builder.mutation({
      query: (user) => ({
        url: "login-user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "update-login-detail",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getUser: builder.query({
      query: () => `get-profle`,
    }),
  }),
});

export const { useSignupMutation, useLoginMutation,useGetUserQuery, useUpdateUserMutation } =
  userApi;
