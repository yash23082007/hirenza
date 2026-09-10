import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Role Wise Preparation",
  description: "Interview preparation tracks for specific tech roles — Frontend, Backend, DevOps, and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
