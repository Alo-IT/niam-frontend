"use client";

import { OrgAuthProvider } from "../global/contexts/OrgContext";
import Component from "./Component";

export default function AddRoleFlow() {
  return (
    <OrgAuthProvider>
      <Component />
    </OrgAuthProvider>
  );
}
