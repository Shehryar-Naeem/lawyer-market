import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
  }),
  tagTypes: ["Users", "Lawyers", "Gigs"],
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
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "user/passwor/forget",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["Users"],
    }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `user/password/reset/${token}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateProfilePicture: builder.mutation({
      query: (data) => ({
        url: "user/update-profile-pic",
        method: "PUT",
        body: data,
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
    getAllgigs: builder.query({
      query: ({
        currentPage,
        category,
        services,
        city,
        minPrice,
        maxPrice,
        search,
      }) => {
        // console.log("Current page:", currentPage);
        let url = `gig/get-gigs?page=${currentPage}`;
        if (category) url += `&category=${category}`;
        if (services) url += `&pricing.services=${services}`;
        if (city) url += `&city=${city}`;
        if (minPrice) url += `&ricing.price[lte]=${minPrice}`;
        if (maxPrice) url += `&pricing.price[gte]=${maxPrice}`;
        if (search) url += `&keyword=${search}`;

        return url;
      },
      providesTags: ["Gigs"],
    }),
    getGigById: builder.query({
      query: (id) => `gig/get-gig/${id}`,
      providesTags: ["Gigs"],
    }),
    getMeGigs: builder.query({
      query: () => `gig/get-gigs/me`,
      providesTags: ["Gigs"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateProfilePictureMutation,
  useForgotPasswordMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useCreateLawyerMutation,
  useCompleteLawyerProfileMutation,
  useLawyerPrfofileQuery,
  useGigstepOneMutation,
  useGigstepTwoMutation,
  useGigstepThreeMutation,
  useGetUserGigsQuery,
  useGetAllgigsQuery,
  useGetGigByIdQuery,
  useGetMeGigsQuery,
} = userApi;
