"use client";

import { OrgAuthProvider } from "../global/contexts/OrgContext";
import Component from "./Component";

export default function AddSysRight() {
  return (
    <OrgAuthProvider>
      <Component />
    </OrgAuthProvider>
  );
}
