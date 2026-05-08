# Admin-Core Extraction Summary

This document provides a detailed summary of what was extracted from the original AnyLLm project into the portable admin-core system.

---

## ✅ What Was Extracted

### 1. Complete App Routes

All protected/admin routes have been extracted:

- **`/admin`** — Admin dashboard with overview, stats, and management
  - Leads management
  - Quotes management
  - Jobs board
  - Schedule management
  - Business configuration

- **`/signin`** — Authentication (login page)
  - Email/PIN login form
  - Lead funnel integration
  - Test mode support

- **`/account`** — User profile & account management
  - Profile information
  - Contact details
  - Account settings

- **`/quote`** — Quote creation form
  - Pane selections
  - Add-ons configuration
  - Price calculator
  - Quote submission

- **`/portal-quote`** — Customer quote review & signing
  - Quote display
  - Payment processing via Stripe
  - Quote signing
  - Job confirmation

### 2. Complete API Routes

All backend API endpoints required for functionality:

**Authentication:**
- `POST /api/auth/login` — User login
- `POST /api/auth/logout` — User logout
- `GET /api/auth/me` — Get current user
- `POST /api/auth/test-mode` — Test mode (admins)

**Quotes:**
- `POST /api/quotes` — Create quote
- `GET /api/quotes` — List quotes (admin)
- `POST /api/send-quote` — Email quote to customer

**Jobs:**
- `POST /api/jobs` — Create job from quote
- `GET /api/jobs` — List jobs
- `PATCH /api/jobs/[id]` — Update job
- `POST /api/jobs/[id]/finish` — Complete job
- `POST /api/jobs/[id]/retry-payment` — Retry failed payment
- `POST /api/jobs/[id]/review` — Job review

**Payments (Stripe):**
- `POST /api/stripe/checkout` — Create checkout session
- `GET /api/stripe/session-job` — Get job from session
- `POST /api/stripe/capture` — Capture payment
- `POST /api/stripe/webhook` — Stripe webhook handler

**Schedule:**
- `POST /api/schedules` — Update schedule
- `GET /api/schedules` — Get schedule

**Email:**
- `POST /api/email/send` — Send email

**Files/Storage:**
- `POST /api/upload-url` — Get S3 pre-signed URL
- `GET /api/files` — List files

**Admin:**
- `GET /api/rep-stats` — Get rep statistics
- `GET /api/app-config` — Get app configuration
- `GET /api/pricing` — Get pricing config

**Other:**
- `POST /api/account` — Update account
- `POST /api/users` — Create/list users
- `POST /api/contacts` — Manage contacts
- `POST /api/bookings` — Manage bookings
- `POST /api/reviews` — Manage reviews
- `POST /api/transactions` — Transaction records

### 3. Backend Business Logic

All core business logic libraries extracted:

**Core:**
- `lib/auth.ts` — Authentication, session management, HMAC signing
- `lib/turso.ts` — Database client and schema initialization
- `lib/users.ts` — User management
- `lib/utils.ts` — Utility functions

**Quotes & Pricing:**
- `lib/quote.ts` — Quote calculations and pricing engine
- `lib/quotes.ts` — Quote CRUD operations
- `lib/pricing.ts` — Pricing types and defaults
- `lib/pricing-store.ts` — Pricing data storage

**Jobs & Payments:**
- `lib/jobs.ts` — Job creation and management
- `lib/stripe-job-sync.ts` — Sync jobs with Stripe payments
- `lib/job-payment-retry.ts` — Retry failed payments
- `lib/job-review.ts` — Job review system
- `lib/transactions.ts` — Transaction tracking

**Scheduling:**
- `lib/schedules.ts` — Schedule management
- `lib/schedule-types.ts` — Schedule type definitions
- `lib/bookings.ts` — Booking management

**Communication:**
- `lib/email.ts` — Email sending via SMTP
- `lib/contacts-store.ts` — Contact management
- `lib/reviews.ts` — Customer reviews

