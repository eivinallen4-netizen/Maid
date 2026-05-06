import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Airbnb Cleaning & Turnover Service | Mountain Springs Las Vegas",
  description: "Professional Airbnb and short-term rental cleaning in Las Vegas. Fast turnovers. 5-star cleanliness. No more lost reviews.",
  keywords: "Airbnb cleaning Las Vegas, turnover cleaning, short-term rental cleaning, VRBO cleaning",
};

export default function AirbnbTurnoverPage() {
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
        <div className="service-hero-eyebrow">Airbnb Turnovers</div>
        <h1>5-Star Cleanliness<br />On Autopilot</h1>
        <p className="hero-sub">Fast, reliable turnovers between guests. No dirty homes. No lost reviews. Just consistent 5-star cleanliness, every time.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ background: "#fff", border: "2px solid #22c55e", borderRadius: 16, padding: 40, marginBottom: 64 }}>
          <h2 style={{ color: "#22c55e", marginBottom: 16 }}>The Reality of Airbnb Cleaning</h2>
          <p style={{ fontSize: 16, color: "#4a5578", marginBottom: 24, lineHeight: 1.7 }}>A single dirty review can cost you hundreds in lost bookings. Guests expect spotless. You need fast turnovers between back-to-back bookings. One no-show cleaner and your schedule collapses.</p>
          <p style={{ fontSize: 16, color: "#4a5578", lineHeight: 1.7 }}>Mountain Springs handles it all. Reliable, fast, thorough — every time.</p>
        </div>

        <div className="two-col-section">
          <div className="two-col-text">
            <h2>What our Airbnb hosts love</h2>
            <p><strong>Zero no-shows.</strong> We show up when we say we will. Your turnover schedule never gets disrupted.</p>
            <p style={{ marginTop: 16 }}><strong>Back-to-back ready.</strong> 3-hour turnovers for standard cleanings. Even 5-7 hour deep cleans stay on schedule.</p>
            <p style={{ marginTop: 16 }}><strong>5-star quality.</strong> Guests don't write bad reviews about cleanliness. They don't even mention it — which means it was perfect.</p>
            <p style={{ marginTop: 16 }}><strong>Attention to detail.</strong> Fresh linens, towel placement, welcome details — we understand that hosts care about these touches.</p>
          </div>
          <div className="two-col-image">
            <Image src="/images/living-room.jpg" alt="Clean living room" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div style={{ background: "#f0f5ff", borderRadius: 16, padding: 48, marginTop: 80 }}>
          <h2 style={{ marginBottom: 40, color: "#1a1f36" }}>The Turnover Checklist</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { title: "Kitchen & Dining", items: ["Deep clean all surfaces", "Appliances inside & out", "Dishes spotless", "Trash emptied", "Everything organized"] },
              { title: "Bathrooms", items: ["Toilet scrubbed", "Shower/tub spotless", "Mirrors gleaming", "Towels fresh", "Soap & amenities stocked"] },
              { title: "Bedrooms & Living", items: ["Dust every surface", "Vacuum & mop thoroughly", "Change all linens", "Fluff pillows & cushions", "Windows clear"] },
              { title: "Entry & Details", items: ["Entryway spotless", "Light switches cleaned", "Doorknobs sanitized", "Floors swept & mopped", "Final walkthrough check"] },
            ].map((section, i) => (
              <div key={i}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1565f2", marginBottom: 16 }}>{section.title}</div>
                <ul style={{ listStyle: "none" }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 14, color: "#4a5578" }}>
                      <div style={{ color: "#22c55e", fontWeight: 900 }}>✓</div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 32 }}>Why Las Vegas Airbnb hosts choose us</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: "⏱", title: "Fast Turnovers", desc: "3-7 hour turnovers depending on cleaning depth. We fit your schedule, not the other way around." },
              { icon: "✓", title: "100% Reliable", desc: "No-show rate of zero. If someone calls out, we have backup coverage. Your guests always get a clean home." },
              { icon: "💯", title: "5-Star Quality", desc: "Guests don't review dirty homes. Consistent 5-star cleanliness means consistent positive reviews." },
              { icon: "📅", title: "Flexible Scheduling", desc: "Same-day turnovers available. Early mornings, late nights, weekends — we adapt to your bookings." },
              { icon: "🔄", title: "Recurring Discounts", desc: "Regular Airbnb properties get our best rates. The more turnovers, the better your price." },
              { icon: "📱", title: "Easy Communication", desc: "Quick turnaround confirmations. Before/after photos. Direct contact for urgent situations." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1f36", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1a1f36", borderRadius: 16, padding: 48, marginTop: 80, color: "#fff", textAlign: "center" }}>
          <h2 style={{ color: "#fff", marginBottom: 24 }}>Tired of cleaning anxiety between guests?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, fontSize: 16 }}>Let us handle the turnovers. Focus on your bookings. We'll keep it spotless.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Schedule Your Turnover →</a>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 28 }}>Host FAQs</h2>
          <div style={{ maxWidth: 700 }}>
            {[
              { q: "How fast can you turn over a unit?", a: "For a standard 2-bed/1-bath, we can complete a full turnover in 3-4 hours. Larger or heavily soiled units may take 5-7 hours. We work with your booking calendar." },
              { q: "What if there's damage or excessive mess?", a: "We assess and quote on-site. Major damage cleanup may incur additional fees, but we'll discuss it upfront." },
              { q: "Do you offer same-day turnovers?", a: "Yes. If you have back-to-back bookings, call us. We'll make it work, especially for our regular Airbnb clients." },
              { q: "Can you do linen changes?", a: "Absolutely. We change all bedding and provide fresh linens. Laundry of soiled items available for additional fee." },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid #dde3f0", paddingBottom: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1565f2", marginBottom: 8 }}>{item.q}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Stop losing bookings to dirty units</h2>
          <p>Professional Airbnb turnover cleaning in Las Vegas. 5-star results, every time.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Book Your Turnover →</a>
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
