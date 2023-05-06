"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAuthContext } from "../global/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const {
    loggedIn,
    setLoggedIn,
    localLoggedIn,
    setLocalLoggedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleLogin,
    handleLogout,
    handleOrgValidify,
  } = useAuthContext();

  const router = useRouter();
  // If user is not signed in, redirect to sign in page
  useEffect(() => {
    if (!loggedIn) {
      router.push("/OrgValidity");
      // console.log("Logged in status coming from Admin Dashboard: ", loggedIn);
      // return null;
    }
  }, [loggedIn, router]);

  return (
    <>
      {console.log("Login status Dashboard onload: ", loggedIn)}
      <div>
        <Button
          type="primary"
          size="large"
          style={{ background: "#F44336", color: "white", fontWeight: 500 }}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
