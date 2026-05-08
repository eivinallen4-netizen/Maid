# Testing & Deployment Checklist

Complete this checklist to ensure everything works correctly.

## 🧪 Local Testing

### Authentication & Middleware
- [ ] Start dev server: `npm run dev`
- [ ] Try to access `/admin` without logging in
  - [ ] Should redirect to `/signin`
  - [ ] Return URL should be in `?next=/admin`
- [ ] Try to access `/account` without logging in
  - [ ] Should redirect to `/signin`
- [ ] Log in with admin credentials:
  - [ ] Email: `theodoreallen677@Gmail.com` (or your email)
  - [ ] PIN: `1234`
- [ ] After login, `/admin` should load
- [ ] Session should persist for 3 hours
- [ ] Logging out should clear session

### Quote Builder Page
- [ ] Navigate to `/quote-builder`
- [ ] Fill out form:
  - [ ] Name: Test User
  - [ ] Email: test@example.com
  - [ ] Phone: (702) 555-0000
  - [ ] Address: 123 Main St, Las Vegas, NV
- [ ] Select Service Type:
  - [ ] Standard ($150)
  - [ ] Deep ($225)
  - [ ] Move Out ($275)
- [ ] Select Home Size:
  - [ ] 1-2 bed (no surcharge)
  - [ ] 3-5 bed (with surcharge)
- [ ] Select Add-ons:
  - [ ] Prices update correctly
  - [ ] Total recalculates
- [ ] Click "Get Quote"
  - [ ] Quote creates successfully
  - [ ] No payment required
  - [ ] Quote appears in admin

### Stripe Payment
- [ ] On quote builder, click "Pay Now"
- [ ] Stripe checkout modal appears
- [ ] Enter test card: `4242 4242 4242 4242`
- [ ] Enter any future expiry: `12/34`
- [ ] Enter any CVC: `123`
- [ ] Click "Pay"
- [ ] Redirect to `/thank-you`
- [ ] Session ID displayed
- [ ] Payment status shows "Paid"

### Thank You Page
- [ ] Visit `/thank-you?session_id=cs_test_123`
- [ ] Success message displays
- [ ] Order details shown
- [ ] Contact info visible
- [ ] Links work:
  - [ ] "Back to Home" → `/`
  - [ ] "Create Another Quote" → `/quote-builder`

### Quote Management
- [ ] Admin can see quotes in dashboard
- [ ] "Get Quote" quotes are marked as pending
- [ ] "Pay Now" quotes are marked as paid
- [ ] Can view quote details
- [ ] Can send quote via email (if SMTP configured)

### Email Sending
- [ ] SMTP configured in `.env`
- [ ] Test quote send via admin
- [ ] Check inbox for email
- [ ] Email contains:
  - [ ] Quote details
  - [ ] Total price
  - [ ] Payment link (if applicable)
  - [ ] Contact info

---

## 🔒 Security Testing

### Authentication
- [ ] Session token is HMAC-SHA256 signed
- [ ] Session cookie is HTTP-only
- [ ] Session cookie is Secure (HTTPS only in production)
- [ ] Session expires after 3 hours
- [ ] Logged-out users cannot access admin
- [ ] Non-admin users cannot access admin pages

### Payment
- [ ] Card details never stored locally
- [ ] Stripe handles all payment processing
- [ ] Payment verification required
- [ ] Webhook validates payments
- [ ] Test card `4242...` works
- [ ] Real cards cannot be used in test mode

### Database
- [ ] Quotes stored encrypted in transit
- [ ] Sensitive data not logged
- [ ] Admin access restricted to authenticated admins
- [ ] Quote data only accessible by creator/admin

---

## 📊 Data Integrity

### Pricing
- [ ] Service type prices correct
  - [ ] Standard: $150
  - [ ] Deep: $225
  - [ ] Move Out: $275
- [ ] Home size surcharges correct
  - [ ] 3bed: +$75
  - [ ] 4bed: +$150
  - [ ] 5bed: +$225
- [ ] Add-on prices correct
  - [ ] Laundry: $35
  - [ ] Windows: $50
  - [ ] Baseboards: $40
  - [ ] Fridge: $45
  - [ ] Move-in: $125
  - [ ] Airbnb: $100
- [ ] Minimum $150 enforced
- [ ] Total calculation correct

### Quote Creation
- [ ] Quote creates with:
  - [ ] Customer name, email, phone, address
  - [ ] Service selections
  - [ ] Calculated total
  - [ ] Created timestamp
  - [ ] Quote ID
- [ ] Quote persists in database
- [ ] Quote retrievable via API

### Payment Records
- [ ] Transaction created for payment
- [ ] Amount matches quote total
- [ ] Transaction linked to quote
- [ ] Payment intent ID stored
- [ ] Session ID stored

---

## 🚀 Performance

### Page Load
- [ ] `/quote-builder` loads in < 2 seconds
- [ ] `/admin` loads in < 2 seconds
- [ ] `/thank-you` loads in < 1 second

