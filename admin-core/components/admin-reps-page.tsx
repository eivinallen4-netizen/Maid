"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Star, Plus, MoreVertical } from "lucide-react";

type Rep = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  initials: string;
  bgColor: string;
  rating: number;
  ratingCount: number;
  jobsCompleted: number;
  lastActive: string;
  lastActiveMonth: string;
  status: "active" | "inactive";
};

const repColors = [
  "bg-blue-600",
  "bg-yellow-500",
  "bg-teal-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-orange-500",
];

export function AdminRepsPage() {
  const [reps] = useState<Rep[]>([
    {
      id: "1",
      name: "Shawn",
      email: "bcatherine171@gmail.com",
      phone: "+1 702 553 0102",
      initials: "S",
      bgColor: "bg-blue-600",
      rating: 4.3,
      ratingCount: 43,
      jobsCompleted: 184,
      lastActive: "Mar 2024",
      lastActiveMonth: "Jobs",
      status: "active",
    },
    {
      id: "2",
      name: "Yandel",
      email: "rhomaqui8905@gmail.com",
      phone: "+1 702 553 0107",
      initials: "Y",
      bgColor: "bg-yellow-500",
      rating: 4.7,
      ratingCount: 47,
      jobsCompleted: 96,
      lastActive: "Aug 2024",
      lastActiveMonth: "Jobs",
      status: "active",
    },
    {
      id: "3",
      name: "Theovon",
      email: "theovon123@gmail.com",
      phone: "+1 702 553 0108",
      initials: "T",
      bgColor: "bg-teal-600",
      rating: 4.3,
      ratingCount: 43,
      jobsCompleted: 41,
      lastActive: "Jan 2025",
      lastActiveMonth: "Jobs",
      status: "active",
    },
    {
      id: "4",
      name: "Markol",
      email: "markol@purebin.tv",
      initials: "M",
      bgColor: "bg-purple-600",
      rating: 3.2,
      ratingCount: 32,
      jobsCompleted: 312,
      lastActive: "Nov 2023",
      lastActiveMonth: "Jobs",
      status: "inactive",
      phone: "+1 702 553 0109",
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-2">
            TEAM
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Reps</h1>
          <p className="text-sm text-slate-600">
            Manage knockers and field crew. Toggle active status, view performance.
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2 bg-slate-900 hover:bg-slate-800 text-white"
        >
          <Plus className="w-4 h-4" />
          Invite rep
        </Button>
      </div>

      {/* Reps Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reps.map((rep) => (
          <Card
            key={rep.id}
            className="border border-slate-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <CardContent className="p-6 space-y-6">
              {/* Header with avatar and rating */}
              <div className="flex items-start justify-between">
                <Avatar className="h-16 w-16 border-2 border-slate-200">
                  <AvatarFallback className={`${rep.bgColor} text-white text-lg font-bold`}>
                    {rep.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-900">
                    {rep.rating}
                  </span>
                </div>
              </div>

              {/* Name and Contact */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{rep.name}</h3>
                  {rep.status === "inactive" && (
                    <Badge variant="secondary" className="mt-1">
                      Inactive
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="break-all">{rep.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span>{rep.phone}</span>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {rep.jobsCompleted}
                    </p>
                    <p className="text-xs text-slate-600">{rep.lastActiveMonth}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-600">
                      {rep.lastActive}
                    </p>
                    <p className="text-xs text-slate-500">Last</p>
                  </div>
                </div>
              </div>

              {/* Action Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-auto py-2 hover:bg-slate-100"
              >
                <MoreVertical className="w-4 h-4 text-slate-500" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-xs text-slate-500 text-center py-4">
        Las Vegas, NV • Trash Can Sanitization
      </div>
    </div>
  );
}
