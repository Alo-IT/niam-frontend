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
import ava4 from "../../assets/images/logo-spotify.svg";
import ava5 from "../../assets/images/logo-jira.svg";
import ava6 from "../../assets/images/logo-invision.svg";
import team1 from "../../assets/images/team-1.jpg";
import team2 from "../../assets/images/team-2.jpg";
import team3 from "../../assets/images/team-3.jpg";
import team4 from "../../assets/images/team-4.jpg";
import card from "../../assets/images/info-card-1.jpg";
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
import Image from "next/image";

const { Title, Text } = Typography;
const onChange = (e) => console.log(`radio checked:${e.target.value}`);

const count = [
  {
    className: "grantedAccess",
    title: "Granted Access",
    number: 32,
  },
  {
    className: "accessApproved",
    title: "Access Approved",
    number: 26,
  },
  {
    // today: "Today’s Sales",
    // title: "$53,000",
    // persent: "+30%",
    // icon: dollor,
    // bnb: "bnb2",
    className: "pendingApproval",
    title: "Pending Approval",
    number: 11,
  },
  {
    className: "waitingApproval",
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
              <Image src={pencil} alt="" />
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
              <Image src={pencil} alt="" />
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
              <Image src={pencil} alt="" />
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
              <Image src={pencil} alt="" />
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
              <Image src={pencil} alt="" />
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
              <Image src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
];
const timelineList = [
  {
    title: "$2,400 - Redesign store",
    time: "09 JUN 7:20 PM",
    color: "green",
  },
  {
    title: "New order #3654323",
    time: "08 JUN 12:20 PM",
    color: "green",
  },
  {
    title: "Company server payments",
    time: "04 JUN 3:10 PM",
  },
  {
    title: "New card added for order #4826321",
    time: "02 JUN 2:45 PM",
  },
  {
    title: "Unlock folders for development",
    time: "18 MAY 1:30 PM",
  },
  {
    title: "New order #46282344",
    time: "14 MAY 3:30 PM",
    color: "gray",
  },
];
const list = [
  {
    img: ava1,
    Title: "Shopify",
    bud: "$14,000",
    progress: <Progress percent={60} size="small" />,
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <Image className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <Image className="tootip-img" src={team2} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Alexander Smith">
          <Image className="tootip-img" src={team3} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Jessica Doe">
          <Image className="tootip-img" src={team4} alt="" />
        </Tooltip>
      </div>
    ),
    roles: (
      <>
        <div className="author-info">
          <Title level={5}>Marketing Manager</Title>
        </div>
      </>
    ),
    rights: (
      <>
        <div className="author-info">
          <Title level={5}>Access Approval</Title>
          <Title level={5}>Vacation Approval</Title>
        </div>
      </>
    ),
    accessSince: (
      <>
        <div className="author-info">
          <Title level={5}>02/01/2015</Title>
        </div>
      </>
    ),
    ticketNo: (
      <>
        <div className="author-info">
          <Title level={5}>7643f326rtdg23</Title>
        </div>
      </>
    ),
  },
  {
    img: ava2,
    Title: "Jira",
    bud: "$3,000",
    progress: <Progress percent={10} size="small" />,
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <Image className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <Image className="tootip-img" src={team2} alt="" />
        </Tooltip>
      </div>
    ),
    roles: (
      <>
        <div className="author-info">
          <Title level={5}>App Owner</Title>
        </div>
      </>
    ),
    rights: (
      <>
        <div className="author-info">
          <Title level={5}>Access Approval</Title>
          <Title level={5}>Admin Access</Title>
        </div>
      </>
    ),
    accessSince: (
      <>
        <div className="author-info">
          <Title level={5}>05/11/2022</Title>
        </div>
      </>
    ),
    ticketNo: (
      <>
        <div className="author-info">
          <Title level={5}>265fd2f8qdq</Title>
        </div>
      </>
    ),
  },
  {
    img: ava3,
    Title: "Slack",
    bud: "Not Set",
    progress: <Progress percent={100} size="small" status="active" />,
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <Image className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <Image className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Alexander Smith">
          <Image className="tootip-img" src={team3} alt="" />
        </Tooltip>
      </div>
    ),
    roles: (
      <>
        <div className="author-info">
          <Title level={5}>App Manager</Title>
        </div>
      </>
    ),
    rights: (
      <>
        <div className="author-info">
          <Title level={5}>Provisioning Access</Title>
          <Title level={5}>Deprovisioning Access</Title>
        </div>
      </>
    ),
    accessSince: (
      <>
        <div className="author-info">
          <Title level={5}>17/05/2022</Title>
        </div>
      </>
    ),
    ticketNo: (
      <>
        <div className="author-info">
          <Title level={5}>8a7ffsf798632</Title>
        </div>
      </>
    ),
  },
  {
    img: ava4,
    Title: "OS",
    bud: "$20,600",
    progress: <Progress percent={100} size="small" status="active" />,
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <Image className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <Image className="tootip-img" src={team2} alt="" />
        </Tooltip>
      </div>
    ),
    roles: (
      <>
        <div className="author-info">
          <Title level={5}>Marketing Manager</Title>
        </div>
      </>
    ),
    rights: (
      <>
        <div className="author-info">
          <Title level={5}>Access Approval</Title>
          <Title level={5}>Vacation Approval</Title>
        </div>
      </>
    ),
    accessSince: (
      <>
        <div className="author-info">
          <Title level={5}>22/05/2022</Title>
        </div>
      </>
    ),
    ticketNo: (
      <>
        <div className="author-info">
          <Title level={5}>987df63veevz</Title>
        </div>
      </>
    ),
  },
  {
    img: ava5,
    Title: "HRM",
    bud: "$4,000",
    progress: <Progress percent={80} size="small" />,
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <Image className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <Image className="tootip-img" src={team2} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Alexander Smith">
          <Image className="tootip-img" src={team3} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Jessica Doe">
          <Image className="tootip-img" src={team4} alt="" />
        </Tooltip>
      </div>
    ),
    roles: (
      <>
        <div className="author-info">
          <Title level={5}>App Owner</Title>
        </div>
      </>
    ),
    rights: (
      <>
        <div className="author-info">
          <Title level={5}>Access Approval</Title>
          <Title level={5}>Admin Access</Title>
        </div>
      </>
    ),
    accessSince: (
      <>
        <div className="author-info">
          <Title level={5}>11/04/2021</Title>
        </div>
      </>
    ),
    ticketNo: (
      <>
        <div className="author-info">
          <Title level={5}>973bqs3eeaq</Title>
        </div>
      </>
    ),
  },

  {
    img: ava6,
    Title: "ERP",
    bud: "$2,000",
    progress: (
      <Progress
        percent={100}
        size="small"
        status="exception"
        format={() => "Cancel"}
      />
    ),
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <Image className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <Image className="tootip-img" src={team2} alt="" />
        </Tooltip>
      </div>
    ),
    roles: (
      <>
        <div className="author-info">
          <Title level={5}>App Manager</Title>
        </div>
      </>
    ),
    rights: (
      <>
        <div className="author-info">
          <Title level={5}>Provisioning Access</Title>
          <Title level={5}>Deprovisioning Access</Title>
        </div>
      </>
    ),
    accessSince: (
      <>
        <div className="author-info">
          <Title level={5}>11/05/2016</Title>
        </div>
      </>
    ),
    ticketNo: (
      <>
        <div className="author-info">
          <Title level={5}>73294vqwedwe</Title>
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

  const [reverse, setReverse] = useState(false);

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
      <Title>Organization Admin Dashboard</Title>
      <div
        className="summaryCards"
        gutter={[24, 50]}
        xs="22"
        lg={22}
        // justify="center"
        // align="middle"
        style={{
          paddingLeft: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col key={index} xs="5" lg={5} className="mb-24">
              <div className="circlebox">
                <Card
                  bordered={false}
                  className={c.className}
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
                          {c.number}
                        </Title>
                        <span>{c.title}</span>
                      </Col>
                      {/* <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col> */}
                    </Row>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="tabled" style={{ marginLeft: "5vw" }}>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={22} lg={22} xl={22} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Application Dashboard</Title>
                </div>
                {/* <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div> */}
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>Apps</th>
                      <th>Role</th>
                      <th>Right</th>
                      <th>Access Since</th>
                      <th>Ticket No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <Image
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.roles}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {/* {d.bud}{" "} */}
                            {d.rights}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">
                            {d.accessSince}
                          </div>
                        </td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.ticketNo}{" "}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            <Button type="primary">Revoke</Button>
                            <Button
                              style={{
                                background: "#fd6100",
                                color: "#ffffff",
                                marginLeft: "20px",
                              }}
                              type="secondary"
                            >
                              Change
                            </Button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div
        className="logoutButton"
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
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
