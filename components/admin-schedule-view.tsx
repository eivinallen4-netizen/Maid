"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ScheduleEntry = {
  time: string;
  rep: string;
  duration: number; // in hours
  color?: string;
  task?: string;
};

type ScheduleDay = {
  date: string;
  dayOfWeek: string;
  entries: ScheduleEntry[];
};

type ScheduleViewProps = {
  week: ScheduleDay[];
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
};

const colorMap: Record<string, string> = {
  work: "bg-teal-200",
  break: "bg-amber-100",
  training: "bg-blue-100",
  admin: "bg-slate-100",
};

export function AdminScheduleView({ week, onPrevWeek, onNextWeek }: ScheduleViewProps) {
  const hours = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);

  return (
    <Card className="shadow-lg border border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>Team availability and assignments</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevWeek}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextWeek}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            {/* Day headers */}
            <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: `80px repeat(${week.length}, 1fr)` }}>
              <div />
              {week.map((day, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-xs font-semibold text-slate-700">{day.dayOfWeek}</p>
                  <p className="text-sm font-bold text-slate-900">{day.date}</p>
                </div>
              ))}
            </div>

            {/* Time slots */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              {hours.map((hour, hourIdx) => (
                <div
                  key={hour}
                  className="grid gap-2 p-2 border-b border-slate-200 last:border-b-0"
                  style={{ gridTemplateColumns: `80px repeat(${week.length}, 1fr)` }}
                >
                  <div className="text-xs font-semibold text-slate-600 text-right pr-2">
                    {hour}
                  </div>
                  {week.map((day, dayIdx) => {
                    const entry = day.entries.find(
                      e => {
                        const entryHour = parseInt(e.time.split(":")[0]);
                        return entryHour === 8 + hourIdx;
                      }
                    );

                    return (
                      <div
                        key={`${dayIdx}-${hour}`}
                        className={`p-2 rounded text-xs min-h-[40px] flex items-center justify-center ${
                          entry
                            ? `${colorMap[entry.task || "work"] || "bg-teal-100"} font-medium text-slate-900`
                            : "bg-slate-50"
                        }`}
                      >
                        {entry && (
                          <span className="text-center">
                            {entry.rep}
                            {entry.duration && (
                              <span className="block text-xs text-slate-600 mt-1">
                                {entry.duration}h
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
