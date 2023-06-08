"use client";

import { NiamAuthProvider } from "../global/contexts/NiamContext";
import { OrgAuthProvider } from "../global/contexts/OrgContext";
import SiteContent from "./SiteContent";

export default function Site({ children }) {
  return (
    <NiamAuthProvider>
      <OrgAuthProvider>
        <SiteContent />
      </OrgAuthProvider>
    </NiamAuthProvider>
  );
}
