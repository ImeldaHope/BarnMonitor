import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Sidebar from "./Sidebar";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return (
    <>
      <div className="fixed top-0 left-0 ">
          <Sidebar />
      </div>
      <Outlet />
    </>
  
);
};

export default PrivateRoute;