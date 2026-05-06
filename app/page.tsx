"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CheckIcon = () => (
  <div className="check-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const StarSvg = () => (
  <svg className="star-svg" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Home() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close menu on resize or outside click
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.querySelector("nav");
      const menu = document.querySelector(".mobile-menu");
      if (nav && !nav.contains(e.target as Node) && menu && !menu.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Booking state
  const [activePath, setActivePath] = useState<"book" | "call">("book");
  const [step, setStep] = useState(1);
  const [beds, setBeds] = useState("1");
  const [fbaths, setFbaths] = useState("1");
  const [hbaths, setHbaths] = useState("0");
  const [extra, setExtra] = useState("none");
  const [freq, setFreq] = useState("One-time");
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [callTime, setCallTime] = useState("Morning (8–11am)");
  const [bookingDone, setBookingDone] = useState(false);
  const [callDone, setCallDone] = useState(false);
  const [bookingPending, setBookingPending] = useState(false);
  const [callPending, setCallPending] = useState(false);

  function goToStep(n: number) {
    setStep(n);
    const el = document.getElementById("book");
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  }

  function toggleAddon(val: string) {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(val)) next.delete(val);
      else next.add(val);
      return next;
    });
  }

  function buildSummaryParts() {
    const addonsArr = [...addons];
    return [
      `${beds} bed${beds !== "1" ? "s" : ""}`,
      `${fbaths} full bath${fbaths !== "1" ? "s" : ""}`,
      hbaths !== "0" ? `${hbaths} half bath` : null,
      extra !== "none" ? `Extra time: ${extra}` : null,
      freq,
      addonsArr.length ? `Add-ons: ${addonsArr.join(", ")}` : null,
    ].filter(Boolean);
  }

  function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookingPending(true);
    setTimeout(() => {
      setBookingPending(false);
      setBookingDone(true);
    }, 900);
  }

  function handleCallSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCallPending(true);
    setTimeout(() => {
      setCallPending(false);
      setCallDone(true);
    }, 800);
  }

  const bedsOptions = ["1", "2", "3", "4", "5", "6+"];
  const fbathsOptions = ["1", "2", "3", "4", "5+"];
  const hbathsOptions = ["0", "1", "2", "3+"];
  const extraOptions = [
    { val: "none", label: "No thanks" },
    { val: "+0.5 hr", label: "+0.5 hr" },
    { val: "+1 hr", label: "+1 hr" },
    { val: "+1.5 hr", label: "+1.5 hr" },
    { val: "+2 hr", label: "+2 hr" },
    { val: "+3 hr", label: "+3 hr" },
  ];
  const freqOptions = [
    { val: "One-time", sub: "Standard clean" },
    { val: "Weekly", badge: "Most popular" },
    { val: "Bi-weekly", sub: "Every 2 weeks" },
    { val: "Every 3 weeks", sub: " " },
    { val: "Every 4 weeks", sub: "Monthly" },
    { val: "Every 5–6 weeks", sub: " " },
  ];
  const addonOptions = [
    "Refrigerator", "Oven", "Onsite Laundry", "Dishes",
    "Green Products", "Organizing", "Windows", "Blinds",
    "Heavy-Duty", "Cabinets", "Walls", "Deep Clean Floors",
    "Balcony", "Garage Sweep",
  ];
  const callTimeOptions = [
    "Morning (8–11am)", "Midday (11–2pm)", "Afternoon (2–5pm)", "Evening (5–7pm)",
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
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
          <a href="#book" className="nav-cta">Book Now →</a>
          <button
            className={`nav-hamburger${mobileMenuOpen ? " open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
          <a href="#book" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-cta">Book Now</a>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <Image src="/images/hero-bg.jpg" alt="Clean modern home" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 13, height: 13 }}>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Trusted by Thousands
          </div>
          <h1 className="hero-title">
            Your home,<br />
            <span>spotlessly clean.</span>
          </h1>
          <p className="hero-sub">
            Professional cleaning from vetted, background-checked teams. Fully insured. 100% satisfaction guaranteed.
          </p>
          <div className="hero-actions">
            <a href="#book" className="btn-primary">Get a Free Quote</a>
            <a href="#services" className="btn-ghost">See Services</a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-bar-inner">
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Fully Insured
          </div>
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Background-Checked Staff
          </div>
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Satisfaction Guaranteed
          </div>
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Easy Online Booking
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            { num: "2,400+", label: "Homes Cleaned", delay: 0 },
            { num: "4.9★", label: "Average Rating", delay: 80 },
            { num: "98%", label: "Satisfaction Rate", delay: 160 },
            { num: "8 yr", label: "Serving the Valley", delay: 240 },
          ].map(({ num, label, delay }) => (
            <div key={label} className="stat-item fade-in" style={{ transitionDelay: `${delay}ms` }}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 1: Standard Cleaning */}
      <section className="section-split" id="services">
        <div className="round-stack-container fade-in">
          <div className="round-stack">
            <div className="rs-circle rs-c1">
              <Image src="/images/standard-kitchen.jpg" alt="Clean kitchen" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="rs-circle rs-c2">
              <Image src="/images/living-room.jpg" alt="Clean living room" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="rs-circle rs-c3">
              <Image src="/images/standard-bathroom.jpg" alt="Clean bathroom" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
        <div className="split-text fade-in">
          <div className="split-label">Standard Cleaning</div>
          <h2 className="split-heading">Your home, spotless. Every time.</h2>
          <p className="split-body">We clean kitchens, bathrooms, bedrooms, and living areas so you can spend time on what matters. Reliable, thorough, and always on schedule.</p>
          <ul className="checklist">
            <li><CheckIcon />Kitchens, bathrooms &amp; all rooms</li>
            <li><CheckIcon />Same team each visit</li>
            <li><CheckIcon />Eco-friendly products available</li>
          </ul>
          <a href="#book" className="btn-primary" style={{ width: "fit-content" }}>Book a Standard Clean</a>
        </div>
      </section>

      {/* SECTION 2: Deep Cleaning */}
      <section className="section-split reverse">
        <div className="split-text dark fade-in">
          <div className="split-label light">Deep Cleaning</div>
          <h2 className="split-heading" style={{ color: "#fff" }}>A thorough clean, top to bottom.</h2>
          <p className="split-body light">Move-in, move-out, or just a seasonal refresh. Our deep clean covers every corner, surface, and hidden spot in your home.</p>
          <ul className="checklist">
            <li className="light"><CheckIcon />Inside appliances &amp; cabinets</li>
            <li className="light"><CheckIcon />Baseboards, vents &amp; window sills</li>
            <li className="light"><CheckIcon />Move-in/move-out ready</li>
          </ul>
          <a href="#book" className="btn-primary" style={{ width: "fit-content" }}>Book a Deep Clean</a>
        </div>
        <div className="round-stack-container fade-in" style={{ background: "#1A1F36" }}>
          <div className="round-stack">
            <div className="rs-circle rs-c1" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <Image src="/images/home-cleaning.jpg" alt="Professional home cleaning" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="rs-circle rs-c2" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <Image src="/images/deep-clean-supplies.jpg" alt="Cleaning supplies" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="rs-circle rs-c3" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <Image src="/images/standard-bathroom.jpg" alt="Clean bathroom" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* WATERMARK SECTION — Recurring Plans */}
      <section className="section-watermark">
        <div className="watermark-text">SERVICES</div>
        <div className="inner">
          <div className="wm-text-col fade-in">
            <div className="split-label">Recurring Plans</div>
            <h2 className="split-heading" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>Flexible plans that fit your life.</h2>
            <p className="split-body">Weekly, bi-weekly, or monthly — set it and forget it. Lock in a lower rate with a recurring plan and we&apos;ll keep your home fresh all year long.</p>
            <ul className="checklist" style={{ marginBottom: 32 }}>
              <li><CheckIcon />Weekly plans from $89/visit</li>
              <li><CheckIcon />Skip or pause anytime</li>
              <li><CheckIcon />Dedicated cleaning team</li>
            </ul>
            <a href="#book" className="btn-primary" style={{ width: "fit-content", background: "var(--blue)" }}>See Pricing →</a>
          </div>
          <div className="round-stack-wm fade-in">
            <div className="rswm-c1">
              <Image src="/images/recurring-calendar.jpg" alt="Recurring cleaning calendar" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="rswm-c2">
              <Image src="/images/living-room.jpg" alt="Clean living room" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="rswm-c3">
              <Image src="/images/standard-kitchen.jpg" alt="Clean kitchen" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-band">
        <div className="marquee-track">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="marquee-item">
              In the Press <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* PRESS SECTION */}
      <section className="section-press">
        <div className="press-inner">
          <div className="fade-in">
            <div className="section-label-white">Media Coverage</div>
            <div className="section-heading-white">Mountain Springs in the news</div>
          </div>
          <div className="press-grid">
            {[
              { pub: "Valley Times", quote: "Mountain Springs Cleaning has redefined what it means to have a clean home. Their team is professional, thorough, and incredibly friendly.", delay: 0 },
              { pub: "Home & Living", quote: "If you're looking for a cleaning service that actually cares about your home and your family's health, Mountain Springs is the one to call.", delay: 80 },
              { pub: "Local Business Weekly", quote: "A locally-owned company treating its workers and customers right. Mountain Springs sets the bar for the industry in our region.", delay: 160 },
            ].map(({ pub, quote, delay }) => (
              <div key={pub} className="press-card fade-in" style={{ transitionDelay: `${delay}ms` }}>
                <div className="press-pub">{pub}</div>
                <p className="press-quote">&ldquo;{quote}&rdquo;</p>
                <span className="press-read">Read More →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="section-reviews">
        <div className="reviews-photo-side">
          <div className="reviews-circle-stack">
            <div className="rv-c1">
              <Image src="/images/reviews-family.jpg" alt="Happy family in clean home" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="rv-c2">
              <Image src="/images/living-room.jpg" alt="Clean living room" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="rv-c3">
              <Image src="/images/standard-kitchen.jpg" alt="Clean kitchen" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
        <div className="reviews-text-side fade-in">
          <div className="split-label">Customer Reviews</div>
          <h2 className="reviews-heading">Well-pleased<br />customers.</h2>
          <p className="reviews-sub">Hundreds of families across the valley trust Mountain Springs for a spotless home. Here&apos;s what they have to say.</p>
          <a href="#reviews" className="btn-primary" style={{ width: "fit-content" }}>Read All Reviews</a>
        </div>
      </section>

      {/* RATING PLATFORMS */}
      <div className="rating-platforms">
        {[
          { name: "yelp", cls: "yelp-logo", count: "4.9 · 312 reviews" },
          { name: "Google", cls: "google-logo", count: "4.9 · 489 reviews" },
          { name: "Nextdoor", cls: "nextdoor-logo", count: "Neighborhood Fav · 127 recs" },
        ].map(({ name, cls, count }) => (
          <div key={name} className="platform-item">
            <div className={`platform-logo ${cls}`}>{name}</div>
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => <StarSvg key={i} />)}
            </div>
            <div className="platform-count">{count}</div>
          </div>
        ))}
      </div>

      {/* BOOKING SECTION */}
      <section id="book" style={{ background: "var(--blue-pale)", padding: "80px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="split-label" style={{ justifyContent: "center", display: "flex" }}>Get Started</div>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, color: "var(--neutral-dark)", marginBottom: 12 }}>Ready when you are.</h2>
            <p style={{ fontSize: 16, color: "var(--neutral-mid)", maxWidth: 480, margin: "0 auto" }}>Book online in minutes, or hop on a quick call — no pressure, no commitment.</p>
          </div>

          {/* Path selector */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
            <button
              className={`path-card${activePath === "book" ? " path-active" : ""}`}
              onClick={() => setActivePath("book")}
              type="button"
            >
              <div className="path-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="path-title">Book Online</div>
                <div className="path-sub">Quick quote in minutes, zero commitment</div>
              </div>
              <div className="path-check">✓</div>
            </button>
            <button
              className={`path-card${activePath === "call" ? " path-active" : ""}`}
              onClick={() => setActivePath("call")}
              type="button"
            >
              <div className="path-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="path-title">Schedule a Call</div>
                <div className="path-sub">Speak with our team, no pressure</div>
              </div>
              <div className="path-check">✓</div>
            </button>
          </div>

          {/* CALL FORM */}
          {activePath === "call" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--border)", boxShadow: "0 4px 16px rgba(21,101,242,0.08)", overflow: "hidden" }}>
              <div style={{ background: "var(--blue)", padding: "32px 40px" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6 }}>Schedule a Call</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>We&apos;ll discuss your home and answer questions about pricing. No obligation to book.</div>
              </div>
              {callDone ? (
                <div style={{ padding: "48px 40px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 28, height: 28 }}><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: "var(--neutral-dark)", marginBottom: 8 }}>We&apos;ll call you soon!</h3>
                  <p style={{ fontSize: 15, color: "var(--neutral-mid)", maxWidth: 340, margin: "0 auto" }}>Expect a friendly call during your preferred window. No pressure — just a quick chat.</p>
                </div>
              ) : (
                <form onSubmit={handleCallSubmit} style={{ padding: 36 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <div className="bk-field">
                      <label className="bk-label" htmlFor="c-name">Your Name <span style={{ color: "#ef4444" }}>*</span></label>
                      <input type="text" id="c-name" name="name" className="bk-input" placeholder="Jane Smith" required />
                    </div>
                    <div className="bk-field">
                      <label className="bk-label" htmlFor="c-phone">Best Phone Number <span style={{ color: "#ef4444" }}>*</span></label>
                      <input type="tel" id="c-phone" name="phone" className="bk-input" placeholder="(702) 555-0100" required />
                    </div>
                  </div>
                  <div className="bk-field" style={{ marginBottom: 20 }}>
                    <label className="bk-label">Best Time to Call</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                      {callTimeOptions.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`sel-btn${callTime === t ? " active" : ""}`}
                          onClick={() => setCallTime(t)}
                        >{t}</button>
                      ))}
                    </div>
                  </div>
                  <div className="bk-field" style={{ marginBottom: 28 }}>
                    <label className="bk-label" htmlFor="c-note">Anything we should know? <span style={{ fontWeight: 600, color: "var(--neutral-light)" }}>(optional)</span></label>
                    <textarea id="c-note" name="note" className="bk-input" rows={3} placeholder="e.g. 3 bed / 2 bath, have 2 dogs, interested in recurring…" style={{ resize: "vertical" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--neutral-light)", fontWeight: 600 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 16, height: 16, stroke: "var(--green)" }}>
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      No commitment. No sales pressure.
                    </div>
                    <button type="submit" className="bk-submit-btn" disabled={callPending}>
                      <span>{callPending ? "Sending…" : "Request a Call"}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* BOOKING FORM */}
          {activePath === "book" && (
            <form onSubmit={handleBookingSubmit}>
              <div style={{ background: "#fff", borderRadius: 24, border: "1px solid var(--border)", boxShadow: "0 8px 32px rgba(21,101,242,0.1)", overflow: "hidden" }}>
                {/* Step indicator */}
                <div style={{ background: "var(--blue)", padding: "28px 40px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>
                      Step {step} of 3 · Takes 3 minutes
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>
                      {step < 3 ? `Next: ${["Service Type", "Your Info"][step - 1]}` : "Review & Submit"}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {[1, 2, 3].map((n, i) => (
                      <div key={n} style={{ display: "contents" }}>
                        <div className={`bk-step${step === n ? " active" : step > n ? " done" : ""}`} data-step={n}>
                          <div className="bk-step-num">{step > n ? "✓" : n}</div>
                          <div className="bk-step-label">{["Your Home", "Service Type", "Your Info"][i]}</div>
                        </div>
                        {i < 2 && <div className="bk-step-line" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 1 */}
                {step === 1 && (
                  <div style={{ padding: 40 }}>
                    <div className="bk-section-label">How many bedrooms?</div>
                    <div className="bk-btn-row" style={{ marginBottom: 28 }}>
                      {bedsOptions.map((v) => (
                        <button key={v} type="button" className={`sel-btn${beds === v ? " active" : ""}`} onClick={() => setBeds(v)}>{v} bed{v !== "1" ? "s" : ""}</button>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 32 }}>
                      <div>
                        <div className="bk-section-label">Full bathrooms</div>
                        <div className="bk-btn-row">
                          {fbathsOptions.map((v) => (
                            <button key={v} type="button" className={`sel-btn${fbaths === v ? " active" : ""}`} onClick={() => setFbaths(v)}>{v}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="bk-section-label">Half bathrooms</div>
                        <div className="bk-btn-row">
                          {hbathsOptions.map((v) => (
                            <button key={v} type="button" className={`sel-btn${hbaths === v ? " active" : ""}`} onClick={() => setHbaths(v)}>{v}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bk-section-label">
                      Need extra time? <span style={{ fontWeight: 600, color: "var(--neutral-light)", textTransform: "none", letterSpacing: 0, fontSize: 12 }}>For larger or heavily cluttered homes</span>
                    </div>
                    <div className="bk-btn-row">
                      {extraOptions.map(({ val, label }) => (
                        <button key={val} type="button" className={`sel-btn${extra === val ? " active" : ""}`} onClick={() => setExtra(val)}>{label}</button>
                      ))}
                    </div>
                    <div style={{ marginTop: 36, display: "flex", justifyContent: "flex-end" }}>
                      <button type="button" className="bk-next-btn" onClick={() => goToStep(2)}>Next: Service Type →</button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div style={{ padding: 40 }}>
                    <div className="bk-section-label">How often would you like us?</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 32 }}>
                      {freqOptions.map(({ val, sub, badge }) => (
                        <button key={val} type="button" className={`freq-card${freq === val ? " active" : ""}`} onClick={() => setFreq(val)}>
                          <div className="freq-card-title">{val}</div>
                          {badge ? <div className="freq-card-badge">{badge}</div> : <div className="freq-card-sub">{sub}</div>}
                        </button>
                      ))}
                    </div>
                    <div className="bk-section-label">Any add-ons? <span style={{ fontWeight: 600, color: "var(--neutral-light)", textTransform: "none", letterSpacing: 0, fontSize: 12 }}>Select all that apply</span></div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 8, marginBottom: 32 }}>
                      {addonOptions.map((val) => (
                        <button key={val} type="button" className={`addon-card${addons.has(val) ? " active" : ""}`} onClick={() => toggleAddon(val)}>
                          <span className="adc-check">✓</span>{val}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <button type="button" className="bk-back-btn" onClick={() => goToStep(1)}>← Back</button>
                      <button type="button" className="bk-next-btn" onClick={() => goToStep(3)}>Next: Your Info →</button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && !bookingDone && (
                  <div style={{ padding: 40 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                      <div className="bk-field">
                        <label className="bk-label" htmlFor="f-name">Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                        <input type="text" id="f-name" name="name" className="bk-input" placeholder="Jane Smith" required />
                      </div>
                      <div className="bk-field">
                        <label className="bk-label" htmlFor="f-phone">Phone Number <span style={{ color: "#ef4444" }}>*</span></label>
                        <input type="tel" id="f-phone" name="phone" className="bk-input" placeholder="(702) 555-0100" required />
                      </div>
                    </div>
                    <div className="bk-field" style={{ marginBottom: 20 }}>
                      <label className="bk-label" htmlFor="f-email">Email <span style={{ fontWeight: 600, color: "var(--neutral-light)" }}>(optional)</span></label>
                      <input type="email" id="f-email" name="email" className="bk-input" placeholder="jane@example.com" />
                    </div>
                    <div className="bk-field" style={{ marginBottom: 32 }}>
                      <label className="bk-label" htmlFor="f-address">Service Address <span style={{ color: "#ef4444" }}>*</span></label>
                      <input type="text" id="f-address" name="address" className="bk-input" placeholder="1234 Desert Bloom Dr, Las Vegas, NV 89101" required />
                    </div>
                    {/* Summary */}
                    <div style={{ background: "var(--blue-pale)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 20px", marginBottom: 28, fontSize: 13, color: "var(--neutral-mid)", lineHeight: 1.8 }}>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--neutral-light)", marginBottom: 6 }}>Your selection</div>
                      <strong>{beds} bed{beds !== "1" ? "s" : ""}</strong>{" · "}
                      {fbaths} full bath{fbaths !== "1" ? "s" : ""}{hbaths !== "0" ? ` · ${hbaths} half bath` : ""}
                      {extra !== "none" ? ` · Extra time: ${extra}` : ""}
                      {" · "}<strong>{freq}</strong>
                      {addons.size > 0 ? ` · Add-ons: ${[...addons].join(", ")}` : ""}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                      <button type="button" className="bk-back-btn" onClick={() => goToStep(2)}>← Back</button>
                      <button type="submit" className="bk-submit-btn" disabled={bookingPending}>
                        <span>{bookingPending ? "Sending…" : "Request Booking"}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--neutral-light)", marginTop: 14, textAlign: "right" }}>We&apos;ll confirm availability and send a quote within a few hours.</p>
                  </div>
                )}

                {/* Success */}
                {bookingDone && (
                  <div style={{ padding: "64px 40px", textAlign: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 32, height: 32 }}><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 style={{ fontSize: 26, fontWeight: 900, color: "var(--neutral-dark)", marginBottom: 8 }}>You&apos;re on the list!</h3>
                    <p style={{ fontSize: 16, color: "var(--neutral-mid)", maxWidth: 380, margin: "0 auto" }}>We&apos;ve got your request. Expect a call or text within a few hours to confirm your booking.</p>
                  </div>
                )}
              </div>
            </form>
          )}
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
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Help</div>
              <ul className="footer-links">
                <li><Link href="/faq">FAQs</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/service-areas">Service Areas</Link></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (555) 867-5309
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
