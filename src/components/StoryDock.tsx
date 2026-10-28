'use client';

import { useEffect, useState } from 'react';
import { subscribeScroll, scrollToSectionIndex } from '@/lib/scroll';

const CHAPTERS = [
  { id: 'hero', num: '00', title: 'Waiting Room' },
  { id: 'calm', num: '01', title: 'Exhale' },
  { id: 'craft', num: '02', title: 'The Craft' },
  { id: 'treatments', num: '03', title: 'Care' },
  { id: 'book', num: '04', title: 'Visit' },
];

export default function StoryDock() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return subscribeScroll((idx, prog) => {
      setActiveIdx(idx);
      setProgress(prog);
    });
  }, []);

  return (
    <>
      {/* Viewport top gradient progress bar */}
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      {/* Floating Story Dock Navigation */}
      <aside className="story-dock" aria-label="Story Chapters">
        <nav className="story-dock-inner">
          {CHAPTERS.map((ch, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={ch.id}
                type="button"
                className={`dock-btn ${isActive ? 'active' : ''}`}
                onClick={() => scrollToSectionIndex(i)}
                aria-label={`Jump to chapter ${ch.num}: ${ch.title}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="dock-num">{ch.num}</span>
                <span className="dock-dot" />
                <span className="dock-tooltip">{ch.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

