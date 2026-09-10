import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Experiences",
  description: "Real interview experiences from candidates at top tech companies.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
