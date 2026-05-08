"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Download,
  Plus,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  ChevronDown,
} from "lucide-react";

type Quote = {
  id: string;
  customerName: string;
  customerInitial: string;
  address: string;
  amount: number;
  status: "pending" | "qualified" | "negotiating" | "winning" | "lost";
  repName: string;
  repInitial: string;
  repColor: string;
  expiresAt: string;
  createdAt: string;
};

const statusConfig = {
  pending: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    label: "Pending",
    color: "#94a3b8",
  },
  qualified: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "Qualified",
    color: "#3b82f6",
  },
  negotiating: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    label: "Negotiating",
    color: "#f59e0b",
  },
  winning: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    label: "Winning",
    color: "#10b981",
  },
  lost: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Lost",
    color: "#ef4444",
  },
};

const repColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

export function AdminQuotesPage() {
  const [selectedQuotes, setSelectedQuotes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const quotes: Quote[] = [
    {
      id: "1",
      customerName: "John Smith",
      customerInitial: "J",
      address: "123 Oak Street",
      amount: 2500,
      status: "qualified",
      repName: "Sarah",
      repInitial: "S",
      repColor: repColors[0],
      expiresAt: "Jan 15",
      createdAt: "Dec 28",
    },
    {
      id: "2",
      customerName: "Emma Wilson",
      customerInitial: "E",
      address: "456 Elm Avenue",
      amount: 1200,
      status: "negotiating",
      repName: "Marcus",
      repInitial: "M",
      repColor: repColors[1],
      expiresAt: "Jan 22",
      createdAt: "Jan 2",
    },
    {
      id: "3",
      customerName: "David Chen",
      customerInitial: "D",
      address: "789 Pine Road",
      amount: 3500,
      status: "winning",
      repName: "Alex",
      repInitial: "A",
      repColor: repColors[2],
      expiresAt: "Jan 10",
      createdAt: "Dec 20",
    },
    {
      id: "4",
      customerName: "Sarah Johnson",
      customerInitial: "S",
      address: "321 Maple Drive",
      amount: 1800,
      status: "pending",
      repName: "Jordan",
      repInitial: "J",
      repColor: repColors[3],
      expiresAt: "Jan 18",
      createdAt: "Jan 5",
    },
    {
      id: "5",
      customerName: "Michael Brown",
      customerInitial: "M",
      address: "654 Cedar Lane",
      amount: 2200,
      status: "lost",
      repName: "Taylor",
      repInitial: "T",
      repColor: repColors[4],
      expiresAt: "Jan 8",
      createdAt: "Dec 25",
    },
    {
      id: "6",
      customerName: "Lisa Martinez",
      customerInitial: "L",
      address: "987 Birch Street",
      amount: 2800,
      status: "qualified",
      repName: "Casey",
      repInitial: "C",
      repColor: repColors[5],
      expiresAt: "Jan 20",
      createdAt: "Jan 3",
    },
  ];

  const filteredQuotes = useMemo(() => {
    return quotes.filter(
      (q) =>
        q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalRevenue = quotes.reduce((sum, q) => sum + q.amount, 0);
  const avgDealSize = Math.round(totalRevenue / quotes.length);
  const closeRate = 45;
  const avgCycleTime = "2.4h";

  const toggleSelectAll = () => {
    if (selectedQuotes.size === quotes.length) {
      setSelectedQuotes(new Set());
    } else {
      setSelectedQuotes(new Set(quotes.map((q) => q.id)));
    }
  };

  const toggleSelectQuote = (id: string) => {
    const newSelected = new Set(selectedQuotes);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedQuotes(newSelected);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-2">
            OPERATIONS
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Quotes</h1>
          <p className="text-sm text-slate-600">
            Manage quotes, deals, and track status of all opportunities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-slate-900 hover:bg-slate-800 text-white"
          >
            <Plus className="w-4 h-4" />
            Save quote
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Revenue */}
        <Card className="border border-slate-200 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase">
                Revenue
              </p>
              <p className="text-3xl font-bold text-slate-900">
                ${(totalRevenue / 1000).toFixed(1)}k
              </p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs">
              <TrendingUp className="w-4 h-4" />
              <span>1% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Avg Deal Size */}
        <Card className="border border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase">
                Avg Deal Size
              </p>
              <p className="text-3xl font-bold text-slate-900">
                ${avgDealSize.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-1 text-red-600 text-xs">
              <TrendingDown className="w-4 h-4" />
              <span>3.8% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Close Rate */}
        <Card className="border border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase">
                Close Rate
              </p>
              <p className="text-3xl font-bold text-slate-900">{closeRate}%</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </Button>
          </CardContent>
        </Card>

        {/* Avg Cycle Time */}
        <Card className="border border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase">
                Avg Cycle Time
              </p>
              <p className="text-3xl font-bold text-slate-900">{avgCycleTime}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quotes Table */}
      <Card className="border border-slate-200 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Active Quotes</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search quotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 w-10">
                    <Checkbox
                      checked={selectedQuotes.size === quotes.length && quotes.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Address
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Rep
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Expires
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredQuotes.map((quote) => {
                  const statusCfg = statusConfig[quote.status];
                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedQuotes.has(quote.id)}
                          onCheckedChange={() => toggleSelectQuote(quote.id)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-slate-300 text-slate-900 text-xs font-bold">
                              {quote.customerInitial}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-slate-900">
                            {quote.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {quote.address}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 text-right">
                        ${quote.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${statusCfg.bg} ${statusCfg.text} border-0`}
                        >
                          {statusCfg.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className={`${quote.repColor} text-white text-xs font-bold`}>
                            {quote.repInitial}
                          </AvatarFallback>
                        </Avatar>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-xs">
                        {quote.expiresAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          Showing {filteredQuotes.length} of {quotes.length} quotes
        </p>
        <Button variant="outline" size="sm" className="gap-1">
          Next
          <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
        </Button>
      </div>
    </div>
  );
}
