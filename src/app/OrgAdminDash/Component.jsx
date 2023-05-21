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
  const [isBoomed, setIsBoomed] = useState();

  //   useEffect(() => {
  //     if (!boomed && !orgValidity) {
  //       console.log("Please validate your domain.");
  //     } else if (orgValidity && !boomed) {
  //       console.log("Going Org Admin Signin");
  //       router.push("/OrgAdminLogin");
  //     } else if (orgValidity && boomed) {
  //       console.log("Welcome to Admin Dashboard");
  //         router.push("/OrgAdminDash");
  //     } else {
  //       console.log("What the hell!");
  //     }
  //   }, [setOrgValidity, setBoomed, router]);

  useEffect(() => {
    if (!boomed && !orgValidity) {
      console.log("Please validate your domain.");
    } else if (orgValidity && !boomed) {
      console.log("Going Org Admin Signin");
      router.push("/OrgAdminLogin");
    } else if (orgValidity && boomed) {
      console.log("Welcome to Admin Dashboard");
      router.push("/OrgAdminDash");
    } else {
      console.log("What the hell!");
    }
  }, [orgValidity, boomed, router]);

  const [errorMessage, setErrorMessage] = useState("");

  return boomed ? (
    <>
      <Title>Org Admin Dashboard</Title>
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
    </>
  ) : null;
}
