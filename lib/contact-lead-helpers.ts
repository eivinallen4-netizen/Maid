export interface ContactLead {
  id: string;
  email: string;
  phone?: string;
  name?: string;
}

export interface ContactDraft {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  pane?: string;
}

export function formatContactLead(lead: ContactLead): string {
  return `${lead.name || "Unknown"} (${lead.email})`;
}

export function getContactDisplayName(lead: any): string {
  return lead?.name || lead?.email || "Unknown";
}

export function getContactPaneTotal(contact: any): number {
  if (!contact) return 0;
  if (contact.paneCounts) {
    return (contact.paneCounts.standard || 0) + (contact.paneCounts.specialty || 0) + (contact.paneCounts.french || 0);
  }
  return 0;
}

export function buildContactDraft(data: any): ContactDraft {
  return {
    id: data.id || "",
    email: data.email || "",
    phone: data.phone,
    name: data.name,
    pane: data.pane,
  };
}

export function getPaneTotal(paneCounts: any): number {
  if (!paneCounts) return 0;
  return (paneCounts.standard || 0) + (paneCounts.specialty || 0) + (paneCounts.french || 0);
}

export function getSelectionPaneTotal(selection: any): number {
  return 0;
}

export function isValidLeadEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
