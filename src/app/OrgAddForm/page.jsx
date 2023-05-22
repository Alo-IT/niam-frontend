"use client";

import { NiamAuthProvider } from "../global/contexts/NiamContext";
import Component from "./Component";

export default function OrgAddForm() {
  return (
    <NiamAuthProvider>
      <Component />
    </NiamAuthProvider>
  );
}
