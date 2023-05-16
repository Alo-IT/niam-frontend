"use client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import urls from "../urls";
import axios from "axios";
import { useNiamContext } from "../global/contexts/NiamContext";
import { ArrowLeftOutlined, LogoutOutlined } from "@ant-design/icons";

export default function OrgAddForm() {
  const {
    signedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleSignin,
    handleSignout,
    handleOrgValidify,
  } = useNiamContext();
  const router = useRouter();
  const [orgInfo, setOrgInfo] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddOrg = (data) => {
    setOrgInfo(data);
    localStorage.setItem("orgInfo", data);
    console.log("New Org info: ", data);
  };

  const onFinish = async (values) => {
    console.log("Sending data....");
    if (!values.dbName || !values.orgDomain) {
      console.log("Please provide dbName and orgDomain");
      return;
    }
    const formData = {
      orgDomain: values.orgDomain,
      dbName: values.dbName,
    };
    try {
      const response = await axios.post(
        urls.baseURL + "/niamadmin/organization",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success == true) {
        handleAddOrg(response.data);
        setSuccessMessage("Organization added successfully!");
      } else {
        console.log("Org exists. Try new!");
        setSuccessMessage(
          "Organization already exists. Please try a different one."
        );
      }
    } catch (error) {
      console.log(error.response.data);
      setSuccessMessage("Failed to add organization. Please try again.");
    }
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Organization Domain" name="orgDomain">
          <Input placeholder="Organization Domain" />
        </Form.Item>
        <Form.Item label="Oranization Name" name="dbName">
          <Input placeholder="Oranization Name" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Organization
        </Button>
      </Form>
      {successMessage && <div>{successMessage}</div>}

      <div
        className="actionButtons"
        style={{
          marginTop: "40px",
          display: "grid",
          gap: "20px",
        }}
      >
        <Button
          type="secondary"
          icon={<ArrowLeftOutlined />}
          style={{
            background: "#010101",
            color: "white",
            fontWeight: 500,
            padding: "10px 30px",
            margin: "0 0",
            lineHeight: "1.1em",
          }}
          onClick={() => router.push("/NiamAdminDash")}
        >
          Go Dashboard
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
          }}
          icon={<LogoutOutlined />}
          onClick={handleSignout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
