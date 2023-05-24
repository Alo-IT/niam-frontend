"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Tabs } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOrgContext } from "../global/contexts/OrgContext";
import CreateEmployee from "./CreateEmployee";
import ImportEmployee from "./ImportEmployee";
const { TabPane } = Tabs;

export default function Component() {
  const { handleBoomout } = useOrgContext();
  const [activeTab, setActiveTab] = useState("create");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <h1>Please choose how you want to create employee</h1>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Create Employee" key="create">
          <CreateEmployee />
        </TabPane>
        <TabPane tab="Import Employee" key="import">
          <ImportEmployee />
        </TabPane>
      </Tabs>

      {/* Buttons */}
      <Button
        type="primary"
        style={{
          position: "fixed",
          top: "25px",
          right: "220px",
        }}
        onClick={() => router.push("/OrgAdminDash")}
      >
        Go Back
      </Button>
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
        onClick={handleBoomout}
      >
        Log Out
      </Button>
    </>
  );
}
