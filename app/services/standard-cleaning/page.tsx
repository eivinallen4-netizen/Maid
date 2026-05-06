import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Standard Cleaning Service | Mountain Springs Cleaning Las Vegas",
  description: "Professional standard cleaning in Las Vegas. Same team every visit. Kitchens, bathrooms, bedrooms. Satisfaction guaranteed.",
  keywords: "standard cleaning Las Vegas, house cleaning service, residential cleaning, weekly cleaning",
};

export default function StandardCleaningPage() {
  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image src="/logo.png" alt="Mountain Springs Cleaning" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover" }} />
            <span>Mountain Springs<br />Cleaning</span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services" className="active">Services</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
          <a href="/#book" className="nav-cta">Book Now →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-eyebrow">Standard Cleaning</div>
        <h1>Your Home, Spotlessly Clean</h1>
        <p className="hero-sub">Professional residential cleaning you can count on. Same team every visit. Satisfaction guaranteed.</p>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div className="two-col-section">
          <div className="two-col-text">
            <h2>What's included in standard cleaning</h2>
            <p>Our standard clean covers everything you need for a spotless home. No surprises, no missing spots.</p>
            <ul className="checklist" style={{ marginTop: 24 }}>
              <li><CheckIcon /> Kitchen: surfaces, sink, stovetop, exterior of appliances</li>
              <li><CheckIcon /> All bathrooms: toilet, tub, shower, sink, mirrors</li>
              <li><CheckIcon /> Bedrooms & living areas: dusting, vacuuming, mopping</li>
              <li><CheckIcon /> Entry and hallways</li>
              <li><CheckIcon /> Professional-grade cleaning supplies included</li>
            </ul>
          </div>
          <div className="two-col-image">
            <Image src="/images/standard-kitchen.jpg" alt="Clean kitchen" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div className="two-col-section" style={{ marginTop: 80 }}>
          <div className="two-col-image">
            <Image src="/images/standard-bathroom.jpg" alt="Clean bathroom" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="two-col-text">
            <h2>Why choose our standard cleaning</h2>
            <p><strong>Same team, every visit.</strong> You'll know who's coming. Your cleaners will remember your home's layout, your preferences, and what you care about most.</p>
            <p style={{ marginTop: 16 }}><strong>Background-checked, always.</strong> Every member of your cleaning team has passed a thorough background check. Your home is in trusted, insured hands.</p>
            <p style={{ marginTop: 16 }}><strong>Quality you can count on.</strong> Not happy with something? We come back to re-clean it — completely free, no questions asked.</p>
            <p style={{ marginTop: 16 }}><strong>Flexible scheduling.</strong> Book weekly, bi-weekly, or one-time. Skip or pause anytime, no penalties.</p>
          </div>
        </div>

        <div style={{ background: "#f0f5ff", borderRadius: 16, padding: 40, marginTop: 80 }}>
          <h2 style={{ marginBottom: 28 }}>How often should you clean?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { freq: "Weekly", best: "Busy households, families with kids/pets, professionals with irregular schedules", price: "$89–$149/visit" },
              { freq: "Bi-weekly", best: "Moderate traffic homes, smaller households", price: "$99–$159/visit" },
              { freq: "Monthly", best: "Light traffic homes, supplemental cleaning", price: "$119–$189/visit" },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid #dde3f0", borderRadius: 12, padding: 20, background: "#fff" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1565f2", marginBottom: 8 }}>{item.freq}</div>
                <div style={{ fontSize: 13, color: "#4a5578", marginBottom: 12, lineHeight: 1.5 }}>Best for: {item.best}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#1a1f36" }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 0" }}>
        <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginBottom: 40 }}>Questions?</h2>
        <div style={{ maxWidth: 600 }}>
          {[
            { q: "Can I request specific cleaning products?", a: "Absolutely. If you prefer we use your supplies or have a preference for green/eco-friendly products, just note it during booking." },
            { q: "What if I'm not home?", a: "Most customers aren't home during their cleaning. You can leave a key, use a lockbox, or provide entry instructions. We're fully insured and background-checked." },
            { q: "Can I add extra services?", a: "Yes! Add-ons like oven cleaning, fridge deep-clean, window washing, and laundry are available. Select them during booking or call us ahead of time." },
            { q: "What about my pets?", a: "We love pets! Just let us know during booking so we can be prepared. For safety, we ask that pets are secured during the cleaning if possible." },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #dde3f0", paddingBottom: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1565f2", marginBottom: 8 }}>{item.q}</div>
              <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Ready for your spotless home?</h2>
          <p>Book your first clean today. Get a free estimate in minutes.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Book Standard Cleaning →</a>
        </div>
      </section>

      {/* FOOTER */}
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

const CheckIcon = () => (
  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 12, height: 12 }}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  </div>
);
