import { Form, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useOrgContext } from "../global/contexts/OrgContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../urls";

export default function OrgAdminList() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const [orgs, setOrgs] = useState({});
  const router = useRouter();
  useEffect(() => {
    async function fetchOrgs() {
      try {
        const response = await axios.get(
          urls.baseURL + "/organization/organization",
          {
            withCredentials: true,
          }
        );
        setOrgs(response.data.data || []);

        localStorage.setItem("orgs", JSON.stringify(response.data.data || []));
        console.log("Orgs loaded: ", response.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrgs();
  }, [boomed, orgValidity]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const data = orgs[0]?.org_admin?.map((admin) => ({
    key: admin.id,
    name: admin.firstName + " " + admin.lastName,
    email: admin.email,
  }));

  return (
    <>
      <Title level={4}>Org Admin List</Title>

      <Table
        columns={columns}
        dataSource={data}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
      />
    </>
  );
}
