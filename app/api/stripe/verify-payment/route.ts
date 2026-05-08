import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeApiVersion: Stripe.LatestApiVersion =
  (process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion) ?? "2026-02-25.clover";

export async function POST(request: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  try {
    const body = (await request.json()) as { sessionId?: string };
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required." }, { status: 400 });
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: stripeApiVersion });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Session not found." }, { status: 404 });
    }

    const paymentIntent = session.payment_intent
      ? typeof session.payment_intent === "string"
        ? await stripe.paymentIntents.retrieve(session.payment_intent)
        : session.payment_intent
      : null;

    return NextResponse.json({
      verified: session.payment_status === "paid",
      session: {
        id: session.id,
        status: session.payment_status,
        total: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_email,
        createdAt: new Date(session.created * 1000).toISOString(),
      },
      paymentIntent: paymentIntent
        ? {
            id: paymentIntent.id,
            status: paymentIntent.status,
            amount: paymentIntent.amount,
          }
        : null,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    const message = error instanceof Error ? error.message : "Unable to verify payment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
