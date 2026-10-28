const env = process.env;

export const site = {
  name: 'Luma Dental',
  url: (env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  tagline: 'Dentistry you’ll actually look forward to.',
  description:
    'Luma Dental is a calm, modern dental clinic: gentle check-ups, whitening, aligners and implants planned with 3D scans and no rushed appointments.',
  phone: env.NEXT_PUBLIC_CLINIC_PHONE ?? '',
  email: env.NEXT_PUBLIC_CLINIC_EMAIL ?? '',
  address: {
    street: env.NEXT_PUBLIC_CLINIC_STREET ?? '',
    city: env.NEXT_PUBLIC_CLINIC_CITY ?? '',
    region: env.NEXT_PUBLIC_CLINIC_REGION ?? '',
    postalCode: env.NEXT_PUBLIC_CLINIC_POSTCODE ?? '',
    country: env.NEXT_PUBLIC_CLINIC_COUNTRY ?? '',
  },
} as const;

export const hasAddress = Object.values(site.address).some(Boolean);
