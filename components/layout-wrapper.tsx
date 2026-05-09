"use client";

import { AuthProvider } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { ReactNode } from "react";

export function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div>{children}</div>
      </div>
    </AuthProvider>
  );
}
