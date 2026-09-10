import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Email Templates",
  description: "Professional cold email templates for job referrals, networking, and career outreach.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
