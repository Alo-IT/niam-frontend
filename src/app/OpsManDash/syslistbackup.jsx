"use client";
import { Form, Table, Button, Input, Popconfirm, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import AppList from "../OrgAdminDash/AppList";
import { LogoutOutlined } from "@ant-design/icons";
import { useOrgContext } from "../global/contexts/OrgContext";
import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../urls";
import { useForm } from "antd/lib/form/Form";

export default function sysl() {
  const router = useRouter();
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [systems, setSystems] = useState([]);
  const [apps, setApps] = useState([]);
  const [users, setUsers] = useState([]);
  const [form] = useForm();

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record._id === editingKey;

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Systems
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

        // Fetch Apps
        const appsResponse = await axios.get(urls.baseURL + "/app/app", {
          withCredentials: true,
        });
        setApps(appsResponse.data.data || []);
        localStorage.setItem(
          "apps",
          JSON.stringify(appsResponse.data.data || [])
        );
        console.log("Apps loaded (1): ", appsResponse.data.data);

        // Fetch Users
        const usersResponse = await axios.get(
          urls.baseURL + "/organization/getemployees",
          {
            withCredentials: true,
          }
        );
        setUsers(usersResponse.data.data || []);
        console.log("Users loaded: ", usersResponse.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchData();
  }, []);

  const editRow = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id);
  };

  const cancelEdit = () => {
    setEditingKey("");
  };

  const saveRow = async (record) => {
    try {
      const formData = await form.validateFields();
      // Create the payload object with updated data
      const payload = {
        system_Name: formData.system_Name,
        parent_App: formData.parent_App,
        system_Owner: formData.system_Owner,
        system_Admin: formData.system_Admin,
        created_By: record.created_By,
      };

      // Send the PATCH request to update the system
      const response = await axios.patch(
        `${urls.baseURL}/system/system/${record._id}`,
        payload,
        { withCredentials: true }
      );

      console.log("System updated:", response.data);

      // Update the systems list with the updated record
      const updatedSystems = systems.map((system) => {
        if (system._id === record._id) {
          return { ...system, ...response.data };
        }
        return system;
      });

      setSystems(updatedSystems);
      setEditingKey("");
      setSuccessMessage("System updated successfully.");
    } catch (error) {
      console.log("Error updating system:", error);
    }
  };

  const getAppNameById = (appId) => {
    const app = apps.find((app) => app._id === appId);
    return app ? app.app_Name : "";
  };

  const getUserNameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "";
  };

  const columns = [
    {
      title: "System Name",
      dataIndex: "system_Name",
      key: "system_Name",
      render: (text, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item
              name="system_Name"
              initialValue={text}
              rules={[
                {
                  required: true,
                  message: "Please input the system name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        }
        return text;
      },
    },
    {
      title: "Parent App",
      dataIndex: "parent_App",
      key: "parent_App",
      render: (text, record) => {
        const parentAppName = getAppNameById(text); // Get app name based on app ID
        if (isEditing(record)) {
          return (
            <Form.Item
              name="parent_App"
              initialValue={text}
              rules={[
                {
                  required: true,
                  message: "Please select the parent app",
                },
              ]}
            >
              <Select>
                {apps.map((app) => (
                  <Select.Option key={app._id} value={app._id}>
                    {app.app_Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          );
        }
        return parentAppName;
      },
    },
    {
      title: "System Admins",
      dataIndex: "system_Admin",
      key: "system_Admin",
      render: (systemAdminIds, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item
              name="system_Admin"
              initialValue={systemAdminIds}
              rules={[
                {
                  required: true,
                  message: "Please select the system admins",
                },
              ]}
            >
              <Select mode="multiple">
                {users.map((user) => (
                  <Select.Option key={user._id} value={user._id}>
                    {`${user.firstName} ${user.lastName}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          );
        }
        const systemAdmins = systemAdminIds.map((adminId) => {
          const systemAdmin = users.find((user) => user._id === adminId);
          return systemAdmin
            ? `${systemAdmin.firstName} ${systemAdmin.lastName}`
            : "";
        });
        return systemAdmins.join(", ");
      },
    },
    // Add other columns for editing

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="link" onClick={() => saveRow(record)}>
              Save
            </Button>
            <Popconfirm title="Cancel editing?" onConfirm={cancelEdit}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <Button type="link" onClick={() => editRow(record)}>
            Edit
          </Button>
        );
      },
    },
  ];

  const handleEdit = (record) => {
    // Implement the edit functionality here
    // Send PATCH request to `/system/system/_id` with the modified data
    const {
      _id,
      system_Name,
      parent_App,
      system_Owner,
      system_Admin,
      created_By,
    } = record;

    const updatedData = {
      system_Name: "string", // Modify with the updated system name
      parent_App: "ObjectId", // Modify with the updated parent app ID
      system_Owner: "ObjectId", // Modify with the updated system owner ID
      system_Admin: ["ObjectId"], // Modify with the updated system admin IDs
      created_By: "ObjectId", // Automatically set the current logged-in user ID
    };

    // Send PATCH request to update the system data
    axios
      .patch(urls.baseURL + "/system/system/" + _id, updatedData, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle success
        console.log("System data updated:", response.data);
        // Perform any necessary actions upon successful update
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating system data:", error);
        // Handle any error cases
      });
  };
  return (
    <>
      <Form form={form} component={false}>
        <Table columns={columns} dataSource={systems} />
      </Form>
    </>
  );
}
