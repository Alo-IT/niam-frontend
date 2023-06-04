"use client";
import Title from "antd/es/typography/Title";
import { Tabs } from "antd";
import { useState } from "react";
import NiamLogin from "../niamLogin/page";
import OrgAdminLogin from "../OrgAdminLogin/page";
const { TabPane } = Tabs;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("niamAdmin");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      {/* <Title>Who Are You?</Title> */}
      <div
        style={{
          backgroundImage: "url(/images/niamsigninbg.svg)",
          backgroundSize: "auto 80vh",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          borderRadius: 20,
        }}
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Niam Admin" key="niamAdmin">
            <NiamLogin />
          </TabPane>
          <TabPane tab="Organization" key="orgAdmin">
            <OrgAdminLogin />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
