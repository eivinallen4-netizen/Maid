# Medina: Mountain Springs Cleaning Platform

**Project:** Next.js booking & management platform for Mountain Springs Cleaning, Las Vegas  
**Client:** Mountain Springs Cleaning / Medina  
**Status:** Active development  

---

## Project Overview

Medina is a customer-facing and operations platform that allows residents to book cleaning services, manage preferences, and track jobs. Key features:
- Online booking with real-time availability
- Customer account management (address, preferences, payment info)
- Payment processing (Stripe integration)
- Push notifications (OneSignal)
- QR code generation for entry coordination
- Email notifications (Nodemailer)
- Team/job management backend
- Database: Turso (LibSQL) for customer & job data, S3 for file storage

---

## Tech Stack

- **Framework:** Next.js 16.2.4 (React 19.2.4, TypeScript)
- **Styling:** Tailwind CSS 4 + Radix UI components
- **Database:** Turso (LibSQL) — `@libsql/client`
- **Storage:** AWS S3 — `@aws-sdk/client-s3`
- **Payments:** Stripe API — `stripe` npm package
- **Email:** Nodemailer — `nodemailer`
- **Push notifications:** OneSignal — `react-onesignal`
- **QR codes:** qrcode — `qrcode`
- **Linting:** ESLint 9

---

## Development

### Getting Started
```bash
npm run dev          # Run dev server (includes QR code generation)
npm run build        # Build for production
npm run start        # Start production server
npm lint             # Run ESLint
```

Dev server runs on `http://localhost:3000` with hot reload.

### Environment Variables (required)
Document in `.env.local` if needed:
- Stripe keys (public & secret)
- Turso database URL & token
- AWS S3 credentials & region
- OneSignal app ID
- Nodemailer SMTP config (Gmail or other)
- QR code generation settings

### Key Directories
- `app/` — Next.js app router (pages, API routes, layouts)
- `components/` — Reusable React components (buttons, forms, etc.)
- `lib/` — Utilities, database clients, Stripe helpers
- `scripts/` — QR code generation script (runs on `npm run dev`)
- `public/` — Static assets

---

## Database (Turso/LibSQL)

- Connection: `@libsql/client` to Turso
- Recent migration: app-config and contacts-store moved to Turso (commit a847cb5)
- Schema likely includes: users, bookings, preferences, team, payments, etc.
- **To update schema:** check existing migrations or ask owner for current DDL

---

## Integration Points

- **Stripe:** Payment processing, stored customer payment methods
- **AWS S3:** Before/after photos, team photos, documents
- **OneSignal:** Push notifications for booking confirmations, reminders, team updates
- **Nodemailer:** Booking confirmations, receipts, password resets
- **QR codes:** Entry coordination — generates codes for door access

---

## Design System

- **UI Library:** Radix UI (unstyled, accessible components)
- **Styling:** Tailwind CSS utilities + `class-variance-authority` for component variants
- **Icons:** Lucide React
- **Utilities:** `clsx` for conditional class merging, `tailwind-merge` for Tailwind utilities

---

## Deployment

- Likely Vercel (standard Next.js hosting) — check Vercel settings
- Environment variables synced to deployment platform
- Build command: `next build`

---

## Known Constraints & TODOs

- Mobile-first design required (Las Vegas audience is mobile-heavy)
- QR code feature ties to entry coordination — ensure it works in low-signal areas
- Stripe integration must handle recurring charges (weekly/biweekly cleaning plans)
- OneSignal push timing: consider Vegas shift worker hours (24/7 market)
- Turso connection reliability is critical for bookings — monitor latency

---

@AGENTS.md
# Audience Research: Maid Cleaning Service — Las Vegas Customers
*For Mountain Springs Cleaning*
*Researched April 2026*

---

## Who Is This Audience?

Las Vegas residential cleaning customers are not a monolith. The market splits into several distinct profiles, all with overlapping needs:

| Profile | Who They Are |
|---|---|
| **Busy dual-income households** | Two working adults, kids, no time — cleaning falls through the cracks |
| **Service industry workers** | Hospitality, casino, and restaurant workers with irregular schedules; they work when others don't |
| **New homeowners** | Just bought in Summerlin, Henderson, or Centennial Hills — want a fresh start |
| **Airbnb / short-term rental hosts** | Need reliable turnovers between guests; losing reviews to inconsistent cleaners |
| **Seniors and mobility-limited residents** | Can no longer clean themselves; need someone they deeply trust in their home |
| **Move-in / move-out clients** | Relocating — Vegas has huge transient population due to jobs, military, and real estate |
| **Professionals with high standards** | High earners who want it done right the first time and are willing to pay for it |

