import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const user = null;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
