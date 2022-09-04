import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoutePage = ({ user, children }) => {
  console.log("Protected Route");
  if (user == null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutePage;
