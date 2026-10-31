const env = process.env;

export const site = {
  name: 'Luma Dental',
  url: (env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  tagline: "Gentle, modern dentistry you'll actually look forward to.",
  description:
    'Luma Dental is a calm, modern dental clinic specializing in anxiety-free dentistry, cosmetic treatments, teeth whitening, clear aligners, and dental implants. Experience gentle care with 3D digital scanning technology and zero rushed appointments.',
  phone: env.NEXT_PUBLIC_CLINIC_PHONE ?? '(555) 234-7890',
  email: env.NEXT_PUBLIC_CLINIC_EMAIL ?? 'hello@lumadental.com',
  address: {
    street: env.NEXT_PUBLIC_CLINIC_STREET ?? '128 Willow Creek Boulevard',
    city: env.NEXT_PUBLIC_CLINIC_CITY ?? 'San Francisco',
    region: env.NEXT_PUBLIC_CLINIC_REGION ?? 'CA',
    postalCode: env.NEXT_PUBLIC_CLINIC_POSTCODE ?? '94102',
    country: env.NEXT_PUBLIC_CLINIC_COUNTRY ?? 'US',
  },
  social: {
    instagram: env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? 'https://instagram.com/lumadental',
    facebook: env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? 'https://facebook.com/lumadental',
  },
} as const;

export const hasAddress = Object.values(site.address).some(Boolean);

export const team = [
  {
    name: 'Dr. Amara Chen',
    role: 'Lead Dentist & Founder',
    credentials: 'DDS, FAGD',
    school: 'University of the Pacific',
    bio: 'Dr. Chen founded Luma Dental with a simple mission: make dental care feel human again. With over 14 years in cosmetic and restorative dentistry, she combines surgical precision with an artist\'s eye for natural-looking results. When she\'s not in the studio, you\'ll find her trail running or experimenting with ceramics.',
    specialties: ['Cosmetic Dentistry', 'Dental Implants', 'Smile Design'],
  },
  {
    name: 'Dr. Marcus Rivera',
    role: 'Orthodontics & Alignment Specialist',
    credentials: 'DMD, MS Orthodontics',
    school: 'Columbia University',
    bio: 'Dr. Rivera believes every smile tells a story worth perfecting. Board-certified in orthodontics and a certified Invisalign Diamond Provider, he has guided over 2,000 patients to straighter, healthier smiles. Outside the clinic, he coaches youth soccer and plays jazz guitar.',
    specialties: ['Clear Aligners', 'Orthodontics', 'Digital Treatment Planning'],
  },
] as const;

export const testimonials = [
  {
    quote: 'I used to cancel dental appointments out of sheer dread. At Luma, Dr. Chen made me feel so safe that I actually fell asleep during my filling. I\'m not exaggerating — the weighted blanket and lavender towel were a game-changer.',
    name: 'Sarah M.',
    treatment: 'Restorative Filling',
    stars: 5,
  },
  {
    quote: 'My veneers look so natural that even my best friend couldn\'t tell. Dr. Chen spent an hour just choosing the right shade. This is artistry, not just dentistry.',
    name: 'David L.',
    treatment: 'Porcelain Veneers',
    stars: 5,
  },
  {
    quote: 'Dr. Rivera\'s clear aligner plan was spot-on. Twelve months later, I have the straight smile I wanted since high school. The 3D simulation they showed me before we started? My result matched it perfectly.',
    name: 'Priya K.',
    treatment: 'Clear Aligners',
    stars: 5,
  },
  {
    quote: 'Zero wait time, zero judgment about my 5-year gap in visits, and zero surprise charges. The upfront pricing alone made me a patient for life.',
    name: 'James T.',
    treatment: 'Comprehensive Exam',
    stars: 5,
  },
] as const;

export const googleRating = { score: 4.9, count: 480 } as const;
