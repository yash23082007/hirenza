import { ApplicationLayout } from "@/components/layout/ApplicationLayout";

export default function PreparationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApplicationLayout>{children}</ApplicationLayout>;
}
