import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";
import { LayoutWrapper } from "@/components/layout-wrapper";

export const metadata: Metadata = buildNoIndexMetadata({ title: "Team" });
export const dynamic = "force-dynamic";

export default async function RepLayout({
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
