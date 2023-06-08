"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNiamContext } from "../global/contexts/NiamContext";
import { useOrgContext } from "../global/contexts/OrgContext";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

export default function Logout() {
  const router = useRouter();

  const { handleSignout } = useNiamContext();
  const { handleBoomout } = useOrgContext();

  const handleLogout = () => {
    handleSignout();
    handleBoomout();
  };

  return (
    <Button
      type="primary"
      size="large"
      style={{
        background: "#F44336",
        color: "white",
        fontWeight: 500,
        padding: "10px 30px",
        margin: "0 0",
        lineHeight: "1.1em",
        position: "fixed",
        top: "20px",
        right: "40px",
      }}
      icon={<LogoutOutlined />}
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
}
