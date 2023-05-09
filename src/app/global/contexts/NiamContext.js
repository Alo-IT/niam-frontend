"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const NiamContext = createContext();

export const NiamAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signedIn, setsignedIn] = useState(false);

  const router = useRouter();
  useEffect(() => {
    // const orgValidityStatus = JSON.parse(
    //   localStorage.getItem("isAuthenticated")
    // );
    // if (orgValidityStatus == null || orgValidityStatus == false) {
    //   setIsAuthenticated(false);
    //   localStorage.setItem("isAuthenticated", false);
    // } else {
    //   setIsAuthenticated(true);
    //   localStorage.setItem("isAuthenticated", true);
    // }

    const signedInStatus = JSON.parse(localStorage.getItem("signedIn"));
    if (signedInStatus == null || signedInStatus == false) {
      setsignedIn(false);
      localStorage.setItem("signedIn", false);
    } else {
      setsignedIn(true);
      localStorage.setItem("signedIn", true);
    }
  }, [setsignedIn]);

  const handleOrgValidify = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
  };

  const handleSignin = () => {
    setsignedIn(true);
    localStorage.setItem("signedIn", true);
  };

  const handleSignout = () => {
    setsignedIn(false);
    localStorage.setItem("signedIn", false);
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", false);
  };

  return (
    <NiamContext.Provider
      value={{
        signedIn,
        isAuthenticated,
        setIsAuthenticated,
        handleSignin,
        handleSignout,
        handleOrgValidify,
      }}
    >
      {children}
    </NiamContext.Provider>
  );
};

export const useNiamContext = () => useContext(NiamContext);
