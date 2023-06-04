"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import signinbg from "../../../public/images/niamsigninbg.svg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNiamContext } from "../global/contexts/NiamContext";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;

const { Content } = Layout;

export default function Component() {
  const { signedIn, handleSignin } = useNiamContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();

  const router = useRouter();
  useEffect(() => {
    if (signedIn) {
      router.push("/NiamAdminDash");
      console.log("Logged in, going to NiamAdminDash");
    } else if (!signedIn) {
      console.log("Rerouting to NiamLogin");
    } else {
      console.log("What the fuck is going on! I don't know.");
    }
  }, [signedIn, router]);

  const onFinish = async (values) => {
    console.log("Sending data....");
    const formData = {
      email: values.email,
      password: values.password,
      rememberMe: values.remember,
    };
    try {
      const response = await axios.post(
        urls.baseURL + "/auth/niamadminlogin",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccessMessage("Signin successful");
      handleSignin();
      router.push("/NiamAdminDash");
    } catch (error) {
      console.log(error.response.data);
      setSuccessMessage("Wrong Credentials. Please try with the right one.");
      setErrorMessage(error.response.data.message);
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
                size="large"
                form={form}
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="abc@xyz.com" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="************" />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch
                    defaultChecked
                    onChange={onChange}
                    style={{ marginRight: "20px" }}
                  />
                  Remember me
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
                    SIGN IN
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
