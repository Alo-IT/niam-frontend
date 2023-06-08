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
  Tag,
  Tabs,
} from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
const { Title } = Typography;
const { TabPane } = Tabs;
import urls from "../urls";
import AppList from "./AppList";
import OrgAdminList from "./OrgAdminList";
import Employees from "./Employees";

export default function Component() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const router = useRouter();
  const [orgs, setOrgs] = useState({});
  const [activeTab, setActiveTab] = useState("create");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

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
      <Title>{orgs[0]?.organizationName} Admin Dashboard</Title>
      <Form
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Form.Item label="Subscription Type">
            <Tag
              color="geekblue"
              style={{
                fontSize: "1em",
                padding: "5px 20px",
              }}
            >
              <Title
                level={3}
                style={{
                  color: "green",
                  fontSize: "1em",
                  lineHeight: "0.7em",
                  fontWeight: 600,
                }}
              >
                {orgs[0]?.userTyre < 50000 ? "Premium" : "Free"}
              </Title>
            </Tag>
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Button
            type="primary"
            style={{
              background: "orange",
            }}
            onClick={() => router.push("/AddEmployee")}
          >
            Add Employee
          </Button>

          <Button
            type="primary"
            style={{
              background: "green",
              marginLeft: "20px",
            }}
            onClick={() => router.push("/AddApp")}
          >
            Add App
          </Button>
        </div>
      </Form>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="App List" key="applist">
          <AppList />
        </TabPane>
        <TabPane tab="Org Admin List" key="orgadmins">
          <OrgAdminList />
        </TabPane>
        <TabPane tab="Employee List" key="employees">
          <Employees />
        </TabPane>
      </Tabs>

      {/* Buttons */}

      {/* <Button
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
      </Button> */}
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
      onClick={() => router.push("/OrgAdminLogin")}
    >
      Login
    </Button>
  );
}
