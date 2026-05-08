# Admin-Core Folder Structure

Complete directory tree of the extracted admin-core system.

## Top Level

```
admin-core/
├── app/                          # Next.js app routes & API endpoints
├── components/                   # React components
├── lib/                          # Backend business logic
├── config/                       # Editable configuration files
├── styles/                       # CSS/styling (optional, typically empty)
├── .env.example                  # Environment variable template (REQUIRED - rename to .env)
├── README.md                     # Quick overview
├── SETUP.md                      # Complete setup guide (READ THIS FIRST)
├── DEPENDENCIES.md               # npm package documentation
├── EXTRACTION_SUMMARY.md         # What was extracted and why
├── FOLDER_STRUCTURE.md           # This file
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── components.json               # shadcn/ui CLI config
├── eslint.config.mjs             # ESLint configuration
├── postcss.config.mjs            # PostCSS configuration (Tailwind)
└── package.json                  # (NOT included - use your project's)
```

## Full Structure

```
admin-core/
│
├── app/                          # Next.js 16 App Router
│   ├── admin/                   # Admin dashboard & management
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Dashboard main page
│   │   ├── leads/               # Lead management
│   │   │   ├── page.tsx         # Leads list
│   │   │   └── [id]/            # Lead detail
│   │   │       └── page.tsx
│   │   └── schedule/            # Schedule management
│   │       ├── reps/
│   │       │   └── page.tsx     # Rep schedule
│   │       └── techs/
│   │           └── page.tsx     # Tech schedule
│   │
│   ├── signin/                  # Authentication
│   │   ├── page.tsx             # Login page
│   │   ├── SignInForm.tsx       # Login form component
│   │   └── LeadFunnel.tsx       # Lead capture form
│   │
│   ├── account/                 # User profile
│   │   ├── page.tsx
│   │   └── AccountForm.tsx      # Profile form component
│   │
│   ├── quote/                   # Quote creation
│   │   └── page.tsx             # Quote builder form
│   │
│   ├── portal-quote/            # Customer quote review
│   │   └── page.tsx             # Quote review & payment
│   │
│   ├── api/                     # REST API endpoints
│   │   ├── auth/                # Authentication
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   ├── me/
│   │   │   │   └── route.ts
│   │   │   └── test-mode/
│   │   │       └── route.ts     # Admin test mode
│   │   │
│   │   ├── quotes/              # Quote CRUD
│   │   │   └── route.ts         # POST (create), GET (list)
│   │   │
│   │   ├── send-quote/          # Email quote
│   │   │   └── route.ts         # POST
│   │   │
│   │   ├── jobs/                # Job management
│   │   │   ├── route.ts         # POST (create), GET (list), PATCH
│   │   │   └── [id]/
│   │   │       ├── route.ts     # GET, PATCH, DELETE
│   │   │       ├── finish/
│   │   │       │   └── route.ts # POST - Complete job
│   │   │       ├── retry-payment/
│   │   │       │   └── route.ts # POST - Retry failed payment
│   │   │       └── review/
│   │   │           └── route.ts # POST - Review job
│   │   │
│   │   ├── stripe/              # Stripe payment processing
│   │   │   ├── checkout/
│   │   │   │   └── route.ts     # POST - Create checkout session
│   │   │   ├── session-job/
│   │   │   │   └── route.ts     # GET - Get job from session
│   │   │   ├── capture/
│   │   │   │   └── route.ts     # POST - Capture payment
│   │   │   └── webhook/
│   │   │       └── route.ts     # POST - Stripe webhooks
│   │   │
│   │   ├── schedules/           # Schedule management
│   │   │   └── route.ts         # POST (update), GET
│   │   │
│   │   ├── email/               # Email sending
│   │   │   └── send/
│   │   │       └── route.ts     # POST
│   │   │
│   │   ├── account/             # Account management
│   │   │   └── route.ts         # POST (update)
│   │   │
│   │   ├── users/               # User management
│   │   │   ├── route.ts         # POST (create), GET (list)
│   │   │   └── onboard/
│   │   │       └── route.ts     # POST - Onboard user
│   │   │
│   │   ├── contacts/            # Contact management
│   │   │   └── route.ts         # POST, GET
│   │   │
│   │   ├── bookings/            # Booking management
│   │   │   └── route.ts         # POST, GET
│   │   │
│   │   ├── reviews/             # Review management
│   │   │   ├── route.ts         # POST (create), GET (list)
│   │   │   └── [id]/
│   │   │       └── route.ts     # GET, PATCH, DELETE
│   │   │
│   │   ├── transactions/        # Transaction history
│   │   │   └── route.ts         # GET
│   │   │
│   │   ├── files/               # File listing
│   │   │   └── route.ts         # GET
│   │   │
│   │   ├── upload-url/          # S3 pre-signed URLs
│   │   │   └── route.ts         # POST
│   │   │
│   │   ├── pricing/             # Pricing endpoint
│   │   │   └── route.ts         # GET
│   │   │
│   │   ├── rep-stats/           # Rep statistics
│   │   │   └── route.ts         # GET
│   │   │
│   │   └── app-config/          # App configuration
│   │       └── route.ts         # GET, POST
│   │
│   ├── layout.tsx               # Root app layout
│   ├── error.tsx                # Error boundary
│   └── global-error.tsx         # Global error handler
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui base components
│   │   ├── avatar.tsx           # User avatar
│   │   ├── badge.tsx            # Status badge
│   │   ├── button.tsx           # Button
│   │   ├── card.tsx             # Card container
│   │   ├── checkbox.tsx         # Checkbox
│   │   ├── input.tsx            # Text input
│   │   ├── label.tsx            # Form label
│   │   ├── radio-group.tsx      # Radio buttons
│   │   ├── separator.tsx        # Visual separator
│   │   ├── skeleton.tsx         # Loading skeleton
│   │   ├── slider.tsx           # Range slider
│   │   └── textarea.tsx         # Multi-line input
│   │
│   ├── admin-stat-cards.tsx     # KPI statistics cards
│   ├── admin-rep-cards.tsx      # Team member cards
│   ├── admin-reps-page.tsx      # Team management page
│   ├── admin-panel.tsx          # Admin dashboard container
│   ├── admin-quotes-page.tsx    # Quotes management page
│   ├── admin-quotes-table.tsx   # Quotes data table
│   ├── admin-jobs-board.tsx     # Kanban job board
│   ├── admin-lead-quote-workspace.tsx  # Lead workspace
│   ├── admin-business-config.tsx       # Business settings form
│   ├── admin-business-page.tsx         # Business config page
│   ├── admin-schedule-view.tsx         # Schedule overview
│   │
│   ├── schedule-board.tsx       # Weekly schedule grid
│   ├── schedule-admin-links.tsx # Schedule management links
│   ├── schedule-window-settings.tsx    # Booking window config
│   ├── role-schedule-admin-panel.tsx   # Role-based schedule
│   │
│   ├── price-calculator.tsx     # Interactive price calculator
│   ├── portal-switcher.tsx      # Portal/role switcher
│   ├── star-rating.tsx          # 5-star rating component
│   └── Sidebar.tsx              # Navigation sidebar
│
├── lib/                         # Backend business logic
│   ├── auth.ts                 # Session management & auth
│   │   ├── createSessionToken()
│   │   ├── verifySessionToken()
│   │   ├── hashPin()
│   │   ├── verifyPin()
│   │   ├── getSessionFromRequest()
│   │   └── Role-based access control
│   │
│   ├── turso.ts                # Database client
│   │   ├── tursoExecute()      # Execute SQL
│   │   ├── tursoBatch()        # Batch operations
│   │   ├── ensureSchema()      # Auto-create tables
│   │   └── Schema definitions
│   │
│   ├── users.ts                # User management
│   │   ├── getUserById()
│   │   ├── getUserByEmail()
│   │   ├── createUser()
│   │   ├── updateUser()
│   │   └── listUsers()
│   │
│   ├── quote.ts                # Quote calculations
│   │   ├── computeQuote()      # Calculate price
│   │   ├── QuoteSelections
│   │   └── QuoteTotals
│   │
│   ├── quotes.ts               # Quote CRUD
│   │   ├── createQuote()
│   │   ├── getQuote()
│   │   ├── listQuotes()
│   │   ├── updateQuote()
│   │   └── deleteQuote()
│   │
│   ├── pricing.ts              # Pricing types & defaults
│   │   ├── PaneType
│   │   ├── Pricing
│   │   └── defaultPricing
│   │
│   ├── pricing-store.ts        # Pricing data storage
│   │   ├── getPricing()
│   │   └── updatePricing()
│   │
│   ├── jobs.ts                 # Job management
│   │   ├── createJob()
│   │   ├── getJob()
│   │   ├── listJobs()
│   │   ├── updateJobStatus()
│   │   └── Job types
│   │
│   ├── stripe-job-sync.ts      # Stripe payment sync
│   │   ├── syncJobWithPayment()
│   │   └── Job/payment sync logic
│   │
│   ├── job-payment-retry.ts    # Retry failed payments
│   │   └── retryJobPayment()
│   │
│   ├── job-review.ts           # Review system
│   │   ├── submitReview()
│   │   └── getReviews()
│   │
│   ├── transactions.ts         # Payment transactions
│   │   ├── createTransaction()
│   │   ├── getTransaction()
│   │   └── listTransactions()
│   │
│   ├── schedules.ts            # Schedule management
│   │   ├── getSchedule()
│   │   ├── updateSchedule()
│   │   ├── getAvailability()
│   │   └── Schedule logic
│   │
│   ├── schedule-types.ts       # Schedule types & interfaces
│   │   ├── Schedule
│   │   ├── TimeSlot
│   │   └── Availability
│   │
│   ├── bookings.ts             # Booking management
│   │   ├── createBooking()
│   │   ├── getBooking()
│   │   └── Booking logic
│   │
│   ├── email.ts                # Email sending
│   │   ├── sendEmail()
│   │   └── SMTP configuration
│   │
│   ├── contacts-store.ts       # Contact management
│   │   ├── createContact()
│   │   ├── getContact()
│   │   └── listContacts()
│   │
│   ├── reviews.ts              # Customer reviews
│   │   ├── createReview()
│   │   ├── getReview()
│   │   └── listReviews()
│   │
│   ├── r2.ts                   # AWS S3/Cloudflare R2
│   │   ├── uploadFile()
│   │   ├── getSignedUrl()
│   │   └── deleteFile()
│   │
│   ├── utils.ts                # Utility functions
│   │   ├── Common utilities
│   │   └── Helper functions
│   │
│   └── seo.ts                  # SEO utilities
│       └── buildNoIndexMetadata()
│
├── config/                      # Editable configuration
│   ├── pricing.config.ts       # Pricing structure
│   │   ├── defaultPricing      # Pane prices, add-ons, minimums
│   │   └── PaneType enum
│   │
│   ├── business.config.ts      # Company details
│   │   ├── defaultBusinessConfig
│   │   ├── serviceTypes[]
│   │   ├── serviceAreas[]
│   │   ├── businessHours{}
│   │   └── scheduleSettings{}
│   │
│   ├── email.config.ts         # Email configuration
│   │   ├── getEmailConfig()
│   │   ├── createQuoteEmailTemplate()
│   │   ├── createJobConfirmationEmailTemplate()
│   │   └── createPaymentConfirmationEmailTemplate()
│   │
│   ├── auth.config.ts          # Authentication
│   │   ├── getAuthConfig()
│   │   ├── getAuthSecret()
│   │   ├── rolePermissions{}
│   │   └── hasRoutePermission()
│   │
│   ├── stripe.config.ts        # Stripe settings
│   │   ├── getStripeConfig()
│   │   ├── getStripePublishableKey()
│   │   └── isStripeConfigured()
│   │
│   ├── storage.config.ts       # S3/R2 storage
│   │   ├── getStorageConfig()
│   │   ├── ALLOWED_FILE_TYPES[]
│   │   └── MAX_FILE_SIZE
│   │
│   └── database.config.ts      # Database settings
│       ├── getDatabaseConfig()
│       ├── isDatabaseConfigured()
│       └── SCHEMA_TABLES[]
│
├── styles/                      # CSS/styling (typically empty)
│   └── (custom CSS files if needed)
│
└── public/                      # Static assets (optional)
    └── (images, fonts, etc.)
```