**File Storage:**
- `lib/r2.ts` — AWS S3/Cloudflare R2 integration

**Other:**
- `lib/seo.ts` — SEO utilities

### 4. React Components

All admin and shared UI components:

**Admin Components:**
- `components/admin-stat-cards.tsx` — KPI statistics display
- `components/admin-rep-cards.tsx` — Team member cards
- `components/admin-reps-page.tsx` — Team management page
- `components/admin-panel.tsx` — Admin dashboard container
- `components/admin-quotes-page.tsx` — Quotes management
- `components/admin-quotes-table.tsx` — Quotes data table
- `components/admin-jobs-board.tsx` — Kanban-style job board
- `components/admin-lead-quote-workspace.tsx` — Lead workspace
- `components/admin-business-config.tsx` — Business settings
- `components/admin-business-page.tsx` — Business config page
- `components/admin-schedule-view.tsx` — Schedule overview

**Schedule Components:**
- `components/schedule-board.tsx` — Weekly schedule grid
- `components/schedule-admin-links.tsx` — Schedule management links
- `components/schedule-window-settings.tsx` — Booking window config
- `components/role-schedule-admin-panel.tsx` — Role schedule admin

**Quote Components:**
- `components/price-calculator.tsx` — Interactive price calculator
- `components/portal-switcher.tsx` — Portal/role switcher

**Shared Components:**
- `components/Sidebar.tsx` — Navigation sidebar
- `components/star-rating.tsx` — Rating component
- `components/ui/*` — shadcn/ui base components (button, card, input, etc.)

### 5. Configuration Files

Centralized, editable configuration:

- `config/pricing.config.ts` — Pricing structure and add-ons
- `config/business.config.ts` — Company details and service info
- `config/email.config.ts` — SMTP settings and email templates
- `config/auth.config.ts` — Authentication configuration
- `config/stripe.config.ts` — Stripe API settings
- `config/storage.config.ts` — S3/R2 storage settings
- `config/database.config.ts` — Database settings

### 6. Documentation

Complete setup and reference documentation:

- `README.md` — Comprehensive overview
- `SETUP.md` — Detailed setup guide (5-minute quick start + full integration)
- `DEPENDENCIES.md` — All npm packages with explanations
- `.env.example` — Environment variable template
- `EXTRACTION_SUMMARY.md` — This file

### 7. Configuration Files

Tool configuration files:

- `tsconfig.json` — TypeScript configuration
- `components.json` — shadcn/ui configuration
- `postcss.config.mjs` — PostCSS configuration
- `eslint.config.mjs` — ESLint configuration
- `next.config.ts/js` — Next.js configuration

---

## 📋 Database Schema

The following Turso (LibSQL) tables are created automatically:

```sql
-- Business configuration
CREATE TABLE app_config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL
)

-- User accounts (admin, rep, tech)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TEXT,
  data TEXT NOT NULL
)

-- Service jobs from quotes
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  payment_intent_id TEXT UNIQUE,
  created_at TEXT,
  data TEXT NOT NULL
)

-- Payment transactions
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  transaction_key TEXT NOT NULL UNIQUE,
  payment_intent_id TEXT,
  stripe_session_id TEXT,
  job_id TEXT,
  created_at TEXT,
  updated_at TEXT,
  data TEXT NOT NULL
)

-- Customer contacts
CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT,
  data TEXT NOT NULL
)

-- Weekly schedules
CREATE TABLE schedules (
  week_start TEXT PRIMARY KEY,
  updated_at TEXT,
  data TEXT NOT NULL
)

-- Customer quotes
CREATE TABLE quotes (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  data TEXT NOT NULL
)

-- Booking sessions
CREATE TABLE bookings (
  session_id TEXT PRIMARY KEY,
  created_at TEXT,
  data TEXT NOT NULL
)

-- Customer reviews
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  job_id TEXT,
  tech_email TEXT,
  data TEXT NOT NULL
)
```

---

## 🎯 What Was NOT Extracted

