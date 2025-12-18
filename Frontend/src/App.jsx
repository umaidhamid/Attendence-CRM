import React from "react";
import Verify from "./pages/Verify";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import SetPassword from "./pages/setPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
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
      {/* <Link to="/login">Login Page</Link>
      <br />
      <Link to="/verify">Verify Page</Link> */}
      <Routes>
        {/* <Route path="/" element={<SetPassword />} /> */}
        {/* <Route path="/verify" element={<Verify />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="set-password" element={<Verify />} />
      </Routes>
    </div>
  );
};

export default App;
