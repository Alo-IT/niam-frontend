"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
import { useEffect, useState } from "react";
import axios from "axios";
import urls from "../urls";

export default function Component() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
    console.log("Users: ", users);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        urls.baseURL + "/organization/getemployees",
        {
          withCredentials: true,
        }
      );
      setUsers(response.data.data);
      console.log("Users fetched: ", response.data.data);
    } catch (error) {
      console.log("Failed to fetch users:", error);
    }
  };
  const handleInputChange = (field, value) => {
    setApp((prevApp) => ({
      ...prevApp,
      [field]: value,
    }));
  };

  // Apps operation
  const [app, setApp] = useState({
    app_Name: "",
    app_Owner: [],
    app_Manager: [],
    ops_Manager: [],
  });

  const onFinish = async (values) => {
    const { app_Name, app_Owner, app_Manager, ops_Manager } = app;

    const formData = {
      app_Name,
      app_Owner: [...app_Owner],
      app_Manager: [...app_Manager],
      ops_Manager: [...ops_Manager],
    };
    console.log("Sending data....", formData);

    try {
      const response = await axios.post(urls.baseURL + "/app/app", formData, {
        withCredentials: true,
      });
      console.log(response.data);
      setSuccessMessage("App added successfully!");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setSuccessMessage("Failed to add app. Please try again.");
      } else {
        console.log(error);
        setSuccessMessage("Failed to add app. Please try again.");
      }
    }
  };

  return (
    <>
      <Title level={4}>Add App</Title>
      <Form style={{ width: "40vw" }} onFinish={onFinish}>
        <Form.Item label="App Name" name="app_Name">
          <Input
            placeholder="App Name"
            value={app.app_Name}
            onChange={(e) => handleInputChange("app_Name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="App Owner" name="app_Owner">
          <Select
            mode="multiple"
            placeholder="Select App Owners"
            value={app.app_Owner}
            onChange={(value) => handleInputChange("app_Owner", value)}
          >
            {users.map((user) => (
              <Select.Option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="App Manager" name="app_Manager">
          <Select
            mode="multiple"
            placeholder="Select App Managers"
            value={app.app_Manager}
            onChange={(value) => handleInputChange("app_Manager", value)}
          >
            {users.map((user) => (
              <Select.Option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Ops Manager" name="ops_Manager">
          <Select
            mode="multiple"
            placeholder="Select Ops Managers"
            value={app.ops_Manager}
            onChange={(value) => handleInputChange("ops_Manager", value)}
          >
            {users.map((user) => (
              <Select.Option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "green",
            fontWeight: 700,
          }}
        >
          Create App
        </Button>
      </Form>
      <Button
        type="primary"
        style={{
          position: "fixed",
          top: "25px",
          right: "220px",
        }}
        onClick={() => router.push("/OrgAdminLogin")}
      >
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
          position: "fixed",
          top: "20px",
          right: "40px",
        }}
        icon={<LogoutOutlined />}
        onClick={handleBoomout}
      >
        Log Out
      </Button>
    </>
  );
}
