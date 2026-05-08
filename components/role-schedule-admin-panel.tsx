"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RoleScheduleAdminPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Management</CardTitle>
        <CardDescription>Manage role-specific schedules</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>Schedule management panel</p>
        </div>
        <Button className="mt-4" variant="outline">
          Configure Schedule
        </Button>
      </CardContent>
    </Card>
  );
}
