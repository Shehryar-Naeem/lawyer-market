import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, isAuthenticated, redirect = "/" }) => {
  console.log(isAuthenticated, redirect);
  if (!isAuthenticated) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default ProtectRoute;
