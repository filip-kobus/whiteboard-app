import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../utils/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
