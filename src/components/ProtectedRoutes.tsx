import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { state } = useContext(AuthContext);
  return state.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
