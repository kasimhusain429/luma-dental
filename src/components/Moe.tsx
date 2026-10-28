
'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll';
import { K, sample } from '@/lib/moeKeyframes';
import {
  createMolarCrownGeometry,
  createMolarRootGeometry,
  createBifurcationSaddleGeometry,
} from '@/lib/toothGeometry';

const ENAMEL_COLOR = '#faf7f0';
const CEMENTUM_COLOR = '#f3ede1';
const INK = '#1e1c24';
const SCLERA = '#ffffff';
const MOUTH_COLOR = '#4a2332';
const MOUTH_INNER = '#8c3547';
const BLUSH_COLOR = '#ff8295';
const GOLD = '#d4af37';

const LOOKS: [number, number][] = [
  [0.85, 0.7],
  [0, -0.2],
  [-0.7, -0.4],
  [0.8, 0.6],
  [0.2, 0.1],
  [-0.4, 0.25],
];

const EYE_X = 0.21;
const EYE_Y = 0.14;
const EYE_Z = 0.36;

type State = {
  x: number;
  y: number;
  s: number;
  rotY: number;
  smile: number;
  brow: number;
  lid: number;
  open: number;
  cuke: number;
  blush: number;
  tremble: number;
  mirror: number;
  sparkle: number;
  warm: number;
  scan: number;
  gleam: number;
  halo: number;
  lookX: number;
  lookY: number;
};

function initialState(portrait: boolean): State {
  const f = scrollState.f;
  return {
    x: portrait ? 0 : sample(K.x, f),
    y: sample(K.y, f),
    s: sample(K.s, f),
    rotY: sample(K.rotY, f),
    smile: sample(K.smile, f),
    brow: sample(K.brow, f),
    lid: sample(K.lid, f),
    open: sample(K.open, f),
    cuke: sample(K.cuke, f),
    blush: sample(K.blush, f),
    tremble: sample(K.tremble, f),
    mirror: sample(K.mirror, f),
    sparkle: sample(K.sparkle, f),
    warm: sample(K.warm, f),
    scan: sample(K.scan, f),
    gleam: sample(K.gleam, f),
    halo: sample(K.halo, f),
    lookX: 0,
    lookY: 0,
  };
}

