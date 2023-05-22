"use client";
import { metadata } from "./global/constants/metadata";
import { useSelector } from "react-redux";
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
    }

    return "";
  };

  // useEffect(() => {
  //   setSelectedMenuItem(getSelectedMenuItem(router.pathname));
  // }, [router]);
  // const currentRoute = useSelector((state) => state.router.route);

  // useEffect(() => {
  //   setSelectedMenuItem(getSelectedMenuItem(currentRoute.pathname));
  // }, [currentRoute.pathname]);
  return (
    <>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
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
                >
                  <Menu.Item key="1" onClick={() => router.push("/NiamLogin")}>
                    Niam Login
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => router.push("/OrgAddForm")}>
                    Add Organization
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    onClick={() => router.push("/NiamAdminDash")}
                  >
                    Niam Dashboard
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="org-admin"
                  icon={<UserOutlined />}
                  title="Org Admin"
                >
                  <Menu.Item key="4" onClick={() => router.push("/OrgLogin")}>
                    Org Validation
                  </Menu.Item>
                  <Menu.Item
                    key="5"
                    onClick={() => router.push("/OrgAdminLogin")}
                  >
                    Org Admin Login
                  </Menu.Item>
                  <Menu.Item
                    key="6"
                    onClick={() => router.push("/OrgAdminDash")}
                  >
                    Org Admin Dashboard
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
                  minHeight: 800,
                  background: colorBgContainer,
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
