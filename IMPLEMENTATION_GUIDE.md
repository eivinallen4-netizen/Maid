# Implementation Guide - Authentication, Quotes & Payments

This guide explains all the new features that have been set up for you.

## What Was Implemented

### 1. ✅ Authentication Middleware
- **File:** `middleware.ts`
- **Purpose:** Protects admin and account pages from unauthorized access
- **How it works:** Redirects unauthenticated users to `/signin` with return URL
- **Protected routes:** `/admin`, `/account`

### 2. ✅ Quote Builder Page
- **File:** `app/quote-builder/page.tsx`
- **URL:** `/quote-builder`
- **Features:**
  - Customer information form (name, email, phone, address)
  - Service type selection (Standard, Deep, Move Out)
  - Home size selector (1-5 bedrooms)
  - Add-ons selection (laundry, windows, baseboards, fridge, move-in, Airbnb turnover)
  - Automatic price calculation based on selections
  - Two action buttons:
    - "Get Quote" — Creates quote without payment
    - "Pay Now" — Proceeds to Stripe checkout

### 3. ✅ Stripe Payment Integration
- **New Endpoints:**
  - `POST /api/stripe/checkout-service` — Creates Stripe checkout session for service-based cleaning
  - `POST /api/stripe/verify-payment` — Verifies payment after checkout
- **Features:**
  - Calculates correct total based on service type + home size + add-ons
  - Creates Stripe checkout session with line items
  - Automatically creates quote record in database
  - Handles success/cancel URLs
  - Stores metadata for payment tracking

### 4. ✅ Quote Management APIs
- **Updated:** `POST /api/quotes` — Now handles both window cleaning and service-based quotes
- **New:** `POST /api/send-quote-email` — Sends quotes to customers via email
- **Features:**
  - Support for both pricing systems
  - Email sending with quote details
  - Admin-only quote sending

### 5. ✅ Thank You Page
- **File:** `app/thank-you/page.tsx`
- **URL:** `/thank-you?session_id=...`
- **Features:**
  - Payment confirmation display
  - Next steps information
  - Contact information (email, phone)
  - Links back to home or create another quote
  - Automatic payment verification

### 6. ✅ Admin Role Check Hook
- **File:** `lib/useAuth.ts`
- **Purpose:** Client-side hook to check authentication and admin role
- **Usage:** 
  ```typescript
  const { session, loading, error } = useAuth(requireAdmin = true);
  ```

---

## How to Use

### For Customers - Get a Quote

1. **Visit Quote Builder:**
   - Go to `http://localhost:3000/quote-builder`

2. **Fill Out Customer Info:**
   - Name, email, phone, address

3. **Select Service Type:**
   - Standard Cleaning ($150)
   - Deep Cleaning ($225)
   - Move Out Cleaning ($275)

4. **Select Home Size:**
   - 1 bedroom (no surcharge)
   - 2 bedroom (no surcharge)
   - 3+ bedroom (+$75-$225 surcharge)

5. **Add Optional Services:**
   - Laundry ($35)
   - Windows ($50)
   - Baseboards ($40)
   - Fridge ($45)
   - Move-in Special ($125)
   - Airbnb Turnover ($100)

6. **Choose Action:**
   - **"Get Quote"** — Creates quote, no payment
     - Quote sent to customer email
     - Admin gets notification
   - **"Pay Now"** — Proceeds to Stripe
     - Stripe checkout session created
     - Customer pays with card
     - Quote auto-created after payment

7. **After Payment:**
   - Redirected to `/thank-you`
   - Order confirmation displayed
   - Email confirmation sent
   - Admin gets order notification

### For Admins - Send Quotes

1. **Log in to Admin Dashboard:**
   - Go to `/admin` (requires login)

2. **Access Quote Management:**
   - Find quotes section in admin panel

3. **Send Quote to Customer:**
   - Call: `POST /api/send-quote-email`
   - Request:
     ```json
     {
       "quoteIndex": 0,
       "message": "Thank you for choosing us! Here's your quote..."
     }
     ```
   - Customer receives email with quote details and payment link

### For Admins - Access Protected Pages

1. **Visit Admin Dashboard:**
   - Go to `/admin`
   - Middleware automatically redirects to `/signin` if not logged in

2. **Account Settings:**
   - Go to `/account`
   - Middleware protects this route

3. **Authentication Required:**
   - Session must be valid (3-hour TTL)
   - User must be logged in with email + PIN
   - Admin routes require `is_admin: true`

---

## API Endpoints

### Authentication (Already Existing)
```
POST   /api/auth/login              Login with email + PIN
POST   /api/auth/logout             Logout
GET    /api/auth/me                 Get current user
```

### Quotes
```
GET    /api/quotes                  List all quotes (admin only)
POST   /api/quotes                  Create quote (auth required)
PATCH  /api/quotes                  Update quote (admin only)
POST   /api/send-quote-email        Send quote via email (admin only)
```

### Payments
```
POST   /api/stripe/checkout-service Create checkout session
POST   /api/stripe/verify-payment   Verify payment status
POST   /api/stripe/webhook          Stripe webhook (auto-update orders)
```

---

## Pricing Configuration

Edit pricing in `config/pricing.config.ts`:

