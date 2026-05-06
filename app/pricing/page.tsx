import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Mountain Springs Cleaning Las Vegas",
  description: "Transparent pricing for Las Vegas home cleaning. No surprises, no hidden fees. Standard, deep, recurring, and Airbnb cleaning.",
  keywords: "cleaning prices Las Vegas, house cleaning cost, cleaning rates, transparent pricing",
};

export default function PricingPage() {
  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image src="/logo.png" alt="Mountain Springs Cleaning" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover" }} />
            <span>Mountain Springs<br />Cleaning</span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/pricing" className="active">Pricing</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
          <a href="/#book" className="nav-cta">Book Now →</a>
        </div>
      </nav>

      <section className="service-hero">
        <div className="service-hero-eyebrow">Transparent Pricing</div>
        <h1>Know Exactly What You Pay</h1>
        <p className="hero-sub">No surprises. No hidden fees. Our pricing is clear, fair, and competitive. What you see is what you pay.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginBottom: 16 }}>Standard Cleaning Pricing</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 600, margin: "0 auto" }}>One-time or recurring cleans. Same transparent pricing either way.</p>
        </div>

        <div className="pricing-grid">
          {[
            { beds: "1-2 Bed / 1 Bath", price: "$89–$119", time: "2–3 hours", desc: "Perfect for smaller homes and apartments" },
            { beds: "3 Bed / 2 Bath", price: "$129–$159", time: "3–4 hours", desc: "Most popular size in Las Vegas" },
            { beds: "4+ Bed / 2.5+ Bath", price: "$169–$199", time: "4–5 hours", desc: "Larger homes and busy households" },
          ].map((item, i) => (
            <div key={i} className="pricing-card">
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1f36", marginBottom: 8 }}>{item.beds}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#1565f2", marginBottom: 4 }}>{item.price}</div>
              <div style={{ fontSize: 13, color: "#4a5578", marginBottom: 12 }}>≈ {item.time}</div>
              <div style={{ fontSize: 13, color: "#4a5578", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#f0f5ff", borderRadius: 16, padding: 32, marginTop: 48 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1a1f36", marginBottom: 20 }}>What's Included in Standard Cleaning</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              "Kitchen: surfaces, sink, stovetop, appliance exteriors",
              "All bathrooms: toilet, tub, shower, sink, mirrors",
              "Bedrooms & living areas: dusting, vacuuming, mopping",
              "Hallways, entryways & common areas",
              "Trash emptied and bins lined",
              "Professional-grade supplies included",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ color: "#22c55e", fontWeight: 900, marginTop: 2 }}>✓</div>
                <div style={{ fontSize: 13, color: "#4a5578" }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginBottom: 12, textAlign: "center" }}>Deep Cleaning</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 600, margin: "0 auto 40px", textAlign: "center" }}>Every corner, every surface. Perfect for move-ins, move-outs, and seasonal refreshes.</p>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ border: "1px solid #dde3f0", borderRadius: 12, padding: 28, background: "#fff" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1f36", marginBottom: 8 }}>Deep Cleaning (per home)</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#1565f2", marginBottom: 4 }}>$189–$399</div>
              <div style={{ fontSize: 13, color: "#4a5578", marginBottom: 16 }}>5–8 hours (depends on size & condition)</div>
              <p style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>Includes: inside appliances, baseboards, behind furniture, tile grout, vents, light fixtures, walls, and all standard cleaning items.</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginBottom: 12, textAlign: "center" }}>Recurring Plans — Save 10–15%</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 600, margin: "0 auto 40px", textAlign: "center" }}>Lock in a discounted rate with recurring cleans. No contract, month-to-month.</p>
          <div className="pricing-grid">
            {[
              { freq: "Weekly", base: "$89/visit", save: "Save 15%" },
              { freq: "Bi-Weekly", base: "$99/visit", save: "Save 12%" },
              { freq: "Monthly", base: "$119/visit", save: "Save 10%" },
            ].map((item, i) => (
              <div key={i} className="pricing-card featured">
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1f36", marginBottom: 8 }}>{item.freq}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#1565f2", marginBottom: 4 }}>{item.base}</div>
                <div style={{ display: "inline-block", background: "#1565f2", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 999, marginBottom: 12 }}>RECURRING DISCOUNT</div>
                <div style={{ fontSize: 13, color: "#4a5578" }}>{item.save} vs. one-time pricing. No contract.</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginBottom: 40, textAlign: "center" }}>Add-Ons & Extras</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 600, margin: "0 auto 40px", textAlign: "center" }}>Customize your clean. Add any of these to your booking.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { item: "Inside Refrigerator", price: "$25–$35" },
              { item: "Inside Oven & Stovetop", price: "$30–$40" },
              { item: "Interior Windows", price: "$20–$30" },
              { item: "Laundry Service", price: "$25–$50" },
              { item: "Organize Closets/Storage", price: "$30–$60" },
              { item: "Green Product Upgrade", price: "$10–$20" },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid #dde3f0", borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1f36" }}>{item.item}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1565f2" }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1a1f36", borderRadius: 16, padding: 48, marginTop: 80, color: "#fff" }}>
          <h2 style={{ color: "#fff", marginBottom: 24, textAlign: "center" }}>How We Price</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
            {[
              { title: "Transparent", desc: "We quote upfront based on home size and scope. What you see is what you pay — no surprise charges." },
              { title: "Fair", desc: "Our prices are competitive with the Las Vegas market and reflect the quality you get." },
              { title: "Flexible", desc: "Recurring customers lock in discounted rates. One-time cleans are full price, no minimum." },
              { title: "No Hidden Fees", desc: "No travel charges. No small-home surcharges. No 'we need to upsell you' surprises." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#7bb3ff", marginBottom: 12 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 28, textAlign: "center" }}>Payment & Booking</h2>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            {[
              { title: "Easy Booking", desc: "Book online in seconds or call for a phone quote. Get your price estimate immediately." },
              { title: "Secure Payment", desc: "We accept all major credit cards. Payments processed securely through Stripe. Your data is protected." },
              { title: "Flexible Scheduling", desc: "Pay per visit, or set up recurring billing for your recurring plan. Cancel anytime." },
              { title: "Guarantee", desc: "Not satisfied? We re-clean free. Satisfaction guaranteed or your money back." },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid #dde3f0", paddingBottom: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1565f2", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Ready to get your price quote?</h2>
          <p>Book online in seconds. Get a transparent estimate with no surprises.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Get a Quote →</a>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Image src="/logo.png" alt="Mountain Springs Cleaning" width={56} height={56} style={{ borderRadius: "50%", marginBottom: 14 }} />
              <p>Professional home cleaning in the valley. Trusted, insured, and satisfaction guaranteed.</p>
              <div className="footer-social">
                <div className="social-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                </div>
                <div className="social-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </div>
                <div className="social-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                </div>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                <li><Link href="/services/standard-cleaning">Standard Cleaning</Link></li>
                <li><Link href="/services/deep-cleaning">Deep Cleaning</Link></li>
                <li><Link href="/services/move-in-move-out">Move-In/Out</Link></li>
                <li><Link href="/services/recurring-plans">Recurring Plans</Link></li>
                <li><Link href="/services/airbnb-turnover">Airbnb Turnovers</Link></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><Link href="/about">About Us</Link></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Help</div>
              <ul className="footer-links">
                <li><Link href="/faq">FAQs</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/service-areas">Service Area</Link></li>
                <li><a href="#">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (702) 867-5309
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                hello@mountainsprings.co
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Las Vegas, NV
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Mountain Springs Cleaning LLC. All rights reserved.</span>
            <span>Privacy Policy · Terms of Service</span>
          </div>
        </div>
      </footer>
    </>
  );
}
