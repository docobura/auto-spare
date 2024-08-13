// src/components/Auth/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  const login = (token, userId) => {
    setAuthToken(token);
    setUserId(userId);
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setAuthToken(null);
    setUserId(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const existingToken = localStorage.getItem("authToken");
    const existingUserId = localStorage.getItem("userId");
    if (existingToken && existingUserId) {
      setAuthToken(existingToken);
      setUserId(existingUserId);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authToken, userId, login, logout, setAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
