'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import BookingForm from './BookingForm';
import BreathingWidget from './BreathingWidget';
import { hasAddress, site, team, testimonials, googleRating } from '@/lib/site';

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
              Your appointment is in 47 minutes. (Or zero, because we don't believe in cold waiting rooms.)
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

          {/* Google rating trust signal right in the hero */}
          <Reveal delay={0.26}>
            <div className="hero-trust-badge" aria-label={`Rated ${googleRating.score} out of 5 from ${googleRating.count} reviews`}>
              <span className="trust-stars" aria-hidden="true">{'★'.repeat(5)}</span>
              <span className="trust-score">{googleRating.score}</span>
              <span className="trust-divider" aria-hidden="true">·</span>
              <span className="trust-reviews">{googleRating.count}+ Google Reviews</span>
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
      <div className="inner calm-inner">
        {/* Left Column: Headline, Lede, and Breathing Coach */}
        <div className="copy calm-copy">
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
        </div>

        {/* Right Column: Calm Feature Cards */}
        <div className="calm-showcase">
          <Reveal delay={0.15}>
            <div className="calm-grid">
              <div className="calm-card">
                <div className="calm-icon-box calm-icon-audio" aria-hidden="true">
                  <span className="calm-icon">🎧</span>
                </div>
                <div className="calm-card-content">
                  <h3 className="calm-card-title">Curated Spatial Audio</h3>
                  <p className="calm-card-text">
                    Over-ear noise-canceling headphones with bespoke ambient soundscapes or your choice of music to dissolve clinical sounds.
                  </p>
                </div>
              </div>

              <div className="calm-card">
                <div className="calm-icon-box calm-icon-chair" aria-hidden="true">
                  <span className="calm-icon">🛋️</span>
                </div>
                <div className="calm-card-content">
                  <h3 className="calm-card-title">Zero-Gravity Memory Foam</h3>
                  <p className="calm-card-text">
                    Heated contouring chairs, weighted sensory blankets, and warm cervical pillows designed to release all muscle tension.
                  </p>
                </div>
              </div>

              <div className="calm-card">
                <div className="calm-icon-box calm-icon-herbal" aria-hidden="true">
                  <span className="calm-icon">🌿</span>
                </div>
                <div className="calm-card-content">
                  <h3 className="calm-card-title">Aromatherapy & Herbal Bar</h3>
                  <p className="calm-card-text">
                    Warm lavender-scented steam towels and soothing hand-blended organic chamomile infusions prepared fresh upon arrival.
                  </p>
                </div>
              </div>
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
                <b>14+</b>
                <span>Years of experience</span>
              </div>
              <div className="metric">
                <b>5,200+</b>
                <span>Smiles transformed</span>
              </div>
              <div className="metric">
                <b>100%</b>
                <span>Mercury & metal-free</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Interactive Feature Cards */}
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
    text: 'Up to 8 shades brighter without painful tooth sensitivity. Medical-grade LED activation in a spa chair — you relax while science works.',
    features: ['Custom take-home trays included', 'Enamel-safe remineralization', 'Zero post-bleach sensitivity', 'Results visible same day'],
    price: 'From $350',
  },
  {
    n: '02',
    badge: 'Nearly Invisible',
    title: 'Clear Aligners',
    duration: '6 – 12 months average',
    text: 'Gentle, predictable orthodontic realignment with crystal-clear 3D-printed trays. Remove anytime to eat, brush, or live your life.',
    features: ['Weekly app progress check-ins', '3D simulation before you begin', 'Includes final retainers', 'Diamond-tier Invisalign provider'],
    price: 'From $3,500',
  },
  {
    n: '03',
    badge: 'Permanent Restorative',
    title: 'Dental Implants',
    duration: 'Built for life',
    text: 'Computer-guided placement with biocompatible ceramic or titanium. Seamlessly matches your natural bite and smile.',
    features: ['Computer-navigated surgery', 'Virtually painless recovery', 'Natural porcelain crown finish', 'Lifetime structural warranty'],
    price: 'From $3,200',
  },
  {
    n: '04',
    badge: 'Preventive Care',
    title: 'Gentle Check-ups',
    duration: '1 visit · 45 min',
    text: 'Comprehensive exams with ultra-low-radiation digital X-rays, thorough cleaning, and a personalized oral health roadmap — all in an unhurried setting.',
    features: ['Digital X-rays (90% less radiation)', 'Oral cancer screening included', 'Personalized care plan', 'No judgment, ever'],
    price: 'From $150',
  },
  {
    n: '05',
    badge: 'Cosmetic Artistry',
    title: 'Porcelain Veneers',
    duration: '2 visits · Custom crafted',
    text: 'Ultra-thin, hand-layered porcelain shells bonded to the front of your teeth. Close gaps, fix chips, and reshape your entire smile line.',
    features: ['Custom shade matching', 'Minimally invasive prep', 'Handcrafted by master ceramist', '10–15 year longevity'],
    price: 'From $1,200/tooth',
  },
];

