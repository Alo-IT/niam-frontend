import { Form, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useOrgContext } from "../global/contexts/OrgContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../urls";

export default function AppList() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const [apps, setApps] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const appsResponse = await axios.get(urls.baseURL + "/app/app", {
          withCredentials: true,
        });
        setApps(appsResponse.data.data || []);
        localStorage.setItem(
          "apps",
          JSON.stringify(appsResponse.data.data || [])
        );
        console.log("Apps loaded: ", appsResponse.data.data);

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
  }, [boomed, orgValidity]);

  const columns = [
    {
      title: "App Name",
      dataIndex: "app_Name",
      key: "app_Name",
    },
    {
      title: "App Owners",
      dataIndex: "app_Owner",
      key: "app_Owner",
      render: (appOwnerIds) => {
        const owners = appOwnerIds.map((ownerId) => {
          const user = users.find((user) => user._id === ownerId);
          return user ? user.firstName + " " + user.lastName : "";
        });
        return owners.join(", ");
      },
    },
    {
      title: "App Managers",
      dataIndex: "app_Manager",
      key: "app_Manager",
      render: (appManagerIds) => {
        const managers = appManagerIds.map((managerId) => {
          const user = users.find((user) => user._id === managerId);
          return user ? user.firstName + " " + user.lastName : "";
        });
        return managers.join(", ");
      },
    },
    {
      title: "Ops Managers",
      dataIndex: "ops_Manager",
      key: "ops_Manager",
      render: (opsManagerIds) => {
        const opsManagers = opsManagerIds.map((managerId) => {
          const user = users.find((user) => user._id === managerId);
          return user ? user.firstName + " " + user.lastName : "";
        });
        return opsManagers.join(", ");
      },
    },
  ];

  return (
    <>
      <Title level={4}>AppList</Title>
      <Table columns={columns} dataSource={apps} />
    </>
  );
}
