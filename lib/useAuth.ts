import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthSession } from "@/lib/auth";

export function useAuth(requireAdmin: boolean = false) {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (hasAttempted.current) return;
    hasAttempted.current = true;

    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/signin");
          return;
        }

        const data = (await response.json()) as { user: AuthSession | null };
        if (!data.user) {
          router.push("/signin");
          return;
        }

        // Check admin requirement
        if (requireAdmin && !data.user.is_admin) {
          setError("You do not have permission to access this page.");
          router.push("/account");
          return;
        }

        setSession(data.user);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to check authentication";
        setError(message);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [requireAdmin]);

  return { session, loading, error };
}
