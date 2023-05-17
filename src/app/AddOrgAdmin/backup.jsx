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

export default function naa() {
  const {
    signedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleSignin,
    handleSignout,
    handleOrgValidify,
  } = useNiamContext();
  const router = useRouter();
  const [orgAdmin, setOrgAdmin] = useState("");
  const [orgs, setOrgs] = useState({});
  const [selectedOrg, setSelectedOrg] = useState("");
  const [orgInfo, setOrgInfo] = useState(null);

  // Fetch Organizations
  useEffect(() => {
    async function fetchOrgs() {
      try {
        const response = await axios.get(urls.baseURL + "/niamadmin/allorg", {
          withCredentials: true,
        });
        setOrgs(response.data.data || []);
        console.log("Ogrs loaded: ", response.data.data.length);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrgs();
  }, [signedIn]);

  // Switch org
  const handleOrgChange = (value) => {
    setSelectedOrg(value);
  };

  const orgsArray = Object.values(orgs).map((org) => ({
    label: org.orgDomain,
    value: org.orgDomain,
  }));
  useEffect(() => {
    async function switchDb() {
      const formData = {
        orgDomain: selectedOrg,
      };
      try {
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
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedOrg) {
      const selectedOrgIndex = orgsArray.findIndex(
        (org) => org.value === selectedOrg
      );
      setSelectedOrg(orgsArray[selectedOrgIndex]?.value || "");
    }
  }, [orgsArray, selectedOrg]);

  // Add org admin action
  const handleAddOrgAdmin = (data) => {
    setOrgAdmin(data);
    localStorage.setItem("orgAdmin", data);
    console.log("Org Admin info", data);
  };

  // Form submit action
  const onFinish = async (values) => {
    console.log("Sending data....");
    if (
      !values.firstname ||
      !values.lastname ||
      !values.email ||
      !values.password
    ) {
      console.log("Please provide the valid inputs");
      return;
    }
    const formData = {
      firstname: values.firstname,
      lastname: values.lastname,
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
    } catch {}
    return;
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Check Organization" className="checkOrg">
          <Select
            showSearch
            placeholder="Select an org"
            optionFilterProp="children"
            style={{ width: 320 }}
            onSearch={() => {}}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleOrgChange}
            options={orgsArray}
          />
          {console.log("Orgs for select: ", orgs)}
        </Form.Item>
        <Form.Item label="First Name" name="firstname">
          <Input placeholder="Atiq" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastname">
          <Input placeholder="Israk" />
        </Form.Item>
        <Form.Item
          className="username"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input org admin email!",
            },
          ]}
        >
          <Input placeholder="Org Admin Email" />
        </Form.Item>

        <Form.Item
          className="username"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input Org Admin password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Org Admin Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Button>Add Org Admin</Button>
      </Form>
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
        onClick={handleSignout}
      >
        Logout
      </Button>
    </>
  );
}
