"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import urls from "../urls";
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
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import signinbg from "../../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;

const { Header, Footer, Content } = Layout;

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
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);

  const onEmailSubmit = async () => {
    console.log("Performing org search...");
    // Extract domain from email
    const domain = email.substring(email.lastIndexOf("@") + 1);

    try {
      const response = await axios.post(
        urls.baseURL + "/niamadmin/searchorg",
        { orgDomain: domain },
        {
          withCredentials: true,
        }
      );
      console.log("Org valid: ", response.data);
      setSuccessMessage("Organization valid!");
      handleOrgValidify();
      setShowLoginForm(true);
    } catch (error) {
      console.log(error.response.data);
      setSuccessMessage("Organization invalid! Please try the right one.");
    }
  };

  const onLoginFormSubmit = async (values) => {
    console.log("Sending login data....");
    const formData = {
      email,
      password: values.password,
    };
    try {
      const response = await axios.post(
        urls.baseURL + "/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      handleBoom();
      router.push("/OrgAdminDash");
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleEmailChange = () => {
    setEmail("");
    setShowLoginForm(false);
  };

  useEffect(() => {
    if (boomed) {
      router.push("/OrgAdminDash");
    }
  }, [boomed, router]);

  return (
    <>
      <Title>Org Admin Login</Title>
      {!showLoginForm ? (
        <>
          <Form
            layout="vertical"
            style={{
              width: "25vw",
            }}
          >
            <Form.Item label="Email" required>
              <Input
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Button htmlType="submit" type="primary" onClick={onEmailSubmit}>
              Continue
            </Button>
          </Form>
        </>
      ) : (
        <Form
          layout="vertical"
          onFinish={onLoginFormSubmit}
          onFinishFailed={onFinishFailed}
          style={{
            width: "25vw",
          }}
        >
          <Form.Item
            className="username"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            initialValue={email}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Input placeholder={email} disabled />
              <Button type="link" onClick={handleEmailChange}>
                Change
              </Button>
            </div>
          </Form.Item>

          <Form.Item
            className="username"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            {/* <Input placeholder="Password" /> */}
            <Input.Password
              placeholder="Input Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
      {successMessage && (
        <div>
          <Title level={4} style={{ color: "green" }}>
            {successMessage}
          </Title>
        </div>
      )}
    </>
  );
}
