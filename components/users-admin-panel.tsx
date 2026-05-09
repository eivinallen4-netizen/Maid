"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SafeUser = {
  id: string;
  name: string;
  email?: string;
  role: "admin" | "rep" | "tech";
  created_at: string;
  profile_completed_at?: string;
  invite_status: "pending" | "active" | "expired";
};

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
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoadingUsers(true);
    setUsersError("");
    try {
      const response = await fetch("/api/users?all=true");
      if (!response.ok) throw new Error("Failed to load users");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setUsersError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

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
      loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateInvite = async (userId: string, userName: string) => {
    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          action: "regenerate_invite",
        }),
      });

      if (!response.ok) throw new Error("Failed to regenerate invite");
      const data = await response.json();

      const user = users.find(u => u.id === userId);
      if (user) {
        setInvites([
          {
            id: userId,
            name: userName,
            role: user.role,
            inviteLink: data.inviteLink,
            createdAt: new Date().toLocaleDateString(),
          },
          ...invites,
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to regenerate invite");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`/api/users?id=${userId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">All Users</CardTitle>
            <CardDescription>View and manage all users in the system</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadUsers} disabled={loadingUsers}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {usersError && <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">{usersError}</div>}
          {loadingUsers ? (
            <p className="text-sm text-muted-foreground text-center py-8">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No users created yet.</p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded border hover:bg-slate-100 transition">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">{user.role}</span>
                      <span className={`text-xs px-2 py-1 rounded capitalize ${
                        user.invite_status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        user.invite_status === "active" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {user.invite_status}
                      </span>
                    </div>
                    {user.email && <div className="text-xs text-gray-500 mt-1">{user.email}</div>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRegenerateInvite(user.id, user.name)}
                      title="Generate new invite link"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {invites.length === 0 && users.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">No users yet. Create one above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
