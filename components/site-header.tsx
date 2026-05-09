"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, LogOut, Settings, User } from "lucide-react";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "rep" | "tech";
};

export function SiteHeader() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 flex justify-end items-center">
        <div className="relative" ref={menuRef}>
          {user ? (
            <>
              <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </button>
              {isOpen && (
                <div
                  style={{ top: dropdownPos.top, right: dropdownPos.right }}
                  className="fixed w-48 bg-white rounded-md shadow-xl border border-gray-200 z-[9999]"
                >
                  <div className="px-4 py-2 border-b border-gray-200 text-xs text-gray-500">
                    {user.email}
                  </div>
                  <button
                    onClick={() => { router.push("/stats"); setIsOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 transition text-left"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Stats
                  </button>
                  <button
                    onClick={() => { router.push("/account"); setIsOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 transition text-left"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50 transition text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <a
              href="/signin"
              className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
