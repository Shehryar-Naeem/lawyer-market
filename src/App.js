import { Suspense, lazy, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetUserQuery } from "./redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import UserProfile from "./pages/UserProfile";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";
import CardSkeletonLoading from "./components/skeletonLoading/cardLoading";
import LawyerDetail from "./components/Lawyer/details";
import Gigs from "./components/Lawyer/gigs";
import Bid from "./components/Lawyer/bids";
import Chat from "./components/Lawyer/chats";
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

  return loading ? (
    <>
      <p>loading</p>
    </>
  ) : (
    <>
      <Router>
        <Suspense>
          <div className="h-full">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectRoute
                    redirect="/user-profile"
                    isAuthenticated={!isAuthenticated}
                  >
                    <Register />
                  </ProtectRoute>
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/password/forgot" element={<ForgetPassword />} />
              <Route path="/user/resetpassword/:token" element={<ResetPassword />} />
              <Route
                exact
                path="/user-profile"
                element={
                  <ProtectRoute isAuthenticated={isAuthenticated}>
                    <UserProfile />
                  </ProtectRoute>
                }
              >
                <Route exact path="" element={<LawyerDetail />} />
                <Route exact path="gigs" element={<Gigs />} />
                <Route exact path="bids" element={<Bid />} />
                <Route exact path="chat" element={<Chat />} />
              </Route>
              <Route
                exact
                path="/settings/profile"
                element={
                  <ProtectRoute isAuthenticated={isAuthenticated}>
                    <UserSetting />
                  </ProtectRoute>
                }
              >
                <Route exact path="" element={<EditProfile />} />
                <Route exact path="password" element={<PasswordTab />} />
                <Route exact path="accounts" element={<Accounts />} />
              </Route>


            

              <Route path="/gig/:id" element={<GigDetail />} />

              {/* <Route path="/settings/profile" element={<UserSetting />} /> */}
              <Route path="/gigs" element={<GetAllGigs />} />
              <Route
                path="/lawyer-gig/step1"
                element={
                  <ProtectRoute
                    isAuthenticated={isAuthenticated}
                    isLawyer={true}
                  >
                    <GigStepOne />
                  </ProtectRoute>
                }
              />
              <Route
                path="/lawyer-gig/step2"
                element={
                  <ProtectRoute
                    isAuthenticated={isAuthenticated}
                    isLawyer={true}
                  >
                    <GigStepTwo />
                  </ProtectRoute>
                }
              />
              <Route
                path="/lawyer-gig/step3"
                element={
                  <ProtectRoute
                    isAuthenticated={isAuthenticated}
                    isLawyer={true}
                  >
                    <GigStepThree />
                  </ProtectRoute>
                }
              />
            </Routes>
          </div>
        </Suspense>
        <Toaster position="top-right" />
      </Router>
    </>
  );
}

export default App;
