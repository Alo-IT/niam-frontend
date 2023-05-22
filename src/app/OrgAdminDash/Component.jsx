"use client";
import { LogoutOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
  Avatar,
  Table,
  Select,
} from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
const { Title } = Typography;
import urls from "../urls";

export default function Component() {
  const {
    boomed,
    setBoomed,
    orgValidity,
    setOrgValidity,
    handleBoom,
    handleBoomout,
    handleOrgValidify,
  } = useOrgContext();
  const router = useRouter();
  const [orgs, setOrgs] = useState({});

  useEffect(() => {
    if (!orgValidity) {
      console.log("Please validate yourself");
    } else if (!boomed) {
      console.log("Please validate yourself");
    }
  }, [orgValidity, boomed, router]);

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

  const [errorMessage, setErrorMessage] = useState("");

  return boomed ? (
    <>
      <Title>Org Admin Dashboard</Title>

      <Title level={4}>Please complete the org info</Title>
      <Form>
        <Form.Item label="Organization Name">
          {orgs[0]?.organizationName}
        </Form.Item>
        <Form.Item label="Organization Domain">{orgs[0]?.orgDomain}</Form.Item>
        <Form.Item label="Organization userTyre">{orgs[0]?.userTyre}</Form.Item>
        <Form.Item label="Organization Admins">
          {orgs[0]?.org_admin?.map((admin) => (
            <div key={admin.id}>{admin._id}</div>
          ))}
        </Form.Item>
      </Form>
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
      {/* {console.log("Ogr name: ", orgInfo[0].organizationName)} */}
    </>
  ) : (
    <Button
      type="secondary"
      htmlType="submit"
      style={{
        background: "#144336",
        color: "white",
        fontWeight: 500,
        padding: "10px 30px",
        margin: "0 0",
        lineHeight: "1.1em",
      }}
      onClick={() => router.push("/OrgLogin")}
    >
      Login
    </Button>
  );
}
