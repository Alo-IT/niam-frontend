"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const OrgContext = createContext();

export const OrgAuthProvider = ({ children }) => {
  const [boomed, setBoomed] = useState(false);
  const [orgValidity, setOrgValidity] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only on the client-side
      const orgValidityStatus = JSON.parse(localStorage.getItem("orgValidity"));
      const boomedStatus = JSON.parse(localStorage.getItem("boomed"));

      if (orgValidityStatus === null || orgValidityStatus === false) {
        localStorage.setItem("orgValidity", false);
        setOrgValidity(false);
      } else if (orgValidityStatus === true) {
        // setOrgValidity(true);
        localStorage.setItem("orgValidity", true);
        handleOrgValidify();
      } else {
        console.log("Status (Org): ", orgValidity);
      }

      if (boomedStatus === null || boomedStatus === false) {
        localStorage.setItem("boomed", false);
        setBoomed(false);
      } else if (boomedStatus === true) {
        localStorage.setItem("boomed", true);
        // setBoomed(true);
        handleBoom();
      } else {
        console.log("Status (Boom): ", boomed);
      }
    }
  }, []);

  const handleOrgValidify = () => {
    setOrgValidity(true);
    localStorage.setItem("orgValidity", true);
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
    router.push("/OrgAdminLogin");
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
