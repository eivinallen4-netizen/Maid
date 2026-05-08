# Verification Checklist

Complete this checklist to ensure everything is set up correctly.

## ✅ Environment Configuration

- [ ] `.env` file exists in project root
- [ ] `ADMIN_EMAIL` is set (e.g., admin@mountainspringsclean.com)
- [ ] `ADMIN_PIN` is set (4-6 digits, e.g., 1234)
- [ ] `ADMIN_NAME` is set (e.g., Admin)
- [ ] `AUTH_SECRET` is set (32-character hex string)
- [ ] `TURSO_DATABASE_URL` is set (if using Turso)
- [ ] `TURSO_AUTH_TOKEN` is set (if using Turso)

**Quick check:**
```bash
grep -E "ADMIN_EMAIL|ADMIN_PIN|ADMIN_NAME|AUTH_SECRET" .env
```

---

## ✅ Dependencies Installed

- [ ] Node.js version >= 20.9.0
- [ ] npm or yarn installed
- [ ] All dependencies installed: `npm install`
- [ ] No TypeScript errors: `npm run build`

**Quick check:**
```bash
node --version  # Should be v20.9.0 or higher
npm list        # Check installed packages
```

---

## ✅ Database Connection

- [ ] Database URL is valid (Turso or local SQLite)
- [ ] Auth token is set
- [ ] Database schema tables exist

**Quick check (with server running):**
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Cookie: pb_session=<valid_token>"
# Should return list of users (may be empty)
```

---

## ✅ Admin Login Works

- [ ] Dev server starts: `npm run dev`
- [ ] Can navigate to `/signin`
- [ ] Can enter admin email and PIN
- [ ] Login succeeds with credentials from `.env`
- [ ] Session cookie `pb_session` is set
- [ ] Redirected to admin dashboard at `/admin`

**Quick check:**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Test login API
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@mountainspringsclean.com", "pin": "1234"}'
```

Expected response:
```json
{
  "user": {
    "id": "env-admin",
    "email": "admin@mountainspringsclean.com",
    "name": "Admin",
    "role": "admin",
    "is_admin": true
  }
}
```

---

## ✅ Admin Dashboard

- [ ] `/admin` page loads (after login)
- [ ] Admin stats display
- [ ] Can navigate to sub-pages:
  - [ ] `/admin/leads` — Lead management
  - [ ] `/admin/schedule/reps` — Rep schedule
  - [ ] `/admin/schedule/techs` — Tech schedule
  - [ ] `/account` — User profile
- [ ] Can create quotes
- [ ] Can manage users

---

## ✅ Public Pages

- [ ] `/` — Home page loads
- [ ] `/about` — About page loads
- [ ] `/services` — Services page loads
- [ ] `/pricing` — Pricing page loads
- [ ] `/how-it-works` — How it works page loads
- [ ] `/service-areas` — Service areas page loads
- [ ] `/faq` — FAQ page loads

---

## ✅ Customer Flow

- [ ] `/quote` — Quote request form works
- [ ] Can submit quote with customer details
- [ ] Quote is stored in database
- [ ] `/portal-quote` — Customer can view quote
- [ ] Customer can proceed to checkout (if Stripe configured)

---

## ✅ Authentication & Sessions

- [ ] Session token is created on login
- [ ] Session token is sent as HTTP-only cookie
- [ ] Token expires after 3 hours
- [ ] Logout clears session cookie
- [ ] Protected pages require authentication
- [ ] Protected pages redirect to `/signin` if not authenticated

---

## ✅ Database Tables

Verify all tables exist:

```sql
-- Run this to check:
PRAGMA table_info(users);
PRAGMA table_info(quotes);
PRAGMA table_info(jobs);
PRAGMA table_info(bookings);
PRAGMA table_info(schedules);
PRAGMA table_info(contacts);
PRAGMA table_info(transactions);
PRAGMA table_info(reviews);
PRAGMA table_info(app_config);
```

Expected tables:
- [ ] `users` — Admin, rep, and tech users
- [ ] `quotes` — Customer quotes
- [ ] `jobs` — Service jobs
- [ ] `bookings` — Stripe checkout sessions
- [ ] `schedules` — Team availability
- [ ] `contacts` — Customer contacts
- [ ] `transactions` — Payment records
- [ ] `reviews` — Service reviews
- [ ] `app_config` — Business configuration

---

## ✅ File Structure

Expected directory structure:

