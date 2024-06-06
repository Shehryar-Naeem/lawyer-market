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
    "verification",
    "support",
    "document",
    "hiring",
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
      query: ({ id }) => ({
        url: `job/stop-recieving-request/${id}`,
        method: `PUT`,
      }),
      invalidatesTags: ["jobs"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `job/delete-job/${id}`,
        method: `DELETE`,
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
    updateJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `job/update-job/${id}`,
        method: `PUT`,
        body: data,
      }),
      invalidatesTags: ["jobs"],
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
    getMeBids: builder.query({
      query: () => `bid/get-me-bids`,
      providesTags: ["bids"],
    }),

    // admin routes
    getGigsByAdmin: builder.query({
      query: () => `gig/get-gigs/admin`,
      providesTags: ["Gigs"],
    }),
    getGigByAdmin: builder.query({
      query: (id) => `gig/admin/gig/${id}`,
      providesTags: ["Gigs"],
    }),
    mangeGigbyAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `gig/admin/update-gig/${id}`,
        method: `PUT`,
        body: data,
      }),
      invalidatesTags: ["Gigs"],
    }),
    deleteGigByAdmin: builder.mutation({
      query: (id) => ({
        url: `gig/admin/delete-gig/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Gigs"],
    }),
    getJobsByAdmin: builder.query({
      query: () => `job/get-jobs/admin`,
      providesTags: ["jobs"],
    }),
    mangeJobbyAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `job/update-job/admin/${id}`,
        method: `PUT`,
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    MeHiredJobs: builder.query({
      query: () => `job/me/hired-jobs`,
      providesTags: ["jobs"],
    }),

    getJobByIdAtAdmin: builder.query({
      query: (id) => `job/get-job/admin/${id}`,
      providesTags: ["jobs"],
    }),
    deleteJobByAdmin: builder.mutation({
      query: (id) => ({
        url: `job/delete-job/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs"],
    }),
    getAllUserByAdmin: builder.query({
      query: () => `user/get-all-users/admin`,
      providesTags: ["Users"],
    }),
    getuserDetailByAdmin: builder.query({
      query: (id) => `user/get-user/admin/${id}`,
      providesTags: ["Users"],
    }),
    updateProfileByAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/update-user/admin/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Users"],
    }),

    updatePicByAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/update-pic/admin/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Users"],
    }),

    getAllLawyersByAdmin: builder.query({
      query: () => `lawyer/get-lawyers/admin`,
      providesTags: ["Lawyer"],
    }),
    getLawyerDetailByAdmin: builder.query({
      query: (id) => `lawyer/get-lawyer/admin/${id}`,
      providesTags: ["Lawyer"],
    }),
    deletelaywerByAdmin: builder.mutation({
      query: (id) => ({
        url: `lawyer/delete-lawyer/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lawyer"],
    }),
    sendVeificationReqeust: builder.mutation({
      query: (data) => ({
        url: `verification/send-verification-request`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["verification"],
    }),
    getVerificationRequests: builder.query({
      query: () => `verification/get-verification-requests/admin`,
      providesTags: ["verification"],
    }),
    getVerificationReqeust: builder.query({
      query: (id) => `verification/get-verification-request/admin/${id}`,
      providesTags: ["verification"],
    }),

    verifyRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `verification/verify-lawyer/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["verification"],
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `user/delete-request/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["verification"],
    }),

    addRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/add-new-role/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    removeRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/remove-role/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUserByAdmin: builder.mutation({
      query: (id) => ({
        url: `user/delete-user/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    stats: builder.query({
      query: () => `user/stats/admin`,
      providesTags: ["Users"],
    }),
    deleteMeRoles: builder.mutation({
      query: (data) => ({
        url: `user/delete/me-role`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getMeHiredJobs: builder.query({
      query: () => `job/me/lawyer-active-jobs`,
      providesTags: ["jobs"],
    }),
    allowReview: builder.query({
      query: (id) => `job/allow-review/${id}`,
      providesTags: ["jobs"],
    }),
    completeTheJob: builder.mutation({
      query: (id) => ({
        url: `job/complete-job/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["jobs"],
    }),
    getAllGigsOfUser: builder.query({
      query: (id) => `gig/get/user-gigs/${id}`,
      providesTags: ["Gigs"],
    }),
    getTopGigs: builder.query({
      query: () => `gig/get/top-ten/gigs`,
      providesTags: ["Gigs"],
    }),
    getUserData: builder.query({
      query: (id) => `user/get/user-data/${id}`,
      providesTags: ["Users"],
    }),
    sendMessageToSupport: builder.mutation({
      query: (data) => ({
        url: `customer-support/send/message/customer-support`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["support"],
    }),
    getSupportMessages: builder.query({
      query: () => `customer-support/get/messages/customer-support`,
      providesTags: ["support"],
    }),
    uploadDocumentRelatedToJob: builder.mutation({
      query: ({ id, document }) => ({
        url: `document/upload-document/${id}`,
        method: "POST",
        body: document,
      }),
      invalidatesTags: ["document"],
    }),
    getAllDocumentsRelatedToJob: builder.query({
      query: (id) => `document/get/all/post-document/${id}`,
      providesTags: ["document"],
    }),
    deleteDocumentRelatedToJob: builder.mutation({
      query: (id) => ({
        url: `document/delete/document/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["document"],
    }),
    createHiring: builder.mutation({
      query: ({ id, data }) => ({
        url: `hiring/create-hiring/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hiring"],
    }),
    getClientHirings: builder.query({
      query: () => `hiring/get-client-hiring`,
      providesTags: ["hiring"],
    }),
    getLawyerHirings: builder.query({
      query: () => `hiring/get-lawyer-hiring`,
      providesTags: ["hiring"],
    }),
    markHiringAsComplete: builder.mutation({
      query: (id) => ({
        url: `hiring/mark-hiring-as-completed/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["hiring"],
    }),
    getHiringPost : builder.query({
      query: (id) => `document/find/hiring-post/${id}`,
      providesTags: ["document"],
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
  useUpdateJobMutation,
  useGetMeJobsQuery,
  useSendProposalMutation,
  useGetAllPostBidsQuery,
  useAcceptBidMutation,

  useGetGigsByAdminQuery,
  useGetGigByAdminQuery,

  useMangeGigbyAdminMutation,
  useDeleteGigByAdminMutation,
  useGetJobsByAdminQuery,
  useMangeJobbyAdminMutation,
  useGetJobByIdAtAdminQuery,
  useDeleteJobByAdminMutation,
  useGetAllUserByAdminQuery,
  useGetuserDetailByAdminQuery,
  useUpdatePicByAdminMutation,
  useUpdateProfileByAdminMutation,
  useGetAllLawyersByAdminQuery,
  useGetLawyerDetailByAdminQuery,
  useDeletelaywerByAdminMutation,
  useSendVeificationReqeustMutation,
  useGetVerificationRequestsQuery,
  useGetMeBidsQuery,
  useVerifyRequestMutation,
  useGetVerificationReqeustQuery,
  useDeleteRequestMutation,
  useStopReceivingRuquestMutation,
  useDeleteJobMutation,
  useMeHiredJobsQuery,
  useAddRoleMutation,
  useRemoveRoleMutation,
  useDeleteUserByAdminMutation,
  useStatsQuery,
  useDeleteMeRolesMutation,
  useGetMeHiredJobsQuery,
  useAllowReviewQuery,
  useCompleteTheJobMutation,
  useGetAllGigsOfUserQuery,
  useGetTopGigsQuery,
  useGetUserDataQuery,
  useSendMessageToSupportMutation,
  useGetSupportMessagesQuery,
  useUploadDocumentRelatedToJobMutation,
  useGetAllDocumentsRelatedToJobQuery,
  useDeleteDocumentRelatedToJobMutation,
  useCreateHiringMutation,
  useGetClientHiringsQuery,
  useGetLawyerHiringsQuery,
  useMarkHiringAsCompleteMutation,
  useGetHiringPostQuery,
} = userApi;
