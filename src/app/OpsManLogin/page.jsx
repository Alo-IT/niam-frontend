"use client";

import { OrgAuthProvider } from "../global/contexts/OrgContext";
import Component from "./Component";

export default function OpsManLogin() {
  return (
    <OrgAuthProvider>
      <Component />
    </OrgAuthProvider>
  );
}