The following marketing/public-facing features were intentionally NOT extracted (they're not part of the core admin system):

### Marketing Pages (not extracted)
- `/` — Home page
- `/about` — About page
- `/pricing` — Public pricing page
- `/services` — Services listing
- `/service-areas` — Service area pages
- `/faq` — FAQ page
- `/how-it-works` — How it works page
- `/careers` — Careers page
- `/before-after` — Before/after gallery
- `/customer-quote` — Customer quote landing
- `/close-deal` — Deal closing page
- `/rep-stats` — Public rep stats (tech-facing view)
- `/reviews` — Public reviews
- `/schedule` — Public schedule (tech-facing)
- `/success` — Stripe success page
- `/setup` — Account setup flow

### Marketing Components (not extracted)
- `components/public-*.tsx` — Marketing components
- `components/public-marketing-shell.tsx` — Marketing layout
- `components/public-site-header.tsx` — Marketing header
- `components/public-site-footer.tsx` — Marketing footer
- `components/MarketingPageHero.tsx`
- `components/MarketingPageCtaPanel.tsx`
- `components/commercial-proof-section.tsx`
- etc.

### Marketing Libraries (not extracted)
- `lib/public-business.ts/server.ts` — Public business info
- `lib/marketing-content.ts` — Marketing copy
- `lib/landing-stock-media.ts` — Stock image config
- `lib/portal-routes.ts` — Public portal routes
- etc.

**Reason:** The admin-core focuses on the backend/admin system. Marketing pages depend on your specific branding and should be built separately in your project.

---

## 🔧 Import Paths

The extracted code uses absolute imports from the original project:

```typescript
// Original pattern in admin-core/lib files:
import { ... } from "@/lib/auth"
import { ... } from "@/lib/turso"
```

**Current status:** These imports will work as-is IF you:
1. Copy admin-core into your Next.js project (any project root)
2. Configure `tsconfig.json` with the `@` alias to point to `admin-core/lib`

OR you can update imports manually after extraction.

**Option 1: Alias configuration (recommended)**
In your project's `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/lib/*": ["admin-core/lib/*"],
      "@/components/*": ["admin-core/components/*"],
      "@/config/*": ["admin-core/config/*"]
    }
  }
}
```

**Option 2: Update imports (manual)**
Replace all `@/lib/` with `./admin-core/lib/`, etc.

---

## ⚠️ Known Limitations & Caveats

### 1. Imports in Copied Files

The copied files still use `@/` absolute imports. You need to:
- **Either:** Configure `tsconfig.json` with path aliases
- **Or:** Run a search-replace to update imports

**No broken imports** — If you set up the path alias, everything will work.

### 2. Missing Root App Layout

The extracted admin-core includes:
- `app/layout.tsx` — Root layout
- `app/error.tsx` — Error boundary
- `app/global-error.tsx` — Global error handler

But your main project might need additional:
- Providers (Redux, etc.)
- Fonts/typography
- Global styles

**Action:** Review your main project's `app/layout.tsx` and merge any custom setup into admin-core's version.

### 3. Next.js Configuration

The extracted `next.config.ts/js` may need merging with your project's existing config if you have:
- Custom webpack config
- Custom plugins
- Environment-specific settings

**Action:** Review and merge if needed.

### 4. Styling Setup

Admin-core includes:
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- shadcn/ui components
- Custom admin styling

If your project uses a different CSS framework:
- Install Tailwind: `npm install -D tailwindcss @tailwindcss/postcss`
- Copy `postcss.config.mjs` and ensure it's loaded

### 5. Database Dependency

Admin-core requires a Turso (LibSQL) database.

**If you want to use a different database:**
- Rewrite `lib/turso.ts` to use your DB client (PostgreSQL, MySQL, MongoDB, etc.)
- Update schema in `lib/turso.ts`

It's possible but requires code changes. Turso is recommended for simplicity.

### 6. Stripe Required for Payments

Payment features require Stripe.

**If you want to use a different payment processor:**
- Replace `lib/stripe-job-sync.ts`
- Replace `/api/stripe/*` routes
- Update checkout logic in quote pages

### 7. SMTP Required for Email

Email sending requires SMTP configuration.

**If you want to use a different email service:**
- Rewrite `lib/email.ts` to use your email service (SendGrid, AWS SES, etc.)
- Update email route `/api/email/send`

### 8. S3 Required for File Uploads

File uploads require AWS S3 or Cloudflare R2.

**If you don't need file uploads:**
- Remove `/api/upload-url` and `/api/files`
- Remove file upload UI from quote pages

**If you want to use a different storage:**
- Rewrite `lib/r2.ts` to use your storage service (Supabase, etc.)

---

## 🎬 Getting Started

### Step 1: Copy Into Your Project

```bash
cp -r admin-core /path/to/your/next-js-project/
```

### Step 2: Review This File

You're reading it! ✅

### Step 3: Read SETUP.md

```bash
cat admin-core/SETUP.md
```

This has the complete setup guide.

### Step 4: Install Dependencies

```bash
npm install
```

See `DEPENDENCIES.md` for what's needed.

### Step 5: Set Up Environment Variables

```bash
cp admin-core/.env.example .env
# Edit .env with your values
```

### Step 6: Configure Services

- Turso database
- Stripe account
- SMTP/Email
- AWS S3 or Cloudflare R2

### Step 7: Start Development

```bash
npm run dev
# Visit http://localhost:3000/signin
```

### Step 8: Create Admin User

First time setup:
```bash
# Use the POST /api/auth/test-mode endpoint
# Or set up manually in database
```

### Step 9: Test All Features

- Create quotes
- Send quotes to customers
- Process test Stripe payment
- Check job creation
- Verify email sending

### Step 10: Customize & Deploy

- Edit pricing in `config/pricing.config.ts`
- Edit business info in `config/business.config.ts`
- Customize components as needed
- Deploy to Vercel, AWS, or your preferred platform

---

## 📊 File Count Summary

**Extracted Files:**
- App routes: 5 sections (admin, signin, account, quote, portal-quote)
- API routes: 40+ endpoints
- Components: 30+ React components
- Libraries: 25+ TypeScript modules
- Config files: 7 configuration files
- Documentation: 4 markdown guides
- Config files: tsconfig, postcss, eslint, components.json, next.config

**Total: 100+ files extracted**

---

## ✨ Next Steps

1. **Read SETUP.md** for complete integration instructions
2. **Review DEPENDENCIES.md** for npm packages
3. **Copy admin-core to your project**
4. **Install dependencies: `npm install`**
5. **Set up environment variables**
6. **Configure external services (database, Stripe, email, storage)**
7. **Start development server**
8. **Test all features**
9. **Customize configuration files**
10. **Deploy to production**

---

## 🆘 Troubleshooting

### Import Errors

If you see `Cannot find module '@/lib/...'`:
1. Check `tsconfig.json` has correct path aliases
2. Or update imports to relative paths
3. See "Import Paths" section above

### Database Not Connecting

Check:
- `TURSO_DATABASE_URL` is set
- `TURSO_AUTH_TOKEN` is set
- Database URL is valid from turso.tech

### Missing Dependencies

Run: `npm install` (or see DEPENDENCIES.md)

### Build Errors

Check Node version: `node --version` (needs ≥ 20.9.0)

### Email Not Sending

Verify SMTP credentials:
- Host, port, user, password
- Firewall allows outbound SMTP
- `FROM_EMAIL` is valid

### Stripe Webhook Not Triggering

Test locally with Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 📝 Documentation Files

- **README.md** — Overview and feature summary
- **SETUP.md** — Complete setup guide (recommended reading)
- **DEPENDENCIES.md** — All npm packages explained
- **EXTRACTION_SUMMARY.md** — This file (detailed extraction info)

---

## 🎉 You're Ready!

The admin-core is now ready to be copied into your Next.js project. Follow SETUP.md for the complete integration process.

Good luck! 🚀
