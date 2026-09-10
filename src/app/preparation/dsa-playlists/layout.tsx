import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSA Playlists",
  description: "Curated YouTube playlists for DSA preparation from top educators.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
