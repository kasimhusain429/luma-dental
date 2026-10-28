'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import BookingForm from './BookingForm';
import BreathingWidget from './BreathingWidget';
import { hasAddress, site } from '@/lib/site';

export function Hero() {
  return (
    <section id="hero" className="section s-hero" data-section data-theme="light" aria-labelledby="hero-title">
      <div className="inner">
        <div className="copy">
          <Reveal delay={0.02}>
            <div className="status-badge" aria-label="Clinic status">
              <span className="pulse-dot" />
              <span>Luma Dental · Anxiety-Free Studio</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-title" className="display">
              <span>Please</span> <span>Remain</span> <em>Calm.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="lede">
              Your appointment is in 47 minutes. (Or zero, because we don’t believe in cold waiting rooms.)
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="ticket" aria-label="Waiting ticket details">
              <div className="ticket-item">
                <span className="ticket-label">NOW SERVING</span>
                <b className="ticket-num red">001</b>
              </div>
              <div className="ticket-divider" />
              <div className="ticket-item">
                <span className="ticket-label">YOUR TICKET</span>
                <i className="ticket-num gold">047</i>
              </div>
              <div className="ticket-divider" />
              <div className="ticket-item">
                <span className="ticket-label">WAIT TIME</span>
                <span className="ticket-num mint">0 MIN</span>
              </div>
            </div>
          </Reveal>

          <p className="sr-only">{site.description}</p>

          <Reveal delay={0.3}>
            <a href="#calm" className="scrollhint" aria-label="Scroll to begin calming journey">
              <span className="mouse-icon">
                <span className="mouse-wheel" />
              </span>
              <span>Scroll — it gets better ↓</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Calm() {
  return (
    <section id="calm" className="section s-calm" data-section data-theme="light" aria-labelledby="calm-title">
      <div className="inner">
        <div className="copy">
          <Reveal><p className="eyebrow">Step 01 — Exhale</p></Reveal>
          <Reveal delay={0.05}><h2 id="calm-title" className="display">Take a <em>breath.</em></h2></Reveal>
          <Reveal delay={0.12}>
            <p className="lede">
              Soft ambient lighting. Warm hands. Noise-canceling headphones. We design every square inch to dissolve dental dread.
            </p>
          </Reveal>

          {/* Interactive therapeutic breathing coach */}
          <Reveal delay={0.18}>
            <BreathingWidget />
          </Reveal>

          <Reveal delay={0.25}>
            <div className="calm-features">
              <div className="calm-feature-pill">🎧 Curated spatial audio</div>
              <div className="calm-feature-pill">🛋️ Ergonomic memory foam chair</div>
              <div className="calm-feature-pill">☕ Organic herbal tea bar</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Craft() {
  return (
    <section id="craft" className="section s-craft" data-section data-theme="dark" aria-labelledby="craft-title">
      <div className="inner craft-inner">
        {/* Left Column: Headline, Lede, and Metrics */}
        <div className="copy craft-copy">
          <Reveal><p className="eyebrow">02 — Craft</p></Reveal>
          <Reveal delay={0.05}>
            <h2 id="craft-title" className="display sm craft-title">
              Polished, <em>not poked.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede">
              State-of-the-art optical lasers, zero messy goop, and clinicians who treat your comfort as our highest technical metric.
            </p>
          </Reveal>

          {/* Clinical Credibility Metrics */}
          <Reveal delay={0.2}>
            <div className="metrics-strip">
              <div className="metric">
                <b>99.8%</b>
                <span>Comfort satisfaction</span>
              </div>
              <div className="metric">
                <b>0 min</b>
                <span>Average wait time</span>
              </div>
              <div className="metric">
                <b>100%</b>
                <span>Mercury & metal-free</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Interactive Feature Cards (Balances the right side!) */}
        <div className="craft-showcase">
          <Reveal delay={0.15}>
            <div className="craft-grid">
              <div className="craft-card">
                <div className="craft-icon" aria-hidden="true">🔬</div>
                <div className="craft-card-content">
                  <h4>3D Laser Optical Scans</h4>
                  <p>No gag-inducing putty impressions. Sub-millimeter digital scanning models your entire smile in 90 seconds.</p>
                </div>
              </div>

              <div className="craft-card">
                <div className="craft-icon" aria-hidden="true">⏱️</div>
                <div className="craft-card-content">
                  <h4>Unhurried 60-Minute Blocks</h4>
                  <p>We schedule fewer patients per day so we never rush your questions, your care, or your anesthesia.</p>
                </div>
              </div>

              <div className="craft-card">
                <div className="craft-icon" aria-hidden="true">🧾</div>
                <div className="craft-card-content">
                  <h4>Upfront, Guaranteed Fees</h4>
                  <p>Every single penny explained in clear English before any procedure begins. Zero surprise bills.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    n: '01',
    badge: 'Same-Day Luster',
    title: 'Teeth Whitening',
    duration: '1 visit · 60 min',
    text: 'Up to 8 shades brighter without painful tooth sensitivity. Medical-grade LED activation in a spa chair.',
    features: ['Custom take-home trays included', 'Enamel-safe remineralization', 'Zero post-bleach zingers'],
  },
  {
    n: '02',
    badge: 'Nearly Invisible',
    title: 'Clear Aligners',
    duration: '6 – 12 months average',
    text: 'Gentle, predictable orthodontic realignment with crystal-clear 3D printed trays. Remove anytime to eat.',
    features: ['Weekly app progress check-ins', '3D simulation before you begin', 'Includes final retainers'],
  },
  {
    n: '03',
    badge: 'Permanent Restorative',
    title: 'Dental Implants',
    duration: 'Built for life',
    text: 'Computer-guided placement with biocompatible ceramic or titanium. Seamlessly matches your natural bite.',
    features: ['Computer-navigated surgery', 'Virtually painless recovery', 'Natural porcelain crown luster'],
  },
];

export function Treatments() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="treatments" className="section s-treat" data-section data-theme="light" aria-labelledby="treat-title">
      <div className="inner flip">
        <div className="copy">
          <Reveal><p className="eyebrow">03 — Treatments</p></Reveal>
          <Reveal delay={0.05}><h2 id="treat-title" className="display sm">Care, made <em>calm.</em></h2></Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Predictable, gentle dentistry executed with surgical precision and aesthetic finesse.
            </p>
          </Reveal>

          <ul className="cards">
            {services.map((s, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <li key={s.n}>
                  <Reveal delay={0.12 + i * 0.12} y={50}>
                    <article className="card">
                      <div className="card-header">
                        <span className="num" aria-hidden="true">{s.n}</span>
                        <span className="card-badge">{s.badge}</span>
                      </div>
                      <h3>{s.title}</h3>
                      <p className="card-duration">⏱ {s.duration}</p>
                      <p className="card-text">{s.text}</p>

                      {/* Expandable treatment benefits */}
                      <div className={`card-details ${isExpanded ? 'open' : ''}`}>
                        <ul className="card-list">
                          {s.features.map((f, fi) => (
                            <li key={fi}>✓ {f}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="card-actions">
                        <button
                          type="button"
                          className="card-expand-btn"
                          onClick={() => setExpandedIndex(isExpanded ? null : i)}
                          aria-label={`Toggle details for ${s.title}`}
                        >
                          {isExpanded ? 'Less info ↑' : 'What to expect ↓'}
                        </button>
                        <a
                          href="#book"
                          aria-label={`Book a visit about ${s.title.toLowerCase()}`}
                          className="arrow"
                        >
                          →
                        </a>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Book() {
  return (
    <section id="book" className="section s-book" data-section data-theme="light" aria-labelledby="book-title">
      <div className="inner flip">
        <div className="copy">
          <Reveal><p className="eyebrow">04 — Visit</p></Reveal>
          <Reveal delay={0.05}>
            <h2 id="book-title" className="display sm">
              Dentistry you’ll actually <em>look forward to.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede">
              Tell us what suits you. No judgement on how long it’s been, no hold music, and no rushed exams.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <BookingForm />
          </Reveal>
          <Reveal delay={0.24}>
            <p className="promise">“The gentlest appointment of your life. Guaranteed.”</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const a = site.address;
  const addr = [a.street, a.city, a.region, a.postalCode, a.country].filter(Boolean).join(', ');

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-title">{site.name}</p>
          <p className="footer-tagline">{site.tagline}</p>
          <p className="footer-copy">© {new Date().getFullYear()} Luma Dental Studio. All rights reserved.</p>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Studio Hours</p>
          <p className="footer-text">Monday – Friday: 8:00 AM – 7:00 PM</p>
          <p className="footer-text">Saturday: 9:00 AM – 4:00 PM</p>
          <p className="footer-text">Sunday: Emergency On-Call Only</p>
        </div>

        {(site.phone || site.email || hasAddress) && (
          <div className="footer-col">
            <p className="footer-heading">Direct Contact</p>
            <address>
              {addr && <span>{addr}</span>}
              {site.phone && <a href={`tel:${site.phone.replace(/\s+/g, '')}`}>{site.phone}</a>}
              {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            </address>
          </div>
        )}
      </div>
    </footer>
  );
}
