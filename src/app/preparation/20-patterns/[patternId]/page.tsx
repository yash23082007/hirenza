import { PatternsClient } from "../PatternsClient";
import { dsaPatterns } from "@/data/patterns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return dsaPatterns.map((pattern) => ({
    patternId: pattern.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ patternId: string }> }): Promise<Metadata> {
  const { patternId } = await params;
  const pattern = dsaPatterns.find((p) => p.id === patternId);
  if (!pattern) notFound();
  return {
    title: `${pattern.name} - DSA Pattern`,
    description: pattern.description,
  };
}

export default async function PatternPage({ params }: { params: Promise<{ patternId: string }> }) {
  const { patternId } = await params;
  const pattern = dsaPatterns.find((p) => p.id === patternId);
  if (!pattern) notFound();
  return <PatternsClient patternId={patternId} />;
}
