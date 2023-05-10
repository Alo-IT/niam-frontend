"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();
  useEffect(() => {
    // Check if user is authenticated
    const orgValidityStatus = JSON.parse(
      localStorage.getItem("isAuthenticated")
    );
    if (orgValidityStatus == null || orgValidityStatus == false) {
      // If user is not authenticated, redirect to OrgValidity page
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
    } else {
      // If user is logged in, set the logged in state to true
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", true);
    }

    // If user is authenticated, check if they are logged in
    const loggedInStatus = JSON.parse(localStorage.getItem("loggedIn"));
    if (loggedInStatus == null || loggedInStatus == false) {
      // If user is not logged in, set the logged in state to false
      setLoggedIn(false);
      localStorage.setItem("loggedIn", false);
    } else {
      // If user is logged in, set the logged in state to true
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
    }
  }, [setIsAuthenticated, setLoggedIn]);

  // useEffect  (()=>{

  const handleOrgValidify = () => {
    // Set user as authenticated
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
  };

  const handleLogin = () => {
    // Set logged in state to true and log the updated value
    setLoggedIn(true);
    localStorage.setItem("loggedIn", true);
  };

  const handleLogout = () => {
    // Set logged in state and authentication status to false
    setLoggedIn(false);
    localStorage.setItem("loggedIn", false);
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", false);
  };
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        isAuthenticated,
        setIsAuthenticated,
        handleLogin,
        handleLogout,
        handleOrgValidify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
