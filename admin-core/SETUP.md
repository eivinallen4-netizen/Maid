# Admin-Core Setup Guide

Welcome to Admin-Core, a portable admin/CRM/quote system starter for Next.js applications.

This guide walks you through integrating admin-core into your Next.js project.

## Quick Start (5 minutes)

### 1. Copy admin-core into your project

```bash
# From your main project root
cp -r /path/to/admin-core ./admin-core
```

### 2. Install dependencies

```bash
npm install
# or with the explicit list (see DEPENDENCIES.md)
npm install stripe nodemailer @libsql/client @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### 3. Create `.env` file

```bash
cp admin-core/.env.example .env
```

Then edit `.env` and fill in your configuration values (see "Configuration" section below).

### 4. Start the dev server

```bash
npm run dev
```

Visit `http://localhost:3000/signin` to log in.

---

## Full Integration Guide

### A. File Structure

After copying admin-core, your project will have:

```
your-project/
├── admin-core/
│   ├── app/
│   │   ├── admin/           # Admin dashboard
│   │   ├── signin/          # Login page
│   │   ├── account/         # User profile
│   │   ├── quote/           # Create quotes
│   │   ├── portal-quote/    # Customer quote review
│   │   └── api/
│   │       ├── auth/        # Authentication endpoints
│   │       ├── quotes/      # Quote CRUD
│   │       ├── jobs/        # Job management
│   │       ├── stripe/      # Payment processing
│   │       ├── email/       # Email sending
│   │       └── ...
│   ├── components/
│   │   ├── admin-*.tsx      # Admin UI components
│   │   ├── ui/              # shadcn/ui base components
│   │   └── ...
│   ├── lib/
│   │   ├── auth.ts          # Authentication logic
│   │   ├── turso.ts         # Database client
│   │   ├── quote.ts         # Quote calculations
│   │   ├── email.ts         # Email sending
│   │   ├── stripe-*.ts      # Stripe integrations
│   │   └── ...
│   ├── config/              # Editable configuration files
│   ├── .env.example         # Environment template
│   ├── SETUP.md             # This file
│   └── DEPENDENCIES.md      # Required packages
├── .env                     # Your environment variables
├── package.json
├── tsconfig.json
└── ...
```

### B. Configuration

All editable configuration is in `admin-core/config/`:

#### 1. **Pricing** (`config/pricing.config.ts`)

Edit pane types, add-ons, and job minimums:

```typescript
export const defaultPricing = {
  paneTypes: {
    standard: 7,      // Price per pane
    specialty: 15,
    french: 3,
  },
  jobMinimum: 150,    // Minimum job price
  addons: {
    screen: 3.5,
    track: 4,
    hard_water: 15,
    interior: 5,
  },
};
```

#### 2. **Business Info** (`config/business.config.ts`)

Update company details:

```typescript
export const defaultBusinessConfig = {
  companyName: "Your Company Name",
  companyEmail: "info@yourcompany.com",
  companyPhone: "+1 (555) 123-4567",
  websiteUrl: "https://yourcompany.com",
  timezone: "America/New_York",
  currency: "USD",
};
```

#### 3. **Email Templates** (`config/email.config.ts`)

Customize email templates for quotes, confirmations, and payments.

#### 4. **Authentication** (`config/auth.config.ts`)

Adjust session timeout and role-based permissions:

```typescript
export const rolePermissions = {
  admin: ["/admin", "/admin/leads", "/account", ...],
  rep: ["/account", "/quote", ...],
  tech: ["/account"],
};
```

### C. Environment Variables

**Required variables (get these first!):**

1. **Database** - Turso
   - `TURSO_DATABASE_URL` - Get from turso.tech dashboard
   - `TURSO_AUTH_TOKEN` - Get from turso.tech dashboard

2. **Authentication**
   - `AUTH_SECRET` - Generate with: `openssl rand -hex 16` (or any 32-char random string)

3. **Stripe** (for payments)
   - `STRIPE_SECRET_KEY` - From stripe.com/dashboard
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - From stripe.com/dashboard

4. **Email** (SMTP)
   - `SMTP_HOST` - e.g., smtp.gmail.com
   - `SMTP_PORT` - e.g., 587
   - `SMTP_USER` - Your email address
   - `SMTP_PASS` - Your password or app password
   - `FROM_EMAIL` - Email to send from

5. **File Storage** (S3 or Cloudflare R2)
   - `AWS_ACCESS_KEY_ID` - Your access key
   - `AWS_SECRET_ACCESS_KEY` - Your secret key
   - `AWS_S3_BUCKET` - Your bucket name

**Generating AUTH_SECRET:**

```bash
# On macOS/Linux:
openssl rand -hex 16

# On Windows PowerShell:
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Or any other random 32-character string (lowercase hex)
```

### D. Database Setup

#### For Turso (Recommended)

