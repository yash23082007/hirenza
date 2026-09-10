import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Subjects",
  description: "OS, DBMS, CN, and OOP interview preparation with curated questions and resources.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
