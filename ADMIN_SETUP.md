# Core Admin Login Setup Guide

This guide helps you set up the admin login for Mountain Springs Cleaning portal.

## Quick Start (2 minutes)

### 1. Environment Variables (.env)

The following variables are already configured in your `.env`:

```env
# Core Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@mountainspringsclean.com
ADMIN_PIN=1234
ADMIN_NAME=Admin
```

These credentials allow you to log in at `/signin` immediately without database setup.

### 2. Log In

1. Go to `http://localhost:3000/signin`
2. Enter email: `admin@mountainspringsclean.com`
3. Enter PIN: `1234`
4. Click "Sign in"

You'll be logged in as an admin and can access the admin dashboard at `/admin`.

---

## How It Works

The login system has **two paths**:

### Path 1: Environment-Based Login (for quick setup)
```
User submits credentials → Check if they match ADMIN_EMAIL + ADMIN_PIN in .env
→ If match: Create admin session
→ If no match: Look up user in database
```

This is perfect for initial setup and testing.

### Path 2: Database Login (for production)
```
User submits credentials → Look up email in database
→ Verify PIN hash matches → Create user session
```

Once you create admin users in the database, they can log in with their credentials.

---

## Change Admin Credentials

### Option A: Change .env (Quick)
Edit `.env`:
```env
ADMIN_EMAIL=newemail@example.com
ADMIN_PIN=5678
ADMIN_NAME=Your Name
```

Then restart your dev server.

### Option B: Create Database Users (Production)

To create persistent admin users that don't depend on .env:

1. **Using the API** (recommended):
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Cookie: pb_session=<your_admin_session>" \
  -d '{
    "email": "newadmin@example.com",
    "name": "New Admin",
    "role": "admin",
    "pin": "5678"
  }'
```

2. **Using the Admin Dashboard**:
   - Log in at `/signin`
   - Go to `/admin` → Users
   - Click "Add User"
   - Set role to "Admin"
   - Submit

---

## Organization of Pages

All pages are organized in the `app/` directory:

### Public Pages
- `/` — Home page
- `/about` — About us
- `/services` — Service offerings
- `/pricing` — Pricing information
- `/how-it-works` — Process explanation
- `/service-areas` — Coverage areas
- `/faq` — Frequently asked questions

### Customer Pages
- `/signin` — Login page (email + PIN)
- `/account` — Customer account & profile
- `/quote` — Request a quote
- `/portal-quote` — Review quote & checkout

### Admin Pages (Requires login)
- `/admin` — Admin dashboard
- `/admin/leads` — Manage leads
- `/admin/schedule` — Manage schedules
- `/admin/schedule/reps` — Rep availability
- `/admin/schedule/techs` — Tech availability

---

## Database Configuration

Your database is configured in `.env`:

```env
# Turso Database (Recommended)
TURSO_DATABASE_URL=libsql://mountain-spring-cleaning-prophetic-leo-4b.aws-us-west-2.turso.io
TURSO_AUTH_TOKEN=eyJhbGc...

# Or Local SQLite (Development)
# Just set a placeholder auth token:
TURSO_AUTH_TOKEN=placeholder
```

The system auto-initializes the database schema on first run.

### Tables Created Automatically
- `users` — Admin, rep, and tech users
- `jobs` — Service jobs
- `quotes` — Customer quotes
- `bookings` — Payment bookings
- `schedules` — Team schedules
- `contacts` — Customer contacts
- `reviews` — Service reviews
- `transactions` — Payment records

---

## Testing Admin Access

### 1. Verify .env is Correct
```bash
grep "ADMIN_" .env
# Should output:
# ADMIN_EMAIL=admin@mountainspringsclean.com
# ADMIN_PIN=1234
# ADMIN_NAME=Admin
```

### 2. Start Dev Server
```bash
npm run dev
```

### 3. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mountainspringsclean.com",
    "pin": "1234"
  }'
```

Should return:
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

### 4. Visit Dashboard
Open browser to `http://localhost:3000/admin`

---

## Troubleshooting

### "Invalid credentials" error
- Check `.env` has correct `ADMIN_EMAIL` and `ADMIN_PIN`
- PIN must be 4-6 digits only
- Restart dev server after changing .env

### "Unable to sign in" error
- Check network tab in browser DevTools
- Verify `/api/auth/login` endpoint is accessible
- Check server logs for error details

### Database connection error
- Verify `TURSO_DATABASE_URL` is correct
- Check `TURSO_AUTH_TOKEN` is not empty
- Try using local SQLite for development

### Admin dashboard shows "Access Denied"
- Verify you're logged in with admin role
- Check user session cookie is set correctly
- Clear browser cookies and try again

---

## Security Notes

⚠️ **Important for Production:**

1. **Change default credentials** before deploying
2. **Use strong PINs** (4-6 digit numbers)
3. **Remove ADMIN_PIN from .env** once users are created in the database
4. **Keep AUTH_SECRET secure** — don't commit to git
5. **Use HTTPS** — credentials are sent over HTTP-only cookies

---

## Next Steps

1. ✅ Update `.env` with your admin credentials
2. ✅ Run `npm run dev`
3. ✅ Log in at `/signin`
4. ✅ Explore `/admin` dashboard
5. ✅ Create additional users via admin panel
6. ✅ Configure business settings in `/admin`

Need help? Check `admin-core/SETUP.md` for more detailed configuration.
