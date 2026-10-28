import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 90, background: 'linear-gradient(135deg,#faf5e9,#e2d6b8)', color: '#16202a' }}>
        <div style={{ fontSize: 34, letterSpacing: 8, textTransform: 'uppercase', color: '#5c7a68' }}>{site.name}</div>
        <div style={{ fontSize: 96, lineHeight: 1.02, marginTop: 24, fontFamily: 'serif' }}>Dentistry you’ll actually look forward to.</div>
      </div>
    ),
    size,
  );
}
