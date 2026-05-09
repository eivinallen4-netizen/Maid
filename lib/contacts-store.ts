import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { hasTursoConfig, tursoExecute } from "@/lib/turso";

const CONTACTS_FILE = path.join(process.cwd(), "contacts.json");

export interface ContactRecord {
  id: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  address?: string;
  serviceType?: string;
  bedrooms?: string;
  bathrooms?: string;
  bestTimeToCall?: string;
  notes?: string;
  source?: string;
  pipelineStage?: "new_lead" | "contacted" | "quote_sent" | "follow_up" | "booked" | "lost";
  created_at: string;
  [key: string]: any;
}

export async function readContacts(): Promise<ContactRecord[]> {
  if (hasTursoConfig()) {
    try {
      const result = await tursoExecute("SELECT data FROM contacts ORDER BY created_at DESC");
      return result.rows.map((row) => JSON.parse(String(row.data)) as ContactRecord);
    } catch {
      // Fall through to file system fallback
    }
  }

  try {
    const data = await fs.readFile(CONTACTS_FILE, "utf-8");
    return JSON.parse(data) as ContactRecord[];
  } catch {
    return [];
  }
}

export async function writeContacts(contacts: ContactRecord[]): Promise<void> {
  if (hasTursoConfig()) {
    try {
      // Clear and rewrite all contacts
      await tursoExecute("DELETE FROM contacts");
      for (const contact of contacts) {
        await tursoExecute({
          sql: "INSERT INTO contacts (id, email, created_at, data) VALUES (?, ?, ?, ?)",
          args: [contact.id, contact.email ?? null, contact.created_at, JSON.stringify(contact)],
        });
      }
      return;
    } catch {
      // Fall through to file system fallback
    }
  }

  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

export async function getContacts(): Promise<ContactRecord[]> {
  return readContacts();
}

export async function createContact(contact: ContactRecord): Promise<ContactRecord> {
  const contacts = await readContacts();
  contacts.push(contact);
  await writeContacts(contacts);
  return contact;
}

export async function updateContact(id: string, updates: Partial<ContactRecord>): Promise<ContactRecord> {
  const contacts = await readContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Contact not found");
  const updated = { ...contacts[index], ...updates };
  contacts[index] = updated;
  await writeContacts(contacts);
  return updated;
}

export async function deleteContact(id: string): Promise<void> {
  const contacts = await readContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  await writeContacts(filtered);
}
