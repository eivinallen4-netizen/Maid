"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AuthSession = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "rep" | "tech";
  is_admin: boolean;
};

type AuthContextType = {
  user: AuthSession | null;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let fetchPromise: Promise<AuthSession | null> | null = null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fetchPromise) {
      fetchPromise
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Auth failed");
          setLoading(false);
        });
      return;
    }

    fetchPromise = (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) return null;
        const data = await res.json();
        return data.user ?? null;
      } catch {
        return null;
      }
    })();

    fetchPromise
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Auth failed");
        setLoading(false);
      })
      .finally(() => {
        fetchPromise = null;
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user: user ?? null, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
