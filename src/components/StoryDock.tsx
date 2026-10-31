'use client';

import { useEffect, useState } from 'react';
import { subscribeScroll } from '@/lib/scroll';

export default function StoryDock() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return subscribeScroll((_idx, prog) => {
      setProgress(prog);
    });
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

