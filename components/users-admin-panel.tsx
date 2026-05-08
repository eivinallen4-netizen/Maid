"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function UsersAdminPanel() {
  const [users, setUsers] = useState<any[]>([]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Create admin, rep, or tech user accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Name" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <select className="px-3 py-2 border border-input rounded-md text-sm">
              <option>Select Role</option>
              <option value="admin">Admin</option>
              <option value="rep">Rep</option>
              <option value="tech">Tech</option>
            </select>
          </div>
          <Button className="w-full">Add User</Button>
        </CardContent>
      </Card>

      {users.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">No users created yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
