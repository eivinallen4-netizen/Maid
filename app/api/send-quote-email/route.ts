import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { readQuotes } from "@/lib/quotes";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SendQuoteRequest = {
  quoteIndex?: number;
  customerEmail?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as SendQuoteRequest;
    const { quoteIndex, customerEmail, message } = body;

    if (quoteIndex === undefined && !customerEmail) {
      return NextResponse.json(
        { error: "Quote index or customer email is required." },
        { status: 400 }
      );
    }

    const quotes = await readQuotes();
    let quote = null;

    if (quoteIndex !== undefined) {
      quote = quotes[quoteIndex];
    } else if (customerEmail) {
      quote = quotes.find((q) => q.user?.email === customerEmail);
    }

    if (!quote) {
      return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    }

    const emailContent = `
Dear ${quote.user?.name || "Valued Customer"},

Thank you for requesting a quote from Mountain Springs Cleaning!

Below is your customized quote:

SERVICE DETAILS:
${quote.selections ? `Service Type: ${quote.selections.serviceType || "N/A"}` : ""}
${quote.selections ? `Home Size: ${quote.selections.homeSize || "N/A"}` : ""}

PRICING BREAKDOWN:
${quote.totals?.breakdown ? Object.entries(quote.totals.breakdown).map(([key, value]) => `${key}: $${value}`).join("\n") : ""}

TOTAL AMOUNT: $${quote.totals?.total || 0}

${message ? `\nADDITIONAL MESSAGE:\n${message}` : ""}

To accept this quote or proceed with payment, please visit:
${process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://mountainspringsclean.com"}/portal-quote?id=${quote.id}

If you have any questions, please don't hesitate to contact us.

Best regards,
Mountain Springs Cleaning Team
${process.env.BUSINESS_PHONE || "(702) 555-CLEAN"}
${process.env.BUSINESS_EMAIL || "bookings@mountainspringsclean.com"}
    `.trim();

    await sendEmail({
      to: quote.user?.email || "",
      subject: `Your Cleaning Quote - Mountain Springs Cleaning`,
      html: emailContent.replace(/\n/g, "<br />"),
    });

    return NextResponse.json({
      ok: true,
      message: `Quote sent to ${quote.user?.email}`,
    });
  } catch (error) {
    console.error("Error sending quote:", error);
    return NextResponse.json({ error: "Unable to send quote." }, { status: 500 });
  }
}
