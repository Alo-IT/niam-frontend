"use client";
import {
  ToTopOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "../global/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "../../assets/styles/main.css";
import "../../assets/styles/responsive.css";

// Images
import ava1 from "../../assets/images/logo-shopify.svg";
import ava2 from "../../assets/images/logo-atlassian.svg";
import ava3 from "../../assets/images/logo-slack.svg";
import ava5 from "../../assets/images/logo-jira.svg";
import ava6 from "../../assets/images/logo-invision.svg";
import face from "../../assets/images/face-1.jpg";
import face2 from "../../assets/images/face-2.jpg";
import face3 from "../../assets/images/face-3.jpg";
import face4 from "../../assets/images/face-4.jpg";
import face5 from "../../assets/images/face-5.jpeg";
import face6 from "../../assets/images/face-6.jpeg";
import pencil from "../../assets/images/pencil.svg";

import {
  Card,
  Col,
  Row,
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
} from "antd";

import Paragraph from "antd/lib/typography/Paragraph";
import Link from "next/link";

const { Title, Text } = Typography;

const onChange = (e) => console.log(`radio checked:${e.target.value}`);

const count = [
  {
    title: "Granted Access",
    number: 32,
  },
  {
    title: "Access Approved",
    number: 26,
  },
  {
    // today: "Today’s Sales",
    // title: "$53,000",
    // persent: "+30%",
    // icon: dollor,
    // bnb: "bnb2",
    title: "Pending Approval",
    number: 11,
  },
  {
    title: "Waiting Approval",
    number: 19,
  },
];

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// table code start
const columns = [
  {
    title: "AUTHOR",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "FUNCTION",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "EMPLOYED",
    key: "employed",
    dataIndex: "employed",
  },
];

const data = [
  {
    key: "1",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face2}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Michael John</Title>
            <p>michael@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button type="primary" className="tag-primary">
          ONLINE
        </Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/04/18</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face3}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Alexa Liras</Title>
            <p>alexa@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Programator</Title>
          <p>Developer</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button className="tag-badge">ONLINE</Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/12/20</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Laure Perrier</Title>
            <p>laure@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Executive</Title>
          <p>Projects</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button type="primary" className="tag-primary">
          ONLINE
        </Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>03/04/21</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },
  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face4}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Miriam Eric</Title>
            <p>miriam@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Marketing</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button type="primary" className="tag-primary">
          ONLINE
        </Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>03/04/21</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },
  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face5}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Richard Gran</Title>
            <p>richard@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button className="tag-badge">ONLINE</Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/03/20</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face6}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>John Levi</Title>
            <p>john@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Tester</Title>
          <p>Developer</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button className="tag-badge">ONLINE</Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>14/04/17</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },
];
// project table start
const project = [
  {
    title: "COMPANIES",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "BUDGET",
    dataIndex: "age",
  },
  {
    title: "STATUS",
    dataIndex: "address",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
  },
];
const dataproject = [
  {
    key: "1",

    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Spotify Version</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$14,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={30} size="small" />
          <span>
            <Link href="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Progress Track</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$3,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={10} size="large" />
          <span>
            <Link href="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}> Jira Platform Errors</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">Not Set</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">done</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" format={() => "done"} />
          <span>
            <Link href="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}> Launch new Mobile App</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$20,600</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress
            percent={50}
            size="small"
            status="exception"
            format={() => "50%"}
          />
          <span>
            <Link href="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Web Dev</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$4,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={80} size="small" />
          <span>
            <Link href="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Redesign Online Store</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$2,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={0} size="small" />
          <span>
            <Link href="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
];

export default function Dashboard() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const {
    loggedIn,
    setLoggedIn,
    localLoggedIn,
    setLocalLoggedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleLogin,
    handleLogout,
    handleOrgValidify,
  } = useAuthContext();

  const router = useRouter();
  // If user is not signed in, redirect to sign in page
  useEffect(() => {
    if (!loggedIn) {
      router.push("/OrgValidity");
      // console.log("Logged in status coming from Admin Dashboard: ", loggedIn);
      // return null;
    }
  }, [loggedIn, router]);

  return (
    <>
      {console.log("Login status Dashboard onload: ", loggedIn)}
      <h1>Organization Admin Dashboard</h1>

      <div className="summaryCards" gutter={[24, 0]} xs="22" lg={22}>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col key={index} xs="5" lg={5} className="mb-24">
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[8, 0]} justify="center">
                    <Col xs={24} align="middle" justify="center">
                      <Title level={3}>{c.number}</Title>
                      <span>{c.title}</span>
                    </Col>
                    {/* <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col> */}
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="tabled">
        <Row gutter={[8, 0]}>
          <Col xs="22" lg={22}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Authors Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">ONLINE</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Projects Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="online">ONLINE</Radio.Button>
                    <Radio.Button value="store">STORES</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={dataproject}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <div className="uploadfile pb-15 shadow-none">
                <Upload {...formProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="logoutButton" xs={12} lg={12}>
        <Button
          align="middle"
          justify="center"
          type="primary"
          size="large"
          style={{ background: "#F44336", color: "white", fontWeight: 500 }}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
