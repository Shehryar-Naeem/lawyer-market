import React from "react";
import { Suspense, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useGetUserQuery } from "./redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import UserProfile from "./pages/UserProfile";
import AOS from "aos";
import "aos/dist/aos.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";
import LawyerDetail from "./components/Lawyer/details";
import Gigs from "./components/Lawyer/gigs";
import Bid from "./components/Lawyer/bids";
import Chat from "./components/chatComp/chats";
// import Header from "./Layout/header";
import UserSetting from "./pages/userSetting";
import ProtectRoute from "./routes/ProtectedRoute";
import GigStepOne from "./pages/createGig/step1";
import GigStepTwo from "./pages/createGig/step2";
import GigStepThree from "./pages/createGig/step3";
import EditProfile from "./components/Lawyer/editProfile";
import PasswordTab from "./components/passwordTab";
import Accounts from "./components/Accounts";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";
import GetAllGigs from "./pages/getAllgigs";
import GigDetail from "./pages/gigDetail";
import ClientProfile from "./pages/clientProfile";
import ClientPosts from "./components/client";
import ChatHome from "./components/chatComp/subChat/chatHome";
import UserChat from "./components/chatComp/subChat/chatby_id";
import { Toaster } from "react-hot-toast";
import CreateLawyerAccount from "./pages/createLaywerAccount";
import CreateLawyerComp from "./components/createLawyerComp";
import EditGigStep1 from "./components/editGig/editGigDetailStep1";
import EditGigStep2 from "./components/editGig/editGigStep2";
import EditGigStep3 from "./components/editGig/editGigStep3";
import ClientChat from "./components/clientchatComp/chats";
import ClientChatHome from "./components/clientchatComp/subChat/chatHome";
import ClientChatById from "./components/clientchatComp/subChat/chatby_id";
import CreateClientPost from "./pages/cleintPost";
import AllPosts from "./pages/allposts";
import SendProposal from "./pages/sendProposal";
import PostDetail from "./pages/postDetail";
import Home from "./pages/home";
import LandingLayout from "./Layout/LandingLayout";
import AdminLayout from "./Layout/adminLayout";
import AdminHomePage from "./pages/dashboard/homePage";
import ClientPage from "./pages/dashboard/AllUsers";
import LawyerPage from "./pages/dashboard/lawyerPage";
import GigsPage from "./pages/dashboard/GigsPage";
import JobPage from "./pages/dashboard/JobPage";
import UpdateGigByAdmin from "./pages/dashboard/updateGig";
import UpdateJobByAdmin from "./pages/dashboard/updateJob";
import AllUsers from "./pages/dashboard/AllUsers";
import UserDetailByAdmin from "./pages/dashboard/userDetail";
import GetAllLawyer from "./pages/dashboard/allLawyers";
import UpdateLawyer from "./pages/dashboard/updateLawyer";
import VerificationRequest from "./pages/dashboard/verification-requests";
import ManageVerificationRequest from "./pages/dashboard/mangeVerificationRequest";
import Hired from "./components/hired";
import EditJob from "./pages/editJob/idnex";
import ActiveJobs from "./pages/activeJobs";
import InitialLoader from "./components/initialLoader"
import UserInfo from "./pages/userInfo";

const Register = lazy(() => import("./pages/loginSignUP/index"));
const Profile = lazy(() => import("./pages/profile/index"));

