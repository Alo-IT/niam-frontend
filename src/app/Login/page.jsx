"use client";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography } from "antd";
import { useAuthContext } from "../global/contexts/AuthContext";
import { LoginOutlined } from "@ant-design/icons";
const { Title } = Typography;

export default function Login() {
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

  // useEffect(() => {
  //   if (!loggedIn) {
  //     router.push("/OrgValidity");
  //     console.log("Logged in status coming from Admin Dashboard: ", loggedIn);
  //     // return null;
  //   }
  // }, [loggedIn, router]);

  useEffect(() => {
    if (loggedIn && isAuthenticated) {
      router.push("/Dashboard");
      // console.log("Login status 5: ", loggedIn);
      console.log("Logged in, going to Dashboard");
    } else if (!loggedIn && !isAuthenticated) {
      router.push("/OrgValidity");
      console.log("Logged in status coming from Admin Dashboard: ", loggedIn);
    } else if (!loggedIn && isAuthenticated) {
      router.push("/Login");
    } else {
      console.log("What the fuck is going on! I don't know.");
    }
  }, [loggedIn, router]);
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: {
            span: 30,
          },
          wrapperCol: {
            span: 30,
          },
        }
      : null;

  const onFinish = async (values) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post("/auth/niamadminlogin", formData);
      console.log(response.data);

      // set loggedIn and loggedIn to true
      handleLogin();

      router.push("/Dashboard");
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      {console.log("Login status Signin onload: ", loggedIn)}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {console.log("Login status 6: ", loggedIn)}
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
          size="large"
          onFinish={onFinish}
          style={{
            maxWidth: "80vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Title level={3}>Sign In</Title>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          {errorMessage && (
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Alert message={errorMessage} type="error" />
            </Form.Item>
          )}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<LoginOutlined />}
              size="large"
              style={{ background: "#1ED760", color: "white", fontWeight: 500 }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
