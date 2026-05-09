"use client";

import { useEffect, useState } from "react";
import { useAuthGuard } from "@/lib/auth-guard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Contact = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  serviceType?: string;
  bedrooms?: string;
  bathrooms?: string;
  bestTimeToCall?: string;
  homeType?: string;
  notes?: string;
  source?: string;
  rep_email?: string;
  created_at: string;
  brevo?: { id?: number };
};

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "rep" | "tech";
  is_admin?: boolean;
};

export default function StatsPage() {
  const { loading: authGuardLoading } = useAuthGuard();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();
        setUser(userData.user);

        const contactsRes = await fetch("/api/contacts");
        if (!contactsRes.ok) throw new Error("Failed to fetch contacts");
        const contactsData = await contactsRes.json();
        setContacts(Array.isArray(contactsData) ? contactsData : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (authGuardLoading || loading) {
    return (
      <div className="px-4 py-10">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-10">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  // Compute stats
  const totalLeads = contacts.length;

  const serviceTypeBreakdown = contacts.reduce(
    (acc, contact) => {
      const type = contact.serviceType || "Other";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const sourceBreakdown = contacts.reduce(
    (acc, contact) => {
      const src = contact.source || "Unknown";
      acc[src] = (acc[src] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topSource = Object.entries(sourceBreakdown).sort((a, b) => b[1] - a[1])[0];

  const recentContacts = contacts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const repBreakdown =
    user?.is_admin || user?.role === "admin"
      ? contacts.reduce(
          (acc, contact) => {
            const email = contact.rep_email || "Unassigned";
            acc[email] = (acc[email] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        )
      : null;

  return (
    <div className="px-4 py-10 mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Stats</h1>
        <p className="text-sm text-muted-foreground">
          {user?.role === "admin" ? "All leads" : "Your leads"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>

        {topSource && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Top Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{topSource[0]}</div>
              <p className="text-xs text-muted-foreground mt-1">{topSource[1]} leads</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Service Type Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(serviceTypeBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span>{type}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {repBreakdown && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Leads by Rep</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(repBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([email, count]) => (
                    <div key={email} className="flex justify-between text-sm">
                      <span className="truncate">{email}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Last 5 contacts</CardDescription>
        </CardHeader>
        <CardContent>
          {recentContacts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No contacts yet.</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="flex justify-between items-start text-sm border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">
                      {contact.firstName || contact.email || "Unknown"}
                      {contact.lastName && ` ${contact.lastName}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {contact.serviceType || "—"} • {new Date(contact.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
