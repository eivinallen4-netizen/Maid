# API Reference & Database Integration

Complete guide to all API endpoints and how they interact with the database.

## Authentication & Sessions

### POST `/api/auth/login`
Login with email and PIN.

**Request:**
```json
{
  "email": "admin@mountainspringsclean.com",
  "pin": "1234"
}
```

**Response (Success):**
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

**Flow:**
1. Validates email format (must contain @ and .)
2. Validates PIN (4-6 digits only)
3. Checks if credentials match `ADMIN_EMAIL` + `ADMIN_PIN` from .env
4. If no match, queries `users` table in database
5. Verifies PIN hash/salt from database
6. Creates session token (HMAC-SHA256 signed)
7. Sets HTTP-only session cookie

**Sets Cookie:**
- Name: `pb_session`
- TTL: 3 hours
- HttpOnly: true (cannot be accessed by JavaScript)
- Secure: true (only on HTTPS in production)

---

### POST `/api/auth/logout`
Clear session and log out user.

**Request:**
```
POST /api/auth/logout
(no body needed)
```

**Response:**
```json
{ "success": true }
```

---

### GET `/api/auth/me`
Get current logged-in user from session.

**Response (if logged in):**
```json
{
  "user": {
    "id": "user-123",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin",
    "is_admin": true
  }
}
```

**Response (if not logged in):**
```json
{ "user": null }
```

---

## Users Management

### GET `/api/users`
List all users (admin only).

**Headers required:**
```
Cookie: pb_session=<session_token>
```

**Response:**
```json
{
  "users": [
    {
      "id": "user-1",
      "email": "admin@example.com",
      "name": "Admin",
      "role": "admin",
      "is_admin": true,
      "phone": "+1 (702) 555-1234",
      "created_at": "2026-05-07T10:00:00Z"
    },
    {
      "id": "user-2",
      "email": "rep@example.com",
      "name": "Sales Rep",
      "role": "rep",
      "is_admin": false,
      "created_at": "2026-05-07T11:00:00Z"
    }
  ]
}
```

**Database Query:**
```sql
SELECT * FROM users;
```

---

### POST `/api/users`
Create a new user (admin only).

**Request:**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "role": "rep",
  "pin": "5678"
}
```

**Response:**
```json
{
  "user": {
    "id": "user-new",
    "email": "newuser@example.com",
    "name": "New User",
    "role": "rep",
    "is_admin": false
  },
  "inviteLink": "https://example.com/setup/token123abc"
}
```

**Database Changes:**
1. Hashes PIN with SHA-256
2. Inserts into `users` table:
   ```sql
   INSERT INTO users (id, email, created_at, data)
   VALUES ('user-new', 'newuser@example.com', '2026-05-07T12:00:00Z', '{...user_data...}')
   ```

---

### GET `/api/users/:id`
Get user details (admin only).

**Response:**
```json
{
  "user": {
    "id": "user-1",
    "email": "admin@example.com",
    "name": "Admin",
    "role": "admin",
    "phone": "+1 (702) 555-1234",
    "birthday": "1990-01-15",
    "profile_completed_at": "2026-05-07T10:30:00Z",
    "last_signed_in_at": "2026-05-07T14:20:00Z"
  }
}
```

---

### PATCH `/api/users/:id`
Update user (admin or self).

**Request:**
```json
{
  "name": "Updated Name",
  "phone": "+1 (702) 555-9999"
}
```

**Database Update:**
```sql
UPDATE users 
SET data = '{...updated_data...}'
WHERE id = 'user-1'
```

---

## Quotes & Pricing

### POST `/api/quotes`
Create a new quote (authenticated users only).

**Request:**
```json
{
  "customerEmail": "customer@example.com",
  "customerName": "John Doe",
  "selections": {
    "paneCounts": {
      "standard": 10,
      "specialty": 2
    },
    "storyLevel": "1-2",
    "addons": {
      "screen": true,
      "interior": false
    }
  }
}
```

**Response:**
```json
{
  "quote": {
    "id": "quote-123",
    "customerEmail": "customer@example.com",
    "customerName": "John Doe",
    "totalPrice": 325.50,
    "created_at": "2026-05-07T12:00:00Z"
  }
}
```

**Database Insert:**
```sql
INSERT INTO quotes (id, created_at, data)
VALUES ('quote-123', '2026-05-07T12:00:00Z', '{...quote_data...}')
```

---

### GET `/api/quotes`
List all quotes (admin only).

**Query Parameters:**
- `customerEmail` — Filter by customer email
- `status` — Filter by status (pending, sent, accepted, paid)

**Response:**
```json
{
  "quotes": [
    {
      "id": "quote-123",
      "customerEmail": "customer@example.com",
      "totalPrice": 325.50,
      "status": "pending",
      "created_at": "2026-05-07T12:00:00Z"
    }
  ]
}
```

---

## Jobs & Payments

### POST `/api/jobs`
Create a job (usually from paid quote).

**Database Insert:**
```sql
INSERT INTO jobs (id, stripe_session_id, payment_intent_id, created_at, data)
VALUES ('job-1', 'cs_123', 'pi_456', '2026-05-07T12:00:00Z', '{...job_data...}')
```

---

### GET `/api/jobs`
List all jobs (admin only).

**Response:**
```json
{
  "jobs": [
    {
      "id": "job-1",
      "customerEmail": "customer@example.com",
      "totalPrice": 325.50,
      "status": "scheduled",
      "scheduledAt": "2026-05-15T10:00:00Z"
    }
  ]
}
```

---

## Stripe Payments

### POST `/api/stripe/checkout`
Create a Stripe checkout session.

**Request:**
```json
{
  "quoteId": "quote-123"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_123abc",
  "url": "https://checkout.stripe.com/..."
}
```

**Database Interaction:**
1. Creates booking:
   ```sql
   INSERT INTO bookings (session_id, created_at, data)
   VALUES ('cs_test_123abc', '2026-05-07T12:00:00Z', '{...booking_data...}')
   ```

---

### POST `/api/stripe/webhook`
Stripe event webhook (payment success, failure, etc).

**Stripe sends:**
```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_456",
      "status": "succeeded"
    }
  }
}
```

**Database Updates:**
1. Updates booking status:
   ```sql
   UPDATE bookings
   SET data = '{...updated_data...}'
   WHERE session_id = 'cs_123'
   ```
2. Creates job if quote was paid
3. Sends confirmation email

---

## File Storage

### POST `/api/files`
Upload a file (image, document, etc).

**Request (FormData):**
```
POST /api/files
Content-Type: multipart/form-data

