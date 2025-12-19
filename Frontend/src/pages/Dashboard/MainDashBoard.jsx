
import React, { useContext } from "react";
import { appContext } from "../context/AuthProvider";

import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const MainDashboard = () => {
  const { isAuth, role } = useContext(appContext);

  if (!isAuth) {
    return <h2>You are not authenticated</h2>;
  }
  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default MainDashboard;
