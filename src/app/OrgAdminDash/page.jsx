"use client";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
const { Title } = Typography;
export default function OrgAdminDash() {
  const {
    boomed,
    orgValidity,
    setOrgValidity,
    handleBoom,
    handleBoomout,
    handleOrgValidify,
  } = useOrgContext();
  const router = useRouter();
  return (
    <>
      <Title>Org Admin Dashboard</Title>
      <Button type="primary" onClick={() => router.push("/OrgAdminLogin")}>
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
        }}
        icon={<LogoutOutlined />}
        onClick={handleBoomout}
      >
        Boom Out
      </Button>
    </>
  );
}
