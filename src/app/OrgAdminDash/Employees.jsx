import { useState, useEffect } from "react";
import { Table, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
import urls from "../urls";

const { Title } = Typography;

export default function Employees() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const [employees, setEmployees] = useState([]);
  const [apps, setApps] = useState([]);
  const router = useRouter();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // const appsResponse = await axios.get(urls.baseURL + "/app/app", {
        //   withCredentials: true,
        // });
        // setApps(appsResponse.data.data || []);
        // localStorage.setItem(
        //   "apps",
        //   JSON.stringify(appsResponse.data.data || [])
        // );
        // console.log("Apps loaded: ", appsResponse.data.data);

        const employeesResponse = await axios.get(
          urls.baseURL + "/organization/getemployees",
          {
            withCredentials: true,
          }
        );
        setEmployees(employeesResponse.data.data || []);
        console.log("Employees loaded: ", employeesResponse.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchData();
  }, [boomed, orgValidity]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Org Role",
      dataIndex: "org_role",
      key: "org_role",
    },
  ];

  return (
    <>
      <Title level={4}>Employee List</Title>
      <Table columns={columns} dataSource={employees} />
    </>
  );
}
