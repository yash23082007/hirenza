import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarked Interview Questions & Saved Patterns (2026)",
  description: "Review and solve your bookmarked problems across DSA sheets, company tracks, and patterns.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
