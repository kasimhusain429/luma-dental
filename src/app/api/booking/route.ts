import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your name.').max(100),
    email: z.string().trim().max(200).optional().default(''),
    phone: z.string().trim().max(40).optional().default(''),
    slot: z.enum(['any', 'morning', 'afternoon', 'evening']).default('any'),
    message: z.string().trim().max(1000).optional().default(''),
    company: z.string().max(200).optional().default(''), // honeypot
  })
  .superRefine((v, ctx) => {
    if (!v.email && !v.phone) ctx.addIssue({ code: 'custom', path: ['email'], message: 'Please share an email or phone number.' });
    if (v.email && !z.string().email().safeParse(v.email).success) ctx.addIssue({ code: 'custom', path: ['email'], message: 'That email address looks incorrect.' });
    if (v.phone && !/^[+()\d\s.-]{6,40}$/.test(v.phone)) ctx.addIssue({ code: 'custom', path: ['phone'], message: 'That phone number looks incorrect.' });
  });

// Best-effort, per-instance rate limit. Put a WAF / edge rate limit in front for real protection.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const h = hits.get(ip);
  if (!h || h.reset < now) { hits.set(ip, { count: 1, reset: now + WINDOW_MS }); return false; }
  h.count += 1;
  return h.count > MAX_HITS;
}

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // non-browser clients; still validated + rate limited
  try {
    const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
    return new URL(origin).host === host;
  } catch { return false; }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  if (Number(req.headers.get('content-length') ?? 0) > 10_000) return NextResponse.json({ error: 'Request too large.' }, { status: 413 });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request.' }, { status: 400 });

  const { company, ...lead } = parsed.data;
  if (company) return NextResponse.json({ ok: true }); // bot: pretend success, store nothing

  const payload = { ...lead, receivedAt: new Date().toISOString(), source: 'luma-dental-website' };
  const webhook = process.env.BOOKING_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === 'production') {
      console.error('BOOKING_WEBHOOK_URL is not set – booking request could not be delivered.');
      return NextResponse.json({ error: 'Online booking is temporarily unavailable. Please call us instead.' }, { status: 503 });
    }
    console.log('[dev] booking request:', payload); // development only
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Booking delivery failed:', err);
    return NextResponse.json({ error: 'We could not send your request. Please try again or call us.' }, { status: 502 });
  }
}
