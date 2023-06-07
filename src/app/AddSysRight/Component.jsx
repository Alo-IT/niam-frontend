import { Button, Form, Input, Select } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import urls from "../urls";
import Title from "antd/es/typography/Title";
import { useOrgContext } from "../global/contexts/OrgContext";
const { Option } = Select;

export default function back() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [systems, setSystems] = useState([]);
  const [selectedSystemId, setSelectedSystemId] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRight, setSelectedRight] = useState("");

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
        console.log("Systems loaded:", systemsResponse.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchRoles() {
      if (selectedSystemId) {
        try {
          const response = await axios.get(
            // urls.baseURL + "/system/allrole/",
            urls.baseURL + `/system/allrole/${selectedSystemId}`,
            {
              withCredentials: true,
            }
          );
          const systemData = response.data.data.find((item) =>
            item.system.some((sys) => sys._id === selectedSystemId)
          );
          const rolesData = systemData ? systemData.roles : [];
          setRoles(rolesData);
          localStorage.setItem("roles", JSON.stringify(rolesData));
          console.log("Roles loaded:", rolesData);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }

    fetchRoles();
  }, [selectedSystemId]);

  const handleSystemChange = (value) => {
    setSelectedSystemId(value);
    setSelectedRole("");
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  // const handleRightChange = (value) => {
  //   setSelectedRight(value);
  // };
  const handleRightChange = (e) => {
    setSelectedRight(e.target.value);
  };

  const handleSave = async () => {
    try {
      const payload = {
        system_role_id: selectedRole,
        right_Name: selectedRight,
        created_By: "userObjectId",
      };

      const response = await axios.post(
        urls.baseURL + "/system/sysright",
        payload,
        {
          withCredentials: true,
        }
      );

      console.log("SysRight created:", response.data);
      setSuccessMessage("SysRight created successfully.");
    } catch (error) {
      console.log("Error creating SysRight:", error.response.data);
    }
  };

  return (
    <>
      <Title>AddSysRight</Title>

      <Select
        value={selectedSystemId}
        onChange={handleSystemChange}
        style={{
          marginRight: 30,
        }}
      >
        <Option value="">Select a system</Option>
        {systems.map((system) => (
          <Option key={system._id} value={system._id}>
            {system.system_Name}
          </Option>
        ))}
      </Select>
      {selectedSystemId && (
        <>
          <Select
            value={selectedRole}
            onChange={handleRoleChange}
            style={{
              marginRight: 30,
            }}
          >
            <Option value="">Select a role</Option>
            {roles.map((role) => (
              <Option key={role.role_Id} value={role.role_Id}>
                {role.role_Name}
              </Option>
            ))}
          </Select>
          {/* <Select value={selectedRight} onChange={handleRightChange}>
            <Option value="">Select a right</Option>
            <Option value="Read">Read</Option>
            <Option value="Edit">Edit</Option>
            <Option value="Admin">Admin</Option>
          </Select> */}
          <Input
            value={selectedRight}
            onChange={handleRightChange}
            placeholder="Right Name"
            style={{
              width: "20vw",
            }}
          />
          <br />
          <Button
            type="primary"
            onClick={handleSave}
            style={{
              marginTop: 20,
            }}
          >
            Assign Right
          </Button>
          {successMessage && <p>{successMessage}</p>}
        </>
      )}
    </>
  );
}
