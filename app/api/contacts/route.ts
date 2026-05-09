import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { readContacts, writeContacts, type ContactRecord } from "@/lib/contacts-store";

export const runtime = "nodejs";

type ContactPayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  serviceType?: string;
  bedrooms?: string;
  bathrooms?: string;
  bestTimeToCall?: string;
  homeType?: string;
  notes?: string;
  source?: string;
};

type ContactPatchPayload = {
  id?: string;
  updates?: ContactPayload;
};

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

function getBrevoApiKey() {
  return (
    process.env.BREVO_API_KEY?.trim() ||
    process.env.BREVO_KEY?.trim() ||
    process.env.key_brovo?.trim() ||
    ""
  );
}

async function createBrevoContact(payload: ContactPayload) {
  const apiKey = getBrevoApiKey();
  if (!apiKey) {
    throw new Error("Missing Brevo API key (set BREVO_API_KEY).");
  }

  const attributes: Record<string, string> = {};
  if (payload.firstName?.trim()) attributes.FIRSTNAME = payload.firstName.trim();
  if (payload.lastName?.trim()) attributes.LASTNAME = payload.lastName.trim();
  if (payload.phone?.trim()) attributes.PHONE = payload.phone.trim();

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email: payload.email,
      attributes: Object.keys(attributes).length ? attributes : undefined,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Brevo contact creation failed.");
  }

  return (await response.json()) as { id?: number };
}


export async function GET(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session || (session.role !== "admin" && session.role !== "rep")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const contacts = await readContacts();

    // If rep, filter to only their contacts
    if (session.role === "rep") {
      const filteredContacts = contacts.filter(
        (contact) => contact.rep_email === session.email
      );
      return NextResponse.json(filteredContacts);
    }

    // Admin sees all
    return NextResponse.json(contacts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load contacts." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body.email && !body.phone?.trim()) {
      return NextResponse.json({ error: "A phone number or email is required." }, { status: 400 });
    }

    if (body.email && !isValidEmail(body.email)) {
      return NextResponse.json({ error: "Email must be valid." }, { status: 400 });
    }

    // Try to get session (optional - for rep tracking)
    const session = await getSessionFromRequest(request);

    const brevo = body.email ? await createBrevoContact(body) : undefined;
    const record: ContactRecord = {
      id: globalThis.crypto?.randomUUID?.() ?? `contact_${Date.now()}`,
      email: body.email?.trim().toLowerCase() || undefined,
      firstName: body.firstName?.trim() || undefined,
      lastName: body.lastName?.trim() || undefined,
      phone: body.phone?.trim() || undefined,
      address: body.address?.trim() || undefined,
      serviceType: body.serviceType?.trim() || undefined,
      bedrooms: body.bedrooms?.trim() || undefined,
      bathrooms: body.bathrooms?.trim() || undefined,
      bestTimeToCall: body.bestTimeToCall?.trim() || undefined,
      homeType: body.homeType?.trim() || undefined,
      notes: body.notes?.trim() || undefined,
      source: body.source?.trim() || undefined,
      rep_email: session?.email, // Attach rep email if authenticated
      created_at: new Date().toISOString(),
      brevo: { id: brevo?.id },
    };

    const contacts = await readContacts();
    contacts.unshift(record);
    await writeContacts(contacts);

    return NextResponse.json({ contact: record });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to save contact.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as ContactPatchPayload;
    if (!body.id || !body.updates) {
      return NextResponse.json({ error: "Contact id and updates are required." }, { status: 400 });
    }

    if (body.updates.email && !isValidEmail(body.updates.email)) {
      return NextResponse.json({ error: "Email must be valid." }, { status: 400 });
    }

    const contacts = await readContacts();
    const index = contacts.findIndex((contact) => contact.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Contact not found." }, { status: 404 });
    }

    const current = contacts[index];
    const updated: ContactRecord = {
      ...current,
      email: body.updates.email?.trim().toLowerCase() || undefined,
      firstName: body.updates.firstName?.trim() || undefined,
      lastName: body.updates.lastName?.trim() || undefined,
      phone: body.updates.phone?.trim() || undefined,
      address: body.updates.address?.trim() || undefined,
      serviceType: body.updates.serviceType?.trim() || current.serviceType,
      bedrooms: body.updates.bedrooms?.trim() || current.bedrooms,
      bathrooms: body.updates.bathrooms?.trim() || current.bathrooms,
      bestTimeToCall: body.updates.bestTimeToCall?.trim() || undefined,
      homeType: body.updates.homeType?.trim() || undefined,
      notes: body.updates.notes?.trim() || undefined,
      source: body.updates.source?.trim() || current.source,
    };

    contacts[index] = updated;
    await writeContacts(contacts);

    return NextResponse.json({ contact: updated });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to update contact.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
