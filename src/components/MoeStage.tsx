'use client';

import dynamic from 'next/dynamic';
import { Component, type ReactNode } from 'react';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

/** If WebGL is unavailable (or the scene throws) the page still works – it just loses Moe. */
class StageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.warn('3D scene disabled:', error); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function MoeStage() {
  return (
    <StageBoundary>
      <Scene />
    </StageBoundary>
  );
}
