"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { useAuthContext } from "../global/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";

import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";

import Paragraph from "antd/lib/typography/Paragraph";

const { Title, Text } = Typography;

const onChange = (e) => console.log(`radio checked:${e.target.value}`);

const count = [
  {
    title: "Granted Access",
    number: 32,
  },
  {
    title: "Access Approved",
    number: 26,
  },
  {
    // today: "Today’s Sales",
    // title: "$53,000",
    // persent: "+30%",
    // icon: dollor,
    // bnb: "bnb2",
    title: "Pending Approval",
    number: 11,
  },
  {
    title: "Waiting Approval",
    number: 19,
  },
];

export default function Dashboard() {
  const [reverse, setReverse] = useState(false);
  const {
    loggedIn,
    setLoggedIn,
    localLoggedIn,
    setLocalLoggedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleLogin,
    handleLogout,
    handleOrgValidify,
  } = useAuthContext();

  const router = useRouter();
  // If user is not signed in, redirect to sign in page
  useEffect(() => {
    if (!loggedIn) {
      router.push("/OrgValidity");
      // console.log("Logged in status coming from Admin Dashboard: ", loggedIn);
      // return null;
    }
  }, [loggedIn, router]);

  return (
    <>
      {console.log("Login status Dashboard onload: ", loggedIn)}
      <h1>This is Organization Admin Dashboard</h1>
      <div>
        <Button
          type="primary"
          size="large"
          style={{ background: "#F44336", color: "white", fontWeight: 500 }}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {count.map((c, index) => (
          <Col
            key={index}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>{c.title}</span>
                    <Title level={3}>{c.number}</Title>
                  </Col>
                  {/* <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col> */}
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
