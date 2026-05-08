"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, MapPin, User } from "lucide-react";

type Job = {
  id: string;
  customerName: string;
  service: string;
  address: string;
  repName: string;
  amount: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
};

type JobsBoardProps = {
  jobs: Job[];
};

const statusConfig = {
  scheduled: { color: "#0ea5e9", label: "Scheduled", textColor: "text-sky-600" },
  "in-progress": { color: "#f59e0b", label: "In progress", textColor: "text-amber-600" },
  completed: { color: "#10b981", label: "Completed", textColor: "text-emerald-600" },
  cancelled: { color: "#ef4444", label: "Cancelled", textColor: "text-red-600" },
};

export function AdminJobsBoard({ jobs }: JobsBoardProps) {
  const columns = ["scheduled", "in-progress", "completed", "cancelled"] as const;

  const jobsByStatus = {
    scheduled: jobs.filter(j => j.status === "scheduled"),
    "in-progress": jobs.filter(j => j.status === "in-progress"),
    completed: jobs.filter(j => j.status === "completed"),
    cancelled: jobs.filter(j => j.status === "cancelled"),
  };

  return (
    <div className="grid gap-6 grid-cols-4">
      {columns.map((status) => {
        const config = statusConfig[status];
        const statusJobs = jobsByStatus[status];

        return (
          <div key={status} className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <h3 className={`font-semibold ${config.textColor}`}>
                {config.label}
              </h3>
              <span className="text-sm text-slate-600 ml-auto">
                {statusJobs.length}
              </span>
            </div>

            <div className="space-y-3">
              {statusJobs.map((job) => (
                <Card key={job.id} className="shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm">{job.customerName}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-slate-600">{job.service}</p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-3 h-3" />
                        <span>{job.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <User className="w-3 h-3" />
                        <span>{job.repName}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="font-semibold">${job.amount.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
