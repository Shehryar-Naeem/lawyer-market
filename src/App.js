import { Suspense, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useGetUserQuery } from "./redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import UserProfile from "./pages/UserProfile";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";
import LawyerDetail from "./components/Lawyer/details";
import Gigs from "./components/Lawyer/gigs";
import Bid from "./components/Lawyer/bids";
import Chat from "./components/chatComp/chats";
import Header from "./components/Layout/header";
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
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
              path: "chat",
              element: <Chat />,
              children: [
                { path: "", element: <ChatHome /> },
                {
                  path: ":id",
                  element: <UserChat />,
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
            { path: "gigs", element: <Gigs /> },
            { path: "chat", element: <Chat /> },
          ],
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
      <p>Loading...</p>
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
      <Suspense fallback={<div>Loading app...</div>}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="h-full">
            <RouterProvider router={router}></RouterProvider>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default App;
