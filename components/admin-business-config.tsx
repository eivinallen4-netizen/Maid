"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check } from "lucide-react";

type BusinessConfigSection = {
  id: string;
  title: string;
  description?: string;
  fields: Array<{
    label: string;
    value: string;
    placeholder?: string;
    type?: "text" | "email" | "url" | "textarea";
  }>;
};

type BusinessConfigProps = {
  sections: BusinessConfigSection[];
  onSave?: (sectionId: string) => void;
};

export function AdminBusinessConfig({ sections, onSave }: BusinessConfigProps) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.id} className="shadow-md border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">{section.title}</CardTitle>
            {section.description && (
              <CardDescription>{section.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.fields.map((field, idx) => (
                <div key={idx} className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    {field.label}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      defaultValue={field.value}
                      className="text-sm"
                    />
                  ) : (
                    <Input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      defaultValue={field.value}
                      className="text-sm"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>All changes saved automatically</span>
              </div>
              <Button
                onClick={() => onSave?.(section.id)}
                className="bg-slate-900 hover:bg-slate-800"
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