**Las Vegas context matters:** This is a city that runs 24/7. Residents work nights, weekends, and holidays. They're time-poor, often cash-rich, and they've seen enough bad service to be skeptical. They rely heavily on word of mouth (Nextdoor, neighbors) and online reviews. Trust is earned, not assumed.

---

## Their Pain Points

### 1. Trusting Strangers in Their Home
This is the #1 barrier to hiring — and the #1 reason people switch services.
- "I don't know who's coming into my house."
- Fear of theft, broken items, or just feeling uncomfortable
- Strangers with access to their private spaces, valuables, and family
- Past bad experiences with cleaners who weren't vetted or insured
- The door being left open while they work — a real security concern raised repeatedly

### 2. Inconsistent Quality — Getting What You Paid For
- Paying $200–$300 and coming home to a home that wasn't fully cleaned
- Spots missed: baseboards, corners, inside appliances, behind toilets
- Quality varies from visit to visit — great one time, disappointing the next
- No accountability when something is missed — some companies argue instead of making it right
- *"For $250 this was not a service of value"* — real customer complaint in Las Vegas

### 3. No-Shows, Late Arrivals, and Last-Minute Cancellations
- Took time off work or rearranged their day, and the cleaner didn't show
- Promised arrival window of 8am–12pm means half a day wasted
- No communication when running late — total silence until they don't show
- Especially frustrating for Airbnb hosts with back-to-back guest turnovers

### 4. High Turnover = Constantly New Faces
- A different cleaner every time means starting from scratch on their preferences
- Re-explaining the same things ("don't touch that," "do this room first") every visit
- Building trust with one cleaner, only to have them leave the company
- No continuity = no relationship = no confidence

### 5. Price Uncertainty and Surprise Charges
- Unclear what's included vs. what costs extra
- Getting quoted one price and charged another
- Not knowing if they're getting a fair price or being overcharged
- First-time cleans costing much more than recurring — the "bait and switch" feel

### 6. Cleaning Products and Chemical Concerns
- Families with young children worried about harsh chemicals on surfaces kids touch
- Pet owners wanting non-toxic products safe for animals
- Residents with allergies or sensitivities to strong scents
- Growing demand for eco-friendly, green cleaning options — now considered a must-have by many

### 7. Scheduling Inflexibility
- Services that only operate 8am–5pm Monday–Friday don't work for Vegas shift workers
- Can't skip a visit when traveling without losing their spot
- Difficult to reschedule when life happens
- No online booking — having to call during business hours

---

## Their Challenges

| Challenge | What It Looks Like |
|---|---|
| **Finding a trustworthy company** | Hours spent reading reviews, asking neighbors, vetting options |
| **Communicating preferences** | Cleaner doesn't know their house, doesn't remember requests |
| **Evaluating the clean** | Not home during service; don't know if corners were cut |
| **Getting consistent results** | Quality drops after the first "wow" clean |
| **Managing access and security** | Keys, lockboxes, entry codes — the logistics of letting someone in |
| **Dealing with damage** | Something breaks and the company argues, denies, or ghosts |
| **Short-term rental logistics** | Turnovers that need to happen fast between guests with no room for error |
| **Language barriers** | Communication issues with some cleaning teams |

---

## Their Dream Outcomes

### Immediate
- Come home to a spotless house without lifting a finger
- Not have to think about cleaning at all — it just happens
- Feel genuinely impressed (not just satisfied) after every clean
- Know exactly who is coming and when — no surprises

### Medium-Term
- Find a service they trust so deeply they never have to look again
- Build a relationship with a consistent team that knows their home and preferences
- Reclaim their weekends and evenings for the things they actually want to do
- Stop feeling guilty or stressed about the state of the house

### Big Picture
- A clean home as a baseline — not a special occasion
- Peace of mind knowing their home is in trustworthy, insured hands
- For Airbnb hosts: five-star cleanliness reviews on autopilot, no last-minute scrambles
- For seniors: safe, dignified support that preserves their independence at home

