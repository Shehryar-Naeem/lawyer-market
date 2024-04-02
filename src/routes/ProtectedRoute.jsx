import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({
  children,
  isAuthenticated,
  isLawyer,
  isclient,
  redirect = "/",
}) => {
  const { user } = useSelector((state) => state.auth);
  const lawyerRole = user?.roles.some((role) => role?.roleType === "lawyer");
  const clientRole = user?.roles.some((role) => role?.roleType === "client");

  if (!isAuthenticated) return <Navigate to={redirect} />;
  if (isLawyer === true && !lawyerRole) return <Navigate to={redirect} />;
  if (isclient === true && !clientRole) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default ProtectRoute;
