import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
  }),
  tagTypes: [
    "Users",
    "Lawyer",
    "Gigs",
    "Conversations",
    "Messages",
    "jobs",
    "bids",
  ],
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
      query: () => `user/get-profile`,
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
      invalidatesTags: ["Lawyer"],
    }),
    completeLawyerProfile: builder.mutation({
      query: (data) => ({
        url: "lawyer/complete-lawyer-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lawyer"],
    }),
    lawyerPrfofile: builder.query({
      query: () => `lawyer/get-lawyer`,
      providesTags: ["Lawyer"],
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

        // console.log(url);
        return url;
      },
      providesTags: ["Gigs"],
    }),
    getGigById: builder.query({
      query: (id) => `gig/get-gig/${id}`,
      providesTags: ["Gigs"],
    }),
    getGigDetail: builder.query({
      query: (id) => `gig/get-gig-detail/${id}`,
      providesTags: ["Gigs"],
    }),
    getMeGigs: builder.query({
      query: () => `gig/get-gigs/me`,
      providesTags: ["Gigs"],
    }),
    deleteGig: builder.mutation({
      query: (id) => ({
        url: `gig/delete-gig/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gigs"],
    }),
    updateGig: builder.mutation({
      query: ({ id, data }) => ({
        url: `gig/update-gig/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Gigs"],
    }),

    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `gig/add/review/${id}`,
        method: `PUT`,
        body: data,
      }),
      invalidatesTags: ["Gigs"],
    }),
    getReviewsOfGigs: builder.query({
      query: (id) => `gig/gig-reviews/${id}`,
      providesTags: ["Gigs"],
    }),
    deleteGigReview: builder.mutation({
      query: ({ gigId, reviewId }) => ({
        url: `gig/delete/review/${gigId}/${reviewId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Gigs"],
    }),
    createConversation: builder.mutation({
      query: (data) => ({
        url: "conversation/create-conversation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Conversations"],
    }),
    meConversations: builder.query({
      query: () => `conversation/me/conversation`,
      providesTags: ["Conversations"],
    }),
    getConversation: builder.query({
      query: (id) => `conversation/get-single-conversation/${id}`,
      providesTags: ["Conversations"],
    }),

    sendMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `message/send-message/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Messages"],
    }),
    getSingleConversationMessages: builder.query({
      query: (id) => `message/me/conversation/messages/${id}`,
      providesTags: ["Messages"],
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: `job/create-job`,
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    stopReceivingRuquest: builder.mutation({
      query: ({ id, data }) => ({
        url: `job//stop-recieving-request/${id}`,
        method: `PUT`,
      }),
      invalidatesTags: ["jobs"],
    }),
    getJobs: builder.query({
      query: ({ currentPage, category, city, minPrice, maxPrice, search }) => {
        // `job/get-all-jobs`
        let url = `job/get-all-jobs?page=${currentPage}`;
        if (category) url += `&category=${category}`;
        if (city) url += `&location=${city}`;
        if (minPrice) url += `&price[lte]=${minPrice}`;
        if (maxPrice) url += `&price[gte]=${maxPrice}`;
        if (search) url += `&keyword=${search}`;

        return url;
      },
      providesTags: ["jobs"],
    }),
    getJobById: builder.query({
      query: (id) => `job/get-job/${id}`,
      providesTags: ["jobs"],
    }),
    getMeJobs: builder.query({
      query: () => `job/get-me-jobs`,
      providesTags: ["jobs"],
    }),
    sendProposal: builder.mutation({
      query: ({ id, data }) => ({
        url: `bid/send-proposal/${id}`,
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["bids"],
    }),
    getAllPostBids: builder.query({
      query: (id) => `bid/get-post-bids/${id}`,
      providesTags: ["bids"],
    }),
    acceptBid: builder.mutation({
      query: ({ id, data }) => ({
        url: `bid/accept-bid/${id}`,
        method: `PUT`,
        body: data,
      }),
      invalidatesTags: ["bids"],
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
  useGetConversationQuery,
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
  useAddReviewMutation,
  useGetReviewsOfGigsQuery,
  useDeleteGigReviewMutation,
  useCreateJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useGetMeJobsQuery,
  useSendProposalMutation,
  useGetAllPostBidsQuery,
  useAcceptBidMutation,
} = userApi;
