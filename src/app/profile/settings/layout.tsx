import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Hirenza preferences and data.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
