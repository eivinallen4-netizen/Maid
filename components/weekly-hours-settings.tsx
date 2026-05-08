"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WeeklyHoursSettingsProps {
  title: string;
  description: string;
  value: any;
  onChange?: (value: any) => void;
}

export function WeeklyHoursSettings({
  title,
  description,
  value,
  onChange,
}: WeeklyHoursSettingsProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <Card className="shadow-lg border border-slate-200 bg-white text-slate-900">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {days.map((day) => (
            <div key={day} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
              <label className="text-sm font-medium">{day}</label>
              <div className="flex gap-2">
                <input
                  type="time"
                  className="px-2 py-1 border border-input rounded text-sm"
                  placeholder="Open"
                />
                <input
                  type="time"
                  className="px-2 py-1 border border-input rounded text-sm"
                  placeholder="Close"
                />
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full">Save Hours</Button>
      </CardContent>
    </Card>
  );
}
