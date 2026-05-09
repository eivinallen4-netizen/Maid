"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type InviteRecord = {
  id: string;
  name: string;
  role: "admin" | "rep" | "tech";
  inviteLink: string;
  createdAt: string;
};

export function UsersAdminPanel() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<"admin" | "rep" | "tech">("rep");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invites, setInvites] = useState<InviteRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddUser = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!role) {
      setError("Role is required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create user");
      }

      const data = await response.json();
      setInvites([
        {
          id: data.user.id,
          name: data.user.name,
          role: data.user.role,
          inviteLink: data.inviteLink,
          createdAt: new Date().toLocaleDateString(),
        },
        ...invites,
      ]);
      setName("");
      setRole("rep");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Create admin, rep, or tech user accounts and send them the setup link</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleAddUser()}
              />
            </div>
            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "admin" | "rep" | "tech")}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
              >
                <option value="rep">Rep</option>
                <option value="tech">Tech</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <Button onClick={handleAddUser} disabled={loading} className="w-full">
            {loading ? "Creating..." : "Generate Signup Link"}
          </Button>
        </CardContent>
      </Card>

      {invites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Setup Links</CardTitle>
            <CardDescription>Send these links to your reps and cleaners to complete their onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invites.map((invite) => (
                <div key={invite.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded border">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{invite.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{invite.role}</div>
                    <div className="text-xs text-gray-400 mt-1 break-all font-mono">{invite.inviteLink}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(invite.inviteLink, invite.id)}
                    className="shrink-0"
                  >
                    {copiedId === invite.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {invites.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">No signup links created yet. Create one above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
