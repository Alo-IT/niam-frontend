"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const OrgContext = createContext();

export const OrgAuthProvider = ({ children }) => {
  const [boomed, setBoomed] = useState();
  const [orgValidity, setOrgValidity] = useState();
  const router = useRouter();

  // Check org validity
  useEffect(() => {
    const orgValidityStatus = JSON.parse(localStorage.getItem("orgValidity"));
    if (orgValidityStatus == null || orgValidityStatus == false) {
      setOrgValidity(false);
      localStorage.setItem("orgValidity", false);
    } else {
      setOrgValidity(true);
      localStorage.setItem("orgValidity", true);
    }
  }, [setOrgValidity]);

  // Check boomed status
  useEffect(() => {
    const boomedStatus = JSON.parse(localStorage.getItem("boomed"));
    if (boomedStatus == null || boomedStatus == false) {
      setBoomed(false);
      localStorage.setItem("boomed", false);
    } else {
      setBoomed(true);
      localStorage.setItem("boomed", true);
    }
  }, [setBoomed]);

  const handleOrgValidify = () => {
    setOrgValidity(true);
    localStorage.setItem("orgValidity", true);
    // router.push("/OrgAdminLogin");
  };

  const handleBoom = () => {
    setBoomed(true);
    localStorage.setItem("boomed", true);
    router.push("/OrgAdminDash");
  };

  const handleBoomout = () => {
    setBoomed(false);
    localStorage.setItem("boomed", false);
    setOrgValidity(false);
    localStorage.setItem("orgValidity", false);
    router.push("/OrgLogin");
  };

  return (
    <OrgContext.Provider
      value={{
        boomed,
        setBoomed,
        orgValidity,
        setOrgValidity,
        handleBoom,
        handleBoomout,
        handleOrgValidify,
      }}
    >
      {children}
      {console.log("Context Status (Boomed): ", boomed)}
      {console.log("Context Status (Org validity): ", orgValidity)}
    </OrgContext.Provider>
  );
};

export const useOrgContext = () => useContext(OrgContext);
