"use client";
import { Button, Form, Input, Select } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import urls from "../urls";
import Title from "antd/es/typography/Title";
import { useOrgContext } from "../global/contexts/OrgContext";
const { Option } = Select;

export default function Component() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [apps, setApps] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch users & apps
  useEffect(() => {
    async function fetchData() {
      try {
        const appsResponse = await axios.get(urls.baseURL + "/app/app", {
          withCredentials: true,
        });
        setApps(appsResponse.data.data || []);
        localStorage.setItem(
          "apps",
          JSON.stringify(appsResponse.data.data || [])
        );
        console.log("Apps loaded (1): ", appsResponse.data.data);

        const usersResponse = await axios.get(
          urls.baseURL + "/organization/getemployees",
          {
            withCredentials: true,
          }
        );
        setUsers(usersResponse.data.data || []);

        console.log("Users loaded (1): ", usersResponse.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchData();
  }, []);

  const onFinish = async (values) => {
    console.log("Form values:", values);

    try {
      const response = await axios.post(
        urls.baseURL + "/system/system",
        values,
        {
          withCredentials: true,
        }
      );
      console.log("System created:", response.data);
      setSuccessMessage("System created successfully!");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setSuccessMessage("Failed to create system. Please try again.");
      } else {
        console.log(error);
        setSuccessMessage("Failed to create system. Please try again.");
      }
    }
  };

  return (
    <>
      <Title>Add System</Title>
      {console.log("Apps loaded (2): ", apps)}
      {console.log("Users loaded (2): ", users)}
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="System Name"
          name="system_Name"
          rules={[
            {
              required: true,
              message: "Please enter the system name",
            },
          ]}
        >
          <Input placeholder="Enter system name" />
        </Form.Item>

        <Form.Item
          label="Parent App"
          name="parent_App"
          rules={[
            {
              required: true,
              message: "Please select the parent app",
            },
          ]}
        >
          <Select
            placeholder="Select parent app"
            onChange={(value) => console.log(value)}
          >
            {apps.map((app) => (
              <Option key={app._id} value={app._id}>
                {app.app_Name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="System Admin"
          name="system_Admin"
          rules={[
            {
              required: true,
              message: "Please select system admin",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select system admin"
            onChange={(value) => console.log(value)}
          >
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.email}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
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
