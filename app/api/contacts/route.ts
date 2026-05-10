import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { tursoExecute, tursoBatch, hasTursoConfig } from "@/lib/turso";
import { sendAdminNotification } from "@/lib/admin-notifications";

export type ContactRecord = {
  id: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  serviceType?: string;
  bedrooms?: string;
  bathrooms?: string;
  bestTimeToCall?: string;
  homeType?: string;
  notes?: string;
  source?: string;
  pipelineStage?: "new_lead" | "contacted" | "quote_sent" | "follow_up" | "booked" | "lost";
  rep_email?: string;
  created_at: string;
  brevo?: { id?: number };
};

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
  updates?: ContactPayload & { pipelineStage?: string };
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

    if (!hasTursoConfig()) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 });
    }

    const result = await tursoExecute("SELECT data FROM contacts ORDER BY created_at DESC");
    const contacts: ContactRecord[] = result.rows.map((row) =>
      JSON.parse(String(row.data)) as ContactRecord
    );

    // If rep, filter to only their contacts
    if (session.role === "rep") {
      return NextResponse.json(
        contacts.filter((contact) => contact.rep_email === session.email)
      );
    }

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

    if (!hasTursoConfig()) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 });
    }

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
      pipelineStage: "new_lead",
      rep_email: session?.email,
      created_at: new Date().toISOString(),
      brevo: { id: brevo?.id },
    };

    await tursoExecute({
      sql: "INSERT INTO contacts (id, email, created_at, data) VALUES (?, ?, ?, ?)",
      args: [record.id, record.email ?? null, record.created_at, JSON.stringify(record)],
    });

    const contactName = `${record.firstName || ""} ${record.lastName || ""}`.trim() || "New Contact";
    const serviceType = record.serviceType ? ` (${record.serviceType})` : "";

    await sendAdminNotification(
      "📋 New Lead Form Submitted",
      `${contactName}${serviceType} just filled out a service inquiry form`,
      { contactId: record.id, email: record.email || "", phone: record.phone || "" }
    );

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

    if (!hasTursoConfig()) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 });
    }

    const body = (await request.json()) as ContactPatchPayload;
    if (!body.id || !body.updates) {
      return NextResponse.json({ error: "Contact id and updates are required." }, { status: 400 });
    }

    if (body.updates.email && !isValidEmail(body.updates.email)) {
      return NextResponse.json({ error: "Email must be valid." }, { status: 400 });
    }

    const result = await tursoExecute({
      sql: "SELECT data FROM contacts WHERE id = ?",
      args: [body.id],
    });

    if (!result.rows.length) {
      return NextResponse.json({ error: "Contact not found." }, { status: 404 });
    }

    const current = JSON.parse(String(result.rows[0].data)) as ContactRecord;

    if (body.updates.pipelineStage && typeof body.updates.pipelineStage === "string") {
      const validStages = ["new_lead", "contacted", "quote_sent", "follow_up", "booked", "lost"];
      if (!validStages.includes(body.updates.pipelineStage)) {
        return NextResponse.json({ error: "Invalid pipeline stage." }, { status: 400 });
      }
    }

    const updated: ContactRecord = {
      ...current,
      email: body.updates.email?.trim().toLowerCase() || current.email,
      firstName: body.updates.firstName || current.firstName,
      lastName: body.updates.lastName || current.lastName,
      phone: body.updates.phone || current.phone,
      address: body.updates.address || current.address,
      serviceType: body.updates.serviceType || current.serviceType,
      bedrooms: body.updates.bedrooms || current.bedrooms,
      bathrooms: body.updates.bathrooms || current.bathrooms,
      bestTimeToCall: body.updates.bestTimeToCall || current.bestTimeToCall,
      homeType: body.updates.homeType || current.homeType,
      notes: body.updates.notes || current.notes,
      source: body.updates.source || current.source,
      pipelineStage: body.updates.pipelineStage && typeof body.updates.pipelineStage === "string" &&
        ["new_lead", "contacted", "quote_sent", "follow_up", "booked", "lost"].includes(body.updates.pipelineStage)
        ? (body.updates.pipelineStage as "new_lead" | "contacted" | "quote_sent" | "follow_up" | "booked" | "lost")
        : current.pipelineStage,
    };

    await tursoExecute({
      sql: "UPDATE contacts SET data = ?, email = ? WHERE id = ?",
      args: [JSON.stringify(updated), updated.email ?? null, body.id],
    });

    return NextResponse.json({ contact: updated });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to update contact.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
