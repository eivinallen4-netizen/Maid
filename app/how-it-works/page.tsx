import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | Mountain Springs Cleaning Las Vegas",
  description: "How Mountain Springs Cleaning works. Easy 4-step process. Book online, meet your team, enjoy your clean home.",
  keywords: "how to book cleaning, cleaning process, home cleaning steps, booking online",
};

export default function HowItWorksPage() {
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
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
          <a href="/#book" className="nav-cta">Book Now →</a>
        </div>
      </nav>

      <section className="service-hero">
        <div className="service-hero-eyebrow">Simple & Straightforward</div>
        <h1>How Mountain Springs Works</h1>
        <p className="hero-sub">From booking to cleaning to satisfaction — we make it simple, transparent, and stress-free.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div className="steps-container">
          {[
            {
              num: "1",
              title: "Choose Your Service & Schedule",
              desc: "Pick your service type (standard, deep, recurring, Airbnb turnover). Tell us your home size, preferred dates/times, and any special requests. It takes 2 minutes.",
              cta: "Book online or call (702) 867-5309",
            },
            {
              num: "2",
              title: "Get Your Instant Quote",
              desc: "We calculate your price based on home size, service type, and frequency. You see it immediately — no surprises, no waiting for a quote.",
              cta: "See transparent pricing upfront",
            },
            {
              num: "3",
              title: "Confirm & Prepare",
              desc: "We confirm your booking and send you a confirmation email with the date, time window, and details. You'll receive a reminder the day before.",
              cta: "Know exactly who's coming and when",
            },
            {
              num: "4",
              title: "We Clean. You Relax.",
              desc: "Your dedicated team arrives on time, enters securely (you choose how), and cleans thoroughly. We'll text or call to let you know when we're done. Not satisfied? We come back free.",
              cta: "Enjoy your spotless home",
            },
          ].map((item, i) => (
            <div key={i} className="step-item">
              <div className="step-num">{item.num}</div>
              <div className="step-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1565f2", marginTop: 12 }}>{item.cta}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#f0f5ff", borderRadius: 16, padding: 48, marginTop: 80 }}>
          <h2 style={{ marginBottom: 40, textAlign: "center" }}>How Entry Works</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 700, margin: "0 auto 32px", textAlign: "center", lineHeight: 1.6 }}>You're in control. Choose how your cleaning team gets in.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { icon: "🔑", title: "Leave a Key", desc: "Drop off a spare key the day before or give it to a neighbor. We pick it up and return it." },
              { icon: "📦", title: "Lockbox", desc: "We provide a temporary lockbox (or use your own). You set the code. We enter and reset it." },
              { icon: "🏠", title: "You Stay Home", desc: "Be home during cleaning. We'll work around you. No awkwardness — we're professionals." },
              { icon: "📱", title: "Smart Lock", desc: "If you have a smart doorlock, give us temporary access. We use it and you regain control after." },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid #dde3f0", borderRadius: 12, padding: 28, background: "#fff" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1f36", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 32, textAlign: "center" }}>Recurring Clients: Set It & Forget It</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 700, margin: "0 auto 40px", textAlign: "center" }}>With recurring plans, it's even easier:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { title: "Locked Schedule", desc: "Your team comes on the same day every week/month at the same time. It's automatic." },
              { title: "Same Team Always", desc: "Your dedicated cleaners know your home, your preferences, and what you care about." },
              { title: "Skip or Pause Anytime", desc: "Going on vacation? Pause your plan. Need to move the date? No problem. No penalties." },
              { title: "Best Rates", desc: "Lock in a discounted rate with recurring plans. The more frequent, the better the rate." },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid #dde3f0", borderRadius: 12, padding: 28 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1565f2", marginBottom: 12 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 32, textAlign: "center" }}>After Your Clean</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { title: "We Confirm Completion", desc: "Your team texts or calls to let you know they're done. You come home to a spotless house." },
              { title: "You Review", desc: "Walk through and inspect. If anything isn't perfect, let us know within 24 hours." },
              { title: "We Make It Right", desc: "Not satisfied? We come back to re-clean the area free of charge. No questions asked. Our guarantee." },
              { title: "You Rate & Review", desc: "Share your experience on Google, Yelp, or Nextdoor. Your feedback helps us improve and helps other Las Vegas families find us." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1f36", marginBottom: 12 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1a1f36", borderRadius: 16, padding: 48, marginTop: 80, color: "#fff" }}>
          <h2 style={{ color: "#fff", marginBottom: 24, textAlign: "center" }}>Our Guarantee</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", maxWidth: 700, margin: "0 auto", textAlign: "center", lineHeight: 1.7 }}>If you're not satisfied with any area we cleaned, contact us within 24 hours. We'll come back and re-clean it completely free. No hassle, no questions asked. Your satisfaction is guaranteed.</p>
        </div>
      </section>

      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Ready to get started?</h2>
          <p>Book your cleaning today. It takes 2 minutes and you'll get your price immediately.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Book Now →</a>
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
