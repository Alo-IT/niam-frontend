"use client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import urls from "../urls";
import axios from "axios";
import { useNiamContext } from "../global/contexts/NiamContext";
import { LogoutOutlined } from "@ant-design/icons";

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
  const [orgs, setOrgs] = useState({});
  const [orgInfo, setOrgInfo] = useState(null);
  const [orgDomainf, setOrgDomainf] = useState("");
  const [dbName, setDbName] = useState("");

  useEffect(() => {
    async function fetchOrgs() {
      try {
        const response = await axios.get(urls.baseURL + "/niamadmin/allorg", {
          withCredentials: true,
        });
        setOrgs(response.data.data || []);
        console.log("Ogrs loaded: ", response.data?.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrgs();
  }, [router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      orgDomain: event.target.elements.orgDomain.value,
      dbName: event.target.elements.dbName.value,
    };
    onFinish(formData);
  };

  const onFinish = async (formData) => {
    try {
      const response = await axios.post(
        urls.baseURL + "/niamadmin/organization",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success == true) {
        console.log("New Org info: ", response.data);
        setOrgInfo(response.data);
      } else {
        console.log("Org exists. Try new!");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Organization Domain">
          <Input name="orgDomain" placeholder="Organization Domain" />
        </Form.Item>
        <Form.Item label="Oranization Name">
          <Input name="dbName" placeholder="Oranization Name" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Organization
        </Button>
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
