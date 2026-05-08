import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionFromRequest } from "@/lib/auth";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({ title: "Admin" });
export const dynamic = "force-dynamic";

async function getAdminSession(request?: Request) {
  if (!request) return null;
  const session = await getSessionFromRequest(request);
  if (!session || !session.is_admin) {
    return null;
  }
  return session;
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Note: For full auth check, we'd need access to request in layout
  // The actual auth check happens in individual pages
  // Middleware redirects to /signin if not logged in
  return children;
}
