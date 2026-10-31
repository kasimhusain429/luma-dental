import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site, hasAddress, team, googleRating } from '@/lib/site';

const serif = localFont({
  src: [
    { path: './fonts/InstrumentSerif-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/InstrumentSerif-Italic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});
const sans = localFont({ src: './fonts/DMSans.ttf', variable: '--font-sans', display: 'swap', weight: '100 1000' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  keywords: ['dentist', 'dental clinic', 'anxiety-free dentistry', 'teeth whitening', 'dental implants', 'clear aligners', 'cosmetic dentistry', 'San Francisco dentist', 'gentle dentistry'],
  openGraph: { type: 'website', siteName: site.name, title: `${site.name} — ${site.tagline}`, description: site.description, url: '/' },
  twitter: { card: 'summary_large_image', title: `${site.name} — ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#e9eff3',
};

function jsonLd() {
  const a = site.address;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: site.name,
    url: site.url,
    description: site.description,
    image: `${site.url}/opengraph-image`,
    priceRange: '$$',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: googleRating.score,
      reviewCount: googleRating.count,
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dental Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Teeth Whitening' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clear Aligners' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dental Implants' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cosmetic Dentistry' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'General Dentistry' } },
      ],
    },
  };
  if (site.phone) data.telephone = site.phone;
  if (site.email) data.email = site.email;
  if (hasAddress) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: a.street || undefined,
      addressLocality: a.city || undefined,
      addressRegion: a.region || undefined,
      postalCode: a.postalCode || undefined,
      addressCountry: a.country || undefined,
    };
  }

  // Add team members
  data.employee = team.map((member) => ({
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
  }));

  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} data-nav="light" data-calm="false">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      </body>
    </html>
  );
}
