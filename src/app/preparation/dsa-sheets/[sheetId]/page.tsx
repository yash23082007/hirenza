import { DSASheetsClient } from "../DSASheetsClient";
import { dsaSheets } from "@/data/dsaSheets";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return dsaSheets.map((sheet) => ({
    sheetId: sheet.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ sheetId: string }> }): Promise<Metadata> {
  const { sheetId } = await params;
  const sheet = dsaSheets.find((s) => s.id === sheetId);
  if (!sheet) notFound();
  const problemCount = sheet.topics.reduce((sum, t) => sum + t.problems.length, 0);
  return {
    title: `Top ${problemCount} Problems — ${sheet.name} (2026)`,
    description: sheet.description,
  };
}

export default async function SheetPage({ params }: { params: Promise<{ sheetId: string }> }) {
  const { sheetId } = await params;
  const sheet = dsaSheets.find((s) => s.id === sheetId);
  if (!sheet) notFound();
  return <DSASheetsClient sheetId={sheetId} />;
}