function App() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();
  useEffect(() => {
    // Check if the query is still loading
    if (isLoading) {
      return;
    }
    // Check for success or error
    if (isSuccess && !localStorage.getItem("user")) {
      dispatch(userExist(data.user));

      // toast.success(data?.message);
    }
    if (isError) {
      dispatch(userNotExist());
      // toast.error(error.data?.message);
    }
  }, [isLoading, isSuccess, isError, data, error, dispatch]);

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout isFooter={true} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          path: "/join-now",
          element: (
            // <ProtectRoute
            //   redirect="/lawyer-profile"
            //   isAuthenticated={!isAuthenticated}
            // >
            <Register />
            // </ProtectRoute>
          ),
        },
        {
          path: "/password/forgot",
          element: <ForgetPassword />,
        },
        {
          path: "/user/resetpassword/:token",
          element: <ResetPassword />,
        },
        {
          path: "/lawyer-profile",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isLawyer={true}>
              <UserProfile />
            </ProtectRoute>
          ),
          children: [
            { path: "", element: <LawyerDetail /> },
            { path: "gigs", element: <Gigs /> },
            { path: "bids", element: <Bid /> },
            {
              path: "active-jobs",
              element: <ActiveJobs />,
            },
            {
              path: "chat",
              element: <ClientChat />,
              children: [
                { path: "", element: <ClientChatHome /> },
                {
                  path: ":id",
                  element: <ClientChatById />,
                },
              ],
            },
          ],
        },
        {
          path: "/client-profile",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isclient={true}>
              <ClientProfile />
            </ProtectRoute>
          ),
          children: [
            { path: "", element: <ClientPosts /> },
            { path: "hired", element: <Hired /> },
            {
              path: "chat",
              element: <ClientChat />,
              children: [
                { path: "", element: <ClientChatHome /> },
                {
                  path: ":id",
                  element: <ClientChatById />,
                },
              ],
            },
          ],
        },
        {
          path:"/user/:id",
          element:<UserInfo />
        },
        {
          path: "/client-profile/create-lawyer-account",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isclient={true}>
              <CreateLawyerAccount />
            </ProtectRoute>
          ),
          children: [{ path: "", element: <CreateLawyerComp /> }],
        },
        {
          path: "/settings/profile",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <UserSetting />
            </ProtectRoute>
          ),
          children: [
            { path: "", element: <EditProfile /> },
            { path: "password", element: <PasswordTab /> },
            { path: "accounts", element: <Accounts /> },
          ],
        },
        {
          path: "/settings/client-profile",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <UserSetting client={true} />
            </ProtectRoute>
          ),
          children: [
            { path: "", element: <PasswordTab /> },
            { path: "accounts", element: <Accounts /> },
          ],
        },
        {
          path: "/gig/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <GigDetail />
            </ProtectRoute>
          ),
        },
        {
          path: "/edit-gig/step1/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isLawyer={true}>
              <EditGigStep1 />
            </ProtectRoute>
          ),
        },
        {
          path: "/edit-gig/step2",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isLawyer={true}>
              <EditGigStep2 />
            </ProtectRoute>
          ),
        },
        {
          path: "/edit-gig/step3",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isLawyer={true}>
              <EditGigStep3 />
            </ProtectRoute>
          ),
        },
        { path: "/gigs", element: <GetAllGigs /> },
        { path: "/jobs", element: <AllPosts /> },
        {
          path: "/lawyer-gig/step1",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isLawyer={true}>
              <GigStepOne />
            </ProtectRoute>
          ),
        },
        {
          path: "/lawyer-gig/step2",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isLawyer={true}>
              <GigStepTwo />
            </ProtectRoute>
          ),
        },
        {
          path: "/lawyer-gig/step3",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isLawyer={true}>
              <GigStepThree />
            </ProtectRoute>
          ),
        },
        {
          path: "/client/create-job",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isclient={true}>
              <CreateClientPost />
            </ProtectRoute>
          ),
        },
        {
          path: "/edit-job/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isclient={true}>
              <EditJob />
            </ProtectRoute>
          ),
        },
        {
          path: "/lawyer/send-proposal/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isLawyer={true}>
              <SendProposal />
            </ProtectRoute>
          ),
        },
        {
          path: "/post-detail/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <PostDetail />
            </ProtectRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "/dashboard/admin/home",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <AdminHomePage />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/users/all",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <AllUsers />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/users/lawyers",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <LawyerPage />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/gigs",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <GigsPage />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/gigs/edit/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <UpdateGigByAdmin />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/jobs",
          element: <JobPage />,
        },
        {
          path: "/dashboard/admin/jobs/edit/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <UpdateJobByAdmin />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/users/user/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <UserDetailByAdmin />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/users/lawyer/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <UpdateLawyer />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/verification-requests",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <VerificationRequest />
            </ProtectRoute>
          ),
        },
        {
          path: "/dashboard/admin/verification-requests/:id",
          element: (
            <ProtectRoute isAuthenticated={isAuthenticated} isAdmin={true}>
              <ManageVerificationRequest />
            </ProtectRoute>
          ),
        },
      ],
    },
  ]);

  // return loading ? (
  //   <>
  //     <p>loading</p>
  //   </>
  // ) : (
  //   <>
  //     <Router>
  //       <Suspense>
  //         <div className="h-full">
  //           <Header />
  //           <Routes>
  //             <Route
  //               path="/"
  //               element={
  //                 <ProtectRoute
  //                   redirect="/lawyer-profile"
  //                   isAuthenticated={!isAuthenticated}
  //                 >
  //                   <Register />
  //                 </ProtectRoute>
  //               }
  //             />
  //             <Route path="/profile" element={<Profile />} />
  //             <Route path="/password/forgot" element={<ForgetPassword />} />
  //             <Route
  //               path="/user/resetpassword/:token"
  //               element={<ResetPassword />}
  //             />

  //             {/* lawyer profile route */}
  //             <Route
  //               exact
  //               path="/lawyer-profile"
  //               element={
  //                 <ProtectRoute isAuthenticated={isAuthenticated}>
  //                   <UserProfile />
  //                 </ProtectRoute>
  //               }
  //             >
  //               <Route exact path="" element={<LawyerDetail />} />
  //               <Route exact path="gigs" element={<Gigs />} />
  //               <Route exact path="bids" element={<Bid />} />
  //               <Route exact path="chat" element={<Chat />} />
  //             </Route>
  //             {/* lawyer profile route */}

  //             {/* client profile route */}
  //             <Route
  //               exact
  //               path="/client-profile"
  //               element={
  //                 <ProtectRoute isAuthenticated={isAuthenticated}>
  //                   <ClientProfile />
  //                 </ProtectRoute>
  //               }
  //             >
  //               <Route exact path="" element={<ClientPosts />} />
  //               <Route exact path="gigs" element={<Gigs />} />

  //               <Route exact path="chat" element={<Chat />} />
  //             </Route>
  //             {/* client profile route */}

  //             {/* lawyer profile setting account */}
  //             <Route
  //               exact
  //               path="/settings/profile"
  //               element={
  //                 <ProtectRoute isAuthenticated={isAuthenticated}>
  //                   <UserSetting />
  //                 </ProtectRoute>
  //               }
  //             >
  //               <Route exact path="" element={<EditProfile />} />
  //               <Route exact path="password" element={<PasswordTab />} />
  //               <Route exact path="accounts" element={<Accounts />} />
  //             </Route>
  //             {/* lawyer profile setting account */}

  //             <Route path="/gig/:id" element={<GigDetail />} />

  //             {/* <Route path="/settings/profile" element={<UserSetting />} /> */}
  //             <Route path="/gigs" element={<GetAllGigs />} />
  //             <Route
  //               path="/lawyer-gig/step1"
  //               element={
  //                 <ProtectRoute
  //                   isAuthenticated={isAuthenticated}
  //                   isLawyer={true}
  //                 >
  //                   <GigStepOne />
  //                 </ProtectRoute>
  //               }
  //             />
  //             <Route
  //               path="/lawyer-gig/step2"
  //               element={
  //                 <ProtectRoute
  //                   isAuthenticated={isAuthenticated}
  //                   isLawyer={true}
  //                 >
  //                   <GigStepTwo />
  //                 </ProtectRoute>
  //               }
  //             />
  //             <Route
  //               path="/lawyer-gig/step3"
  //               element={
  //                 <ProtectRoute
  //                   isAuthenticated={isAuthenticated}
  //                   isLawyer={true}
  //                 >
  //                   <GigStepThree />
  //                 </ProtectRoute>
  //               }
  //             />
  //           </Routes>
  //         </div>
  //       </Suspense>
  //       <Toaster position="top-right" />
  //     </Router>

  //     <RouterProvider router={createBrowserRouter()} />
  //   </>
  // );
  return loading ? (
    <>
      <InitialLoader />
    </>
  ) : (
    <>
      {/* <RouterProvider router={router}>
        <Suspense>
          <div className="h-full">
            <Header />
            <Toaster position="top-right" />
          </div>
        </Suspense>
      </RouterProvider> */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense> */}
      <Suspense fallback={<InitialLoader />}>
        {loading ? (
          <InitialLoader />
        ) : (
          <div className="h-full relative">
            <RouterProvider router={router}></RouterProvider>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default App;