```typescript
export const defaultPricing = {
  // Service base prices
  serviceTypes: {
    standard: 150,    // Standard cleaning
    deep: 225,        // Deep cleaning
    moveout: 275,     // Move-out cleaning
  },

  // Home size surcharges (added to base price)
  homeSizeSurcharge: {
    "3bed": 75,       // 3 bedroom
    "4bed": 150,      // 4 bedroom
    "5bed": 225,      // 5 bedroom
  },

  // Optional add-ons
  addons: {
    laundry: 35,
    windows: 50,
    baseboards: 40,
    fridge: 45,
    move_in: 125,
    airbnb_turnover: 100,
  },

  // Minimum job amount
  jobMinimum: 150,
};
```

### Example Price Calculation

**Customer selects:**
- Service: Deep Cleaning ($225)
- Home: 4 bedroom (+$150)
- Add-ons: Windows ($50) + Baseboards ($40)

**Total:** $225 + $150 + $50 + $40 = **$465**

---

## Environment Variables Required

For full functionality, ensure `.env` has:

```env
# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (for sending quotes)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@mountainspringsclean.com

# Business Info
BUSINESS_NAME=Mountain Springs Cleaning
BUSINESS_EMAIL=bookings@mountainspringsclean.com
BUSINESS_PHONE=+1 (702) 555-CLEAN
NEXT_PUBLIC_BUSINESS_EMAIL=bookings@mountainspringsclean.com
NEXT_PUBLIC_BUSINESS_PHONE=(702) 555-CLEAN
WEBSITE_URL=https://mountainspringsclean.com

# Site URLs (for redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_URL=http://localhost:3000
```

---

## Testing Stripe Payments

### Test Card Details
- Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)

### Test Flow
1. Go to `/quote-builder`
2. Fill out form and select "Pay Now"
3. Enter test card details
4. See success page at `/thank-you`

---

## File Structure

```
app/
├── quote-builder/
│   └── page.tsx                  # Quote builder page
├── thank-you/
│   └── page.tsx                  # Payment success page
├── api/
│   ├── quotes/
│   │   └── route.ts             # Quote CRUD (UPDATED)
│   ├── send-quote-email/
│   │   └── route.ts             # Send quote email (NEW)
│   └── stripe/
│       ├── checkout-service/
│       │   └── route.ts         # Service-based checkout (NEW)
│       └── verify-payment/
│           └── route.ts         # Payment verification (NEW)
├── admin/
│   └── layout.tsx               # Admin layout (UPDATED)
│
lib/
├── useAuth.ts                    # Auth hook (NEW)
├── auth.ts                       # Auth utilities
├── email.ts                      # Email sending
├── quotes.ts                     # Quote management
├── jobs.ts                       # Job management
├── pricing.ts                    # Pricing calculations
│
config/
├── pricing.config.ts             # Pricing configuration
├── stripe.config.ts              # Stripe configuration
│
middleware.ts                      # Auth middleware (NEW)
```

---

## Security Notes

### Authentication
- Session tokens are HMAC-SHA256 signed
- Tokens expire after 3 hours
- Cookies are HTTP-only (cannot be accessed by JavaScript)
- Middleware redirects unauthenticated users to login

### Payments
- Stripe handles all card data (never stored locally)
- Payment verification required for order confirmation
- Webhook validates payment before creating order
- All sensitive endpoints require authentication

### Database
- Quotes stored in `quotes` table
- Payments tracked in `transactions` table
- Customer info in `contacts` table
- All data encrypted in transit (HTTPS)

---

## Troubleshooting

### "Stripe secret key is not configured"
- Add `STRIPE_SECRET_KEY` to `.env`
- Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env`
- Restart dev server

### "User not authenticated" on admin pages
- Middleware redirects to `/signin`
- Log in with your admin credentials
- Session expires after 3 hours

### Quote not created after payment
- Check Stripe webhook is configured
- Verify `STRIPE_WEBHOOK_SECRET` in `.env`
- Check server logs for webhook errors
- Manual quote creation via API as fallback

### Email not sending
- Verify SMTP credentials in `.env`
- Check Gmail app password (if using Gmail)
- Verify sender email matches `FROM_EMAIL`
- Check firewall allows SMTP port

### Prices not calculating correctly
- Check `config/pricing.config.ts` values
- Clear browser cache and reload
- Verify homeSize value matches config keys
- Check add-on names match exactly

---

## Next Steps

1. **Test Quote Creation:**
   - Visit `/quote-builder`
   - Fill out form and click "Get Quote"
   - Verify quote appears in admin panel

2. **Test Payment:**
   - Use test card `4242 4242 4242 4242`
   - Verify payment succeeds
   - Check success page loads

3. **Send Quotes:**
   - Create test quote
   - Send via admin panel or API
   - Verify customer receives email

4. **Configure Production:**
   - Get real Stripe keys
   - Set up production SMTP
   - Update business contact info
   - Deploy to production

---

## Support

- **Middleware issues:** Check `middleware.ts`
- **Quote issues:** Check `app/api/quotes/route.ts`
- **Payment issues:** Check `app/api/stripe/`
- **Email issues:** Check `lib/email.ts` and `.env` SMTP vars
- **Pricing issues:** Check `config/pricing.config.ts`

---

## Summary

You now have:
✅ Authentication with middleware protection
✅ Quote builder with real-time pricing
✅ Stripe payment integration
✅ Email notifications
✅ Payment verification
✅ Admin dashboard access control

Everything is ready to go! Visit `/quote-builder` to test it out.
