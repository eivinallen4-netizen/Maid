# Admin-Core Quick Reference

Fast lookup guide for common tasks and file locations.

---

## 🎯 I Want To...

### Set up admin-core in my project
→ Read **SETUP.md**

### Understand what was extracted
→ Read **EXTRACTION_SUMMARY.md**

### See all files and folders
→ Read **FOLDER_STRUCTURE.md**

### Change pricing
→ Edit **config/pricing.config.ts**

### Update business information
→ Edit **config/business.config.ts**

### Customize email templates
→ Edit **config/email.config.ts**

### Modify authentication settings
→ Edit **config/auth.config.ts**

### Add an admin dashboard stat
→ Edit **components/admin-stat-cards.tsx**

### Customize the login page
→ Edit **app/signin/page.tsx** and **SignInForm.tsx**

### Modify the quote form
→ Edit **app/quote/page.tsx**

### Change the customer portal
→ Edit **app/portal-quote/page.tsx**

### Create a new API endpoint
→ Create new file in **app/api/** folder

### Add a new React component
→ Create new file in **components/** folder

### Add business logic
→ Create new file in **lib/** folder

### Configure external services
→ Edit **.env** (copy from .env.example first)

### Understand API endpoints
→ See **README.md** API Routes section

### Deploy to production
→ Read **SETUP.md** Deployment section

---

## 📁 Key Files by Purpose

### Configuration & Setup
```
.env                           ← Your environment variables
.env.example                   ← Template (copy this to .env)
config/pricing.config.ts       ← Pricing structure
config/business.config.ts      ← Company details
config/email.config.ts         ← Email templates
config/auth.config.ts          ← Auth settings
tsconfig.json                  ← TypeScript config
next.config.ts                 ← Next.js config
```

### Authentication & Users
```
app/api/auth/login/route.ts    ← Login endpoint
app/api/auth/logout/route.ts   ← Logout endpoint
app/signin/page.tsx            ← Login page
lib/auth.ts                    ← Auth logic
app/account/page.tsx           ← User profile
```

### Quotes & Pricing
```
app/quote/page.tsx             ← Quote builder
lib/quote.ts                   ← Quote calculations
lib/quotes.ts                  ← Quote CRUD
app/api/quotes/route.ts        ← Quote API
config/pricing.config.ts       ← Pricing config
```

### Payment Processing
```
app/portal-quote/page.tsx      ← Customer portal
app/api/stripe/checkout        ← Create checkout
app/api/stripe/webhook         ← Stripe webhooks
lib/stripe-job-sync.ts         ← Job/payment sync
```

### Jobs & Scheduling
```
app/admin/page.tsx             ← Admin dashboard
app/api/jobs/route.ts          ← Job API
lib/jobs.ts                    ← Job logic
app/api/schedules/route.ts     ← Schedule API
lib/schedules.ts               ← Schedule logic
components/schedule-*.tsx      ← Schedule UI
```

### Email & Communication
```
app/api/email/send/route.ts    ← Email API
lib/email.ts                   ← Email logic
config/email.config.ts         ← Email config
```

### Database
```
lib/turso.ts                   ← Database client
config/database.config.ts      ← DB config
```

### File Storage
```
app/api/upload-url/route.ts    ← Get upload URL
lib/r2.ts                      ← Storage logic
config/storage.config.ts       ← Storage config
```

### UI Components
```
components/admin-*.tsx         ← Admin components
components/ui/                 ← Base UI components
components/Sidebar.tsx         ← Navigation
```

---

## 🔧 Common Tasks

### Change pricing for a pane type
```typescript
// config/pricing.config.ts
export const defaultPricing = {
  paneTypes: {
    standard: 7,        ← Change this value
    specialty: 15,
    french: 3,
  },
  // ...
};
```

### Update company name
```typescript
// config/business.config.ts
export const defaultBusinessConfig = {
  companyName: "Your Company Name",  ← Change this
  // ...
};
```

### Add a new email template
```typescript
// config/email.config.ts
export function createCustomEmailTemplate(
  customerName: string
): string {
  return `
    <h2>Your Custom Email</h2>
    <p>Hi ${customerName},</p>
    <!-- Your template here -->
  `;
}
```

### Create a new API endpoint
```typescript
// app/api/your-endpoint/route.ts
import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  // Your logic here
  
  return NextResponse.json({ success: true });
}
```

### Add a new admin stat
```typescript
// components/admin-stat-cards.tsx
<StatCard
  title="Your Stat"
  value={yourValue}
  icon={<YourIcon />}
/>
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Overview and features |
| SETUP.md | **Start here** — Complete setup guide |
| DEPENDENCIES.md | All npm packages explained |
| EXTRACTION_SUMMARY.md | What was extracted and why |
| FOLDER_STRUCTURE.md | Complete folder tree |
| QUICK_REFERENCE.md | This file |

---

## 🌐 External Services

### Turso Database
- URL: https://turso.tech
- Get: Database URL and auth token
- Add to `.env`: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`

### Stripe Payments
- URL: https://stripe.com
- Get: Secret key and publishable key
- Add to `.env`: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### SMTP Email
- Provider options: Gmail, SendGrid, Mailgun, AWS SES
- Get: Host, port, user, password
- Add to `.env`: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

### AWS S3 / Cloudflare R2
- URL: https://aws.amazon.com/s3 or https://cloudflare.com
- Get: Access key, secret, bucket name
- Add to `.env`: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`

---

## 🐛 Common Issues

### "Cannot find module '@/lib/...'"
→ Check `tsconfig.json` has path aliases configured

### "Database connection error"
→ Check `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in `.env`

### "AUTH_SECRET is not configured"
→ Generate with: `openssl rand -hex 16`
→ Add to `.env`

### "Email not sending"
→ Verify SMTP settings in `.env`
→ Check firewall allows outbound SMTP

### "Stripe webhook not triggering"
→ Test locally with: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

---

## 📋 Node Version Check

```bash
node --version  # Should be >= 20.9.0
npm --version   # Should be >= 9.0
```

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Run linter
npm run lint

# Generate sitemap (if needed)
npm run sm
```

---

## 🔐 Environment Variables Checklist

### Required
- [ ] TURSO_DATABASE_URL
- [ ] TURSO_AUTH_TOKEN
- [ ] AUTH_SECRET
- [ ] STRIPE_SECRET_KEY
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- [ ] SMTP_HOST
- [ ] SMTP_PORT
- [ ] SMTP_USER
- [ ] SMTP_PASS
- [ ] FROM_EMAIL
- [ ] AWS_ACCESS_KEY_ID
- [ ] AWS_SECRET_ACCESS_KEY
- [ ] AWS_S3_BUCKET

### Optional
- [ ] BUSINESS_NAME
- [ ] BUSINESS_EMAIL
- [ ] WEBSITE_URL
- [ ] TIMEZONE

---

## 📞 Getting Help

1. Read **SETUP.md** for detailed instructions
2. Check **EXTRACTION_SUMMARY.md** for what's included
3. Review **FOLDER_STRUCTURE.md** for file locations
4. Look in appropriate documentation file for your task
5. Check server logs for error messages

---

Good luck! 🚀
