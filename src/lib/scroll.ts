/**
 * Shared scroll state and story driver.
 * The 3D scene reads scrollState every frame (no React re-renders).
 * `f` is a continuous "story position": 0 = hero, 1 = calm, 2 = craft, 3 = treatments, 4 = book.
 */
export const scrollState = {
  y: 0,
  vh: 1,
  f: 0,
  progress: 0,
  activeSection: 0,
  reduced: false,
};

type ScrollListener = (activeSection: number, progress: number, f: number) => void;
const listeners = new Set<ScrollListener>();

export function subscribeScroll(fn: ScrollListener): () => void {
  listeners.add(fn);
  fn(scrollState.activeSection, scrollState.progress, scrollState.f);
  return () => {
    listeners.delete(fn);
  };
}

let tops: number[] = [];
let lastNav = '';
let lastCalm = '';
let lastIdx = -1;

const smooth = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};

export function measure() {
  if (typeof window === 'undefined') return;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  tops = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
  scrollState.vh = window.innerHeight;
  update();
}

export function update() {
  if (typeof window === 'undefined') return;
  const y = window.scrollY;
  const { vh } = scrollState;
  scrollState.y = y;

  const docHeight = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const progress = Math.min(1, Math.max(0, y / docHeight));
  scrollState.progress = progress;

  // Story position: smooth transitions centered on section boundaries
  let f = 0;
  for (let i = 1; i < tops.length; i++) {
    const boundary = tops[i];
    const trigger = y + vh * 0.5;
    f += smooth((trigger - (boundary - vh * 0.35)) / (vh * 0.7));
  }
  scrollState.f = Math.min(Math.max(0, f), Math.max(0, tops.length - 1));

  // Active section detection: follows whichever section sits under header
  const probe = y + vh * 0.35;
  let idx = 0;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i] <= probe) idx = i;
  }
  scrollState.activeSection = idx;

  const els = document.querySelectorAll<HTMLElement>('[data-section]');
  const theme = els[idx]?.dataset.theme ?? 'light';
  const calm = idx >= 1 ? 'true' : 'false';
  const root = document.documentElement;

  if (theme !== lastNav) {
    root.dataset.nav = theme;
    lastNav = theme;
  }
  if (calm !== lastCalm) {
    root.dataset.calm = calm;
    lastCalm = calm;
  }
  if (idx !== lastIdx) {
    root.dataset.section = els[idx]?.id ?? `section-${idx}`;
    lastIdx = idx;
  }

  root.style.setProperty('--scroll-progress', `${(progress * 100).toFixed(1)}%`);

  listeners.forEach((fn) => fn(idx, progress, f));
}

export function scrollToSectionIndex(index: number) {
  if (typeof window === 'undefined') return;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  if (els[index]) {
    els[index].scrollIntoView({ behavior: 'smooth' });
  }
}
