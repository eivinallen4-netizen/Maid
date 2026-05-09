"use client";

import { useEffect, useState, useMemo } from "react";
import { ContactRecord } from "@/lib/contacts-store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

type StageId = "new_lead" | "contacted" | "quote_sent" | "follow_up" | "booked" | "lost";

const STAGES = [
  { id: "new_lead" as const, label: "New Lead", color: "#3b82f6" },
  { id: "contacted" as const, label: "Contacted", color: "#eab308" },
  { id: "quote_sent" as const, label: "Quote Sent", color: "#8b5cf6" },
  { id: "follow_up" as const, label: "Follow Up", color: "#f97316" },
  { id: "booked" as const, label: "Booked", color: "#22c55e" },
  { id: "lost" as const, label: "Not Interested", color: "#6b7280" },
];

function getServiceTypeLabel(serviceType?: string): string {
  switch (serviceType) {
    case "standard":
      return "Standard Clean";
    case "deep":
      return "Deep Clean";
    case "move_in_out":
      return "Move In/Out";
    case "airbnb":
      return "Airbnb";
    default:
      return serviceType || "—";
  }
}

function getContactDisplayName(contact: ContactRecord): string {
  if (contact.firstName && contact.lastName) {
    return `${contact.firstName} ${contact.lastName}`;
  }
  if (contact.name) {
    return contact.name;
  }
  return contact.phone || "Unknown";
}

type LeadCardProps = {
  contact: ContactRecord;
  onMove: (contact: ContactRecord, direction: "forward" | "back") => void;
  isMoving: boolean;
  currentStageIndex: number;
};

function LeadCard({ contact, onMove, isMoving, currentStageIndex }: LeadCardProps) {
  const canMoveBack = currentStageIndex > 0;
  const canMoveForward = currentStageIndex < STAGES.length - 1;

  return (
    <Card className="shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-3 space-y-2">
        <div className="text-sm font-semibold truncate">{getContactDisplayName(contact)}</div>

        {contact.serviceType && (
          <Badge variant="secondary" className="text-xs">
            {getServiceTypeLabel(contact.serviceType)}
          </Badge>
        )}

        {contact.address && (
          <div className="flex items-start gap-1 text-xs text-slate-600 truncate">
            <MapPin size={12} className="mt-0.5 flex-shrink-0" />
            <span className="truncate">{contact.address}</span>
          </div>
        )}

        <div className="text-xs text-slate-500">
          {new Date(contact.created_at).toLocaleDateString()}
        </div>

        <div className="flex gap-1 pt-2">
          {canMoveBack && (
            <Button
              size="sm"
              variant="outline"
              disabled={isMoving}
              onClick={() => onMove(contact, "back")}
              className="flex-1"
            >
              <ChevronLeft size={14} />
            </Button>
          )}
          {canMoveForward && (
            <Button
              size="sm"
              variant="outline"
              disabled={isMoving}
              onClick={() => onMove(contact, "forward")}
              className="flex-1"
            >
              <ChevronRight size={14} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminPipelinePage() {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadContacts() {
      try {
        const res = await fetch("/api/contacts", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load contacts");
        const data = (await res.json()) as ContactRecord[];
        setContacts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load contacts");
      } finally {
        setLoading(false);
      }
    }
    loadContacts();
  }, []);

  async function moveContact(contact: ContactRecord, direction: "forward" | "back") {
    const currentIndex = STAGES.findIndex(
      (s) => s.id === (contact.pipelineStage ?? "new_lead")
    );
    const nextIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0 || nextIndex >= STAGES.length) return;

    const newStage = STAGES[nextIndex].id;
    setMovingId(contact.id);

    try {
      const res = await fetch("/api/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: contact.id, updates: { pipelineStage: newStage } }),
      });
      if (!res.ok) throw new Error("Move failed");
      setContacts((prev) =>
        prev.map((c) =>
          c.id === contact.id ? { ...c, pipelineStage: newStage } : c
        )
      );
    } finally {
      setMovingId(null);
    }
  }

  const columnMap = useMemo(() => {
    const map: Record<StageId, ContactRecord[]> = {
      new_lead: [],
      contacted: [],
      quote_sent: [],
      follow_up: [],
      booked: [],
      lost: [],
    };
    for (const c of contacts) {
      const stage = (c.pipelineStage ?? "new_lead") as StageId;
      if (map[stage]) map[stage].push(c);
    }
    return map;
  }, [contacts]);

  if (loading) {
    return <p className="text-sm text-slate-600">Loading pipeline...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {STAGES.map((stage, stageIndex) => (
          <div
            key={stage.id}
            className="flex-shrink-0 w-80 bg-slate-50 rounded-lg p-4 border border-slate-200"
          >
            <div
              className="flex items-center gap-2 mb-4 pb-3 border-b-2"
              style={{ borderColor: stage.color }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              <h3 className="font-semibold text-sm">{stage.label}</h3>
              <Badge variant="secondary" className="ml-auto text-xs">
                {columnMap[stage.id as StageId].length}
              </Badge>
            </div>

            <div className="space-y-3">
              {columnMap[stage.id as StageId].map((contact) => (
                <LeadCard
                  key={contact.id}
                  contact={contact}
                  onMove={moveContact}
                  isMoving={movingId === contact.id}
                  currentStageIndex={stageIndex}
                />
              ))}
              {columnMap[stage.id as StageId].length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">No leads</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
