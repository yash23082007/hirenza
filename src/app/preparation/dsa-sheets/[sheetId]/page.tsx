import { DSASheetsClient } from "../DSASheetsClient";
import { dsaSheets } from "@/data/dsaSheets";
import type { Metadata } from "next";

export function generateStaticParams() {
  return dsaSheets.map((sheet) => ({
    sheetId: sheet.id,
  }));
}

export function generateMetadata({ params }: { params: { sheetId: string } }): Metadata {
  const sheet = dsaSheets.find((s) => s.id === params.sheetId);
  if (!sheet) {
    return { title: "Sheet Not Found" };
  }
  return {
    title: `${sheet.name} DSA Sheet`,
    description: sheet.description,
  };
}

export default function SheetPage({ params }: { params: { sheetId: string } }) {
  return <DSASheetsClient sheetId={params.sheetId} />;
}
