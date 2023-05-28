import { Form, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useOrgContext } from "../global/contexts/OrgContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../urls";

export default function Employees() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const [employees, setEmployees] = useState({});
  const [apps, setApps] = useState([]);
  const router = useRouter();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const employeesResponse = await axios.get(
          urls.baseURL + "/organization/getemployees",
          {
            withCredentials: true,
          }
        );
        setEmployees(employeesResponse.data.data || []);
        console.log("Employees loaded: ", employeesResponse.data.data);

        const appsResponse = await axios.get(urls.baseURL + "/app/app", {
          withCredentials: true,
        });
        setApps(appsResponse.data.data || []);
        console.log("Apps loaded: ", appsResponse.data.data);

        const tableData = await getTableData(); // Call the getTableData function to fetch and process the table data
        setTableData(tableData);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchData();
  }, [boomed, orgValidity]);

  // Function to fetch and process the table data
  const getTableData = async () => {
    try {
      const appsData = await axios.get(urls.baseURL + "/app/app", {
        withCredentials: true,
      });
      const apps = appsData.data.data || [];
      console.log("Apps loaded: ", appsData.data.data);

      const employeesData = await axios.get(
        urls.baseURL + "/organization/getemployees",
        {
          withCredentials: true,
        }
      );
      const employees = employeesData.data.data || [];
      console.log("Employees loaded: ", employeesData.data.data);

      const processedData = employees.map((employee) => {
        const appNames = employee.apps.map((appId) => {
          const app = apps.find((app) => app._id === appId);
          return app ? app.app_Name : "No Apps";
        });

        return {
          ...employee,
          apps: appNames.join(", "),
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Org Role",
      dataIndex: "org_role",
      key: "org_role",
    },
    {
      title: "Apps",
      dataIndex: "apps",
      key: "apps",
    },
  ];

  return (
    <>
      <Title level={4}>Employee List</Title>{" "}
      <Table columns={columns} dataSource={tableData} />
    </>
  );
}
