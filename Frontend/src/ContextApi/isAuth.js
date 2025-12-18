import React, { useEffect, createContext, useContext, useState } from 'react';
import api from '../axios/axios';

const appContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/isAuth");
        setIsAuth(true);
        setRole(response.data.role);
      } catch (e) {
        setIsAuth(false);
        setRole("");
      }
    };

    checkAuth();
  }, []); // run only once

  const value = { isAuth, setIsAuth, role, setRole };

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
};

export default AuthProvider;
