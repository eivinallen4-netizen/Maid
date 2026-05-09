import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { defaultPricing } from "@/config/pricing.config";
import { createQuote } from "@/lib/quotes";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeApiVersion: Stripe.LatestApiVersion =
  (process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion) ?? "2026-02-25.clover";

function getSiteUrl(request: Request) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || null;
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = request.headers.get("host");
  const requestHost = forwardedHost || host || new URL(request.url).host;
  const requestIsLocal =
    requestHost.includes("localhost") || requestHost.startsWith("127.0.0.1");
  const envIsLocal = envUrl
    ? envUrl.includes("localhost") || envUrl.includes("127.0.0.1")
    : false;

  if (envUrl && (!envIsLocal || requestIsLocal)) {
    return envUrl;
  }

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  if (host) {
    const protocol = host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
    return `${protocol}://${host}`;
  }

  const url = new URL(request.url);
  return url.origin;
}

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

interface ServiceSelections {
  serviceType?: string;
  homeSize?: string;
  addons?: Record<string, boolean>;
}

export async function POST(request: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json({ error: "Stripe secret key is not configured." }, { status: 500 });
  }

  try {
    // Auth is optional - allows both authenticated reps and public customers
    const authSession = await getSessionFromRequest(request);

    const body = (await request.json()) as {
      user?: {
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
      };
      selections?: ServiceSelections;
      serviceDate?: string;
      serviceTime?: string;
    };

    if (!body.user?.name || !body.user.email || !isValidEmail(body.user.email)) {
      return NextResponse.json({ error: "Valid name and email are required." }, { status: 400 });
    }

    if (!body.selections?.serviceType || !body.selections?.homeSize) {
      return NextResponse.json(
        { error: "Service type and home size are required." },
        { status: 400 }
      );
    }

    // Calculate pricing based on selections
    let total = defaultPricing.serviceTypes[body.selections.serviceType as keyof typeof defaultPricing.serviceTypes] || 0;

    // Add home size surcharge (3bed and above)
    if (body.selections.homeSize !== "1bed" && body.selections.homeSize !== "2bed") {
      const surcharge =
        defaultPricing.homeSizeSurcharge[
          body.selections.homeSize as keyof typeof defaultPricing.homeSizeSurcharge
        ] || 0;
      total += surcharge;
    }

    // Add selected addons
    if (body.selections.addons) {
      Object.entries(body.selections.addons).forEach(([addon, selected]) => {
        if (
          selected &&
          addon in defaultPricing.addons
        ) {
          total += defaultPricing.addons[addon as keyof typeof defaultPricing.addons];
        }
      });
    }

    // Apply minimum
    total = Math.max(total, defaultPricing.jobMinimum);

    const stripe = new Stripe(stripeSecretKey, { apiVersion: stripeApiVersion });
    const siteUrl = getSiteUrl(request);

    const customer = await stripe.customers.create({
      name: body.user.name,
      email: body.user.email,
      address: body.user.address
        ? {
            line1: body.user.address,
            country: "US",
          }
        : undefined,
    });

    // Create line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const serviceTypeLabel = body.selections.serviceType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Add service type
    lineItems.push({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(total * 100),
        product_data: {
          name: `${serviceTypeLabel} Cleaning - ${body.selections.homeSize.toUpperCase()}`,
          description: `Service Date: ${body.serviceDate || "To be scheduled"}`,
        },
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
      metadata: {
        customer_name: body.user.name,
        customer_email: body.user.email,
        customer_address: body.user.address || "",
        serviceType: body.selections.serviceType,
        homeSize: body.selections.homeSize,
        service_date: body.serviceDate || "",
        service_time: body.serviceTime || "",
        ...(authSession && { rep_email: authSession.email, rep_name: authSession.name || authSession.email }),
      },
      payment_intent_data: {
        metadata: {
          serviceType: body.selections.serviceType,
          homeSize: body.selections.homeSize,
          service_date: body.serviceDate || "",
          service_time: body.serviceTime || "",
        },
      },
    });

    // Create quote record
    try {
      await createQuote({
        id: session.id.replace(/^cs_/, "quote_"),
        user: {
          name: body.user.name,
          email: body.user.email,
          phone: body.user.phone,
          address: body.user.address,
        },
        rep: authSession
          ? {
              name: authSession.name ?? authSession.email,
              email: authSession.email,
            }
          : undefined,
        selections: body.selections as any,
        totals: {
          base: total,
          storySurcharge: 0,
          addonsTotal: 0,
          subtotal: total,
          total,
          minimumApplied: false,
        },
        created_at: new Date().toISOString(),
      });
    } catch (quoteError) {
      console.error("Error creating quote record:", quoteError);
      // Continue anyway, the payment session was created
    }

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Unable to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
