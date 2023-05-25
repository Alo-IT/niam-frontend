"use client";
import { useState, useEffect } from "react";
import { LeftCircleTwoTone, LogoutOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
import urls from "../urls";

export default function Component() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const router = useRouter();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrg();
  }, []);

  const fetchOrg = async () => {
    try {
      const response = await axios.get(
        urls.baseURL + "/organization/organization",
        {
          withCredentials: true,
        }
      );
      const orgData = response.data.data || [];
      setOrg(orgData[0]);
      console.log("Org loaded:", orgData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        urls.baseURL + `/organization/organization/${org?._id}`,
        values,
        {
          withCredentials: true,
        }
      );
      message.success("Organization updated successfully");
      setLoading(false);
      console.log("Updated org:", response.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      message.error("Failed to update organization");
    }
  };

  const handleCancel = () => {
    router.push("/OrgAdminDash");
  };

  return (
    <>
      <Title level={4}>Update Org</Title>
      {org && (
        <Form onFinish={handleSubmit} initialValues={org}>
          <Form.Item label="Organization Name" name="organizationName">
            <Input placeholder={org.organizationName} />
          </Form.Item>
          <Form.Item label="Organization Domain" name="orgDomain">
            <Input placeholder={org.orgDomain} />
          </Form.Item>
          <Form.Item label="Organization User Type" name="userTyre">
            <Input placeholder={org.userTyre} />
          </Form.Item>
          <Form.Item label="Organization Admins" name="org_admin">
            {org.org_admin?.map((admin) => (
              <div key={admin.id}>{admin.email}</div>
            ))}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
      {/* Navigation Buttons */}
      <Button
        type="primary"
        icon={<LeftCircleTwoTone />}
        style={{
          position: "fixed",
          top: "25px",
          right: "220px",
        }}
        onClick={() => router.push("/OrgAdminDash")}
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
