import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recurring Cleaning Plans | Mountain Springs Cleaning Las Vegas",
  description: "Flexible recurring cleaning plans in Las Vegas. Weekly, bi-weekly, or monthly. Lock in your rate. Skip or pause anytime.",
  keywords: "recurring cleaning Las Vegas, weekly cleaning, monthly cleaning, subscription cleaning",
};

export default function RecurringPlansPage() {
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
        <div className="service-hero-eyebrow">Recurring Plans</div>
        <h1>Set It and Forget It</h1>
        <p className="hero-sub">Lock in a rate, get your dedicated team, never worry about a dirty home again. Skip or pause anytime.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginBottom: 16 }}>How recurring cleaning works</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 600, margin: "0 auto" }}>Choose your frequency. We assign your team. You get a cleaner home, guaranteed.</p>
        </div>

        <div className="steps-container">
          {[
            { num: "1", title: "Pick Your Frequency", desc: "Weekly keeps you consistently fresh. Bi-weekly works for moderate traffic. Monthly is perfect for lighter-use homes." },
            { num: "2", title: "Lock In Your Rate", desc: "No surprise price increases. Recurring customers get our best rates. Your price stays the same every visit." },
            { num: "3", title: "Meet Your Team", desc: "Same cleaner every time. They'll learn your home, remember your preferences, and deliver consistent quality." },
            { num: "4", title: "Enjoy Your Free Time", desc: "Stop thinking about cleaning. We handle it. Focus on what matters — work, family, life." },
          ].map((item, i) => (
            <div key={i} className="step-item">
              <div className="step-num">{item.num}</div>
              <div className="step-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#f0f5ff", borderRadius: 16, padding: 48, marginTop: 80 }}>
          <h2 style={{ marginBottom: 40, textAlign: "center", color: "#1a1f36" }}>Flexible & Affordable</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { freq: "Weekly", price: "Starting at $89/visit", best: "Busy households, families, professionals", save: "Save 15% vs. one-time pricing" },
              { freq: "Bi-Weekly", price: "Starting at $99/visit", best: "Moderate traffic homes", save: "Save 12% vs. one-time pricing" },
              { freq: "Monthly", price: "Starting at $119/visit", best: "Light traffic, supplemental cleaning", save: "Save 10% vs. one-time pricing" },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid #dde3f0", borderRadius: 12, padding: 28, background: "#fff" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1565f2", marginBottom: 8 }}>{item.freq}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1f36", marginBottom: 12 }}>{item.price}</div>
                <div style={{ fontSize: 13, color: "#4a5578", marginBottom: 12, lineHeight: 1.5 }}>Best for: {item.best}</div>
                <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 700 }}>{item.save}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 32 }}>What recurring customers love</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: "🔄", title: "Consistency", desc: "Same team, same quality, same time every week/month. You know what to expect." },
              { icon: "💰", title: "Savings", desc: "Lock in a discounted rate. No surprises. Recurring customers pay less per visit." },
              { icon: "⏸", title: "Flexibility", desc: "Going on vacation? Pause your service. Need to skip a week? No problem. No penalties." },
              { icon: "👥", title: "Your Team", desc: "Build a relationship with your cleaners. They care about your home because they see it regularly." },
              { icon: "⏰", title: "Peace of Mind", desc: "Stop stressing about cleaning. It's automatic. You just come home to a clean house." },
              { icon: "📞", title: "Priority Support", desc: "Recurring customers get first booking slots and priority response if you need anything." },
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
          <h2 style={{ color: "#fff", marginBottom: 24 }}>Ready to enjoy a consistently clean home?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, fontSize: 16 }}>Pick your frequency, meet your team, lock in your rate. Then relax while we handle the cleaning.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Start Your Plan →</a>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 28 }}>FAQs about recurring plans</h2>
          <div style={{ maxWidth: 700 }}>
            {[
              { q: "Can I change my frequency?", a: "Absolutely. Increase, decrease, or pause anytime. Just give us a call." },
              { q: "What if I need to skip a week?", a: "No problem. Skip or pause anytime — no penalty, no charges. Resume when you're ready." },
              { q: "Do I have a contract?", a: "Nope. Month-to-month. You can cancel anytime, but most customers stay for years." },
              { q: "Will I get the same cleaner?", a: "Yes. That's the whole point. Your dedicated team means consistency and quality." },
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
          <h2>Done worrying about a dirty home?</h2>
          <p>Start a recurring plan today. Lock in your rate and meet your team.</p>
          <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Get Started →</a>
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
