"use client";
import { Form, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useOrgContext } from "../global/contexts/OrgContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../urls";

export default function SystemList() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const [systems, setSystems] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const systemsResponse = await axios.get(urls.baseURL + "/system/system", {
        withCredentials: true,
      });
      const systemsData = systemsResponse.data.data || [];
      console.log("Systems loaded:", systemsData);

      setSystems(systemsData);

      const usersResponse = await axios.get(
        urls.baseURL + "/organization/getemployees",
        {
          withCredentials: true,
        }
      );
      const usersData = usersResponse.data.data || [];
      console.log("Users loaded:", usersData);

      setUsers(usersData);

      const tableData = await getTableData(systemsData, usersData);
      setTableData(tableData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getTableData = async (systemsData, usersData) => {
    try {
      const processedData = systemsData.map((system) => {
        const parentAppName = system.parent_App;
        const systemAdmins = system.system_Admin.map((adminId) => {
          const admin = usersData.find((user) => user.id === adminId);
          return admin ? admin.name : "No Admin";
        });

        return {
          ...system,
          parent_App: parentAppName,
          system_Admin: systemAdmins.join(", "),
        };
      });

      return processedData;
    } catch (error) {
      console.log(error.response.data);
      return [];
    }
  };

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
    },
    {
      title: "System Admin",
      dataIndex: "system_Admin",
      key: "system_Admin",
      render: (text, record) => (
        <>
          {record.system_Admin.map((admin) => (
            <div key={admin}>{admin}</div>
          ))}
        </>
      ),
    },
  ];

  return (
    <>
      {/* <Title>System List</Title> */}
      {console.log("Apps loaded (2): ", systems)}
      {console.log("Users loaded (3): ", users)}
      <Title level={4}>System List</Title>
      <Table columns={columns} dataSource={tableData} />
    </>
  );
}
