// Email configuration for the admin-core system.
// Configure SMTP settings in your .env file.

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

/**
 * Get email configuration from environment variables.
 * All variables must be set in your .env file.
 */
export function getEmailConfig(): EmailConfig {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASS;
  const fromEmail = process.env.FROM_EMAIL;
  const fromName = process.env.FROM_NAME || "Admin";

  if (!host || !port || !user || !password || !fromEmail) {
    throw new Error("Email configuration incomplete. Check your .env file.");
  }

  return {
    host,
    port: Number(port),
    secure: Number(port) === 465,
    user,
    password,
    fromEmail,
    fromName,
  };
}

/**
 * Email template: Quote notification
 */
export function createQuoteEmailTemplate(
  customerName: string,
  quoteLink: string,
  quoteAmount: number
): string {
  return `
    <h2>Your Quote is Ready</h2>
    <p>Hi ${customerName},</p>
    <p>Your quote for $${quoteAmount.toFixed(2)} is ready for review and signing.</p>
    <a href="${quoteLink}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
      Review & Sign Quote
    </a>
    <p>Thank you for your business!</p>
  `;
}

/**
 * Email template: Job confirmation
 */
export function createJobConfirmationEmailTemplate(
  customerName: string,
  jobDetails: string,
  scheduledDate?: string
): string {
  return `
    <h2>Job Confirmed</h2>
    <p>Hi ${customerName},</p>
    <p>Your job has been confirmed and scheduled.</p>
    <p><strong>Job Details:</strong><br/>${jobDetails}</p>
    ${scheduledDate ? `<p><strong>Scheduled Date:</strong> ${scheduledDate}</p>` : ""}
    <p>We'll contact you with any updates.</p>
  `;
}

/**
 * Email template: Payment confirmation
 */
export function createPaymentConfirmationEmailTemplate(
  customerName: string,
  amount: number,
  transactionId: string
): string {
  return `
    <h2>Payment Confirmed</h2>
    <p>Hi ${customerName},</p>
    <p>We've received your payment of $${amount.toFixed(2)}.</p>
    <p><strong>Transaction ID:</strong> ${transactionId}</p>
    <p>Your job is now scheduled. We'll be in touch with more details.</p>
  `;
}