---

## File Statistics

| Category | Count | Examples |
|----------|-------|----------|
| App Routes | 5 | admin, signin, account, quote, portal-quote |
| API Endpoints | 40+ | auth, quotes, jobs, stripe, email, etc. |
| Components | 30+ | admin-*, schedule-*, ui/* |
| Libraries | 25+ | auth, turso, quote, jobs, email, etc. |
| Config Files | 7 | pricing, business, email, auth, stripe, etc. |
| Documentation | 4 | README, SETUP, DEPENDENCIES, EXTRACTION_SUMMARY |
| Config Files | 5 | tsconfig, next.config, postcss, eslint, components.json |
| **Total** | **~120** | Files and folders |

---

## Key Directories to Know

### `/app` — User-facing routes
Where users interact with the system. Contains:
- Authentication (signin)
- Admin dashboard
- Quote builder
- Customer portal
- All API endpoints

### `/components` — React UI
Reusable React components. Key ones:
- `admin-*` — Admin dashboard components
- `schedule-*` — Scheduling components
- `ui/*` — Base shadcn/ui components

### `/lib` — Business logic
Backend utilities and data access. All server-side code:
- Database operations
- Authentication
- Stripe integration
- Email sending
- Quote calculations

### `/config` — Editable settings
**This is what you customize!**
- Pricing
- Business info
- Email templates
- Roles & permissions
- External service configs

---

## How to Navigate

### To change pricing:
→ `config/pricing.config.ts`

### To add a new admin stat:
→ `components/admin-stat-cards.tsx`
→ `/api/` endpoint to fetch data

### To customize email:
→ `config/email.config.ts`
→ `lib/email.ts` for SMTP config

### To add authentication logic:
→ `lib/auth.ts`
→ `/api/auth/*` routes

### To add a new feature:
1. Create page/route in `/app`
2. Create components in `/components`
3. Create business logic in `/lib`
4. Create API endpoint in `/api`
5. Add config to `/config` if needed

---

## Import Pattern

When importing within admin-core:

```typescript
// Components importing components
import { Button } from "@/components/ui/button"

// Pages/API importing lib
import { getSessionFromRequest } from "@/lib/auth"

// Pages importing components
import { AdminPanel } from "@/components/admin-panel"

// Config usage
import { defaultPricing } from "@/config/pricing.config"
```

All imports use the `@/` alias which maps to the admin-core root.

---

## File Dependencies

```
components/
  └─ uses @/lib (business logic)
  └─ uses @/components/ui (base components)

app/page.tsx
  └─ uses @/components (React components)
  └─ uses @/lib (server logic)

app/api/
  ├─ uses @/lib (business logic)
  ├─ uses @/config (configuration)
  └─ uses @/lib/turso (database)

lib/
  ├─ auth.ts (authentication)
  ├─ turso.ts (database)
  ├─ email.ts (SMTP config)
  ├─ stripe-*.ts (Stripe)
  └─ etc.

config/
  ├─ pricing.config.ts (editable pricing)
  ├─ business.config.ts (editable business info)
  ├─ email.config.ts (editable templates)
  └─ etc.
```

---

## Next Steps

1. **Copy admin-core to your project**
2. **Read README.md** — Overview
3. **Read SETUP.md** — Complete setup guide
4. **Review DEPENDENCIES.md** — npm packages
5. **Configure `/config` files** — Customize for your business
6. **Set up `.env`** — From `.env.example`
7. **Install dependencies** — `npm install`
8. **Start dev server** — `npm run dev`

---

Good luck! 🚀
