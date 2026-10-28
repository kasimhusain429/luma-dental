'use client';

import { useState, useEffect } from 'react';

const PHASES = [
  { name: 'Inhale', duration: 4, label: 'Inhale calmly...', instruction: 'Breathe in through your nose' },
  { name: 'Hold', duration: 3, label: 'Hold softly...', instruction: 'Rest in the quiet stillness' },
  { name: 'Exhale', duration: 4, label: 'Exhale slowly...', instruction: 'Release all jaw and shoulder tension' },
] as const;

export default function BreathingWidget() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhaseIndex((p) => {
            const nextPhase = (p + 1) % PHASES.length;
            setSecondsLeft(PHASES[nextPhase].duration);
            return nextPhase;
          });
          return 1;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const currentPhase = PHASES[phaseIndex];

  return (
    <div className="breath-box" role="region" aria-label="Guided breathing exercise">
      <div className="breath-visual" data-phase={currentPhase.name.toLowerCase()} onClick={() => setIsActive((v) => !v)}>
        {/* Concentric aura pulse rings */}
        <div className="breath-aura aura-3" />
        <div className="breath-aura aura-2" />
        <div className="breath-aura aura-1" />
        <div className="breath-core">
          <span className="breath-count" aria-hidden="true">{secondsLeft}s</span>
          <span className="breath-state">{currentPhase.name}</span>
        </div>
      </div>

      <div className="breath-copy">
        <p className="breath-headline">{currentPhase.label}</p>
        <p className="breath-sub">{currentPhase.instruction}</p>
        <button
          type="button"
          className="breath-toggle"
          onClick={() => setIsActive((v) => !v)}
          aria-label={isActive ? 'Pause breathing guide' : 'Resume breathing guide'}
        >
          {isActive ? 'Pause rhythm' : 'Resume rhythm'}
        </button>
      </div>
    </div>
  );
}

