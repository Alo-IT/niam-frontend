"use client";
import { metadata } from "./global/constants/metadata";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import Image from "next/image";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function RootLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("4");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  const getSelectedMenuItem = (path) => {
    if (typeof path === "string" && path.startsWith("/NiamLogin")) {
      return "1";
    } else if (typeof path === "string" && path.startsWith("/OrgAddForm")) {
      return "2";
    } else if (typeof path === "string" && path.startsWith("/NiamAdminDash")) {
      return "3";
    } else if (typeof path === "string" && path.startsWith("/OrgAdminLogin")) {
      return "5";
    } else if (typeof path === "string" && path.startsWith("/OrgAdminDash")) {
      return "6";
    } else if (typeof path === "string" && path.startsWith("/AddEmployee")) {
      return "7";
    } else if (typeof path === "string" && path.startsWith("/OpsManLogin")) {
      return "8";
    } else if (typeof path === "string" && path.startsWith("/OpsManDash")) {
      return "9";
    } else if (typeof path === "string" && path.startsWith("/AddSystem")) {
      return "10";
    } else if (typeof path === "string" && path.startsWith("/AddOrgAdmin")) {
      return "11";
    }

    return "";
  };

  useEffect(() => {
    setSelectedMenuItem(getSelectedMenuItem(router.pathname));
  }, [router]);
  return (
    <>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              onCollapse={handleCollapse}
              breakpoint="md"
              collapsedWidth={0}
              width={200}
              theme="dark"
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
              }}
            >
              <div className="demo-logo-vertical" />
              <div
                className="logoholder"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 40,
                }}
              >
                <Logo
                  src="/images/niamofficiallogo.png"
                  width={121.52}
                  height={106.96}
                  resizeMode="contain"
                />
              </div>

              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[selectedMenuItem]}
                onClick={handleMenuClick}
                collapsible
                collapsedWidth="200px"
              >
                {/* Niam Admin */}
                <SubMenu
                  key="niam-admin"
                  icon={<UserOutlined />}
                  title="Niam Admin"
                  style={{
                    marginTop: "70%",
                  }}
                >
                  <Menu.Item key="1" onClick={() => router.push("/NiamLogin")}>
                    Login
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    onClick={() => router.push("/NiamAdminDash")}
                  >
                    Dashboard
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => router.push("/OrgAddForm")}>
                    + Organization
                  </Menu.Item>
                  <Menu.Item
                    key="11"
                    onClick={() => router.push("/AddOrgAdmin")}
                  >
                    + Org Admin
                  </Menu.Item>
                </SubMenu>

                {/* Org Admin */}
                <SubMenu
                  key="org-admin"
                  icon={<UserOutlined />}
                  title="Org Admin"
                  style={{
                    marginTop: "20%",
                  }}
                >
                  <Menu.Item
                    key="5"
                    onClick={() => router.push("/OrgAdminLogin")}
                  >
                    Admin Login
                  </Menu.Item>
                  <Menu.Item
                    key="6"
                    onClick={() => router.push("/OrgAdminDash")}
                  >
                    Admin Dashboard
                  </Menu.Item>
                  <Menu.Item
                    key="7"
                    onClick={() => router.push("/AddEmployee")}
                  >
                    Add Employee
                  </Menu.Item>
                </SubMenu>

                {/* Ops Manager */}
                <SubMenu
                  key="ops-manager"
                  icon={<UserOutlined />}
                  title="Ops Manager"
                  style={{
                    marginTop: "20%",
                  }}
                >
                  <Menu.Item
                    key="8"
                    onClick={() => router.push("/OpsManLogin")}
                  >
                    Login
                  </Menu.Item>
                  <Menu.Item key="9" onClick={() => router.push("/OpsManDash")}>
                    Dashboard
                  </Menu.Item>
                  <Menu.Item key="10" onClick={() => router.push("/AddSystem")}>
                    Add System
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>

            <Layout>
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                }}
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Header>
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  // minHeight: "95vh",
                  background: colorBgContainer,
                  borderRadius: "20px",
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </body>
      </html>
    </>
  );
}
