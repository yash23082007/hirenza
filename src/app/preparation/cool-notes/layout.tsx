import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Notes",
  description: "Curated study notes covering key interview topics and concepts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
