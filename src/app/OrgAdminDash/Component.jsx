"use client";
import { LogoutOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
  Avatar,
  Table,
  Select,
} from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useOrgContext } from "../global/contexts/OrgContext";
const { Title } = Typography;
import urls from "../urls";

export default function Component() {
  const {
    boomed,
    setBoomed,
    orgValidity,
    setOrgValidity,
    handleBoom,
    handleBoomout,
    handleOrgValidify,
  } = useOrgContext();
  const router = useRouter();
  const [orgs, setOrgs] = useState({});
  const [orgInfo, setOrgInfo] = useState("");

  useEffect(() => {
    if (!orgValidity) {
      console.log("Please validate yourself");
      // router.push("/OrgLogin");
    } else if (!boomed) {
      console.log("Please validate yourself");
      // router.push("/OrgAdminLogin");
    }
    //  else if (boomed && orgValidity) {
    //   router.push("/OrgAdminLogin");
    // }
  }, [orgValidity, boomed, router]);

  useEffect(() => {
    localStorage.setItem("orgInfo", orgs.data);
    console.log("Ogr name 2: ", orgInfo);
  }, [orgs]);

  // useEffect(() => {
  //   async function fetchOrgs() {
  //     try {
  //       const response = await axios.get(
  //         urls.baseURL + "/organization/organization",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setOrgs(response.data.data || []);
  //       // setOrgInfo(response.data.data);
  //       localStorage.setItem("orgInfo", response.data.data);

  //       console.log("Ogrs loaded: ", response.data.data);
  //       console.log("Ogr name 1: ", orgInfo);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   }
  //   fetchOrgs();
  // }, [boomed, orgValidity]);
  useEffect(() => {
    async function fetchOrgs() {
      try {
        const response = await axios.get(
          urls.baseURL + "/organization/organization",
          {
            withCredentials: true,
          }
        );
        setOrgs(response.data.data || []);

        // Update orgInfo in localStorage
        localStorage.setItem("orgInfo", JSON.stringify(response.data.data));

        console.log("Orgs loaded: ", response.data.data);
        console.log("Org name 1: ", orgInfo);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    // Fetch orgInfo from localStorage on page refresh
    const storedOrgInfo = JSON.parse(localStorage.getItem("orgInfo.data.data"));
    if (storedOrgInfo) {
      setOrgs(storedOrgInfo);
    } else {
      fetchOrgs();
    }
  }, [boomed, orgValidity]);

  const [errorMessage, setErrorMessage] = useState("");

  return boomed ? (
    <>
      <Title>Org Admin Dashboard</Title>

      <Title level={4}>Please complete the org info</Title>
      <Form>
        <Form.Item label="Organization Name">
          {/* {orgs[0].organizationName} */}
        </Form.Item>
        {/* <Form.Item label="Organization Name">{orgs[0].orgDomain}</Form.Item> */}
        {/* <Form.Item label="Organization Name">{orgs[0].userTyre}</Form.Item> */}
        <Form.Item label="Organization Name">
          {/* {orgs[0].oAuth} <Button>Add oAuth</Button> */}
        </Form.Item>
        <Form.Item label="Organization Name">
          {/* {orgs[0].thirdPartyOrg} <Button>Add thirdPartyOrg</Button> */}
        </Form.Item>
      </Form>
      <Button type="primary" onClick={() => router.push("/OrgAdminLogin")}>
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
        }}
        icon={<LogoutOutlined />}
        onClick={handleBoomout}
      >
        Boom Out
      </Button>
      {/* {console.log("Ogr name: ", orgInfo[0].organizationName)} */}
    </>
  ) : (
    <Button
      type="secondary"
      htmlType="submit"
      style={{
        background: "#144336",
        color: "white",
        fontWeight: 500,
        padding: "10px 30px",
        margin: "0 0",
        lineHeight: "1.1em",
      }}
      onClick={() => router.push("/OrgLogin")}
    >
      Login
    </Button>
  );
}
