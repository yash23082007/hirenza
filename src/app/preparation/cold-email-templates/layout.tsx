import type { Metadata } from "next";

import { TOTAL_EMAIL_TEMPLATES } from "@/data/stats";

export const metadata: Metadata = {
  title: `Top ${TOTAL_EMAIL_TEMPLATES} Cold Email Templates for Tech Jobs & Referrals (2026)`,
  description: "Tested cold email outreach templates for software engineers, interns, and data roles to secure direct interview referrals.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
