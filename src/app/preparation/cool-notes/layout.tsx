import type { Metadata } from "next";

import { TOTAL_NOTES } from "@/data/stats";

export const metadata: Metadata = {
  title: `Top ${TOTAL_NOTES} CS & Engineering Revision Notes for Interviews (2026)`,
  description: "Concise handwritten revision notes covering operating systems, DBMS, system design, and computer networks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
