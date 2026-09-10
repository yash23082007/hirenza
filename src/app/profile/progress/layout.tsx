import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Readiness Progress & Solved Analytics (2026)",
  description: "Track your problem solving velocity, consistency heatmaps, and readiness scores across tech tracks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
