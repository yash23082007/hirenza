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
  if (!sheet) {
    return { title: "Sheet Not Found" };
  }
  return {
    title: `${sheet.name} DSA Sheet`,
    description: sheet.description,
  };
}

export default async function SheetPage({ params }: { params: Promise<{ sheetId: string }> }) {
  const { sheetId } = await params;
  const sheet = dsaSheets.find((s) => s.id === sheetId);
  if (!sheet) notFound();
  return <DSASheetsClient sheetId={sheetId} />;
}
