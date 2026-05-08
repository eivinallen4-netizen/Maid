"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Copy, Trash2 } from "lucide-react";

type Quote = {
  id: string;
  customerName: string;
  email: string;
  address: string;
  amount: number;
  status: "pending" | "accepted" | "rejected" | "expired";
  createdAt: string;
  rep?: string;
};

type QuotesTableProps = {
  quotes: Quote[];
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const statusConfig = {
  pending: { bg: "bg-amber-50", text: "text-amber-700", label: "Pending" },
  accepted: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Accepted" },
  rejected: { bg: "bg-red-50", text: "text-red-700", label: "Rejected" },
  expired: { bg: "bg-slate-50", text: "text-slate-700", label: "Expired" },
};

export function AdminQuotesTable({ quotes, onView, onDelete }: QuotesTableProps) {
  return (
    <Card className="shadow-md border border-slate-200">
      <CardHeader>
        <CardTitle>Quotes</CardTitle>
        <CardDescription>{quotes.length} active quotes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Address</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Created</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {quotes.map((quote) => {
                const config = statusConfig[quote.status];
                return (
                  <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{quote.customerName}</p>
                        <p className="text-xs text-slate-500">{quote.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{quote.address}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      ${quote.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${config.bg} ${config.text} border-0`}
                      >
                        {config.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{quote.createdAt}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onView(quote.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="w-4 h-4" />
                        </Button>
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => onDelete(quote.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
