import { DSASheetsClient } from "./DSASheetsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSA Sheets",
  description: "Curated DSA sheets for top tech company interviews including Striver A2Z, NeetCode 150, Love Babbar, and more.",
};

export default function DSASheetsPage() {
  return <DSASheetsClient />;
}
