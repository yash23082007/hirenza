import { PatternsClient } from "./PatternsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "20 Essential DSA Patterns",
  description: "Master the 20 most important algorithmic patterns to solve any coding interview question.",
};

export default function PatternsPage() {
  return <PatternsClient />;
}
