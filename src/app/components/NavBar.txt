"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../global/contexts/AuthContext.js";
import AuthorizedNavbar from "./Navbars/AuthorizedNavbar.jsx";
import PublicNavbar from "./Navbars/PublicNavbar.jsx";

export default function NavBar() {
  const { authState, setAuthState } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(authState.isLoggedIn);
  }, [authState.isLoggedIn]);

  const handleLogout = () => {
    setAuthState({ isLoggedIn: false, userDetails: null });
    localStorage.clear();
    setLoggedIn(false);
  };

  return <>{loggedIn ? <AuthorizedNavbar /> : <PublicNavbar />}</>;
}
