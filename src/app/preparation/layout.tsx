import type { Metadata } from "next";
import { ApplicationLayout } from "@/components/layout/ApplicationLayout";

export const metadata: Metadata = {
  title: "Preparation Cockpit & Progress Engine (2026) | HIRENZA",
  description: "Track DSA sheets, company problem frequency, 20 coding patterns, and real-time interview readiness.",
};

export default function PreparationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApplicationLayout>{children}</ApplicationLayout>;
}
