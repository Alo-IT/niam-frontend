"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [localLoggedIn, setLocalLoggedIn] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const loggedInStatus = JSON.parse(localStorage.getItem("loggedIn"));
    const orgValidityStatus = JSON.parse(
      localStorage.getItem("isAuthenticated")
    );
    if (orgValidityStatus == null || orgValidityStatus == false) {
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
    }

    if (isAuthenticated) {
      // console.log("loggedInStatus: ", loggedInStatus);
      if (loggedInStatus == null || loggedInStatus == false) {
        setLoggedIn(false);
        localStorage.setItem("loggedIn", false);
        // console.log("Login status 1: ", loggedIn);
      } else if (loggedInStatus == true) {
        setLoggedIn(true);
        setIsAuthenticated(true);
        localStorage.setItem("loggedIn", true);
        // console.log("Login status 2: ", loggedIn);
      }
    } else {
      router.push("/OrgValidity");
    }
  }, [setLoggedIn]);

  const handleOrgValidify = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    // setLocalLoggedIn(true);
    localStorage.setItem("loggedIn", true);

    console.log("Login status 3: ", loggedIn);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", false);

    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        localLoggedIn,
        setLocalLoggedIn,
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
