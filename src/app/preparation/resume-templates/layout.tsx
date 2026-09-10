import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Templates",
  description: "ATS-friendly resume templates with Markdown and LaTeX formats.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
