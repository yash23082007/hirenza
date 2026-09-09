import { ApplicationLayout } from "@/components/layout/ApplicationLayout";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApplicationLayout>{children}</ApplicationLayout>;
}