1. Sign up at [turso.tech](https://turso.tech)
2. Create a new database
3. Get your database URL and auth token from the dashboard
4. Add to your `.env`:
   ```
   TURSO_DATABASE_URL=libsql://your-db-name.turso.io
   TURSO_AUTH_TOKEN=your-token
   ```

#### For Local SQLite (Development)

Use for local development without creating a Turso account:

```env
DATABASE_URL=file:local.db
TURSO_AUTH_TOKEN=placeholder
```

**Note:** Local SQLite doesn't require auth; the auth token can be any value.

### E. External Service Setup

#### Stripe (Payments)

1. Sign up at [stripe.com](https://stripe.com)
2. Go to Settings → API Keys
3. Copy your Secret Key and Publishable Key
4. For webhooks:
   - Go to Developers → Webhooks
   - Create endpoint for `/api/stripe/webhook`
   - Listen for: `payment_intent.succeeded`, `checkout.session.completed`
   - Get your webhook secret

#### SMTP Email

**Gmail:**
1. Enable 2-factor authentication
2. Generate an app password: myaccount.google.com → App passwords
3. Use your email and app password in `.env`

**SendGrid:**
1. Create account at sendgrid.com
2. Create an API key
3. Use `apikey` as username, API key as password

**Other providers:** Use their SMTP credentials

#### AWS S3 or Cloudflare R2

**AWS S3:**
1. Create IAM user with S3 access
2. Generate access keys
3. Create S3 bucket
4. Add to `.env`:
   ```
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   AWS_S3_BUCKET=your-bucket-name
   ```

**Cloudflare R2** (cheaper alternative):
1. Sign up at cloudflare.com
2. Create R2 bucket
3. Create API token with R2 access
4. Add to `.env`:
   ```
   R2_ENDPOINT=https://your-account.r2.cloudflarestorage.com
   R2_BUCKET_NAME=your-bucket
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   ```

---

## Features

### Admin Dashboard (`/admin`)

- **Overview**: Key metrics (revenue, leads, conversion)
- **Leads**: Manage potential customers
- **Quotes**: View and manage quotes
- **Jobs**: Track service jobs and payments
- **Schedule**: Manage rep/tech availability
- **Business Config**: Edit pricing and settings

**Access Control:**
- Admins can access everything
- Reps can create quotes, view their own account
- Techs can only view their account

### Quote System

**Customer Flow:**
1. Customer fills out quote form at `/quote`
2. Admin receives email and can email quote to customer
3. Customer reviews quote at `/portal-quote`
4. Customer pays via Stripe
5. Job is created and assigned

**Create Quote Manually:**

```bash
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -H "Cookie: pb_session=your_session_token" \
  -d '{
    "customerEmail": "customer@example.com",
    "customerName": "John Doe",
    "selections": {
      "paneCounts": {"standard": 10},
      "storyLevel": "1-2",
      "addons": {"screen": true}
    }
  }'
```

### Job Payment Processing

1. Quote is paid via `/api/stripe/checkout`
2. Stripe webhook at `/api/stripe/webhook` updates job status
3. Job status synced via `lib/stripe-job-sync.ts`
4. Customer receives payment confirmation email

### Email Sending

Emails are sent for:
- Quote notifications
- Payment confirmations
- Job scheduling
- Review requests

Edit templates in `config/email.config.ts`

---

## Testing

### Test Login Credentials

After setup, you need to create admin user. First time:

```bash
# Set up test admin (one-time)
# POST to /api/auth/test-mode with admin credentials
curl -X POST http://localhost:3000/api/auth/test-mode \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourcompany.com",
    "pin": "1234"
  }'
```

Then log in at `/signin` with those credentials.

### Testing Payments

Use Stripe test mode:
- Card: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: any 3 digits

### Testing Email

Use Mailtrap or similar for email testing without sending real emails.

---

## Customization

### Adding a Custom Admin Stat

1. Update `defaultPricing` or `defaultBusinessConfig`
2. Edit `components/admin-stat-cards.tsx`:
   ```typescript
   <StatCard
     title="Your Stat"
     value={yourValue}
     icon={<YourIcon />}
   />
   ```
3. Fetch data via `/api/rep-stats`

### Adding a New Role

1. Add role to `AppAuthRole` in `config/auth.config.ts`:
   ```typescript
   export type AppAuthRole = "admin" | "rep" | "tech" | "supervisor";
   ```
2. Add permissions in `rolePermissions`
3. Update login logic in `app/api/auth/login/route.ts`

### Changing Database Schema

Edit `lib/turso.ts` in the `ensureSchema()` function to add/modify tables.

---

## Deployment

### Deploy to Vercel

```bash
# Add environment variables to Vercel
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN
vercel env add STRIPE_SECRET_KEY
# ... etc for all .env variables

# Deploy
vercel deploy --prod
```

### Deploy to Other Platforms

Same process: set environment variables, then deploy.

**Key settings:**
- Node version: ≥ 20.9.0
- Build command: `npm run build`
- Start command: `npm start`

---

## Troubleshooting

### Database Connection Error

```
Error: Turso is not configured.
```

Check:
- `TURSO_DATABASE_URL` is set
- `TURSO_AUTH_TOKEN` is set
- Database URL is valid (turso.tech dashboard)

### Authentication Failed

```
AUTH_SECRET is not configured.
```

Generate a new secret:
```bash
openssl rand -hex 16
```

### Email Not Sending

Check SMTP settings:
- Host and port are correct
- Username and password are correct
- Firewall allows outbound SMTP

### Stripe Webhook Not Triggering

```bash
# Test webhook locally
npm install -g stripe-cli

stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger payment_intent.succeeded
```

### File Upload Issues

Check S3 credentials:
- Access key and secret are correct
- Bucket exists
- IAM policy includes S3 permissions
- Bucket is not public (for security)

---

## Support

For issues or questions:

1. Check `DEPENDENCIES.md` for required packages
2. Review `TESTING_GUIDE.md` for testing checklist
3. Check environment variables in `.env.example`
4. Review log output for detailed error messages

---

## Next Steps

1. ✅ Copy admin-core to your project
2. ✅ Install dependencies
3. ✅ Create `.env` file
4. ✅ Set up Turso database
5. ✅ Set up Stripe account
6. ✅ Set up SMTP/email
7. ✅ Set up S3/R2 storage
8. ✅ Start dev server
9. ✅ Create admin user
10. ✅ Test all features
11. ✅ Deploy to production

Good luck! 🚀
