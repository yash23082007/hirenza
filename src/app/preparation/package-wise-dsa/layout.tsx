import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Package Wise DSA",
  description: "DSA problems organized by salary bands and company tiers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
