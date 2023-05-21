"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import urls from "../urls";
import axios from "axios";
const { Title } = Typography;

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
  const [selectedOrg, setSelectedOrg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!boomed && !orgValidity) {
      console.log("Please validate your domain.");
      router.push("/OrgLogin");
    } else if (orgValidity && !boomed) {
      console.log("Going Org Admin Signin");
      router.push("/OrgAdminLogin");
    } else if (orgValidity && boomed) {
      console.log("Going Org Admin Dashboard");
      router.push("/OrgAdminDash");
    } else {
      console.log("What the hell!");
    }
  }, [setOrgValidity, setBoomed, router]);

  const onFinish = async (values) => {
    console.log("Sending data....");
    const formData = {
      orgDomain: values.orgDomain,
    };
    try {
      const response = await axios.post(
        urls.baseURL + "/niamadmin/searchorg",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Org valid: ", response.data);
      setSuccessMessage("Organization valid!");
      handleOrgValidify();
      router.push("/OrgAdminLogin");
    } catch (error) {
      console.log(error.response.data);
      setSuccessMessage("Organization invalid! Please try the right one.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Title>Org Validity Check</Title>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="Input Domain" name="orgDomain">
          <Input placeholder="google.com" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Validate Domain
          </Button>
        </Form.Item>
      </Form>
      {successMessage && (
        <div>
          <Title level={4} style={{ color: "red" }}>
            {successMessage}
          </Title>
        </div>
      )}
    </>
  );
}
