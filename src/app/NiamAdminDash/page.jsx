"use client";
import {
  ToTopOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useNiamContext } from "../global/contexts/NiamContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "../../assets/styles/main.css";
import "../../assets/styles/responsive.css";
import axios from "axios";

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

import Paragraph from "antd/lib/typography/Paragraph";
import Link from "next/link";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";
import urls from "../urls";

const { Title, Text } = Typography;

export default function NiamAdminDash() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const {
    signedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleSignin,
    handleSignout,
    handleOrgValidify,
  } = useNiamContext();

  const router = useRouter();
  const [reverse, setReverse] = useState(false);
  const [orgs, setOrgs] = useState({});
  const [selectedOrg, setSelectedOrg] = useState("");
  const [orgInfo, setOrgInfo] = useState(null);

  useEffect(() => {
    if (!signedIn) {
      router.push("/NiamLogin");
    } else if (signedIn) {
      async function fetchOrgs() {
        try {
          const response = await axios.get(urls.baseURL + "/niamadmin/allorg", {
            withCredentials: true,
          });
          setOrgs(response.data.data || []);
          console.log("Ogrs loaded: ", response.data.data.length);
        } catch (error) {
          console.log(error.response.data);
        }
      }
      fetchOrgs();
    } else {
      console.log("What the fish!");
    }

    return () => {
      localStorage.removeItem("orgInfo");
    };
  }, [signedIn, router]);

  const orgsArray = Object.values(orgs).map((org) => ({
    label: org.orgDomain,
    value: org.orgDomain,
  }));

  const handleOrgChange = (value) => {
    setSelectedOrg(value);
    setOrgInfo(null);
  };
  // useEffect(() => {
  //   setSelectedOrg(orgsArray.length > 0 ? orgsArray[1].value : "");
  // }, [orgsArray]);
  useEffect(() => {
    if (selectedOrg) {
      const selectedOrgIndex = orgsArray.findIndex(
        (org) => org.value === selectedOrg
      );
      setSelectedOrg(orgsArray[selectedOrgIndex]?.value || "");
    }
  }, [orgsArray, selectedOrg]);

  useEffect(() => {
    const storedOrgInfo = localStorage.getItem("orgInfo");
    if (storedOrgInfo) {
      setOrgInfo(JSON.parse(storedOrgInfo));
    }
  }, []);

  useEffect(() => {
    if (orgInfo) {
      localStorage.setItem("orgInfo", JSON.stringify(orgInfo));
    }
  }, [orgInfo]);

  const onFinish = async (values) => {
    const formData = {
      orgDomain: selectedOrg,
    };
    try {
      const response = await axios.post(
        urls.baseURL + "/niamadmin/searchorg",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Org info: ", response.data);
      setOrgInfo(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onFinish(event.target.elements);
  };
  const orgAdder = () => {
    router.push("/OrgAddForm");
  };
  return (
    <>
      <Title>Organization Admin Dashboard</Title>
      <div
        className="summaryCards"
        gutter={[24, 50]}
        xs="22"
        lg={22}
        style={{
          paddingLeft: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col xs="5" lg={5} className="mb-24">
            <div className="circlebox">
              <Card
                bordered={false}
                className="accessApproved"
                style={{
                  width: "15vw",
                  margin: "0 30px",
                }}
              >
                <div className="number">
                  <Row align="middle" gutter={[8, 0]} justify="center">
                    <Col xs={24} align="middle" justify="center">
                      <Title
                        level={5}
                        style={{ marginBottom: "24px", fontSize: "3em" }}
                      >
                        {console.log("Number of orgs: ", orgs.length)}
                        {orgs.length}
                      </Title>
                      <span>Number of Orgs</span>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: "90vw",
        }}
        onFinish={onFinish}
      >
        <Form.Item label="Check Organization" className="checkOrg">
          <Select
            showSearch
            placeholder="Select an org"
            optionFilterProp="children"
            style={{ width: 320 }}
            onSearch={() => {}}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleOrgChange}
            options={orgsArray}
          />
          {console.log("Orgs for select: ", orgs)}
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Check Organization
        </Button>
      </Form>
      {/* <div className="orgDetails">
        <p>Org Domain: {orgInfo?.data.orgDomain}</p>
        <p>Org Name: {orgInfo?.data.organizationName}</p>
        <p>Org User Tyre: {orgInfo?.data.userTyre}</p>
      </div> */}
      {orgInfo && orgInfo.data && orgInfo.data.length > 0 ? (
        <div>
          {orgInfo.data.map((org, index) => (
            <div key={index}>
              <p>Org Domain: {org.orgDomain}</p>
              <p>Org Name: {org.organizationName}</p>
              <p>Org User Tyre: {org.userTyre}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No org information available</p>
      )}
      <div
        className="buttons"
        align="middle"
        justify="center"
        style={{ width: "100vw" }}
      >
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

        <Button onClick={orgAdder}>Add Organization</Button>
      </div>
    </>
  );
}
