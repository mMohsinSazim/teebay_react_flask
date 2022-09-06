import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoutePage = ({ user, children }) => {
  if (user == null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutePage;
