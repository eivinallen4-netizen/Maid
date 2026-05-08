"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ExternalLink, Plus } from "lucide-react";

export function AdminBusinessPage() {
  const [basicInfo, setBasicInfo] = useState({
    companyName: "PureBin LV",
    phone: "+1 702 555 0123",
    email: "info@purebin.lv",
    website: "www.purebin.lv",
  });

  const [services, setServices] = useState({
    hiringNow: true,
    windowCleaning: true,
    biWeeklyCleaning: true,
    powerWashing: true,
    gutterCleaning: false,
    professionalPressure: true,
  });

  const [hours] = useState([
    { day: "Mon", open: "8:00 AM", close: "6:00 PM" },
    { day: "Tue", open: "8:00 AM", close: "6:00 PM" },
    { day: "Wed", open: "8:00 AM", close: "6:00 PM" },
    { day: "Thu", open: "8:00 AM", close: "6:00 PM" },
    { day: "Fri", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sat", open: "9:00 AM", close: "4:00 PM" },
    { day: "Sun", open: "Closed", close: "" },
  ]);

  const handleBasicInfoChange = (field: keyof typeof basicInfo, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: keyof typeof services) => {
    setServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Business</h1>
          <p className="text-sm text-slate-600">
            Update hours, business info, legal agreement for the public site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            View page on site
          </Button>
          <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="w-4 h-4" />
            Save brand
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Basic Info */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Basic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Company Name</Label>
                <Input
                  value={basicInfo.companyName}
                  onChange={(e) =>
                    handleBasicInfoChange("companyName", e.target.value)
                  }
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone</Label>
                <Input
                  value={basicInfo.phone}
                  onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  value={basicInfo.email}
                  onChange={(e) => handleBasicInfoChange("email", e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Website</Label>
                <Input
                  value={basicInfo.website}
                  onChange={(e) =>
                    handleBasicInfoChange("website", e.target.value)
                  }
                  className="text-sm"
                />
              </div>

              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Services */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Public business Info</CardTitle>
              <CardDescription>
                Select services available. Help customers find the right solution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {(Object.entries(services) as Array<[keyof typeof services, boolean]>).map(([key, value]) => {
                  const labels: Record<keyof typeof services, string> = {
                    hiringNow: "Hiring now",
                    windowCleaning: "Window cleaning",
                    biWeeklyCleaning: "Bi-weekly cleaning",
                    powerWashing: "Power washing",
                    gutterCleaning: "Gutter cleaning",
                    professionalPressure: "Professional pressure",
                  };

                  return (
                    <button
                      key={key}
                      onClick={() => toggleService(key)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        value
                          ? "border-slate-300 bg-slate-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                          value
                            ? "border-slate-900 bg-slate-900"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {value && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {labels[key]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Published Hours */}
      <Card className="border border-slate-200 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Published hours</CardTitle>
              <CardDescription>Hours displayed to customers</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Use one rule for all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Day
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Open
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Close
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {hours.map((hour, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {hour.day}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{hour.open}</td>
                    <td className="py-3 px-4 text-slate-600">{hour.close}</td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Site Branding */}
      <Card className="border border-slate-200 shadow-md">
        <CardHeader>
          <CardTitle>Site branding</CardTitle>
          <CardDescription>
            Logo, colors, and visual identity for your public site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Logo</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <p className="text-sm text-slate-600">
                    Drag and drop logo here or click to upload
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Primary Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-10 h-10 bg-cyan-500 rounded border border-slate-300" />
                  <Input
                    value="#06b6d4"
                    className="flex-1 text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Tagline</Label>
                <Input
                  placeholder="Your business tagline"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Secondary Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-10 h-10 bg-slate-900 rounded border border-slate-300" />
                  <Input
                    value="#0f172a"
                    className="flex-1 text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white">
            Save Branding
          </Button>
        </CardContent>
      </Card>

      {/* Call Alignment Loops */}
      <Card className="border border-slate-200 shadow-md">
        <CardHeader>
          <CardTitle>Call alignment loops</CardTitle>
          <CardDescription>
            Save scripts and playbooks for your team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border border-slate-200 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Opener Script</h4>
              <p className="text-xs text-slate-600 mb-3">
                Standard greeting and intro for new calls
              </p>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Objection Handler</h4>
              <p className="text-xs text-slate-600 mb-3">
                Response framework for common objections
              </p>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Close Script</h4>
              <p className="text-xs text-slate-600 mb-3">
                Techniques for closing deals and getting commitments
              </p>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Follow-up Sequence</h4>
              <p className="text-xs text-slate-600 mb-3">
                Multi-step follow-up process for leads
              </p>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>

          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
            Save Scripts
          </Button>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-xs text-slate-500 text-center py-4">
        Las Vegas, NV • Trash Can Sanitization
      </div>
    </div>
  );
}
