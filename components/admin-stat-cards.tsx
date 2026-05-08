"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

type StatCard = {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
};

type StatCardsProps = {
  stats: StatCard[];
};

export function AdminStatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat, idx) => {
        const isTrendingUp = stat.trend !== undefined && stat.trend > 0;
        const isTrendingDown = stat.trend !== undefined && stat.trend < 0;

        return (
          <Card
            key={idx}
            className="border border-sky-100 bg-gradient-to-br from-white to-sky-50/30 shadow-sm hover:shadow-lg hover:border-sky-200 transition-all duration-300 ease-out group"
          >
            <CardContent className="p-5 space-y-3">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{stat.label}</p>
              <div className="flex items-end justify-between gap-2">
                <p className="text-3xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                  {typeof stat.value === "number" && stat.label.includes("$")
                    ? `$${stat.value.toLocaleString()}`
                    : stat.value}
                </p>
                {stat.trend !== undefined && (
                  <div className={`flex items-center gap-1 text-xs font-semibold transition-colors duration-200 ${isTrendingUp ? "text-emerald-600" : isTrendingDown ? "text-red-600" : "text-slate-400"}`}>
                    {isTrendingUp && <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />}
                    {isTrendingDown && <TrendingDown className="w-3.5 h-3.5 flex-shrink-0" />}
                    <span className="whitespace-nowrap">{Math.abs(stat.trend)}%</span>
                  </div>
                )}
              </div>
              {stat.trendLabel && (
                <p className="text-xs text-slate-500 leading-relaxed">{stat.trendLabel}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
