import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuthStore();

  // If the user is not an admin, show the alert and redirect
  if (!isAdmin()) {
    alert("Access denied: Only admin can access this page.");
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
