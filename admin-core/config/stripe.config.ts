// Stripe payment configuration for the admin-core system.

export interface StripeConfig {
  secretKey: string;
  publishableKey: string;
  apiVersion: string;
}

/**
 * Get Stripe configuration from environment variables.
 */
export function getStripeConfig(): Omit<StripeConfig, "publishableKey"> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const apiVersion = process.env.STRIPE_API_VERSION || "2024-11-20.acacia";

  if (!secretKey) {
    throw new Error("Stripe secret key not configured. Set STRIPE_SECRET_KEY in .env");
  }

  return { secretKey, apiVersion };
}

/**
 * Get publishable Stripe key for client-side use.
 */
export function getStripePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error(
      "Stripe publishable key not configured. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env"
    );
  }
  return key;
}

/**
 * Check if Stripe is configured.
 */
export function isStripeConfigured(): boolean {
  return (
    Boolean(process.env.STRIPE_SECRET_KEY) &&
    Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  );
}

/**
 * Stripe webhook settings.
 */
export const STRIPE_WEBHOOK = {
  secret: process.env.STRIPE_WEBHOOK_SECRET || "",
  events: [
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "checkout.session.completed",
  ],
};
