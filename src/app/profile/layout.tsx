import type { Metadata } from "next";
import { ApplicationLayout } from "@/components/layout/ApplicationLayout";

export const metadata: Metadata = {
  title: "User Profile & Progress Backup (2026)",
  description: "Manage your target company goals, download shareable prep cards, and export or import offline progress data.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApplicationLayout>{children}</ApplicationLayout>;
}
