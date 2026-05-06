import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cleaning Services | Mountain Springs Cleaning - Las Vegas",
  description: "Professional home cleaning services in Las Vegas. Standard cleaning, deep cleaning, move-in/out, recurring plans, and Airbnb turnover service.",
  keywords: "cleaning services Las Vegas, house cleaning, residential cleaning, deep cleaning, move-in cleaning, Airbnb cleaning",
};

export default function ServicesPage() {
  const services = [
    {
      href: "/services/standard-cleaning",
      title: "Standard Cleaning",
      description: "Professional cleaning for your home. Kitchens, bathrooms, bedrooms, and living areas — spotless every time.",
    },
    {
      href: "/services/deep-cleaning",
      title: "Deep Cleaning",
      description: "Every corner, every surface, top to bottom. Perfect for move-ins, seasonal refreshes, and thorough renovations.",
    },
    {
      href: "/services/move-in-move-out",
      title: "Move-In/Move-Out",
      description: "Leave it spotless and get your deposit back. We handle every detail so you can focus on your move.",
    },
    {
      href: "/services/recurring-plans",
      title: "Recurring Plans",
      description: "Set it and forget it. Weekly, bi-weekly, or monthly cleaning with your dedicated team and locked-in rates.",
    },
    {
      href: "/services/airbnb-turnover",
      title: "Airbnb Turnovers",
      description: "5-star cleanliness on autopilot. Fast, reliable turnovers between guests — no reviews lost to dirty homes.",
    },
  ];

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
        <div className="service-hero-eyebrow">Our Cleaning Services</div>
        <h1>Professional Cleaning<br />for Every Need</h1>
        <p className="hero-sub">From standard weekly cleaning to deep refreshes and Airbnb turnovers. We handle it all with the same dedication to quality.</p>
      </section>

      {/* SERVICES GRID */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div className="service-card-grid">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="service-card">
              <div className="service-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="service-card-title">{service.title}</h2>
              <p className="service-card-desc">{service.description}</p>
              <div className="service-card-cta">Learn more →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{ background: "#f0f5ff", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="split-label" style={{ justifyContent: "center", display: "flex" }}>Why Choose Us</div>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginBottom: 12 }}>We stand behind every clean.</h2>
            <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 600, margin: "0 auto" }}>Every service comes with our satisfaction guarantee. Not happy? We come back free.</p>
          </div>
          <div className="service-card-grid">
            {[
              { title: "Same Team, Every Visit", desc: "Build trust with the same cleaners who know your home and remember your preferences." },
              { title: "Background-Checked & Insured", desc: "Every employee is vetted and fully insured. Your home is in trustworthy, protected hands." },
              { title: "100% Satisfaction Guaranteed", desc: "If something isn't perfect, we come back to fix it — free. No hassle, no questions." },
              { title: "Flexible Scheduling", desc: "Book online in minutes. Skip, pause, or reschedule anytime — no penalties." },
              { title: "Transparent Pricing", desc: "Know exactly what you're paying. No surprise charges. No hidden fees. Ever." },
              { title: "Eco-Friendly Options", desc: "Choose green, non-toxic products safe for your kids, pets, and the planet." },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid #dde3f0", borderRadius: 12, padding: 28 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1f36", marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Ready to experience the difference?</h2>
          <p>Book your first clean today. Get a free quote in minutes — no commitment.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Get a Quote Now →</a>
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
