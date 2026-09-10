import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design Playlists",
  description: "Curated YouTube playlists for system design interview preparation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
