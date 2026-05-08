"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Mail, Phone } from "lucide-react";

type Rep = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  jobsCompleted?: number;
  lastJob?: string;
  initials?: string;
  bgColor?: string;
};

type RepCardsProps = {
  reps: Rep[];
};

const bgColors = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-slate-700",
  "bg-amber-600",
  "bg-pink-600",
  "bg-teal-600",
];

export function AdminRepCards({ reps }: RepCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {reps.map((rep, idx) => {
        const bgColor = rep.bgColor || bgColors[idx % bgColors.length];
        const initials = rep.initials || rep.name.split(" ").map(n => n[0]).join("");

        return (
          <Card
            key={rep.id}
            className="border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300 ease-out group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none" />
            <CardContent className="p-5 space-y-4 relative">
              <div className="flex items-start justify-between">
                <Avatar className="h-12 w-12 ring-2 ring-sky-100">
                  <AvatarImage src={rep.avatar} alt={rep.name} />
                  <AvatarFallback className={`${bgColor} text-white text-sm font-bold`}>
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {rep.rating && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-900">{rep.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-slate-900">{rep.name}</h3>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-2 truncate">
                    <Mail className="w-3 h-3 flex-shrink-0 text-sky-500" />
                    <span className="truncate">{rep.email}</span>
                  </p>
                  {rep.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-3 h-3 flex-shrink-0 text-sky-500" />
                      {rep.phone}
                    </p>
                  )}
                </div>
              </div>

              {rep.jobsCompleted !== undefined && rep.lastJob && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900">{rep.jobsCompleted}</p>
                      <p className="text-xs text-slate-500">{rep.lastJob}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
