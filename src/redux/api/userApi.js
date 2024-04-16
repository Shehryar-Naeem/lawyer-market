import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
  }),
  tagTypes: ["Users", "Lawyers","Gigs"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "user/login-or-register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "user/login-user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "user/update-login-detail",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getUser: builder.query({
      query: () => `user/get-profle`,
      providesTags: ["Users"],
    }),
    updatePassword: builder.mutation({
      query: (password) => ({
        url: "user/update-user-password",
        method: "PUT",
        body: password,
      }),
      invalidatesTags: ["Users"],
    }),
    createLawyer: builder.mutation({
      query: (lawyer) => ({
        url: "lawyer/create-lawyer-account",
        method: "POST",
        body: lawyer,
      }),
      invalidatesTags: ["Lawyers"],
    }),
    completeLawyerProfile: builder.mutation({
      query: (data) => ({
        url: "lawyer/complete-lawyer-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lawyers"],
    }),
    lawyerPrfofile: builder.query({
      query: () => `lawyer/get-lawyer`,
      providesTags: ["Lawyers"],
    }),
    gigstepOne: builder.mutation({
      query: (gig) => ({
        url: "gig/create-gig/step-1",
        method: "POST",
        body: gig,
      }),
      invalidatesTags: ["Gigs"],
    }),
    gigstepTwo: builder.mutation({
      query: ({ id, data }) => ({
        url: `gig/create-gig/step-2/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Gigs"],
    }),
    gigstepThree: builder.mutation({
      query: ({ id, data }) => ({
        url: `gig/create-gig/step-3/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Gigs"],
    }),
    getUserGigs: builder.query({
      query: () => `gig/get-gigs/me`,
      providesTags: ["Gigs"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useCreateLawyerMutation,
  useCompleteLawyerProfileMutation,
  useLawyerPrfofileQuery,
  useGigstepOneMutation,
  useGigstepTwoMutation,
  useGigstepThreeMutation,
  useGetUserGigsQuery,

} = userApi;
