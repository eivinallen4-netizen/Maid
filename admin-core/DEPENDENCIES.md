# Admin-Core Dependencies

This file documents all npm packages required for admin-core to function.

## Install Command

```bash
npm install
```

Or install explicitly:

```bash
npm install \
  @aws-sdk/client-s3 \
  @aws-sdk/s3-request-presigner \
  @libsql/client \
  @vercel/analytics \
  @vercel/speed-insights \
  class-variance-authority \
  clsx \
  lucide-react \
  next \
  next-sitemap \
  nodemailer \
  radix-ui \
  react \
  react-dom \
  react-markdown \
  stripe \
  tailwind-merge
```

## Package Details

### Core Framework

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^16.1.6 | Next.js framework for React SSR/SSG |
| `react` | 19.2.3 | React library |
| `react-dom` | 19.2.3 | React DOM rendering |

**Why needed:** Admin-core is built on Next.js 16 with React 19.

### Database

| Package | Version | Purpose |
|---------|---------|---------|
| `@libsql/client` | ^0.17.2 | LibSQL client for Turso database |

**Why needed:** Connects to Turso (SQLite-compatible) database for storing users, jobs, quotes, etc.

### Authentication & Security

No external auth packages needed. Admin-core uses:
- `crypto` (built-in Node.js) for HMAC signing
- Web Crypto API for PIN hashing

### Payment Processing

| Package | Version | Purpose |
|---------|---------|---------|
| `stripe` | ^17.7.0 | Stripe API client for payment processing |

**Why needed:** Handles Stripe checkout, payment intents, webhooks.

### Email

| Package | Version | Purpose |
|---------|---------|---------|
| `nodemailer` | ^8.0.2 | SMTP client for sending emails |

**Why needed:** Sends quote emails, confirmations, notifications via SMTP.

### File Storage

| Package | Version | Purpose |
|---------|---------|---------|
| `@aws-sdk/client-s3` | ^3.1024.0 | AWS S3 client |
| `@aws-sdk/s3-request-presigner` | ^3.1024.0 | Pre-signed URL generator |

**Why needed:** Handles file uploads to S3 or Cloudflare R2 (S3-compatible).

### UI & Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `class-variance-authority` | ^0.7.1 | CSS class composition |
| `clsx` | ^2.1.1 | Conditional class names |
| `lucide-react` | ^0.577.0 | Icon library |
| `radix-ui` | ^1.4.3 | Unstyled accessible components |
| `react-markdown` | ^10.1.0 | Markdown to React rendering |
| `tailwind-merge` | ^3.5.0 | Merge Tailwind classes safely |

**Why needed:** Build responsive, accessible UI with shadcn/ui components styled with Tailwind.

### Analytics

| Package | Version | Purpose |
|---------|---------|---------|
| `@vercel/analytics` | ^2.0.1 | Vercel Analytics integration |
| `@vercel/speed-insights` | ^2.0.0 | Vercel Speed Insights |

**Why needed:** (Optional) Collect analytics and performance metrics if deployed on Vercel.

### SEO & Sitemap

| Package | Version | Purpose |
|---------|---------|---------|
| `next-sitemap` | ^4.2.3 | Sitemap generation for SEO |

**Why needed:** (Optional) Auto-generate sitemap.xml for public-facing pages.

---

## Dev Dependencies

```bash
npm install --save-dev \
  @tailwindcss/postcss \
  @types/node \
  @types/nodemailer \
  @types/react \
  @types/react-dom \
  eslint \
  eslint-config-next \
  shadcn \
  tailwindcss \
  tw-animate-css \
  typescript
```

### Development Tools

| Package | Version | Purpose |
|---------|---------|---------|
| `@tailwindcss/postcss` | ^4 | Tailwind CSS compiler |
| `tailwindcss` | ^4 | Tailwind CSS framework |
| `tw-animate-css` | ^1.4.0 | Tailwind animation utilities |
| `typescript` | ^5 | TypeScript compiler |
| `eslint` | ^9 | Code linting |
| `eslint-config-next` | 16.1.6 | ESLint config for Next.js |
| `shadcn` | ^3.8.5 | shadcn/ui CLI for adding components |

### Type Definitions

| Package | Version | Purpose |
|---------|---------|---------|
| `@types/node` | ^20 | Node.js types |
| `@types/react` | ^19 | React types |
| `@types/react-dom` | ^19 | React DOM types |
| `@types/nodemailer` | ^7.0.11 | Nodemailer types |

**Why needed:** TypeScript support for development.

---

## Optional Dependencies

### If you need additional features:

```bash
# For Redis caching (optional)
npm install redis

# For email template rendering (optional)
npm install mjml

# For PDF generation (optional)
npm install @react-pdf/renderer

# For SMS notifications (optional)
npm install twilio

# For monitoring/logging (optional)
npm install winston pino
```

---

## Package Size & Performance

Total bundle size (dependencies only):
- Production: ~5-8 MB (gzipped: ~1.5-2 MB)
- Dev: ~500 MB (node_modules)

This is typical for a full-stack Next.js application with auth, payments, and storage.

---

## Node Version

**Minimum:** Node.js 20.9.0

Check your version:
```bash
node --version
```

---

## Security

### Keeping dependencies updated:

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update to latest major versions (be careful!)
npm install -g npm-check-updates
ncu -u
npm install
```

### Audit for vulnerabilities:

```bash
npm audit
npm audit fix
```

---

## Installation Issues

### Common problems:

**`npm ERR! code ERESOLVE`**
- Try: `npm install --legacy-peer-deps`

**`node-gyp` errors**
- Windows: Install [windows-build-tools](https://github.com/felixbecker/node-gyp-windows-native)
- macOS: Install XCode Command Line Tools: `xcode-select --install`
- Linux: Install build-essential: `apt-get install build-essential`

**Permission denied errors**
- Don't use `sudo` with npm
- Fix with: `npm install -g npm --prefix /usr/local`

---

## Next Steps

1. Install with: `npm install`
2. Create `.env` file from `.env.example`
3. Configure all services (database, Stripe, email, storage)
4. Run: `npm run dev`
5. Visit: `http://localhost:3000/signin`

See SETUP.md for detailed configuration instructions.
