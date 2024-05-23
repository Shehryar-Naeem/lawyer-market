import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({
  children,
  isAuthenticated,
  isLawyer,
  isclient,
  isAdmin,
  redirect = "/join-now",
}) => {
  const { user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (user) {
    const lawyerRole =
      isLawyer &&
      user &&
      user?.roles.some((role) => role?.roleType === "lawyer");
    const clientRole =
      isclient &&
      user &&
      user?.roles.some((role) => role?.roleType === "client");

    const adminRole =
      isAdmin && user && user?.roles.some((role) => role?.roleType === "admin");

    if (isLawyer === true && lawyerRole === false) {
      return <Navigate to={redirect} />;
    }
    if (isclient === true && clientRole === false) {
      alert("You are not a client");
      console.log("clientRole", clientRole);
      return <Navigate to={redirect} />;
    }
    if (isAdmin === true && adminRole === false) {
      return <Navigate to={redirect} />;
    }
  }

  return children ? children : <Outlet />;
};  

export default ProtectRoute;
