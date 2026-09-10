import type { Metadata } from "next";

import { systemDesignPlaylists } from "@/data";

export const metadata: Metadata = {
  title: `Top ${systemDesignPlaylists.length} System Design Playlists for Staff & Senior SDEs (2026)`,
  description: "Structured high-level and low-level architecture video courses from Gaurav Sen, Exponent, Hello Interview, and leading architects.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