export default function Moe() {
  const { viewport, size } = useThree();

  const root = useRef<THREE.Group>(null);
  const moe = useRef<THREE.Group>(null);
  const chair = useRef<THREE.Group>(null);
  const pupilL = useRef<THREE.Mesh>(null);
  const pupilR = useRef<THREE.Mesh>(null);
  const glintL = useRef<THREE.Mesh>(null);
  const glintR = useRef<THREE.Mesh>(null);
  const subGlintL = useRef<THREE.Mesh>(null);
  const subGlintR = useRef<THREE.Mesh>(null);
  const lidL = useRef<THREE.Mesh>(null);
  const lidR = useRef<THREE.Mesh>(null);
  const browL = useRef<THREE.Mesh>(null);
  const browR = useRef<THREE.Mesh>(null);
  const mouth = useRef<THREE.Mesh>(null);
  const mouthOpen = useRef<THREE.Mesh>(null);
  const cukeL = useRef<THREE.Group>(null);
  const cukeR = useRef<THREE.Group>(null);
  const blushL = useRef<THREE.Mesh>(null);
  const blushR = useRef<THREE.Mesh>(null);
  const sweat = useRef<THREE.Mesh>(null);
  const magazine = useRef<THREE.Group>(null);
  const arms = useRef<THREE.Group>(null);
  const mirror = useRef<THREE.Group>(null);
  const sparkles = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const holoScanner = useRef<THREE.Group>(null);
  const holoLight = useRef<THREE.PointLight>(null);
  const diamondGleam = useRef<THREE.Group>(null);
  const haloRing = useRef<THREE.Mesh>(null);
  const contactShadow = useRef<THREE.Mesh>(null);

  const cur = useRef<State | null>(null);

  // High-end dental porcelain enamel with clearcoat and transmission
  const enamelMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: ENAMEL_COLOR,
        roughness: 0.16,
        metalness: 0.02,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        transmission: 0.22,
        thickness: 0.85,
        ior: 1.52,
        sheen: 0.65,
        sheenColor: new THREE.Color('#ffe8df'),
        iridescence: 0.25,
        iridescenceIOR: 1.3,
      }),
    [],
  );

  // Root cementum material (warmer, slightly satin)
  const cementumMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: CEMENTUM_COLOR,
        roughness: 0.32,
        metalness: 0.01,
      }),
    [],
  );

  const inkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: INK, roughness: 0.35 }), []);
  const whiteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: SCLERA, roughness: 0.18 }), []);
  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD,
        metalness: 0.92,
        roughness: 0.2,
      }),
    [],
  );
  const mirrorGlassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#eef8fa',
        metalness: 0.98,
        roughness: 0.02,
      }),
    [],
  );

  // Procedural anatomical tooth geometries
  const crownGeo = useMemo(() => createMolarCrownGeometry(), []);
  const rootLeftGeo = useMemo(() => createMolarRootGeometry('left'), []);
  const rootRightGeo = useMemo(() => createMolarRootGeometry('right'), []);
  const saddleGeo = useMemo(() => createBifurcationSaddleGeometry(), []);

  const coldKey = useMemo(() => new THREE.Color('#dceaff'), []);
  const warmKey = useMemo(() => new THREE.Color('#fff2dd'), []);

  useFrame((state, rawDt) => {
    if (!root.current || !moe.current) return;
    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime;
    const f = scrollState.f;
    const reduced = scrollState.reduced;
    const portrait = size.width / size.height < 0.9;

    if (!cur.current) cur.current = initialState(portrait);
    const c = cur.current;
    const d = (a: number, b: number, lambda = 6) => THREE.MathUtils.damp(a, b, lambda, dt);

    // Dynamic targets from scroll keyframes
    const calmness = sample(K.tremble, f);
    const target = {
      x: portrait ? 0 : sample(K.x, f),
      y: sample(K.y, f) + (portrait ? 0.2 : 0),
      s: sample(K.s, f) * (portrait ? 0.84 : 1),
      rotY: sample(K.rotY, f),
      smile: sample(K.smile, f),
      brow: sample(K.brow, f),
      lid: sample(K.lid, f),
      open: sample(K.open, f),
      cuke: sample(K.cuke, f),
      blush: sample(K.blush, f),
      tremble: reduced ? 0 : calmness,
      mirror: sample(K.mirror, f),
      sparkle: sample(K.sparkle, f),
      warm: sample(K.warm, f),
      scan: sample(K.scan, f),
      gleam: sample(K.gleam, f),
      halo: sample(K.halo, f),
    };

    c.x = d(c.x, target.x, 5.5);
    c.y = d(c.y, target.y, 5.5);
    c.s = d(c.s, target.s, 5.5);
    c.rotY = d(c.rotY, target.rotY, 4.5);
    c.smile = d(c.smile, target.smile, 5);
    c.brow = d(c.brow, target.brow, 5);
    c.lid = d(c.lid, target.lid, 7.5);
    c.open = d(c.open, target.open, 8);
    c.cuke = d(c.cuke, target.cuke, 8);
    c.blush = d(c.blush, target.blush, 4);
    c.tremble = d(c.tremble, target.tremble, 5);
    c.mirror = d(c.mirror, target.mirror, 5);
    c.sparkle = d(c.sparkle, target.sparkle, 4);
    c.warm = d(c.warm, target.warm, 3);
    c.scan = d(c.scan, target.scan, 6);
    c.gleam = d(c.gleam, target.gleam, 5);
    c.halo = d(c.halo, target.halo, 4);

    // Placement & breathing bob
    const base = Math.min(viewport.height * 0.21, viewport.width * 0.28);
    const bob = reduced ? 0 : Math.sin(t * 1.5) * 0.04 * base * (1 - calmness * 0.7);
    root.current.position.set(c.x * viewport.width, c.y * viewport.height + bob, 0);
    root.current.scale.setScalar(base * c.s);

    // Pointer parallax (Moe gently follows user's cursor)
    const pointerInfluence = reduced ? 0 : 0.15;
    const pointerTiltX = state.pointer.x * pointerInfluence;
    const pointerTiltY = state.pointer.y * pointerInfluence * 0.5;

    // Body: organic sway + nervous shudder
    const sway = reduced ? 0 : Math.sin(t * 0.85) * 0.1;
    const tr = c.tremble;
    moe.current.rotation.set(
      -0.05 + (reduced ? 0 : Math.sin(t * 0.9) * 0.02) - pointerTiltY,
      c.rotY + sway + pointerTiltX,
      tr * 0.035 * Math.sin(t * 78),
    );
    moe.current.position.set(
      tr * 0.014 * Math.sin(t * 88),
      0.22 + tr * 0.008 * Math.sin(t * 98 + 1),
      0,
    );

    // Dynamic eyes & pupils
    let lx: number, ly: number;
    if (c.mirror > 0.6) {
      lx = 0.85;
      ly = 0.2;
    } else if (tr > 0.3) {
      const i = Math.floor(t / 0.52) % LOOKS.length;
      lx = LOOKS[i][0];
      ly = LOOKS[i][1];
    } else {
      lx = THREE.MathUtils.clamp(state.pointer.x * 0.6 + Math.sin(t * 0.7) * 0.15, -0.85, 0.85);
      ly = THREE.MathUtils.clamp(state.pointer.y * 0.45 + 0.05, -0.6, 0.7);
    }
    c.lookX = d(c.lookX, lx, 14);
    c.lookY = d(c.lookY, ly, 14);

    const blink = reduced ? 0 : Math.max(0, 1 - Math.abs((t % 3.4) - 3.2) / 0.085);
    const lid = Math.max(c.lid, blink * 0.96);

    for (const [pup, gl, sgl, sgn] of [
      [pupilL.current, glintL.current, subGlintL.current, -1],
      [pupilR.current, glintR.current, subGlintR.current, 1],
    ] as const) {
      if (!pup || !gl) continue;
      pup.position.set(sgn * EYE_X + c.lookX * 0.04, EYE_Y + c.lookY * 0.045, EYE_Z + 0.02);
      gl.position.set(pup.position.x + 0.016, pup.position.y + 0.02, EYE_Z + 0.038);
      if (sgl) sgl.position.set(pup.position.x - 0.014, pup.position.y - 0.015, EYE_Z + 0.036);
    }

    for (const lm of [lidL.current, lidR.current]) {
      if (!lm) continue;
      const ly2 = 0.14 * lid;
      lm.visible = lid > 0.02;
      lm.scale.set(0.125, Math.max(ly2, 0.001), 0.04);
      lm.position.y = EYE_Y + 0.13 - ly2;
    }

    // Brows
    const browAngle = c.brow * 0.36;
    if (browL.current) {
      browL.current.rotation.z = Math.PI / 2 + browAngle;
      browL.current.position.y = 0.33 + c.brow * 0.014;
    }
    if (browR.current) {
      browR.current.rotation.z = Math.PI / 2 - browAngle;
      browR.current.position.y = 0.33 + c.brow * 0.014;
    }

    // Mouth
    if (mouth.current) {
      const sm = Math.abs(c.smile) < 0.06 ? 0.06 : c.smile;
      mouth.current.scale.set(1 + (tr > 0.1 ? Math.sin(t * 38) * 0.04 * tr : 0), sm * 0.72, 1);
      mouth.current.visible = c.open < 0.2;
    }
    if (mouthOpen.current) {
      mouthOpen.current.visible = c.open > 0.05;
      mouthOpen.current.scale.set(0.065, 0.08 * c.open + 0.001, 0.022);
    }

    // Blushing cheeks
    for (const b of [blushL.current, blushR.current]) {
      if (b) (b.material as THREE.MeshBasicMaterial).opacity = c.blush * 0.55;
    }

    // Spa Cucumber Slices (Section 1: Calm only)
    const ck = THREE.MathUtils.clamp(c.cuke, 0, 1.1);
    const isCukeActive = f > 0.4 && f < 1.7 && ck > 0.05;
    for (const g of [cukeL.current, cukeR.current]) {
      if (g) {
        g.visible = isCukeActive;
        g.scale.setScalar(Math.max(ck, 0.001));
      }
    }

    // Zen aura halo (Section 1: Calm only)
    if (haloRing.current) {
      const isCalmActive = f > 0.5 && f < 1.6 && c.halo > 0.08;
      haloRing.current.visible = isCalmActive;
      if (isCalmActive) {
        haloRing.current.scale.setScalar(Math.max(c.halo, 0.001));
        haloRing.current.position.y = 0.65 + (reduced ? 0 : Math.sin(t * 2) * 0.02);
        haloRing.current.rotation.x = Math.PI / 2 + (reduced ? 0 : Math.sin(t) * 0.05);
        haloRing.current.rotation.z = t * 0.3;
        (haloRing.current.material as THREE.MeshBasicMaterial).opacity = c.halo * 0.7;
      }
    }

    // Holographic 3D Dental Scanner (Section 2: Craft only)
    if (holoScanner.current) {
      const isScanActive = f > 1.6 && f < 2.6 && c.scan > 0.08;
      holoScanner.current.visible = isScanActive;
      if (isScanActive) {
        holoScanner.current.scale.setScalar(Math.max(c.scan, 0.001));
        const scanY = 0.22 + Math.sin(t * 2.8) * 0.24;
        holoScanner.current.position.set(0, scanY, 0);
        holoScanner.current.rotation.y = t * 1.4;
        if (holoLight.current) {
          holoLight.current.intensity = c.scan * (3.5 + Math.sin(t * 12) * 0.8);
        }
      }
    }

    // Diamond Sparkle Gleam on Cusp (Section 3: Treatments only)
    if (diamondGleam.current) {
      const isGleamActive = f > 2.3 && c.gleam > 0.08;
      diamondGleam.current.visible = isGleamActive;
      if (isGleamActive) {
        diamondGleam.current.scale.setScalar(Math.max(c.gleam, 0.001) * (0.8 + Math.sin(t * 4.5) * 0.2));
        diamondGleam.current.rotation.z = t * 1.8;
        diamondGleam.current.position.set(0.24, 0.46, 0.22);
      }
    }

    // Nervous sweat drop (Hero only)
    if (sweat.current) {
      const ph = (t * 1.3) % 1;
      sweat.current.visible = tr > 0.25 && f < 0.7;
      if (sweat.current.visible) {
        sweat.current.position.set(-0.42 - ph * 0.03, 0.52 - ph * 0.56, 0.22);
        (sweat.current.material as THREE.MeshStandardMaterial).opacity =
          Math.sin(ph * Math.PI) * 0.95 * Math.min(1, tr);
      }
    }

    // Hands & Magazine (Hero only, falls away with scroll)
    const fall = Math.max(0, f - 0.08);
    if (magazine.current) {
      magazine.current.visible = f < 0.85;
      if (magazine.current.visible) {
        magazine.current.position.set(fall * 1.4, -0.42 - fall * fall * 14, 0.38);
        magazine.current.rotation.set(0, 0, Math.PI + fall * 7);
      }
    }
    if (arms.current) {
      arms.current.scale.setScalar(Math.max(0.001, 1 - THREE.MathUtils.smoothstep(f, 0.08, 0.4)));
    }

    // Handheld Mirror (Section 4: Booking only)
    if (mirror.current) {
      const isMirrorActive = f > 3.2 && c.mirror > 0.05;
      mirror.current.visible = isMirrorActive;
      if (isMirrorActive) {
        mirror.current.scale.setScalar(Math.max(c.mirror, 0.001));
        mirror.current.position.set(1.08, 0.62 + (reduced ? 0 : Math.sin(t * 1.6) * 0.03), 0.45);
        mirror.current.rotation.z = -0.3 + (reduced ? 0 : Math.sin(t * 1.2) * 0.04);
      }
    }

    // Sparkles
    if (sparkles.current) {
      sparkles.current.visible = c.sparkle > 0.08;
      if (sparkles.current.visible) {
        sparkles.current.scale.setScalar(Math.max(c.sparkle, 0.001));
      }
    }

    // =========================================================================
    // WAITING ROOM DESIGNER CHAIR: MATHEMATICAL PERSPECTIVE PARALLAX ALIGNMENT
    // =========================================================================
    if (chair.current) {
      const pxToWorld = viewport.height / Math.max(1, window.innerHeight);
      const isHeroVisible = scrollState.y < window.innerHeight * 1.35;
      chair.current.visible = isHeroVisible;

      if (isHeroVisible) {
        const zCam = 9.0;
        const zChair = -0.36; // Chair seat depth behind Moe (Z=0)
        // Perspective projection factor from camera (0, 0, 9):
        // Ensures chair's center (X=0) projects to the exact same screen pixel as Moe (X=0)
        const projFactor = (zCam - zChair) / zCam;

        const x0 = portrait ? 0 : K.x[0] * viewport.width;
        const y0 = K.y[0] * viewport.height + (portrait ? 0.2 * viewport.height : 0);

        const chairX = x0 * projFactor;
        const chairY = (y0 + bob) * projFactor + scrollState.y * pxToWorld;

        chair.current.position.set(chairX, chairY, zChair);
        chair.current.scale.setScalar(base * K.s[0] * projFactor * (portrait ? 0.84 : 1));
      }
    }

    // Contact drop shadow beneath Moe
    if (contactShadow.current) {
      const shadowScale = Math.max(0.4, 1 - (bob / base) * 2.5);
      contactShadow.current.scale.set(0.68 * shadowScale, 0.45 * shadowScale, 1);
      (contactShadow.current.material as THREE.MeshBasicMaterial).opacity =
        0.22 * Math.max(0.2, shadowScale);
    }

    // Studio key light warm/cool color transition
    if (keyLight.current) {
      keyLight.current.color.copy(coldKey).lerp(warmKey, THREE.MathUtils.clamp(c.warm, 0, 1));
    }
  });

  const eyes = [-1, 1] as const;

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight ref={keyLight} position={[-3, 5, 6]} intensity={2.6} />
      <directionalLight position={[5, 1, 3]} intensity={0.8} color="#cfe2ff" />
      <directionalLight position={[0, -2, -3]} intensity={0.5} color="#ffe5d4" />
      <pointLight position={[0, 2.5, -4]} intensity={9} color="#ffe8cc" />

      {/* Studio Environment HDR-style fill reflections */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.6} position={[-3, 4, 4]} scale={[6, 3, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
        <Lightformer form="rect" intensity={1.2} position={[5, 1, 2]} scale={[3, 5, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
        <Lightformer form="ring" intensity={1.5} position={[0, -3, 3]} scale={4.5} onUpdate={(l) => l.lookAt(0, 0, 0)} />
      </Environment>

      {/* Mid-Century Waiting Room Lounge Chair (Hero only - perfectly centered with Moe) */}
      <group ref={chair}>
        {/* Curved velvet backrest */}
        <RoundedBox args={[1.65, 1.35, 0.35]} radius={0.16} smoothness={6} position={[0, 0.08, -0.25]}>
          <meshStandardMaterial color="#2c5560" roughness={0.65} />
        </RoundedBox>
        {/* Soft thick seat cushion under Moe's roots */}
        <RoundedBox args={[1.75, 0.36, 1.0]} radius={0.15} smoothness={6} position={[0, -0.82, 0.15]}>
          <meshStandardMaterial color="#3d6f7c" roughness={0.6} />
        </RoundedBox>
        {/* Symmetrical padded armrests */}
        {eyes.map((s) => (
          <RoundedBox key={s} args={[0.22, 0.78, 0.92]} radius={0.1} smoothness={5} position={[s * 0.94, -0.48, 0.15]}>
            <meshStandardMaterial color="#3d6f7c" roughness={0.6} />
          </RoundedBox>
        ))}
        {/* Brushed champagne metal legs */}
        {eyes.map((s) =>
          [-1, 1].map((sz) => (
            <mesh key={`leg${s}${sz}`} position={[s * 0.7, -1.22, sz * 0.34]} rotation={[sz * 0.08, 0, -s * 0.08]}>
              <cylinderGeometry args={[0.036, 0.026, 0.44, 16]} />
              <meshStandardMaterial color="#c2a468" metalness={0.7} roughness={0.3} />
            </mesh>
          )),
        )}
      </group>

      <group ref={root}>
        {/* Contact Shadow on ground */}
        <mesh ref={contactShadow} position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.4, 1.4]} />
          <meshBasicMaterial color="#0b1716" transparent opacity={0.22} depthWrite={false} />
        </mesh>

        <group ref={moe}>
          {/* ======================================================== */}
          {/* ENHANCED 3D MOLAR ANATOMY: SCULPTED CROWN & TWIN ROOTS    */}
          {/* ======================================================== */}
          <mesh geometry={crownGeo} material={enamelMat} castShadow receiveShadow />
          <mesh geometry={rootLeftGeo} material={cementumMat} castShadow />
          <mesh geometry={rootRightGeo} material={cementumMat} castShadow />
          <mesh geometry={saddleGeo} material={cementumMat} />

          {/* ======================================================== */}
          {/* EXPRESSIVE FACIAL FEATURES                               */}
          {/* ======================================================== */}
          {eyes.map((s) => (
            <group key={`eye${s}`}>
              <mesh position={[s * EYE_X, EYE_Y, EYE_Z - 0.006]} scale={[0.11, 0.13, 0.025]} material={inkMat}>
                <sphereGeometry args={[1, 32, 20]} />
              </mesh>
              <mesh position={[s * EYE_X, EYE_Y, EYE_Z]} scale={[0.098, 0.118, 0.032]} material={whiteMat}>
                <sphereGeometry args={[1, 32, 20]} />
              </mesh>
            </group>
          ))}

          {/* Deep pupils */}
          <mesh ref={pupilL} scale={[0.052, 0.06, 0.015]} material={inkMat}>
            <sphereGeometry args={[1, 24, 16]} />
          </mesh>
          <mesh ref={pupilR} scale={[0.052, 0.06, 0.015]} material={inkMat}>
            <sphereGeometry args={[1, 24, 16]} />
          </mesh>

          {/* Primary and secondary eye glints */}
          <mesh ref={glintL} scale={[0.016, 0.016, 0.012]} material={whiteMat}>
            <sphereGeometry args={[1, 16, 12]} />
          </mesh>
          <mesh ref={glintR} scale={[0.016, 0.016, 0.012]} material={whiteMat}>
            <sphereGeometry args={[1, 16, 12]} />
          </mesh>
          <mesh ref={subGlintL} scale={[0.008, 0.008, 0.008]} material={whiteMat}>
            <sphereGeometry args={[1, 12, 8]} />
          </mesh>
          <mesh ref={subGlintR} scale={[0.008, 0.008, 0.008]} material={whiteMat}>
            <sphereGeometry args={[1, 12, 8]} />
          </mesh>

          {/* Curved blinking eyelids */}
          <mesh ref={lidL} position={[-EYE_X, EYE_Y, EYE_Z + 0.032]} material={enamelMat} visible={false}>
            <sphereGeometry args={[1, 32, 20]} />
          </mesh>
          <mesh ref={lidR} position={[EYE_X, EYE_Y, EYE_Z + 0.032]} material={enamelMat} visible={false}>
            <sphereGeometry args={[1, 32, 20]} />
          </mesh>

          {/* Eyebrows */}
          <mesh ref={browL} position={[-EYE_X, 0.33, EYE_Z - 0.02]} rotation={[0, 0, Math.PI / 2]} material={inkMat}>
            <capsuleGeometry args={[0.015, 0.13, 4, 12]} />
          </mesh>
          <mesh ref={browR} position={[EYE_X, 0.33, EYE_Z - 0.02]} rotation={[0, 0, Math.PI / 2]} material={inkMat}>
            <capsuleGeometry args={[0.015, 0.13, 4, 12]} />
          </mesh>

          {/* Smile / Mouth */}
          <mesh ref={mouth} position={[0, -0.045, EYE_Z + 0.005]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.105, 0.015, 12, 36, Math.PI]} />
            <meshStandardMaterial color={MOUTH_COLOR} roughness={0.45} />
          </mesh>
          <mesh ref={mouthOpen} position={[0, -0.095, EYE_Z + 0.008]} visible={false}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color={MOUTH_INNER} roughness={0.5} />
          </mesh>

          {/* Blushing cheeks */}
          {eyes.map((s) => (
            <mesh key={`blush${s}`} ref={s < 0 ? blushL : blushR} position={[s * 0.34, -0.01, EYE_Z + 0.002]} scale={[1.35, 1, 1]}>
              <circleGeometry args={[0.075, 24]} />
              <meshBasicMaterial color={BLUSH_COLOR} transparent opacity={0} depthWrite={false} />
            </mesh>
          ))}

          {/* ======================================================== */}
          {/* ACCESSORIES & SECTION PROPS (DEFAULT INVISIBLE)          */}
          {/* ======================================================== */}

          {/* Spa Cucumber Slices (Section 1: Calm only) */}
          {eyes.map((s) => (
            <group key={`cuke${s}`} ref={s < 0 ? cukeL : cukeR} position={[s * EYE_X, EYE_Y, EYE_Z + 0.045]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
              <mesh>
                <cylinderGeometry args={[0.135, 0.135, 0.032, 32]} />
                <meshStandardMaterial color="#47784b" roughness={0.45} />
              </mesh>
              <mesh position={[0, 0.004, 0]}>
                <cylinderGeometry args={[0.115, 0.115, 0.032, 32]} />
                <meshStandardMaterial color="#c6e8ad" roughness={0.35} />
              </mesh>
              <mesh position={[0, 0.007, 0]}>
                <cylinderGeometry args={[0.055, 0.055, 0.032, 24]} />
                <meshStandardMaterial color="#9bc982" roughness={0.35} />
              </mesh>
            </group>
          ))}

          {/* Calming Zen Aura Ring (Section 1: Calm only) */}
          <mesh ref={haloRing} position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
            <torusGeometry args={[0.48, 0.022, 16, 48]} />
            <meshBasicMaterial color="#7de0b8" transparent opacity={0} />
          </mesh>

          {/* Holographic 3D Dental Scan Laser Grid (Section 2: Craft only) */}
          <group ref={holoScanner} position={[0, 0.2, 0]} visible={false}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.55, 0.02, 16, 48]} />
              <meshBasicMaterial color="#5df0d8" />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.1, 0.54, 32]} />
              <meshBasicMaterial color="#3ddcc0" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
            <pointLight ref={holoLight} color="#5df0d8" intensity={0} distance={1.8} decay={2} />
          </group>

          {/* Diamond Sparkle Gleam on Cusp (Section 3: Treatments only) */}
          <group ref={diamondGleam} position={[0.24, 0.46, 0.22]} visible={false}>
            <mesh scale={[0.18, 0.035, 0.01]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh scale={[0.035, 0.18, 0.01]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh scale={[0.1, 0.1, 0.01]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#fff3cc" />
            </mesh>
            <pointLight color="#fff0c2" intensity={2.5} distance={1.2} decay={2} />
          </group>

          {/* Teardrop nervous sweat drop (Hero only) */}
          <mesh ref={sweat} scale={[0.045, 0.07, 0.032]} visible={false}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color="#88d2ff" transparent opacity={0} roughness={0.08} />
          </mesh>

          {/* Hands & Magazine (Hero only) */}
          <group ref={arms}>
            {eyes.map((s) => (
              <group key={`arm${s}`}>
                <mesh position={[s * 0.42, -0.12, 0.22]} rotation={[0, 0, s * 0.72]} material={enamelMat}>
                  <capsuleGeometry args={[0.052, 0.28, 6, 14]} />
                </mesh>
                <mesh position={[s * 0.22, -0.38, 0.35]} material={enamelMat}>
                  <sphereGeometry args={[0.068, 20, 16]} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Upside-down Dental Waiting Room Magazine (Hero only) */}
          <group ref={magazine} visible={false}>
            <RoundedBox args={[0.36, 0.46, 0.028]} radius={0.015} smoothness={4}>
              <meshStandardMaterial color="#e0624d" roughness={0.55} />
            </RoundedBox>
            <mesh position={[0, 0.08, 0.018]}>
              <boxGeometry args={[0.26, 0.1, 0.005]} />
              <meshStandardMaterial color="#fff2e0" />
            </mesh>
            <mesh position={[0, -0.08, 0.018]}>
              <boxGeometry args={[0.22, 0.06, 0.005]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.65} />
            </mesh>
          </group>

          {/* Precision Dental Mirror (Section 4: Booking only) */}
          <group ref={mirror} visible={false}>
            <mesh position={[0, -0.36, 0]}>
              <cylinderGeometry args={[0.024, 0.024, 0.74, 16]} />
              <meshStandardMaterial color="#d4d9de" metalness={0.92} roughness={0.2} />
            </mesh>
            <mesh material={goldMat}>
              <torusGeometry args={[0.28, 0.038, 16, 48]} />
            </mesh>
            <mesh position={[0, 0, -0.005]} material={mirrorGlassMat}>
              <circleGeometry args={[0.28, 48]} />
            </mesh>
          </group>
        </group>

        {/* Ambient floating celebration sparkles */}
        <group ref={sparkles} visible={false}>
          <Sparkles count={52} scale={[3.2, 3.6, 1.8]} size={6.5} speed={0.45} color="#ffe29d" />
        </group>
      </group>
    </>
  );
}
