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
    } else if (typeof path === "string" && path.startsWith("/OrgLogin")) {
      return "4";
    } else if (typeof path === "string" && path.startsWith("/OrgAdminLogin")) {
      return "5";
    } else if (typeof path === "string" && path.startsWith("/OrgAdminDash")) {
      return "6";
    } else if (typeof path === "string" && path.startsWith("/AddEmployee")) {
      return "7";
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
              style={{
                height: "95vh",
                margin: 0,
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[selectedMenuItem]}
                onClick={handleMenuClick}
              >
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
                  <Menu.Item key="2" onClick={() => router.push("/OrgAddForm")}>
                    Add Organization
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    onClick={() => router.push("/NiamAdminDash")}
                  >
                    Dashboard
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="org-admin"
                  icon={<UserOutlined />}
                  title="Org Admin"
                >
                  <Menu.Item key="4" onClick={() => router.push("/OrgLogin")}>
                    Validation
                  </Menu.Item>
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
