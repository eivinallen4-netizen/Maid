import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Move-In Move-Out Cleaning | Mountain Springs Cleaning Las Vegas",
  description: "Professional move-in and move-out cleaning in Las Vegas. Get your deposit back or move into a pristine home. Fast, thorough, guaranteed.",
  keywords: "move-out cleaning Las Vegas, move-in cleaning, apartment cleaning, deposit cleaning",
};

export default function MoveInOutPage() {
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
        <div className="service-hero-eyebrow">Move-In / Move-Out</div>
        <h1>Leave It Spotless.<br />Get Your Deposit Back.</h1>
        <p className="hero-sub">Professional move-out cleaning that passes inspection. Or start fresh in a pristine new home. Either way, it's done right.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div className="two-col-section">
          <div className="two-col-text">
            <h2>Move-Out Cleaning</h2>
            <p>Moving is stressful. Let us handle the cleaning so you can focus on your move. We'll leave your old place inspection-ready — and help you get your full deposit back.</p>
            <ul className="checklist" style={{ marginTop: 24 }}>
              <li><CheckIcon /> Inside fridge, freezer, oven</li>
              <li><CheckIcon /> All walls, doors, frames, handles</li>
              <li><CheckIcon /> Baseboards, trim, vents</li>
              <li><CheckIcon /> Carpets vacuumed & refreshed</li>
              <li><CheckIcon /> Tile grout cleaned</li>
              <li><CheckIcon /> Light fixtures & ceiling fans</li>
              <li><CheckIcon /> Deposit-ready guarantee</li>
            </ul>
          </div>
          <div className="two-col-image">
            <Image src="/images/home-cleaning.jpg" alt="Professional home cleaning" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div className="two-col-section" style={{ marginTop: 80 }}>
          <div className="two-col-image">
            <Image src="/images/standard-kitchen.jpg" alt="Clean kitchen" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="two-col-text">
            <h2>Move-In Cleaning</h2>
            <p>Your new home doesn't have to be a mystery. Before you unpack a single box, we'll deep clean every surface so you're moving into pristine conditions.</p>
            <p style={{ marginTop: 16 }}>We handle all the residue from previous owners — dust, buildup, hidden spots. Your new place will feel brand new.</p>
            <ul className="checklist" style={{ marginTop: 24 }}>
              <li><CheckIcon /> Remove previous owner residue</li>
              <li><CheckIcon /> Kitchen appliances sanitized</li>
              <li><CheckIcon /> All bathrooms deep cleaned</li>
              <li><CheckIcon /> Walls & woodwork dusted</li>
              <li><CheckIcon /> Closets & storage cleaned</li>
              <li><CheckIcon /> Move-in ready guarantee</li>
            </ul>
          </div>
        </div>

        <div style={{ background: "#f0f5ff", borderRadius: 16, padding: 40, marginTop: 80 }}>
          <h2 style={{ marginBottom: 28, color: "#1a1f36" }}>Why Las Vegas residents choose us</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: "📅", title: "Fast turnaround", desc: "We know you're on a schedule. We work efficiently to get you out or moved in on time." },
              { icon: "✓", title: "Deposit guarantee", desc: "Move out and we'll make sure you get your full deposit back — or we'll cover the cost." },
              { icon: "🔒", title: "Fully insured", desc: "Any damage is covered. Your security deposit is protected." },
              { icon: "👥", title: "Same team", desc: "We assign the same professionals throughout your move. Consistency and accountability." },
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 14 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1f36", marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: "#4a5578", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80, padding: 40, background: "#fff", border: "1px solid #dde3f0", borderRadius: 16 }}>
          <h2 style={{ marginBottom: 24 }}>The deposit inspection checklist</h2>
          <p style={{ color: "#4a5578", marginBottom: 28 }}>Most landlords use these criteria. We clean to all of them:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {["Walls & trim clean", "No stains or marks", "Floors vacuumed & mopped", "Kitchen grease-free", "Bathroom fixtures sanitized", "Doors & windows clean", "No pet hair or odor", "Closets empty & clean"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                <div style={{ color: "#22c55e", fontWeight: 900 }}>✓</div>
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Ready for your move?</h2>
          <p>Book move-in or move-out cleaning. Get your deposit back or start fresh.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Schedule Your Cleaning →</a>
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
