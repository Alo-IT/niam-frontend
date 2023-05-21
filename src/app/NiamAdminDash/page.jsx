"use client";

import { NiamAuthProvider } from "../global/contexts/NiamContext";
import Component from "./Component";

export default function NiamAdminDash() {
  return (
    <NiamAuthProvider>
      <Component />
    </NiamAuthProvider>
  );
}
