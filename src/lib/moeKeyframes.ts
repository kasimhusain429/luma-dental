/**
 * Keyframes for Moe across the 7 story sections:
 * 0: Hero (Waiting Room - Nervous on couch, positioned on the right)
 * 1: Calm (Step 01 - Exhale with spa cucumbers, positioned on the right)
 * 2: Craft (02 - Precision 3D holographic optical scan, positioned on the right)
 * 3: Treatments (03 - Care with diamond gleaming smile, positioned on the left)
 * 4: Team (04 - Your Dentists, positioned centrally, friendly)
 * 5: Testimonials (05 - Reviews, positioned on the left, beaming)
 * 6: Book (06 - Visit with handheld mirror & celebration, positioned on the left)
 *
 * x / y are fractions of the 3D viewport width / height.
 */
export const K = {
  // Hero (0): right on chair
  // Calm (1): right with spa cucumbers
  // Craft (2): center, flanked by left headline and right feature cards
  // Treatments (3): upper right beside header, diamond gleaming smile
  // Team (4): center, friendly posture
  // Testimonials (5): left side, beaming smile
  // Book (6): left with booking form on right
  x: [0.28, 0.28, 0.0, 0.28, 0.0, -0.26, -0.24],
  y: [-0.02, 0.0, 0.02, 0.10, 0.0, -0.01, -0.03],
  s: [1.0, 1.1, 1.08, 0.96, 0.95, 0.92, 1.2],
  rotY: [0.0, 0.08, 0.06, -0.08, 0.0, 0.1, 0.16],
  smile: [-0.85, 0.45, 0.85, 1.0, 1.0, 1.0, 1.0],
  brow: [1.0, 0.0, -0.15, -0.2, -0.15, -0.2, -0.2],
  lid: [0.0, 0.35, 0.0, 0.0, 0.0, 0.0, 0.0],
  open: [0.0, 0.25, 0.0, 0.0, 0.0, 0.0, 0.0],
  cuke: [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  blush: [0.0, 0.35, 0.75, 1.0, 0.85, 1.0, 1.0],
  tremble: [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  mirror: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
  sparkle: [0.0, 0.0, 0.2, 0.25, 0.3, 0.4, 1.0],
  warm: [0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  scan: [0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0],
  gleam: [0.0, 0.0, 0.0, 1.0, 0.6, 0.8, 0.8],
  halo: [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
} as const;

export type KeyName = keyof typeof K;

export function sample(arr: readonly number[], f: number): number {
  const last = arr.length - 1;
  if (f <= 0) return arr[0];
  if (f >= last) return arr[last];
  const i = Math.floor(f);
  const t = f - i;
  const e = t * t * (3 - 2 * t);
  return arr[i] + (arr[i + 1] - arr[i]) * e;
}