export function Treatments() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="treatments" className="section s-treat" data-section data-theme="light" aria-labelledby="treat-title">
      <div className="inner treatments-inner">
        <div className="treatments-header">
          <Reveal><p className="eyebrow">03 — Treatments</p></Reveal>
          <Reveal delay={0.05}><h2 id="treat-title" className="display sm">Care, made <em>calm.</em></h2></Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              From routine cleanings to complete smile makeovers — predictable, gentle dentistry executed with surgical precision and aesthetic finesse.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="treatments-badges">
              <span className="treat-badge">🛡️ Upfront Guaranteed Pricing</span>
              <span className="treat-badge">⏱️ Unhurried 60-Min Visits</span>
              <span className="treat-badge">✨ 3D Digital Smile Simulation</span>
            </div>
          </Reveal>
        </div>

        <ul className="cards">
            {services.map((s, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <li key={s.n}>
                  <Reveal delay={0.12 + i * 0.1} y={50}>
                    <article className="card">
                      <div className="card-header">
                        <span className="num" aria-hidden="true">{s.n}</span>
                        <span className="card-badge">{s.badge}</span>
                      </div>
                      <h3>{s.title}</h3>
                      <p className="card-duration">⏱ {s.duration}</p>
                      <p className="card-text">{s.text}</p>
                      {s.price && <p className="card-price">{s.price}</p>}

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
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="section s-team" data-section data-theme="dark" aria-labelledby="team-title">
      <div className="inner team-inner">
        <div className="team-header">
          <Reveal><p className="eyebrow">04 — Your Dentists</p></Reveal>
          <Reveal delay={0.05}>
            <h2 id="team-title" className="display sm">
              Hands you can <em>trust.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Our doctors don't just fix teeth — they listen, explain, and treat you like a person, not a procedure number.
            </p>
          </Reveal>
        </div>

        <div className="team-grid">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={0.15 + i * 0.12} y={40}>
              <article className="team-card">
                <div className="team-avatar" aria-hidden="true">
                  <span className="team-avatar-initial">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-credentials">{member.credentials}</p>
                  <p className="team-role">{member.role}</p>
                  <p className="team-school">🎓 {member.school}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-specialties">
                    {member.specialties.map((s) => (
                      <span key={s} className="specialty-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section s-testimonials" data-section data-theme="light" aria-labelledby="testimonials-title">
      <div className="inner testimonials-inner">
        <div className="testimonials-header">
          <Reveal><p className="eyebrow">05 — Real Patients, Real Words</p></Reveal>
          <Reveal delay={0.05}>
            <h2 id="testimonials-title" className="display sm">
              Don't take our word <em>for it.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="testimonials-rating-badge">
              <span className="trust-stars-lg" aria-hidden="true">{'★'.repeat(5)}</span>
              <span className="rating-text">
                <strong>{googleRating.score}/5</strong> from {googleRating.count}+ verified Google reviews
              </span>
            </div>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={0.12 + i * 0.1} y={40}>
              <blockquote className="testimonial-card">
                <div className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                  {'★'.repeat(t.stars)}
                </div>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <footer className="testimonial-footer">
                  <cite className="testimonial-name">{t.name}</cite>
                  <span className="testimonial-treatment">{t.treatment}</span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
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
          <Reveal><p className="eyebrow">06 — Visit</p></Reveal>
          <Reveal delay={0.05}>
            <h2 id="book-title" className="display sm">
              Dentistry you'll actually <em>look forward to.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede">
              Tell us what suits you. No judgement on how long it's been, no hold music, and no rushed exams. New patients are always welcome.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <BookingForm />
          </Reveal>
          <Reveal delay={0.24}>
            <p className="promise">"The gentlest appointment of your life. Guaranteed."</p>
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
          <div className="footer-social">
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="social-link">
                Instagram
              </a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="social-link">
                Facebook
              </a>
            )}
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Luma Dental Studio. All rights reserved.</p>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Studio Hours</p>
          <p className="footer-text">Monday – Friday: 8:00 AM – 7:00 PM</p>
          <p className="footer-text">Saturday: 9:00 AM – 4:00 PM</p>
          <p className="footer-text">Sunday: Emergency On-Call Only</p>
          <p className="footer-heading footer-heading-mt">Insurance & Payment</p>
          <p className="footer-text">We accept most major dental insurance plans, HSA/FSA, and offer flexible payment plans through CareCredit.</p>
        </div>

        {(site.phone || site.email || hasAddress) && (
          <div className="footer-col">
            <p className="footer-heading">Direct Contact</p>
            <address>
              {addr && <span>{addr}</span>}
              {site.phone && <a href={`tel:${site.phone.replace(/\s+/g, '')}`}>{site.phone}</a>}
              {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            </address>
            <p className="footer-heading footer-heading-mt">Emergency?</p>
            <p className="footer-text">Experiencing a dental emergency? Call our after-hours line for immediate guidance.</p>
            {site.phone && <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="footer-emergency-link">Call Emergency Line →</a>}
          </div>
        )}
      </div>

      {/* Bottom bar with trust badges */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-trust-pill">🛡️ HIPAA Compliant</span>
          <span className="footer-trust-pill">🏥 ADA Member Practice</span>
          <span className="footer-trust-pill">⭐ {googleRating.score}/5 Google Rating</span>
          <span className="footer-trust-pill">♿ ADA Accessible</span>
        </div>
      </div>
    </footer>
  );
}
