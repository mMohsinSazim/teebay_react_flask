import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRouteForAuth = ({ children, user }) => {
  if (user !== null) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRouteForAuth;
