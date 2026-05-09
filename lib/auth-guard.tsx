"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export type UserRole = "admin" | "rep" | "tech";

type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
};

export function useAuthGuard(allowedRoles?: UserRole[]) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          router.push("/signin");
          return;
        }
        const data = await res.json();
        const authUser = data.user as AuthUser;
        setUser(authUser);

        if (allowedRoles && !allowedRoles.includes(authUser.role)) {
          setUnauthorized(true);
          const redirectMap: Record<UserRole, string> = {
            admin: "/admin",
            rep: "/stats",
            tech: "/stats",
          };
          router.push(redirectMap[authUser.role]);
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/signin");
      }
    };

    void checkAuth();
  }, [pathname, router, allowedRoles]);

  return { user, loading, unauthorized };
}

export function AuthGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { loading, unauthorized } = useAuthGuard(allowedRoles);

  if (loading || unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
