import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design",
  description: "System design topics covering HLD, distributed systems, databases, and architecture.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
