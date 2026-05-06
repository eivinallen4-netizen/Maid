import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Areas | Mountain Springs Cleaning Las Vegas",
  description: "Mountain Springs Cleaning serves Las Vegas, Henderson, Summerlin, Centennial Hills, and surrounding neighborhoods.",
  keywords: "cleaning Las Vegas, Henderson cleaning, Summerlin cleaning, Centennial Hills cleaning, local Las Vegas cleaner",
};

export default function ServiceAreasPage() {
  const areas = [
    { name: "Las Vegas", desc: "Full valley coverage including Palms, Westside, Eastside, and central neighborhoods." },
    { name: "Henderson", desc: "Green Valley, Inspirada, Warm Springs, and all of Henderson." },
    { name: "Summerlin", desc: "The master-planned community and all Summerlin neighborhoods." },
    { name: "Centennial Hills", desc: "North Valley growth area. We serve all of Centennial Hills." },
    { name: "Aliante", desc: "North Las Vegas. Professional cleaning for the Aliante community." },
    { name: "Beyond", desc: "Serving most of the greater Las Vegas valley. Call to confirm your area." },
  ];

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
        <div className="service-hero-eyebrow">Service Areas</div>
        <h1>Serving the Greater Las Vegas Valley</h1>
        <p className="hero-sub">From Summerlin to Henderson to Centennial Hills — we serve all of Las Vegas. Local service, local trust.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginBottom: 16 }}>Where We Clean</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 600, margin: "0 auto" }}>Mountain Springs Cleaning is a Las Vegas-based company serving the entire valley. From new construction in Centennial Hills to established neighborhoods in Summerlin, we're your local cleaning partner.</p>
        </div>

        <div className="areas-grid">
          {areas.map((area, i) => (
            <div key={i} className="area-card">
              <h3>{area.name}</h3>
              <p>{area.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#f0f5ff", borderRadius: 16, padding: 48, marginTop: 80 }}>
          <h2 style={{ marginBottom: 32, textAlign: "center" }}>Why Local Matters</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
            {[
              { title: "We Know Las Vegas", desc: "We understand the local market, neighborhoods, and what residents care about. No national playbook — just smart local service." },
              { title: "Fast Response", desc: "Local means we can respond quickly to booking requests, special needs, and issues. No call center in another state." },
              { title: "Committed to Community", desc: "Our employees live here. Our owners are here. We're invested in making our neighborhoods better." },
              { title: "No Travel Surcharges", desc: "We serve the valley seamlessly. Whether it's Summerlin or Henderson, same transparent pricing." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1565f2", marginBottom: 12 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#4a5578", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 32, textAlign: "center" }}>Check Availability in Your Neighborhood</h2>
          <p style={{ fontSize: 16, color: "#4a5578", maxWidth: 600, margin: "0 auto 40px", textAlign: "center" }}>Most of the greater Las Vegas valley is covered. To confirm service in your exact area:</p>
          <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 16, color: "#4a5578", fontWeight: 700 }}>Call: (702) 867-5309</div>
            <div style={{ fontSize: 16, color: "#4a5578", fontWeight: 700 }}>Or enter your zip code during booking</div>
            <a href="/#book" className="btn-primary" style={{ display: "inline-block" }}>Check Availability →</a>
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 style={{ marginBottom: 40, textAlign: "center" }}>About Las Vegas & Our Market</h2>
          <div style={{ background: "#fff", border: "1px solid #dde3f0", borderRadius: 16, padding: 40 }}>
            <p style={{ fontSize: 16, color: "#4a5578", lineHeight: 1.7, marginBottom: 20 }}>Las Vegas is a unique market. With 24/7 hospitality workers, a transient population, and major new construction neighborhoods, the cleaning service needs are different. We understand that many residents work unconventional hours. We get the Airbnb/STR market. We know the pain of move-ins/move-outs in a city where people are constantly relocating.</p>
            <p style={{ fontSize: 16, color: "#4a5578", lineHeight: 1.7, marginBottom: 20 }}>Our service areas include:</p>
            <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
              {["Las Vegas / Palms / Westside", "Eastside / Boulder Strip", "Downtown / Fremont", "Henderson / Green Valley", "Summerlin / Jaw Breaker", "Centennial Hills / Aliante", "North Las Vegas", "Paradise / Windmill"].map((area, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#4a5578" }}>
                  <div style={{ color: "#22c55e", fontWeight: 900 }}>✓</div>
                  {area}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 16, color: "#4a5578", lineHeight: 1.7 }}>Not sure if we serve your area? Call (702) 867-5309 or check during booking.</p>
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>Ready to book?</h2>
          <p>Check if we serve your Las Vegas neighborhood and get started.</p>
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
