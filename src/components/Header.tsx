'use client';

import Link from 'next/link';
import { site } from '@/lib/site';

function Swap({ href, from, to }: { href: string; from: string; to: string }) {
  return (
    <a className="navlink" href={href}>
      <span className="navlink-a" aria-hidden="true">{from}</span>
      <span className="navlink-b">{to}</span>
    </a>
  );
}

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} – home`}>
          <svg width="28" height="32" viewBox="0 0 26 30" aria-hidden="true">
            <path
              d="M3 9C2 3 8 1 13 4c5-3 11-1 10 5-.3 4-2 6-2.6 10-.4 3-1 9-3.2 9-2 0-1.8-6.2-4.2-6.2S9.8 28 7.8 28C5.6 28 5 22 4.600 19 4 15 3.300 13 3 9Z"
              fill="currentColor"
            />
            <path
              d="M20 1.500 21 4.200 23.700 5.200 21 6.200 20 8.900 19 6.200 16.300 5.200 19 4.200Z"
              fill="var(--spark)"
            />
          </svg>
          <span className="brand-text">Luma</span>
          <span className="brand-tag">Dental</span>
        </Link>

        <nav aria-label="Primary navigation" className="nav">
          <Swap href="#calm" from="Anxiety" to="Exhale" />
          <span className="dot" aria-hidden="true" />
          <Swap href="#craft" from="Drills" to="Precision" />
          <span className="dot" aria-hidden="true" />
          <Swap href="#treatments" from="Fear" to="Care" />
          <span className="dot" aria-hidden="true" />
          <Swap href="#team" from="Strangers" to="Your Dentists" />
          <span className="dot" aria-hidden="true" />
          <Swap href="#book" from="Hold Music" to="Calm" />
        </nav>

        <div className="header-right">
          {site.phone && (
            <a className="header-phone" href={`tel:${site.phone.replace(/\s+/g, '')}`} aria-label="Call us">
              <span aria-hidden="true">📞</span>
              <span>{site.phone}</span>
            </a>
          )}
          <a className="header-cta" href="#book">
            <span>Book Visit</span>
            <span aria-hidden="true" className="header-arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
