import type { Metadata } from "next";
import { Suspense } from "react";
import { CompanyCompareClient } from "./CompanyCompareClient";

export const metadata: Metadata = {
  title: "Company DSA Comparison — Shared Problems & Hiring Bars",
  description: "Compare interview formats, topic distributions, and overlapping high-frequency problems between tier-1 tech companies.",
};

export default function CompanyComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-mono text-muted">Loading company comparison...</div>}>
      <CompanyCompareClient />
    </Suspense>
  );
}
