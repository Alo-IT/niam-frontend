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
import Link from "next/link";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function RootLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("4");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = {
    "/NiamLogin": "1",
    "/OrgAddForm": "2",
    "/NiamAdminDash": "3",
    "/OrgAdminLogin": "5",
    "/OrgAdminDash": "6",
    "/AddEmployee": "7",
    "/OpsManLogin": "8",
    "/OpsManDash": "9",
    "/AddSystem": "10",
    "/AddOrgAdmin": "11",
    "/AddSysRole": "12",
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  const getSelectedMenuItem = (path) => {
    for (const [menuItemPath, menuItemKey] of Object.entries(menuItems)) {
      if (typeof path === "string" && path.startsWith(menuItemPath)) {
        return menuItemKey;
      }
    }
    return "";
  };

  useEffect(() => {
    setSelectedMenuItem(getSelectedMenuItem(router.pathname));
  }, [router]);

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>
          <Layout style={{ minHeight: "100vh" }}>
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
                position: "fixed",
                zIndex: 1,
                height: "100%",
                left: 0,
                top: 0,
                borderRadius: "0 10px 10px 0",
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
                <Link href="/Dashboard">
                  <Image
                    src="/images/niamofficiallogo.png"
                    width={121.52}
                    height={106.96}
                    resizeMode="contain"
                  />
                </Link>
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
                  <Menu.Item
                    key="11"
                    onClick={() => router.push("/AddSysRole")}
                  >
                    Add System Role
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>

            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
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
