import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONVERSATION, GIGS, LAWYER, MESSAGE, USER } from "../../contants/color";
export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
  }),
  tagTypes: [USER, LAWYER, GIGS,CONVERSATION,MESSAGE],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "user/login-or-register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [USER],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "user/login-user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [USER],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "user/update-login-detail",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: [USER],
    }),
    getUser: builder.query({
      query: () => `user/get-profile`,
      providesTags: [USER],
    }),
    updatePassword: builder.mutation({
      query: (password) => ({
        url: "user/update-user-password",
        method: "PUT",
        body: password,
      }),
      invalidatesTags: [USER],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "user/passwor/forget",
        method: "POST",
        body: email,
      }),
      invalidatesTags: [USER],
    }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `user/password/reset/${token}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [USER],
    }),

    updateProfilePicture: builder.mutation({
      query: (data) => ({
        url: "user/update-profile-pic",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [USER],
    }),
    createLawyer: builder.mutation({
      query: (lawyer) => ({
        url: "lawyer/create-lawyer-account",
        method: "POST",
        body: lawyer,
      }),
      invalidatesTags: [LAWYER],
    }),
    completeLawyerProfile: builder.mutation({
      query: (data) => ({
        url: "lawyer/complete-lawyer-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [LAWYER],
    }),
    lawyerPrfofile: builder.query({
      query: () => `lawyer/get-lawyer`,
      providesTags: [LAWYER],
    }),
    gigstepOne: builder.mutation({
      query: (gig) => ({
        url: "gig/create-gig/step-1",
        method: "POST",
        body: gig,
      }),
      invalidatesTags: [GIGS],
    }),
    gigstepTwo: builder.mutation({
      query: ({ id, data }) => ({
        url: `gig/create-gig/step-2/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [GIGS],
    }),
    gigstepThree: builder.mutation({
      query: ({ id, data }) => ({
        url: `gig/create-gig/step-3/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [GIGS],
    }),

    // getUserGigs: builder.query({
    //   query: () => `gig/get-gigs/me`,
    //   providesTags: [GIGS],
    // }),
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
        if (city) url += `&city=${city.toLowerCase()}`;
        if (minPrice) url += `&ricing.price[lte]=${minPrice}`;
        if (maxPrice) url += `&pricing.price[gte]=${maxPrice}`;
        if (search) url += `&keyword=${search}`;

        console.log(url);
        return url;
      },
      providesTags: [GIGS],
    }),
    getGigById: builder.query({
      query: (id) => `gig/get-gig/${id}`,
      providesTags: [GIGS],
    }),
    getGigDetail: builder.query({
      query: (id) => `gig/get-gig-detail/${id}`,
      providesTags: [GIGS],
    }),
    getMeGigs: builder.query({
      query: () => `gig/get-gigs/me`,
      providesTags: [GIGS],
    }),
    deleteGig: builder.mutation({
      query: (id) => ({
        url: `gig/delete-gig/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [GIGS],
    }),
    updateGig: builder.mutation({
      query: ({ id, data }) => ({
        url: `gig/update-gig/${id}`,
        method: "PUT",
        body: data,
      }),
      validatetags: [GIGS],
    }),
    createConversation: builder.mutation({
      query: (data) => ({
        url: "conversation/create-conversation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CONVERSATION],
    }),
    meConversations : builder.query({
      query: () => `conversation/me/conversation`,
      providesTags: [CONVERSATION],
    }),
    sendMessage: builder.mutation({
      query: ({id,data}) => ({
        url: `message/send-message/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [MESSAGE],
    }),
    getSingleConversationMessages: builder.query({
      query: (id) => `message/get-single-conversation-messages/${id}`,
      providesTags: [MESSAGE],
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

  useGetAllgigsQuery,
  useGetGigByIdQuery,
  useGetGigDetailQuery,
  useGetMeGigsQuery,
  useDeleteGigMutation,
  useUpdateGigMutation,
  useCreateConversationMutation,
  useMeConversationsQuery,

  useSendMessageMutation,
  useGetSingleConversationMessagesQuery,
} = userApi;
