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
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const systemsResponse = await axios.get(
          urls.baseURL + "/system/system",
          {
            withCredentials: true,
          }
        );
        setSystems(systemsResponse.data.data || []);
        localStorage.setItem(
          "systems",
          JSON.stringify(systemsResponse.data.data || [])
        );
        console.log("Systems loaded (1): ", systemsResponse.data.data);
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
        urls.baseURL + "/system/sysrole",
        values,
        {
          withCredentials: true,
        }
      );
      console.log("System Role created:", response.data);
      setSuccessMessage("System Role created successfully!");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setSuccessMessage("Failed to create system Role. Please try again.");
      } else {
        console.log(error);
        setSuccessMessage("Failed to create system Role. Please try again.");
      }
    }
  };

  return (
    <>
      <Title>Add System Role</Title>
      {console.log("Systems loaded (2): ", systems)}

      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Parent System"
          name="system_id"
          rules={[
            {
              required: true,
              message: "Please select the System",
            },
          ]}
        >
          <Select
            placeholder="Select System"
            onChange={(value) => console.log(value)}
          >
            {systems.map((system) => (
              <Option key={system._id} value={system._id}>
                {system.system_Name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Role Name"
          name="role_name"
          rules={[
            {
              required: true,
              message: "Please enter the role name",
            },
          ]}
        >
          <Input placeholder="Enter Role Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Role
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
