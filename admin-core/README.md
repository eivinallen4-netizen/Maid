# Admin-Core: Portable Admin/CRM/Quote System

A production-ready, portable admin dashboard, CRM, and quote management system for Next.js applications. Extract, configure, and drop into any Next.js project with minimal setup.

## ✨ Features

- **Admin Dashboard** — Overview, metrics, team management, business configuration
- **Authentication** — Role-based access (admin, rep, tech) with secure session tokens
- **Quote System** — Create, send, and track quotes with automatic calculations
- **Payment Processing** — Stripe integration for quote checkout and job payments
- **Job Management** — Convert quotes to jobs, track status, manage payments
- **Schedule Management** — Rep/tech availability scheduling
- **Email System** — Transactional emails for quotes, payments, notifications
- **File Storage** — S3/Cloudflare R2 integration for uploads
- **Responsive Design** — Mobile-first UI with Tailwind CSS and shadcn/ui
- **TypeScript** — Full TypeScript support for type safety

## 🚀 Quick Start

### 1. Copy admin-core to your Next.js project

```bash
cp -r admin-core /path/to/your/project/
cd /path/to/your/project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp admin-core/.env.example .env
# Edit .env with your configuration values
```

### 4. Configure services

- **Database:** [Turso](https://turso.tech) (LibSQL)
- **Payments:** [Stripe](https://stripe.com)
- **Email:** SMTP (Gmail, SendGrid, etc.)
- **Storage:** AWS S3 or [Cloudflare R2](https://www.cloudflare.com/products/r2/)

See [SETUP.md](./SETUP.md) for detailed instructions.

### 5. Run development server

```bash
npm run dev
```

Visit `http://localhost:3000/signin` to log in.

---

## 📁 Directory Structure

```
admin-core/
├── app/                          # Next.js App Router
│   ├── admin/                   # Admin dashboard & management
│   ├── signin/                  # Authentication
│   ├── account/                 # User profile
│   ├── quote/                   # Create quotes
│   ├── portal-quote/            # Customer quote review
│   └── api/                     # REST API endpoints
│       ├── auth/                # Login/logout
│       ├── quotes/              # Quote CRUD
│       ├── jobs/                # Job management
│       ├── stripe/              # Payment processing
│       ├── email/               # Email sending
│       ├── schedules/           # Schedule management
│       └── ...
├── components/                   # React components
│   ├── admin-*.tsx             # Admin UI components
│   ├── ui/                      # shadcn/ui components
│   ├── schedule-*.tsx           # Schedule components
│   └── ...
├── lib/                         # Backend business logic
│   ├── auth.ts                 # Session & authentication
│   ├── turso.ts                # Database client
│   ├── quote.ts                # Quote calculations
│   ├── quotes.ts               # Quote CRUD
│   ├── jobs.ts                 # Job management
│   ├── stripe-job-sync.ts      # Stripe payment sync
│   ├── email.ts                # Email sending
│   ├── r2.ts                   # File storage
│   ├── schedules.ts            # Schedule management
│   └── ...
├── config/                      # Editable configuration
│   ├── pricing.config.ts       # Pricing structure
│   ├── email.config.ts         # Email templates
│   ├── business.config.ts      # Company details
│   ├── auth.config.ts          # Auth settings
│   ├── stripe.config.ts        # Stripe settings
│   ├── storage.config.ts       # S3/R2 settings
│   └── database.config.ts      # Database settings
├── .env.example                 # Environment template
├── SETUP.md                     # Setup guide
├── DEPENDENCIES.md              # Package documentation
├── README.md                    # This file
└── ...
```

---

## 🔑 Key Features

### Admin Dashboard (`/admin`)

Complete management interface with:

- **Dashboard** — KPIs, revenue, leads, conversion rate
- **Leads** — Customer pipeline management
- **Quotes** — Create, send, track quotes
- **Jobs** — Service jobs and payment status
- **Schedule** — Rep/tech availability
- **Business Config** — Pricing, business info, hours

### Authentication

- Session-based authentication with HMAC signing
- Three roles: `admin`, `rep`, `tech`
- Role-based route protection
- Test mode for admins to test other roles
- PIN hashing with SHA-256

### Quote System

1. **Create Quote** — Customers/reps create quotes with selections
2. **Pricing Engine** — Automatic calculation with pane types, add-ons, minimums
3. **Send Quote** — Email quote to customer for review
4. **Customer Portal** — Customers review and sign quotes
5. **Payment** — Stripe checkout for payment
6. **Job Creation** — Quotes convert to jobs after payment

### Payment Processing

- Stripe Checkout integration
- Payment intent creation and verification
- Webhook handling for payment updates
- Job status sync with payment status
- Payment retry logic for failed transactions

### Scheduling

- Weekly calendar for rep/tech availability
- Admin can configure company schedule
- Customer booking windows
- Slot duration and advance booking settings

---

## 🔧 Configuration

All configuration is in `config/` folder:

### Pricing (`pricing.config.ts`)

```typescript
export const defaultPricing = {
  paneTypes: { standard: 7, specialty: 15, french: 3 },
  addons: { screen: 3.5, track: 4, hard_water: 15, interior: 5 },
  jobMinimum: 150,
};
```

### Business Info (`business.config.ts`)

```typescript
export const defaultBusinessConfig = {
  companyName: "Your Company",
  companyEmail: "info@example.com",
  serviceAreas: [...],
  businessHours: {...},
};
```

### Email Templates (`email.config.ts`)

Customize templates for:
- Quote notifications
- Payment confirmations
- Job confirmations
- Review requests

### Authentication (`auth.config.ts`)

```typescript
export const rolePermissions = {
  admin: ["/admin", "/admin/leads", ...],
  rep: ["/account", "/quote", ...],
  tech: ["/account"],
};
```

---

## 🌐 Database

Uses **Turso** (LibSQL) — SQLite-compatible cloud database:

```
Tables:
- users: Admin, rep, tech accounts
- jobs: Service jobs from quotes
- quotes: Customer quotes
- schedules: Rep/tech availability
- contacts: Customer contacts
- transactions: Payment records
- bookings: Customer booking sessions
- reviews: Customer reviews
- app_config: Business configuration
```

---

## 💳 Payment Flow

```
Customer fills quote
    ↓
Customer reviews quote at /portal-quote
    ↓
Customer clicks "Pay" → Stripe Checkout
    ↓
Stripe processes payment
    ↓
Webhook at /api/stripe/webhook
    ↓
Job created, status updated
    ↓
Confirmation email sent
```

---

## 📧 Email Integration

Supports any SMTP provider:

- **Gmail** — App passwords
- **SendGrid** — API key as password
- **Mailgun** — SMTP relay
- **AWS SES** — SMTP credentials
- **Zoho Mail** — SMTP credentials

Templates included for:
- Quote notifications
- Payment confirmations
- Job scheduling
- Review requests

---

## 📦 Deployment

### Deploy to Vercel

```bash
vercel deploy
# (set env vars in Vercel dashboard)
```

### Deploy to Other Platforms

Set these environment variables:

```
TURSO_DATABASE_URL
TURSO_AUTH_TOKEN
AUTH_SECRET
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
FROM_EMAIL
AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET
```

Then:
```bash
npm run build
npm start
```

---

## 🧪 Testing

### Test Login

Create a test admin user (first time setup):

```bash
curl -X POST http://localhost:3000/api/auth/test-mode \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "pin": "1234"
  }'
```

Then login at `/signin` with those credentials.

### Test Payments (Stripe)

Use test card: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: any 3 digits

### Local Email Testing

Use Mailtrap or similar SMTP service for local email testing.

---

## ⚙️ API Routes

### Authentication

- `POST /api/auth/login` — Log in user
- `POST /api/auth/logout` — Log out user
- `GET /api/auth/me` — Get current user
- `POST /api/auth/test-mode` — Test mode (admin only)

### Quotes

- `POST /api/quotes` — Create quote
- `GET /api/quotes` — List quotes
- `POST /api/send-quote` — Email quote to customer

### Jobs

- `POST /api/jobs` — Create job
- `GET /api/jobs` — List jobs
- `PATCH /api/jobs/[id]` — Update job
- `POST /api/jobs/[id]/finish` — Mark job as completed
- `POST /api/jobs/[id]/retry-payment` — Retry payment

### Payments

- `POST /api/stripe/checkout` — Create checkout session
- `GET /api/stripe/session-job` — Get job from session ID
- `POST /api/stripe/webhook` — Stripe webhook (raw body required)

### Schedule

- `POST /api/schedules` — Update schedule
- `GET /api/schedules` — Get schedule

### Email

- `POST /api/email/send` — Send email

### Files

- `POST /api/upload-url` — Get S3 pre-signed upload URL
- `GET /api/files` — List uploaded files

---

## 🛠️ Customization

### Add New Admin Stat

1. Edit `components/admin-stat-cards.tsx`
2. Update `config/pricing.config.ts` if pricing-related
3. Fetch data via new API endpoint

### Add New Role

1. Update `AppAuthRole` type in `config/auth.config.ts`
2. Add permissions in `rolePermissions`
3. Update login logic in `app/api/auth/login/route.ts`

### Modify Database Schema

Edit `lib/turso.ts` in `ensureSchema()` function to add/modify tables.

### Change Email Templates

Edit functions in `config/email.config.ts`:
- `createQuoteEmailTemplate()`
- `createJobConfirmationEmailTemplate()`
- `createPaymentConfirmationEmailTemplate()`

---

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** — Detailed setup and configuration guide
- **[DEPENDENCIES.md](./DEPENDENCIES.md)** — All npm packages and why they're needed

---

## 🐛 Troubleshooting

### Database not connecting

```
Error: Turso is not configured.
```

Check:
- `TURSO_DATABASE_URL` is set in `.env`
- `TURSO_AUTH_TOKEN` is set in `.env`
- Database URL is from turso.tech dashboard

### Auth secret missing

```
AUTH_SECRET is not configured.
```

Generate with: `openssl rand -hex 16`

### Stripe webhook not triggering

Test locally:

```bash
npm install -g stripe-cli
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger payment_intent.succeeded
```

### Email not sending

Verify SMTP settings:
- Host and port are correct
- Username and password work
- Firewall allows outbound SMTP (usually port 587 or 465)

---

## 📋 System Requirements

- **Node.js:** ≥ 20.9.0
- **npm:** ≥ 9.0
- **Browser:** Modern browser with ES6 support

---

## 📜 License

This code is provided as-is for your Next.js projects.

---

## 🎯 Next Steps

1. ✅ Copy admin-core to your project
2. ✅ Read [SETUP.md](./SETUP.md) for detailed configuration
3. ✅ Install dependencies: `npm install`
4. ✅ Set up `.env` from `.env.example`
5. ✅ Configure database (Turso)
6. ✅ Configure payments (Stripe)
7. ✅ Configure email (SMTP)
8. ✅ Configure storage (S3/R2)
9. ✅ Run `npm run dev`
10. ✅ Create test admin user
11. ✅ Test all features
12. ✅ Deploy to production

---

## 📞 Support

For issues:

1. Review [SETUP.md](./SETUP.md) for common issues
2. Check `.env.example` for required variables
3. Review environment variable values
4. Check server logs for detailed errors
5. Test each service independently (database, email, Stripe)

---

## 🚀 Ready to go!

You have everything you need to run a production-grade admin system. Customize the configs, add your business logic, and deploy with confidence.

Happy coding! 🎉
