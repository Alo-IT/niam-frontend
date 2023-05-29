import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import AppList from "../OrgAdminDash/AppList";
import { LogoutOutlined } from "@ant-design/icons";
import { useOrgContext } from "../global/contexts/OrgContext";
import SystemList from "./SystemList";

export default function Component() {
  const router = useRouter();
  const { boomed, orgValidity, handleBoomout } = useOrgContext();

  return (
    <>
      <Title>Ops Manager Dashboard</Title>
      <Button type="primary" onClick={() => router.push("/AddSystem")}>
        Add System
      </Button>
      {/* <AppList /> */}
      {/* <SystemList /> */}

      {/* Action Buttons */}
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
