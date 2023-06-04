"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import urls from "../urls";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Content } = Layout;

export default function Component() {
  const { boomed, handleBoom, handleOrgValidify } = useOrgContext();
  const [form] = Form.useForm();
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
      {/* <Title>Org Admin Login</Title> */}
      {!showLoginForm ? (
        <>
          <Layout
            className="layout-default layout-signin"
            style={{
              borderRadius: 20,
              padding: 0,
              backgroundColor: "transparent",
            }}
          >
            <Content className="signin">
              <Row gutter={[24, 0]}>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  lg={{ span: 8, offset: 2 }}
                  md={{ span: 12 }}
                >
                  <Title className="font-regular text-muted" level={5}>
                    Enter your credentials to sign in
                  </Title>
                  <Form
                    layout="vertical"
                    required
                    size="large"
                    style={{
                      width: "25vw",
                      height: "60vh",
                    }}
                    form={form}
                  >
                    <Form.Item label="Email">
                      <Input
                        placeholder="abc@xyz.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      onClick={onEmailSubmit}
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(270deg, #4E7CF2 0%, #00A99D 33.33%, #00A99D 66.67%, #4E7CF2 100%)",
                        border: "1px solid #7D88A1",
                      }}
                    >
                      Continue
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Content>
          </Layout>
        </>
      ) : (
        <Layout
          className="layout-default layout-signin"
          style={{
            borderRadius: 20,
            padding: 0,
            backgroundColor: "transparent",
          }}
        >
          <Content className="signin">
            <Row gutter={[24, 0]}>
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 8, offset: 2 }}
                md={{ span: 12 }}
              >
                <Form
                  layout="vertical"
                  size="large"
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
                      placeholder="*************"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(270deg, #4E7CF2 0%, #00A99D 33.33%, #00A99D 66.67%, #4E7CF2 100%)",
                        border: "1px solid #7D88A1",
                      }}
                    >
                      Log In
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
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
