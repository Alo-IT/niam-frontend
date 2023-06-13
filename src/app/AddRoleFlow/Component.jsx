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

  // Fetch apps
  useEffect(() => {
    async function fetchApps() {
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
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchApps();
  }, []);

  // Fetch Employees
  useEffect(() => {
    async function fetchEmployees() {
      try {
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
    fetchEmployees();
  }, []);

  // Fetch Systems
  useEffect(() => {
    async function fetchSystem() {
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
        console.log("Systems loaded:", systemsResponse.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchSystem();
  }, [setApps]);

  useEffect(() => {
    async function fetchRoles() {
      if (selectedSystemId) {
        try {
          const rolesResponse = await axios.get(
            urls.baseURL + `/system/allrole/${selectedSystemId}`,
            {
              withCredentials: true,
            }
          );
          setRoles(rolesResponse.data.data || []);
          localStorage.setItem(
            "roles",
            JSON.stringify(rolesResponse.data.data || [])
          );
          console.log("Roles loaded:", rolesResponse.data.data);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }

    fetchRoles();
  }, [selectedSystemId]);

  const handleAppChange = (value) => {
    setSeletedAppId(value);
  };
  const handleSystemChange = (value) => {
    setSelectedSystemId(value);
    setSelectedRole("");
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const handleSave = async () => {
    try {
      const payload = {
        system_role_id: selectedRole,
        flow: setFlow,
        created_By: "userObjectId",
      };

      const response = await axios.post(urls.baseURL + "/roleflow", payload, {
        withCredentials: true,
      });

      console.log("Role Flow created:", response.data);
      setSuccessMessage("Role Flow created successfully.");
    } catch (error) {
      console.log("Error creating Role Flow:", error.response.data);
    }
  };

  return (
    <>
      <Title>Role Flow Add</Title>
      <Select value={selectedSystemId} onChange={handleSystemChange}>
        <Option value="">Select a system</Option>
        {systems.map((system) => (
          <Option key={system._id} value={system._id}>
            {system.system_Name}
          </Option>
        ))}
      </Select>
      {selectedSystemId && (
        <>
          <Select value={selectedRole} onChange={handleRoleChange}>
            <Option value="">Select a role</Option>
            {roles.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.role_name}
              </Option>
            ))}
          </Select>
          <Select value={selectedFlow} onChange={handleRoleFlowChange}>
            <Option value="">Select a role</Option>
            <Option value="OPS_MANAGER">OPS_MANAGER</Option>
            <Option value="APP_MANAGER">Edit</Option>
            <Option value="APP_OWNER">Admin</Option>
          </Select>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          {successMessage && <p>{successMessage}</p>}
        </>
      )}
    </>
  );
}
