"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useNiamContext } from "../global/contexts/NiamContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import urls from "../urls";

const { Option } = Select;

export default function Component() {
  const {
    signedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleSignin,
    handleSignout,
    handleOrgValidify,
  } = useNiamContext();
  const router = useRouter();
  const [orgs, setOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [orgInfo, setOrgInfo] = useState(null);
  const [orgAdmin, setOrgAdmin] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetching orgs
  useEffect(() => {
    async function fetchOrgs() {
      try {
        const response = await axios.get(urls.baseURL + "/niamadmin/allorg", {
          withCredentials: true,
        });
        setOrgs(response.data.data || []);
        console.log("Orgs loaded: ", response.data.data.length);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrgs();
  }, []);

  // Org select handler
  const handleOrgChange = async (value) => {
    setSelectedOrg(value);
    try {
      const formData = {
        orgDomain: value,
      };
      const response = await axios.post(
        urls.baseURL + "/niamadmin/searchorg",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Org info: ", response.data);
      setOrgInfo(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Caching org admin data
  const handleAddOrgAdmin = (data) => {
    setOrgAdmin(data);
    localStorage.setItem("orgAdmin", JSON.stringify(data));
    console.log("Org Admin info", data);
  };

  // Validating email extension for input
  const validateEmail = (_, value) => {
    if (value && value.indexOf("@") > -1) {
      const emailDomain = value.split("@")[1];
      if (emailDomain !== selectedOrg) {
        return Promise.reject(
          new Error("Email domain does not match the selected organization.")
        );
      }
    }
    return Promise.resolve();
  };

  // Form submission
  const onFinish = async (values) => {
    console.log("Sending data....");
    if (
      !values.firstname ||
      !values.lastname ||
      !values.email ||
      !values.password
    ) {
      console.log("Please provide valid inputs");
      return;
    }
    const formData = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(
        urls.baseURL + "/niamadmin/addorgadmin",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      handleAddOrgAdmin(response.data);
      setSuccessMessage("Organization Admin added successfully!");
    } catch (error) {
      console.log(error.response.data);
      setSuccessMessage("Failed to add organization admin. Please try again.");
    }
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Select Organization" name="orgDomain">
          <Select onChange={handleOrgChange} value={selectedOrg}>
            {orgs.map((org) => (
              <Option key={org.orgDomain} value={org.orgDomain}>
                {org.orgDomain}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {orgInfo && orgInfo.data && orgInfo.data.length > 0 ? (
          <div>
            {orgInfo.data.map((org, index) => (
              <div key={index}>
                <p>Org Domain: {org.orgDomain}</p>
                <p>Org Name: {org.organizationName}</p>
                <p>Org User Tyre: {org.userTyre}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No org information available</p>
        )}
        <Form.Item label="First Name" name="firstname">
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastname">
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { validator: validateEmail },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Organization Admin
        </Button>
      </Form>
      {successMessage && <div>{successMessage}</div>}

      <Button onClick={() => router.push("/NiamAdminDash")}>Go Dash</Button>
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
          marginTop: "30px",
        }}
        icon={<LogoutOutlined />}
        onClick={handleSignout}
      >
        Logout
      </Button>
    </>
  );
}
