"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
import urls from "../urls";
import axios from "axios";
import Title from "antd/es/typography/Title";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function Component() {
  const router = useRouter();
  const { boomed, orgValidity, handleOrgValidify, handleBoom } =
    useOrgContext();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false); // New state to control the visibility of the login form
  const [errorMessage, setErrorMessage] = useState("");

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
      router.push("/OpsManDash");
    }
  }, [boomed, router]);

  return (
    <>
      <Title>Ops Manager Login</Title>
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
            <Button type="primary" onClick={onEmailSubmit}>
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
