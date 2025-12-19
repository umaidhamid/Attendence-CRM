import React from "react";
import Verify from "./pages/Verify";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import SetPassword from "./pages/setPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./ContextApi/isAuth.js";
import MainDashboard from "./pages/Dashboard/MainDashBoard.jsx";
const App = () => {
  const { role, isAuth } = useAppContext();
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        // pauseOnHover
        draggable
        theme="dark"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/set-password" element={<Verify />} />
        <Route path="/dashboard" element={<MainDashboard/>}/>
      </Routes>
    </div>
  );
};

export default App;
