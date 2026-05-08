import { promises as fs } from "fs";
import path from "path";

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
  created_at: string;
  [key: string]: any;
}

export async function readContacts(): Promise<ContactRecord[]> {
  try {
    const data = await fs.readFile(CONTACTS_FILE, "utf-8");
    return JSON.parse(data) as ContactRecord[];
  } catch {
    return [];
  }
}

export async function writeContacts(contacts: ContactRecord[]): Promise<void> {
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
