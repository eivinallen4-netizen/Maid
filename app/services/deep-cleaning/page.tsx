import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deep Cleaning Service | Mountain Springs Cleaning Las Vegas",
  description: "Professional deep cleaning in Las Vegas. Every corner, every surface. Move-in ready. Perfect for new homes and seasonal refreshes.",
  keywords: "deep cleaning Las Vegas, move-in cleaning, thorough house cleaning, seasonal cleaning",
};

export default function DeepCleaningPage() {
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
            <li><Link href="/services" className="active">Services</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
          <a href="/#book" className="nav-cta">Book Now →</a>
        </div>
      </nav>

      <section className="service-hero">
        <div className="service-hero-eyebrow">Deep Cleaning</div>
        <h1>Every Corner, Every Surface</h1>
        <p className="hero-sub">Top to bottom cleaning that leaves your home move-in ready. Baseboards, inside appliances, hidden spots — nothing gets missed.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div className="two-col-section">
          <div className="two-col-text">
            <h2>What's included in deep cleaning</h2>
            <p>When you need more than a standard clean, go deep. This is the thorough refresh that handles everything.</p>
            <ul className="checklist" style={{ marginTop: 24 }}>
              <li><CheckIcon /> Inside refrigerator & freezer</li>
              <li><CheckIcon /> Inside oven & stovetop detail</li>
              <li><CheckIcon /> All baseboards & trim</li>
              <li><CheckIcon /> Window sills, vents & grilles</li>
              <li><CheckIcon /> Interior cabinet surfaces</li>
              <li><CheckIcon /> Behind & under furniture</li>
              <li><CheckIcon /> Light fixtures & ceiling fans</li>
              <li><CheckIcon /> Doors, frames & handles</li>
            </ul>
          </div>
          <div className="two-col-image">
            <Image src="/images/deep-clean-supplies.jpg" alt="Deep cleaning supplies" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div className="two-col-section" style={{ marginTop: 80 }}>
          <div className="two-col-image">
            <Image src="/images/standard-bathroom.jpg" alt="Clean bathroom" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="two-col-text">
            <h2>Perfect for</h2>
            <p><strong>Moving in?</strong> Make your new home pristine. Deep clean removes years of buildup from previous owners.</p>
            <p style={{ marginTop: 16 }}><strong>Moving out?</strong> Get your deposit back. Our deep clean leaves it inspection-ready.</p>
            <p style={{ marginTop: 16 }}><strong>Seasonal refresh.</strong> Once or twice a year, go deep to refresh your entire home.</p>
            <p style={{ marginTop: 16 }}><strong>Post-construction.</strong> After renovations or repairs, we handle all the dust and debris.</p>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 40, marginTop: 80, border: "1px solid #dde3f0" }}>
          <h2 style={{ marginBottom: 28 }}>How is deep cleaning different?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { title: "More Time", desc: "While a standard clean takes 3-4 hours, a deep clean takes 5-8 hours depending on home size. We don't rush quality." },
              { title: "Harder Access", desc: "We clean inside appliances, under furniture, behind doors — not just what's visible. Every hidden spot gets attention." },
              { title: "Specialized Techniques", desc: "Different tools and products for different surfaces. We treat your home's unique needs, not everything the same way." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1565f2", marginBottom: 12 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1a1f36", borderRadius: 16, padding: 40, marginTop: 80, color: "#fff" }}>
          <h2 style={{ color: "#fff", marginBottom: 24 }}>Ready to start fresh?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 28, lineHeight: 1.6 }}>Deep cleaning is an investment in your home. Whether moving in, moving out, or just refreshing, we'll leave it spotless — or come back free.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Book Deep Cleaning →</a>
        </div>
      </section>

      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Questions about deep cleaning?</h2>
          <p>We're happy to discuss your specific needs. Call or book a consultation.</p>
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

const CheckIcon = () => (
  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 12, height: 12 }}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  </div>
);