```
Maid/
├── app/
│   ├── api/                    # All API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── users/             # User management
│   │   ├── quotes/            # Quote endpoints
│   │   ├── jobs/              # Job endpoints
│   │   ├── stripe/            # Payment endpoints
│   │   └── ...
│   ├── admin/                  # Admin dashboard pages
│   │   ├── page.tsx           # Admin home
│   │   ├── leads/             # Lead management
│   │   ├── schedule/          # Schedule pages
│   │   └── layout.tsx         # Admin layout
│   ├── account/                # User account pages
│   ├── signin/                 # Login page
│   ├── quote/                  # Quote request form
│   ├── portal-quote/           # Quote review portal
│   ├── about/                  # About page
│   ├── services/               # Services pages
│   ├── pricing/                # Pricing page
│   ├── faq/                    # FAQ page
│   ├── how-it-works/          # How it works page
│   ├── service-areas/          # Service areas page
│   ├── layout.tsx              # Main layout
│   └── page.tsx                # Home page
├── components/
│   ├── admin-panel.tsx         # Admin dashboard components
│   ├── ui/                     # Shadcn UI components
│   └── ...
├── lib/
│   ├── auth.ts                 # Auth utilities
│   ├── turso.ts                # Database client
│   ├── users.ts                # User management
│   ├── quotes.ts               # Quote utilities
│   ├── jobs.ts                 # Job utilities
│   ├── stripe-*.ts             # Stripe integrations
│   └── ...
├── config/                     # Configuration files
├── scripts/
│   └── init-admin.ts           # Admin initialization script
├── .env                        # Environment variables
├── ADMIN_SETUP.md              # Admin setup guide
├── API_REFERENCE.md            # API documentation
├── package.json
├── tsconfig.json
└── next.config.ts
```

- [ ] All directories exist
- [ ] No stray or unused directories
- [ ] api/ routes are properly typed

---

## ✅ TypeScript & Linting

- [ ] No TypeScript errors: `npm run build`
- [ ] No ESLint warnings: `npm run lint`
- [ ] All imports resolve correctly

**Quick check:**
```bash
npm run build
npm run lint
```

---

## ✅ Environment Variables Are Not Committed

- [ ] `.env` is NOT in git (check .gitignore)
- [ ] No credentials in source code
- [ ] No sensitive data logged

**Quick check:**
```bash
cat .gitignore | grep -E "\.env|credentials|secrets"
# Should include: .env, .env.local, .env.*.local
```

---

## ✅ Production Readiness

- [ ] Change `ADMIN_PIN` to a strong value
- [ ] Create persistent admin users in database
- [ ] Remove `ADMIN_EMAIL` and `ADMIN_PIN` from .env (after users created)
- [ ] Set `STRIPE_SECRET_KEY` if using payments
- [ ] Configure SMTP for email sending
- [ ] Configure S3/R2 for file uploads
- [ ] Test all payment flows with Stripe test mode
- [ ] Test email sending with real SMTP provider
- [ ] Set up HTTPS before deploying

---

## ✅ Development Server

- [ ] Dev server starts without errors: `npm run dev`
- [ ] Hot reload works (change a file, page refreshes)
- [ ] No console errors in terminal
- [ ] No console errors in browser DevTools

**Quick check:**
```bash
npm run dev
# Should show: ✓ Ready in Xms
# Should show: ▲ Next.js X.X.X
```

---

## Common Issues & Fixes

### Issue: "Turso is not configured"
**Fix:**
```bash
# Add to .env:
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
# Or for local dev:
TURSO_DATABASE_URL=file:local.db
TURSO_AUTH_TOKEN=placeholder
```

### Issue: "AUTH_SECRET is not configured"
**Fix:**
```bash
# Generate secret:
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
# Add to .env:
AUTH_SECRET=<generated_value>
```

### Issue: Login fails with "Invalid credentials"
**Fix:**
- Check `.env` has `ADMIN_EMAIL` and `ADMIN_PIN`
- Verify PIN is 4-6 digits
- Restart dev server after changing .env
- Clear browser cookies and try again

### Issue: Database schema not created
**Fix:**
- Ensure `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set
- Restart dev server
- Check server logs for schema creation messages
- Manual check: Query tables should work after restart

### Issue: Admin dashboard is blank
**Fix:**
- Verify session token in cookies
- Check browser DevTools → Application → Cookies
- Should have `pb_session` cookie
- Check console for API errors
- Verify user has admin role

---

## Final Verification

Run this complete test sequence:

```bash
# 1. Start server
npm run dev &
SERVER_PID=$!

# 2. Wait for server to start
sleep 5

# 3. Test admin login
echo "Testing admin login..."
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@mountainspringsclean.com", "pin": "1234"}' \
  | jq '.'

# 4. Test public pages
echo "Testing public pages..."
curl http://localhost:3000/ -s -o /dev/null -w "Home: %{http_code}\n"
curl http://localhost:3000/signin -s -o /dev/null -w "Login: %{http_code}\n"
curl http://localhost:3000/admin -s -o /dev/null -w "Admin: %{http_code}\n"

# 5. Cleanup
kill $SERVER_PID
```

All requests should return `200` or `302` (redirects).

---

## Sign-Off

Once all items are checked, you're ready to:
- ✅ Use the admin portal
- ✅ Create customer quotes
- ✅ Manage team schedules
- ✅ Process payments (with Stripe)
- ✅ Send emails (with SMTP)
- ✅ Deploy to production

Good luck! 🚀
