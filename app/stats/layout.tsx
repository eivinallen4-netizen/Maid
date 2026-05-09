import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";
import { LayoutWrapper } from "@/components/layout-wrapper";

export const metadata: Metadata = buildNoIndexMetadata({ title: "Stats" });
export const dynamic = "force-dynamic";

export default async function StatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  );
}
