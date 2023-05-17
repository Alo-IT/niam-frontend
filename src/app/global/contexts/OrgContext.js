"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const OrgContext = createContext();

export const OrgAuthProvider = ({ children }) => {
  const [boomed, setBoomed] = useState(false);
  const [orgValidity, setOrgValidity] = useState(false);
  const router = useRouter();

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
    router.push("/OrgAdminLogin");
  };

  const handleBoom = () => {
    setBoomed(true);
    localStorage.setItem("boomed", true);
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
        orgValidity,
        setOrgValidity,
        handleBoom,
        handleBoomout,
        handleOrgValidify,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};

export const useOrgContext = () => useContext(OrgContext);
