# Luma Dental — Next.js site

Scroll-driven marketing site for a (fictional) dental clinic: a 3D porcelain molar ("Moe") reacts to the
page as you scroll — nervous waiting room → calm → spa-polish → treatments → booking.

**Stack:** Next.js (App Router, TypeScript) · React Three Fiber / drei / three · Framer Motion · Zod.
No CSS framework, no runtime network dependencies (fonts are bundled, lighting is generated locally).

## Quick start

```bash
npm install
cp .env.example .env.local     # then edit
npm run dev                    # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

Requires Node ≥ 20.9.

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL. **Inlined at build time** — set it in the build environment (Vercel project env, Docker `--build-arg`). Drives metadata, sitemap, robots, Open Graph. |
| `BOOKING_WEBHOOK_URL` | **yes in production** | Booking requests are POSTed here as JSON (`name, email, phone, slot, message, receivedAt, source`). Without it, production returns HTTP 503 rather than silently losing leads. In development requests are only logged. |
| `NEXT_PUBLIC_CLINIC_*` | no | Phone, email, address — rendered in the footer and in `Dentist` JSON-LD when set. |

## Deploy

**Vercel:** import the repo, set the env vars above, deploy.

**Docker / any container host:**
```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com -t luma-dental .
docker run -p 3000:3000 -e BOOKING_WEBHOOK_URL=https://... luma-dental
```
The image uses Next's `standalone` output, runs as a non-root user and serves on port 3000.

**Plain Node server:** `npm run build && npm start` behind your reverse proxy (TLS terminated there).

## Project layout

```
src/app/            layout (fonts, metadata, JSON-LD), page, globals.css, API route, robots, sitemap, OG image
src/app/api/booking POST handler: Zod validation, honeypot, same-origin check, per-IP rate limit, webhook forward
src/components/     Header, Sections (Hero…Book, Footer), BookingForm, Reveal (motion)
                    Moe.tsx (the 3D molar), Scene.tsx (Canvas), MoeStage.tsx (lazy-load + WebGL error boundary)
src/lib/            site config, scroll state, Moe keyframes (edit these to change the story)
```

How the scroll story works: `ScrollDriver` computes a continuous position `f` (0 = hero … 4 = booking) and stores it in
`lib/scroll.ts`. `Moe.tsx` reads it every frame (no React re-renders) and eases Moe's position, scale, expression,
props (chair, magazine, cucumber slices, mirror, sparkles) towards the matching entry in `lib/moeKeyframes.ts`.

## Accessibility & resilience

- Real headings/landmarks, skip link, labelled form with `aria-live` status, keyboard-visible focus.
- `prefers-reduced-motion`: no shudder/sway/bobbing, no entrance animations, no CSS pulses.
- The canvas is `aria-hidden` and lazy-loaded client-side; if WebGL fails the page still works (without Moe).

## Before you launch — things only you can supply

- **Replace placeholder copy and claims** ("3D-planned care", "Clear, upfront pricing", services, the "47 minutes" gag)
  with what the real clinic offers. Check wording against your local dental-advertising rules.
- Add real contact details via the env vars, plus a **privacy policy** (the form collects personal data) and cookie
  banner if you add analytics.
- Point `BOOKING_WEBHOOK_URL` at a service that actually reaches your front desk, and test it end to end.
- The API rate limit is in-memory (per instance). Add an edge/WAF limit for real abuse protection.
- No Content-Security-Policy is set (Next inline scripts need a nonce setup); add one if your threat model requires it.
- Fonts (Instrument Serif, DM Sans) are SIL OFL-licensed and bundled in `src/app/fonts`.

## What was verified (and what wasn't)

Verified: clean `npm ci` → `tsc` → `next build`; production server serves `/`, `robots.txt`, `sitemap.xml`,
the OG image and security headers; booking API accepts valid input, rejects bad input, drops honeypot spam, blocks
cross-origin posts, rate-limits, forwards to a webhook, and returns 503 in production without one; `npm audit` clean.

**Not verified:** the WebGL scene was not rendered in a real browser in the authoring environment, so Moe's
proportions, camera framing and mobile layout should be eyeballed and tuned (`Moe.tsx`, `moeKeyframes.ts`).
