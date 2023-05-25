"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";

export default function Component() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const router = useRouter();
  return (
    <>
      <Title level={4}>Add App</Title>
      <Form>
        <Input />
      </Form>

      <Button
        type="primary"
        style={{
          position: "fixed",
          top: "25px",
          right: "220px",
        }}
        onClick={() => router.push("/OrgAdminLogin")}
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
