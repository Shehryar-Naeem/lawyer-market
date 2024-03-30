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
    if (isSuccess) {
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

              <Route path="/settings" element={<UserSetting />} />
              <Route path="/gigs" element={<CardSkeletonLoading />} />
            </Routes>
          </div>
        </Suspense>
        <Toaster position="top-right" />
      </Router>
    </>
  );
}

export default App;
