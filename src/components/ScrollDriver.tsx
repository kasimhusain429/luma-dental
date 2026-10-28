'use client';

import { useEffect } from 'react';
import { measure, scrollState, update } from '@/lib/scroll';

/** Wires window scroll/resize to the shared scroll state used by the 3D scene and the header. */
export default function ScrollDriver() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => { scrollState.reduced = mq.matches; };
    syncMotion();
    mq.addEventListener('change', syncMotion);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    const onResize = () => measure();

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    return () => {
      mq.removeEventListener('change', syncMotion);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
