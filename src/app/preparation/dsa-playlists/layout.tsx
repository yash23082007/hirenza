import type { Metadata } from "next";

import { dsaPlaylists } from "@/data";

export const metadata: Metadata = {
  title: `Top ${dsaPlaylists.length} DSA Video Courses & Playlists for Software Engineers (2026)`,
  description: "Top-rated free Data Structures and Algorithms playlists from leading software engineering educators.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
