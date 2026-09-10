"use client";

import dynamic from "next/dynamic";

const CommandPalette = dynamic(
  () => import("@/components/search/CommandPalette").then((m) => ({ default: m.CommandPalette })),
  { ssr: false }
);

export function ClientCommandPalette() {
  return <CommandPalette />;
}
