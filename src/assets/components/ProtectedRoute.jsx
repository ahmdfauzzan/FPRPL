import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("userToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
