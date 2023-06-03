"use client";

import { OrgAuthProvider } from "../global/contexts/OrgContext";
import Component from "./Component";

export default function AddSysRole() {
  return (
    <>
      <OrgAuthProvider>
        <Component />
      </OrgAuthProvider>
    </>
  );
}
