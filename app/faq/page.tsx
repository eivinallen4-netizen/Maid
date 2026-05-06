"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type FaqEntry = { id: string; q: string; a: React.ReactNode };

const categories: { id: string; title: string; items: FaqEntry[] }[] = [
  {
    id: "general",
    title: "General Questions",
    items: [
      { id: "g1", q: "What extras may I purchase?", a: "You can add extras like inside-oven cleaning, inside-fridge cleaning, interior window washing, laundry folding, and more. Add-ons can be selected during booking or by calling us before your scheduled visit." },
      { id: "g2", q: "Can I purchase a gift certificate?", a: <>Yes! Gift certificates are available in any amount and make a wonderful gift for new homeowners, new parents, or anyone who deserves a break. Contact us at <a href="mailto:hello@mountainsprings.co">hello@mountainsprings.co</a> to purchase one.</> },
      { id: "g3", q: "When can I expect my cleaning to start?", a: "We offer morning and afternoon arrival windows. You'll receive a confirmation email and a reminder the day before. Our team will let you know when they're on the way so you're never left waiting." },
      { id: "g4", q: "Can I designate a subset of rooms to be cleaned?", a: "Absolutely. You can specify which rooms to include or exclude during booking, or add a note in your customer profile. You're only charged for what you need." },
      { id: "g5", q: "Do I have to be home for a cleaning?", a: "No — most of our customers aren't home during their cleaning. You can leave a key, use a lockbox, or provide entry instructions. Your home is in trusted, insured hands." },
      { id: "g6", q: "Do you clean offices?", a: "Yes, we offer commercial cleaning for small offices and business spaces. Reach out for a custom quote based on your square footage and frequency needs." },
      { id: "g7", q: "Is Mountain Springs Cleaning pet friendly?", a: "We love pets! Please note any animals in your home during booking so we can be prepared. For safety, we ask that pets are secured during the cleaning if possible." },
      { id: "g8", q: "Do you bring your own supplies and equipment?", a: "Yes — our team arrives fully equipped with professional-grade cleaning products and tools. If you prefer we use your own supplies, just let us know in your booking notes." },
      { id: "g9", q: "What is included in a cleaning?", a: <>Our standard clean covers kitchens (surfaces, sink, stovetop, exterior of appliances), all bathrooms (toilet, tub, shower, sink, mirrors), bedrooms and living areas (dusting, vacuuming, mopping). <a href="#">View our full checklist →</a></> },
      { id: "g10", q: "What should I know about cancelling/rescheduling?", a: "We ask for at least 24 hours' notice for cancellations or rescheduling. Late cancellations (under 24 hours) may incur a small fee. Recurring customers can skip or pause their plan anytime with no penalty." },
      { id: "g11", q: "Who works for Mountain Springs Cleaning?", a: "All of our cleaners are W-2 employees — not contractors. They go through a rigorous hiring process, background checks, and paid training before entering any home." },
      { id: "g12", q: "How can I be sure my payment data is kept safe?", a: "We use Stripe for all payment processing — your card data is encrypted and never stored on our servers. Our website uses SSL encryption throughout." },
      { id: "g13", q: "Where do you operate?", a: "We currently serve the greater Las Vegas valley including Henderson, Summerlin, Centennial Hills, and surrounding neighborhoods. Enter your zip code during booking to confirm service availability in your area." },
      { id: "g14", q: "What is your satisfaction guarantee?", a: "If you're not satisfied with any area we cleaned, let us know within 24 hours and we'll come back to re-clean it — completely free. No hassle, no questions asked." },
    ],
  },
  {
    id: "health",
    title: "Health & Safety",
    items: [
      { id: "h1", q: "Do you do construction, renovation, or repair clean-ups?", a: "We offer post-construction clean-ups as a specialty service. Due to the level of dust and debris involved, these are quoted separately from standard cleans. Contact us for a custom estimate." },
      { id: "h2", q: "Are all employees subject to a background check?", a: "Yes — every team member undergoes a thorough background check before their first day. Your safety and peace of mind is our top priority." },
      { id: "h3", q: "Does Mountain Springs Cleaning use safe / green cleaning products?", a: "We offer eco-friendly, non-toxic cleaning product options upon request — great for homes with young children, pets, or sensitivities. Just select the \"green clean\" option when booking." },
    ],
  },
  {
    id: "legal",
    title: "Legal & Liability",
    items: [
      { id: "l1", q: "What insurance does your company have?", a: "Mountain Springs Cleaning carries full general liability insurance and workers' compensation coverage. You're protected in the unlikely event of damage or injury on the job." },
      { id: "l2", q: "What happens if something breaks during a cleaning?", a: "We treat your home with the greatest care. In the rare event something is damaged, please contact us within 48 hours. We'll work with you promptly to resolve it, including filing an insurance claim if needed." },
    ],
  },
  {
    id: "mission",
    title: "Our Mission",
    items: [
      { id: "m1", q: "Why does Mountain Springs Cleaning pay its workers above the industry average?", a: "We believe that happy, well-compensated employees do better work. Paying living wages reduces turnover, attracts skilled professionals, and means your home gets cleaned by someone who genuinely cares about the job." },
      { id: "m2", q: "Where can I go to learn about other living-wage employers?", a: <>We&apos;re proud supporters of living-wage employment. Organizations like <a href="#">MIT Living Wage Calculator</a> and local business coalitions can help you find other employers committed to fair wages in our region.</> },
      { id: "m3", q: "Are your employees unionized?", a: "Our team members have the right to organize, and we actively support a workplace culture of open communication, fair treatment, and mutual respect. We believe workers deserve a strong voice in the companies they help build." },
    ],
  },
];

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    const cats = document.querySelectorAll(".faq-category");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    cats.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  function toggle(id: string) {
    setOpenItem((prev) => (prev === id ? null : id));
  }

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
            <li><Link href="/">About</Link></li>
            <li><Link href="/#services">Services</Link></li>
            <li><a href="#">Pricing</a></li>
            <li><Link href="/faq" className="active">FAQs</Link></li>
          </ul>
          <a href="/#book" className="nav-cta">Book Now →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="faq-hero">
        <div className="faq-hero-bg" />
        <div className="faq-hero-circles">
          <div className="fhc fhc-1" />
          <div className="fhc fhc-2" />
          <div className="fhc fhc-3" />
        </div>
        <div className="faq-hero-content">
          <h1>Frequently Asked<br />Questions</h1>
          <p>Everything you need to know about booking, services, and our team.</p>
        </div>
      </section>

      {/* FAQ BODY */}
      <div className="faq-body">
        {/* Sidebar */}
        <aside className="faq-sidebar">
          <div className="sidebar-title">Jump to</div>
          <ul className="sidebar-nav">
            {categories.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Accordion */}
        <main>
          {categories.map(({ id, title, items }) => (
            <div key={id} className="faq-category" id={id}>
              <h2 className="faq-category-title">{title}</h2>
              {items.map(({ id: itemId, q, a }) => {
                const isOpen = openItem === itemId;
                return (
                  <div key={itemId} className={`faq-item${isOpen ? " open" : ""}`}>
                    <button className="faq-question" onClick={() => toggle(itemId)}>
                      <span className="faq-question-text">{q}</span>
                      <svg className="faq-chevron" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div className="faq-answer">
                      <p>{a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </main>
      </div>

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
                {["Standard Cleaning", "Deep Cleaning", "Move-In/Out", "Recurring Plans", "Commercial"].map((s) => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {["About Us", "Press", "Careers", "Blog"].map((s) => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Help</div>
              <ul className="footer-links">
                <li><Link href="/faq">FAQs</Link></li>
                {["Pricing", "Service Area", "Gift Cards"].map((s) => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
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
