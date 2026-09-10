import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR Questions",
  description: "Common HR and behavioral interview questions with preparation tips.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
