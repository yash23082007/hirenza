import type { Metadata } from "next";

import { TOTAL_ROLES } from "@/data/stats";

export const metadata: Metadata = {
  title: `Top ${TOTAL_ROLES} Engineering Role Roadmaps for Technical Hiring (2026)`,
  description: "Specialized interview prep tracks and mandatory skill requirements for Frontend, Backend, Fullstack, Mobile, DevOps, and Data roles.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