file: <binary_data>
```

**Response:**
```json
{
  "url": "https://s3.amazonaws.com/bucket/file-123.jpg",
  "key": "file-123.jpg"
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TEXT,
  data TEXT NOT NULL
);

-- Data object contains:
{
  "id": "user-1",
  "email": "admin@example.com",
  "name": "Admin",
  "role": "admin",
  "is_admin": true,
  "phone": "+1 (702) 555-1234",
  "pin_hash": "base64_encoded_hash",
  "pin_salt": "base64_encoded_salt",
  "created_at": "2026-05-07T10:00:00Z",
  "profile_completed_at": "2026-05-07T10:30:00Z",
  "last_signed_in_at": "2026-05-07T14:20:00Z"
}
```

### Jobs Table
```sql
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  payment_intent_id TEXT UNIQUE,
  created_at TEXT,
  data TEXT NOT NULL
);
```

### Quotes Table
```sql
CREATE TABLE quotes (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  data TEXT NOT NULL
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  session_id TEXT PRIMARY KEY,
  created_at TEXT,
  data TEXT NOT NULL
);
```

### Schedules Table
```sql
CREATE TABLE schedules (
  week_start TEXT PRIMARY KEY,
  updated_at TEXT,
  data TEXT NOT NULL
);
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT,
  data TEXT NOT NULL
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  transaction_key TEXT NOT NULL UNIQUE,
  payment_intent_id TEXT,
  stripe_session_id TEXT,
  job_id TEXT,
  created_at TEXT,
  updated_at TEXT,
  data TEXT NOT NULL
);
```

---

## Testing

### Test Admin Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mountainspringsclean.com",
    "pin": "1234"
  }'
```

### Create Test User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Cookie: pb_session=<admin_token>" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "role": "rep",
    "pin": "5678"
  }'
```

### Test Quote Creation
```bash
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -H "Cookie: pb_session=<user_token>" \
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

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Descriptive error message"
}
```

### Common Status Codes
- `400` — Bad request (invalid email, PIN, etc)
- `401` — Unauthorized (invalid credentials)
- `403` — Forbidden (not admin)
- `404` — Not found (user doesn't exist)
- `500` — Server error (database issue)

---

## Rate Limiting

No rate limiting is enforced. For production, consider adding:
- Login attempts: 5 per minute
- API calls: 100 per minute per user
- File uploads: 10 per minute per user

---

## Security

### Authentication Flow
1. User submits credentials to `/api/auth/login`
2. System validates and returns session token
3. Token is set as `pb_session` HTTP-only cookie
4. Cookie is sent automatically with each request
5. On each request, system verifies token signature
6. Token expires after 3 hours

### Token Format
```
payload.signature
```

- `payload`: Base64-encoded JSON with user data + expiry
- `signature`: HMAC-SHA256(payload, AUTH_SECRET)

### PIN Hashing
```
hash = SHA256(salt + ':' + pin)
```

---

## Troubleshooting API

### "Database is not configured"
- Check `TURSO_DATABASE_URL` in `.env`
- Check `TURSO_AUTH_TOKEN` in `.env`
- Restart dev server

### "AUTH_SECRET is not configured"
- Generate new secret: `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`
- Add to `.env`

### CORS errors
- All endpoints are same-origin
- No CORS headers needed for same domain

### 401 Unauthorized
- Session token may be expired
- User may have been logged out
- Try logging in again

---

## Documentation Map

- **ADMIN_SETUP.md** — Setting up admin login
- **API_REFERENCE.md** — This file (API endpoints)
- **admin-core/SETUP.md** — Full configuration guide
- **admin-core/DEPENDENCIES.md** — Required packages