### Form Submission
- [ ] "Get Quote" responds in < 3 seconds
- [ ] "Pay Now" redirects to Stripe in < 2 seconds
- [ ] No console errors
- [ ] No network errors

### Database
- [ ] Quote queries < 500ms
- [ ] Payment verification < 1 second
- [ ] Email sending < 5 seconds

---

## 📱 Responsive Design

### Mobile
- [ ] `/quote-builder` responsive on mobile
- [ ] Form fields stack on small screens
- [ ] Summary card readable on mobile
- [ ] Buttons full-width on mobile
- [ ] No horizontal scroll needed

### Tablet
- [ ] Layout adapts to tablet width
- [ ] Form and summary side-by-side if space
- [ ] Touch-friendly button sizes

---

## 🔧 Environment Configuration

- [ ] `.env` has all required variables:
  - [ ] ADMIN_EMAIL
  - [ ] ADMIN_PIN
  - [ ] AUTH_SECRET
  - [ ] TURSO_DATABASE_URL
  - [ ] TURSO_AUTH_TOKEN
  - [ ] STRIPE_SECRET_KEY
  - [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  - [ ] STRIPE_WEBHOOK_SECRET (optional)
  - [ ] SMTP_* (optional)

### Optional but Recommended
- [ ] Stripe webhook configured
  - [ ] Event types subscribed
  - [ ] Endpoint URL set
  - [ ] Signature verification working
- [ ] Email sending configured
  - [ ] SMTP host reachable
  - [ ] Authentication working
  - [ ] Test email sends successfully

---

## 🐛 Error Handling

### Missing Data
- [ ] Empty form shows validation errors
- [ ] Invalid email rejected
- [ ] Missing required fields highlighted
- [ ] User can correct and resubmit

### Network Errors
- [ ] API error shows user-friendly message
- [ ] Retry button available
- [ ] Error details in console
- [ ] No data loss on error

### Payment Errors
- [ ] Declined card handled gracefully
- [ ] Error message clear
- [ ] User can try different card
- [ ] Payment not created on error

### Database Errors
- [ ] Database connection error handled
- [ ] User sees retry option
- [ ] No partial data written on error
- [ ] Server logs error details

---

## 📋 Browser Compatibility

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## 🚢 Pre-Deployment

### Code Quality
- [ ] No TypeScript errors: `npm run build`
- [ ] No ESLint warnings: `npm run lint`
- [ ] All imports resolve correctly
- [ ] No console errors/warnings

### Documentation
- [ ] IMPLEMENTATION_GUIDE.md complete
- [ ] README.md updated
- [ ] API documentation current
- [ ] Comments added for complex logic

### Environment
- [ ] Production `.env` configured
- [ ] Stripe production keys ready
- [ ] Email provider configured
- [ ] Database connections verified

### Database
- [ ] Schema migrations complete
- [ ] Backups created
- [ ] Database indexes optimized
- [ ] Query performance tested

---

## 🚀 Deployment Checklist

### Before Deploy
- [ ] All tests passing
- [ ] No breaking changes
- [ ] Rollback plan prepared
- [ ] Team notified

### During Deploy
- [ ] Monitor deployment logs
- [ ] Verify health checks
- [ ] Test critical paths
- [ ] Monitor error rates

### After Deploy
- [ ] Verify all pages load
- [ ] Test authentication flow
- [ ] Create test quote
- [ ] Test payment processing
- [ ] Verify emails sending
- [ ] Monitor server logs
- [ ] Check performance metrics

---

## ✅ Sign-Off

Once all items are checked:

- [ ] Local testing complete
- [ ] Security testing complete
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Ready for staging
- [ ] Ready for production

---

## Common Issues & Solutions

### Stripe not working
- Check keys in `.env`
- Verify webhook configured
- Check Stripe dashboard for errors
- Try test card `4242 4242 4242 4242`

### Emails not sending
- Check SMTP credentials
- Verify sender email
- Check firewall allows SMTP
- Test with Gmail app password

### Prices wrong
- Check `config/pricing.config.ts`
- Verify add-on names match
- Clear browser cache
- Check database values

### Authentication fails
- Check `ADMIN_EMAIL` and `ADMIN_PIN`
- Verify auth token not expired
- Clear browser cookies
- Check middleware.ts

### Database errors
- Check connection string
- Verify auth token valid
- Check database tables created
- Run schema initialization

---

## Success Criteria

✅ All authentication working
✅ Quote builder fully functional
✅ Prices calculating correctly
✅ Stripe payments processing
✅ Quotes creating in database
✅ Thank you page displaying
✅ Emails sending (if configured)
✅ Admin dashboard accessible
✅ No security vulnerabilities
✅ Performance acceptable

**When all items are checked, you're ready to deploy!** 🎉

---

## Contact & Support

If issues arise:
1. Check IMPLEMENTATION_GUIDE.md
2. Check TESTING_CHECKLIST.md
3. Check error logs in server console
4. Check browser DevTools console
5. Review relevant API files

Good luck! 🚀
