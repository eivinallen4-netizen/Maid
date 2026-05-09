import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = buildNoIndexMetadata({ title: "Stats" });
export const dynamic = "force-dynamic";

export default async function StatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="">{children}</div>
    </div>
  );
}
