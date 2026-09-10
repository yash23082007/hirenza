import { PatternsClient } from "../PatternsClient";
import { dsaPatterns } from "@/data/patterns";
import type { Metadata } from "next";

export function generateStaticParams() {
  return dsaPatterns.map((pattern) => ({
    patternId: pattern.id,
  }));
}

export function generateMetadata({ params }: { params: { patternId: string } }): Metadata {
  const pattern = dsaPatterns.find((p) => p.id === params.patternId);
  if (!pattern) {
    return { title: "Pattern Not Found" };
  }
  return {
    title: `${pattern.name} - DSA Pattern`,
    description: pattern.description,
  };
}

export default function PatternPage({ params }: { params: { patternId: string } }) {
  return <PatternsClient patternId={params.patternId} />;
}
