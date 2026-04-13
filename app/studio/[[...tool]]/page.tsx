"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      <NextStudio config={config} />
    </div>
  );
}
