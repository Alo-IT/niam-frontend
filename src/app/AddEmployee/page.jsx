"use client";

import { OrgAuthProvider } from "../global/contexts/OrgContext";
import Component from "./Component";

export default function AddEmployee() {
  return (
    <OrgAuthProvider>
      <Component />
    </OrgAuthProvider>
  );
}
