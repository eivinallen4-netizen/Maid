"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ScheduleAdminLinks() {
  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Link href="/admin/schedule/reps" className="block">
          <Card className="border border-sky-100 bg-gradient-to-br from-white to-sky-50/30 text-slate-900 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all duration-300 ease-out group h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-100 rounded-lg group-hover:bg-sky-200 transition-colors duration-300">
                  <Briefcase className="size-4 text-sky-600" />
                </div>
                <CardTitle className="text-base">Rep Schedule</CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-600 mt-2">Manage weekly knocking hours for reps on a dedicated board.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-xs text-slate-500">
              <span>Open rep scheduling</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/schedule/techs" className="block">
          <Card className="border border-cyan-100 bg-gradient-to-br from-white to-cyan-50/30 text-slate-900 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all duration-300 ease-out group h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg group-hover:bg-cyan-200 transition-colors duration-300">
                  <Wrench className="size-4 text-cyan-600" />
                </div>
                <CardTitle className="text-base">Tech Schedule</CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-600 mt-2">Manage weekly tech hours on a separate drag-and-drop board.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-xs text-slate-500">
              <span>Open tech scheduling</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg md:hidden">
        <p className="text-xs text-amber-900">
          💡 <strong>Tip:</strong> Schedule editing works best on desktop. For a better experience on mobile, use a tablet or computer.
        </p>
      </div>
    </>
  );
}
