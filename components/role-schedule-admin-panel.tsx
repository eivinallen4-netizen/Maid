"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoleScheduleAdminPanelProps {
  role: string;
  title: string;
  description: string;
  boardTitle: string;
  boardDescription: string;
  settingsHref: string;
}

export function RoleScheduleAdminPanel({
  role,
  title,
  description,
  boardTitle,
  boardDescription,
  settingsHref,
}: RoleScheduleAdminPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>{boardDescription}</p>
        </div>
        <Button className="mt-4" variant="outline">
          Configure Schedule
        </Button>
      </CardContent>
    </Card>
  );
}
