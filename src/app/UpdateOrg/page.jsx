"use client";

import { OrgAuthProvider } from "../global/contexts/OrgContext";
import Component from "./Component";

export default function page() {
  return (
    <OrgAuthProvider>
      <Component />
    </OrgAuthProvider>
  );
}
