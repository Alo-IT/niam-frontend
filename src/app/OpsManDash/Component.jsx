import { Form, Table, Button } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import AppList from "../OrgAdminDash/AppList";
import { LogoutOutlined } from "@ant-design/icons";
import { useOrgContext } from "../global/contexts/OrgContext";
import SystemList from "./SystemList";
import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../urls";

export default function Component() {
  const router = useRouter();
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [systems, setSystems] = useState([]);
  const [apps, setApps] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Systems
        const systemsResponse = await axios.get(
          urls.baseURL + "/system/system",
          {
            withCredentials: true,
          }
        );
        setSystems(systemsResponse.data.data || []);
        localStorage.setItem(
          "systems",
          JSON.stringify(systemsResponse.data.data || [])
        );
        console.log("Systems loaded (1): ", systemsResponse.data.data);

        // Fetch Apps
        const appsResponse = await axios.get(urls.baseURL + "/app/app", {
          withCredentials: true,
        });
        setApps(appsResponse.data.data || []);
        localStorage.setItem(
          "apps",
          JSON.stringify(appsResponse.data.data || [])
        );
        console.log("Apps loaded (1): ", appsResponse.data.data);

        // Fetch Users
        const usersResponse = await axios.get(
          urls.baseURL + "/organization/getemployees",
          {
            withCredentials: true,
          }
        );
        setUsers(usersResponse.data.data || []);
        console.log("Users loaded: ", usersResponse.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchData();
  }, []);

  const columns = [
    {
      title: "System Name",
      dataIndex: "system_Name",
      key: "system_Name",
    },
    {
      title: "Parent App",
      dataIndex: "parent_App",
      key: "parent_App",
      render: (parentAppId) => {
        const parentApp = apps.find((app) => app._id === parentAppId);
        return parentApp ? parentApp.app_Name : "";
      },
    },
    {
      title: "System Admins",
      dataIndex: "system_Admin",
      key: "system_Admin",
      render: (systemAdminIds) => {
        const systemAdmins = systemAdminIds.map((adminId) => {
          const systemAdmin = users.find((user) => user._id === adminId);
          return systemAdmin
            ? systemAdmin.firstName + " " + systemAdmin.lastName
            : "";
        });
        return systemAdmins.join(", ");
      },
    },
  ];

  return (
    <>
      <Title>Ops Manager Dashboard</Title>

      <SystemList />

      <Button type="primary" onClick={() => router.push("/AddSystem")}>
        Add System
      </Button>
      <Button
        type="primary"
        onClick={() => router.push("/AddSysRole")}
        style={{
          marginLeft: 40,
        }}
      >
        Add System Role
      </Button>
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
