"use client";

import { OrgAuthProvider } from "../global/contexts/OrgContext";
import Component from "./Component";

export default function AddApp() {
  return (
    <OrgAuthProvider>
      <Component />
    </OrgAuthProvider>
  );
}
