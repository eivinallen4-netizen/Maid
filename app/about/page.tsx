import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Mountain Springs Cleaning | Las Vegas Cleaning Company",
  description: "About Mountain Springs Cleaning. Background-checked, insured, local Las Vegas cleaning company. Our mission, values, and team.",
  keywords: "about mountain springs cleaning, Las Vegas cleaning company, professional cleaners, background checked",
};

export default function AboutPage() {
  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image src="/logo.png" alt="Mountain Springs Cleaning" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover" }} />
            <span>Mountain Springs<br />Cleaning</span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/about" className="active">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
          <a href="/#book" className="nav-cta">Book Now →</a>
        </div>
      </nav>

      <section className="service-hero">
        <div className="service-hero-eyebrow">Our Story</div>
        <h1>Trusted by Las Vegas Families</h1>
        <p className="hero-sub">We started with a simple belief: cleaning should be a service you trust completely. Background-checked, insured, consistent, and local.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div className="two-col-section">
          <div className="two-col-text">
            <h2>Who We Are</h2>
            <p>Mountain Springs Cleaning is a locally-owned Las Vegas cleaning company. We're not a national franchise. We're your neighbors, committed to serving our community with integrity.</p>
            <p style={{ marginTop: 16 }}>We started because we saw a gap in the market: customers wanted a cleaning service they could trust. A service with background-checked employees, full insurance, and consistent quality. So we built one.</p>
            <p style={{ marginTop: 16 }}>Today, we've cleaned over 2,400 homes and maintain a 98% customer satisfaction rate. Our customers aren't just satisfied — they're advocates. They refer their friends, neighbors, and family.</p>
          </div>
          <div className="two-col-image">
            <Image src="/images/reviews-family.jpg" alt="Happy family in clean home" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div style={{ background: "#f0f5ff", borderRadius: 16, padding: 48, marginTop: 80 }}>
          <h2 style={{ marginBottom: 40, textAlign: "center", color: "#1a1f36" }}>Our Commitment to You</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {[
              { title: "Background-Checked, Always", desc: "Every employee undergoes a thorough background check. Your home is safe in trusted hands." },
              { title: "Fully Insured", desc: "We carry complete general liability and workers' comp. You're protected in every situation." },
              { title: "Same Team, Every Visit", desc: "No rotating strangers. Your dedicated cleaners remember your home and your preferences." },
              { title: "Satisfaction Guaranteed", desc: "Not happy? We come back free. No questions asked. Your satisfaction is non-negotiable." },
              { title: "Living Wage Employer", desc: "We pay our employees above-market wages. Happy employees do better work." },
              { title: "Local & Community-Rooted", desc: "We're Las Vegas through and through. We shop local, hire local, and give back to our community." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1565f2", marginBottom: 12 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 32, textAlign: "center", color: "#1a1f36" }}>By The Numbers</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, textAlign: "center" }}>
            {[
              { num: "2,400+", label: "Homes Cleaned" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: "8+ yrs", label: "Serving Las Vegas" },
              { num: "4.9★", label: "Average Rating" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 40, fontWeight: 900, color: "#1565f2", marginBottom: 8 }}>{item.num}</div>
                <div style={{ fontSize: 14, color: "#4a5578", fontWeight: 600 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80, padding: 48, background: "#1a1f36", borderRadius: 16, color: "#fff" }}>
          <h2 style={{ color: "#fff", marginBottom: 24 }}>Our Values</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
            {[
              { title: "Trust First", desc: "Everything we do starts with earning and maintaining your trust. We're transparent, consistent, and accountable." },
              { title: "Quality Always", desc: "We don't rush. Every clean is done right. Every corner, every surface, every time." },
              { title: "People Matter", desc: "Our employees are the foundation of our success. We invest in them, pay them fairly, and treat them with respect." },
              { title: "Community Focused", desc: "We're Las Vegas. We hire locally, support local businesses, and give back to neighborhoods we serve." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#7bb3ff", marginBottom: 12 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 40, textAlign: "center" }}>What Our Customers Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { quote: "I never have to worry about a dirty house again. They're reliable, thorough, and friendly.", customer: "Maria S., Summerlin" },
              { quote: "Same team every time. They know our home. It's such a relief to have that consistency.", customer: "James & Jennifer T., Henderson" },
              { quote: "Professional, insured, and they actually care. Mountain Springs is the gold standard in Las Vegas.", customer: "David M., Centennial Hills" },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid #dde3f0", borderRadius: 12, padding: 28, background: "#fff" }}>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>"{item.quote}"</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1f36" }}>— {item.customer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Join thousands of clean homes</h2>
          <p>Experience the Mountain Springs difference. Background-checked, insured, trusted.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Book Your Clean →</a>
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
