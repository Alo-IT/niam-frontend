"use client";

import Title from "antd/es/typography/Title";
import { Button, Form, Input, Tabs } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { TabPane } = Tabs;
import NiamLogin from "../NiamLogin/page";
import OrgAdminLogin from "../OrgAdminLogin/page";
import OpsManLogin from "../OpsManLogin/page";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("niamAdmin");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <Title>Who Are You?</Title>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Niam Admin" key="niamAdmin">
          <NiamLogin />
        </TabPane>
        <TabPane tab="Org Admin" key="orgAdmin">
          <OrgAdminLogin />
        </TabPane>
        <TabPane tab="Ops Manager" key="opsMan">
          <OpsManLogin />
        </TabPane>
      </Tabs>
    </>
  );
}
