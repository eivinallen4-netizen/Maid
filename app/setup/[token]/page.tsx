import type { Metadata } from "next";
import SetupForm from "../SetupForm";
import { buildNoIndexMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = buildNoIndexMetadata({ title: "Complete Profile" });

type SetupPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function SetupPage({ params }: SetupPageProps) {
  const { token } = await params;
  const decodedToken = decodeURIComponent(token);

  return (
    <div className="app-page-shell flex items-center justify-center px-4 py-10">
      <SetupForm token={decodedToken} />
    </div>
  );
}
