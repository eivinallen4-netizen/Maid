# Quick Start Guide — Admin Login & Database Setup

Get the admin portal running in 5 minutes.

## Step 1: Verify Environment Setup (1 min)

Your `.env` file is already configured with:

```env
# Core Admin Login
ADMIN_EMAIL=admin@mountainspringsclean.com
ADMIN_PIN=1234
ADMIN_NAME=Admin

# Database
TURSO_DATABASE_URL=libsql://mountain-spring-cleaning-prophetic-leo-4b.aws-us-west-2.turso.io
TURSO_AUTH_TOKEN=eyJhbGc...

# Auth
AUTH_SECRET=aa9bc87a10b059b790d24a0abcb35323
```

✅ **Everything is pre-configured!**

---

## Step 2: Install Dependencies (2 min)

```bash
npm install
```

Or if you've already done this, skip to Step 3.

---

## Step 3: Start Dev Server (1 min)

```bash
npm run dev
```

You should see:
```
✓ Ready in 2.3s
▲ Next.js 16.2.4
- Local: http://localhost:3000
```

---

## Step 4: Log In (1 min)

1. Open browser: **http://localhost:3000/signin**
2. Enter:
   - **Email:** admin@mountainspringsclean.com
   - **PIN:** 1234
3. Click **Sign in**

You're now logged in as admin! 🎉

---

## What You Can Do Now

### Visit the Admin Dashboard
- **http://localhost:3000/admin**
- View stats, manage leads, manage schedules

### Explore Public Pages
- **Home:** http://localhost:3000/
- **About:** http://localhost:3000/about
- **Services:** http://localhost:3000/services
- **Pricing:** http://localhost:3000/pricing
- **FAQ:** http://localhost:3000/faq

### Create a Quote
- **http://localhost:3000/quote**
- Fill out form as customer
- Admin receives notification

### Manage Your Account
- **http://localhost:3000/account**
- Update profile info
- Change PIN (coming soon)

---

## Change Admin Credentials

### Option 1: Quick Change (Update .env)

Edit `.env`:
```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PIN=5678
```

Save and restart server (`Ctrl+C`, then `npm run dev`).

### Option 2: Create Permanent Database Users

Once you're logged in:

1. Go to `/admin` dashboard
2. Find Users section
3. Click "Add User"
4. Set role to "Admin"
5. Save

Now that user can log in with their own credentials (no .env needed).

---

## Database Setup Verification

The database is automatically initialized on first run. To verify:

### Check Tables Exist
```bash
# After server starts, tables are created in:
# TURSO_DATABASE_URL (if using Turso)
# or file:local.db (if using local SQLite)

# Tables created:
# - users (admin, rep, tech accounts)
# - quotes (customer quotes)
# - jobs (service jobs)
# - bookings (payment bookings)
# - schedules (team availability)
# - contacts (customer leads)
# - reviews (service reviews)
# - transactions (payment records)
```

### Test API
```bash
# Test admin login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@mountainspringsclean.com", "pin": "1234"}'

# Should return:
# {"user": {"id": "env-admin", "email": "...", "role": "admin", ...}}
```

---

## Page Organization

All pages are organized in `app/`:

### Public Pages (No login required)
```
/ — Home
/about — About us
/services — Service offerings
/pricing — Pricing
/how-it-works — Process
/service-areas — Coverage areas
/faq — Frequently asked questions
```

### Customer Pages
```
/signin — Login
/account — My account
/quote — Request quote
/portal-quote — Review quote & checkout
```

### Admin Pages (Login required, admin role)
```
/admin — Dashboard
/admin/leads — Manage leads
/admin/schedule/reps — Rep schedule
/admin/schedule/techs — Tech schedule
```

---

## API Endpoints

All endpoints require session cookie (`pb_session`).

### Authentication
- `POST /api/auth/login` — Log in with email + PIN
- `POST /api/auth/logout` — Log out
- `GET /api/auth/me` — Get current user

### Users (admin only)
- `GET /api/users` — List all users
- `POST /api/users` — Create new user
- `GET /api/users/:id` — Get user details
- `PATCH /api/users/:id` — Update user

### Quotes
- `GET /api/quotes` — List quotes (admin only)
- `POST /api/quotes` — Create new quote
- `GET /api/quotes/:id` — Get quote details

### Jobs
- `GET /api/jobs` — List jobs
- `POST /api/jobs` — Create job
- `GET /api/jobs/:id` — Get job details

### Payments (if Stripe configured)
- `POST /api/stripe/checkout` — Create payment session
- `POST /api/stripe/webhook` — Stripe webhook endpoint

---

## Next Steps

1. ✅ Explore the admin dashboard at `/admin`
2. ✅ Change admin credentials (optional)
3. ✅ Create additional users/reps
4. ✅ Configure business settings
5. ✅ Set up Stripe (if you want payment processing)
6. ✅ Set up SMTP (if you want email notifications)
7. ✅ Deploy to production (Vercel, etc.)

---

## Documentation

- **ADMIN_SETUP.md** — Detailed admin login configuration
- **API_REFERENCE.md** — Complete API documentation
- **VERIFICATION_CHECKLIST.md** — Step-by-step verification
- **admin-core/SETUP.md** — Full integration guide
- **admin-core/DEPENDENCIES.md** — Required packages

---

## Troubleshooting

### "Invalid credentials" on login
- Check `.env` has correct `ADMIN_EMAIL` and `ADMIN_PIN`
- PIN must be 4-6 digits
- Restart server after changing .env

### "Turso is not configured"
- Check `.env` has `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`
- Restart server

### Admin dashboard shows nothing
- Clear browser cookies and log in again
- Check browser console for API errors
- Verify user has admin role

### API returns 401 Unauthorized
- Session cookie may be expired
- Log out and log back in
- Check cookie exists: DevTools → Application → Cookies → pb_session

---

## Security Notes ⚠️

For production deployment:

1. **Change default PIN** — Currently `1234`, change to something strong
2. **Create database users** — Once users exist, remove `ADMIN_EMAIL`/`ADMIN_PIN` from .env
3. **Use HTTPS** — Don't deploy with HTTP
4. **Secure AUTH_SECRET** — Never commit to git, use environment variables
5. **Restrict access** — Use firewall/authentication for admin dashboard
6. **Enable CORS** — Only for trusted domains

---

## Need Help?

- Check **VERIFICATION_CHECKLIST.md** if something isn't working
- Check **API_REFERENCE.md** for endpoint details
- Check **admin-core/SETUP.md** for full configuration
- Review server console logs for error messages

---

## You're All Set! 🚀

Your admin portal is ready to use. Start at:

**http://localhost:3000/signin**

- Email: `admin@mountainspringsclean.com`
- PIN: `1234`

Welcome to Mountain Springs Cleaning Admin! ✨