### In Their Own Words (real language from reviews)
- *"I never have to worry about a dirty house again."*
- *"I can't even remember the last time I touched a vacuum cleaner."*
- *"They asked me how I liked the cleaning every time they were done with a floor."*
- *"Left the place looking brand new."*
- *"Came in like cleaning fairies."*

---

## What They Want When Hiring

### Non-Negotiables (Deal-breakers if missing)
1. **Background-checked, insured employees** — not independent contractors, not random gig workers
2. **Transparency on price** — know what they're paying before booking, no surprise charges
3. **Reliability** — show up when they say they will, every time
4. **Responsiveness** — answer the phone, respond to texts, communicate proactively

### Strong Differentiators (Things that earn loyalty)
1. **Same team each visit** — familiarity builds trust
2. **Satisfaction guarantee** — something goes wrong? Come back and fix it, no drama
3. **Easy online booking** — no phone tag, book in minutes, flexible scheduling
4. **Pet-friendly and/or green products** — increasingly expected, not just a nice-to-have
5. **Local, community-rooted business** — Las Vegas residents prefer local over national chains

### Nice-to-Haves
- Before/after photos
- Real-time notifications when the team is on the way
- Lockbox / smart entry coordination
- Customizable checklist (skip the office, focus on the bathrooms)

---

## Las Vegas–Specific Insights

### The Hospitality Economy Effect
Las Vegas has one of the highest concentrations of shift workers in the country. Casinos, hotels, and restaurants run 24/7, meaning a large portion of the workforce has non-traditional hours. They need a cleaning service that can work around *their* schedule — not the other way around.

### The Airbnb / Short-Term Rental Market
Las Vegas is a major short-term rental market. Hosts need turnover cleans done fast, done right, and done consistently. A single bad review from a guest saying the place "wasn't clean" can cost hundreds in lost bookings. This is a high-value, recurring customer segment that rewards reliability above everything.

### New Construction Neighborhoods
Summerlin, Henderson, Aliante, and Centennial Hills are among the fastest-growing residential areas in the U.S. New homeowners are moving in constantly — many looking to establish a cleaning service from day one. Move-in cleans and recurring plan conversions are the main entry point.

### High Competition, Low Trust
Las Vegas has hundreds of cleaning services. Customers have been burned before — by no-shows, by contractors who weren't actually insured, by companies that argued when something broke. The bar for trust is high because the baseline experience has often been bad.

### Word of Mouth Is King
Nextdoor, neighborhood Facebook groups, and Google reviews drive the majority of new customer acquisition in this market. One five-star review from a neighbor carries more weight than any ad. Satisfied customers become advocates — this is the flywheel.

---

## Key Messages That Will Resonate

| Message | Why It Works |
|---|---|
| *"Same team, every visit."* | Solves the trust and consistency problem in one phrase |
| *"Background-checked, insured — always."* | Removes the #1 fear of hiring |
| *"Satisfaction guaranteed or we come back — free."* | Removes risk from the first booking |
| *"Book in minutes. We handle the rest."* | Speaks to time-poor, busy Las Vegas households |
| *"Eco-friendly options available."* | Captures the growing green-conscious segment |
| *"Trusted by your neighbors."* | Social proof framed locally — leverages word of mouth |
| *"We clean so you can enjoy your weekend."* | Outcome-focused, aspirational |

---

## What Would Make Them Switch Away From a Competitor

- Missed areas, inconsistent quality
- Different cleaner every time
- No-show with no communication
- Company argues or denies when something breaks
- Price increases without notice
- Can't book online or reach anyone quickly

**The flip side:** These are all Mountain Springs' opportunities. Every competitor failure is a Mountain Springs opening.

---

## Sources Referenced
- Yelp reviews: Las Vegas maid services (Maid Brigade, Superb Maids, Maid 4 Las Vegas, Evidence Cleaning, ScrubLV)
- Thumbtack & Angi: Las Vegas cleaning service reviews and customer feedback
- lvplug.com: Best/worst Las Vegas cleaning service roundup
- myhousecleaningbiz.com: What residential cleaning customers want
- schedulingkit.com: 2026 cleaning industry statistics
- cleanerhq.com: 2026 cleaning industry trends
- HomeAdvisor: Las Vegas service reviews
- Superb Maids (superbmaids.net): Top-rated LV service, award-winning positioning
- Reddit / Nextdoor: Community-level trust and referral behavior patterns

---

*Update this document as you gather direct feedback from booked customers — especially first-time and recurring clients.*
