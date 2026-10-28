'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Moe from './Moe';

export default function Scene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 32 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      eventSource={mounted ? document.body : undefined}
      eventPrefix="client"
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Moe />
      </Suspense>
    </Canvas>
  );
}
