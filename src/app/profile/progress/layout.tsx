import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress",
  description: "Track your interview preparation progress.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
