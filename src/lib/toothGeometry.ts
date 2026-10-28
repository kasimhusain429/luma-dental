import * as THREE from 'three';

/**
 * Procedural generation for an anatomically inspired, stylized 3D molar.
 * Creates an organic crown with 4 distinct cusps, central fossa/pit,
 * developmental grooves, cervical waist constriction, and 2 curved tapered roots.
 */

/**
 * Superellipse helper: creates a smooth quadrangular cross-section (rounded rectangle)
 * typical of human molar teeth, without hard polygon seams.
 */
function superellipse(theta: number, a: number, b: number, n: number = 3.2): { x: number; z: number } {
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const sgnCos = Math.sign(cosT);
  const sgnSin = Math.sign(sinT);
  const x = a * sgnCos * Math.pow(Math.abs(cosT), 2 / n);
  const z = b * sgnSin * Math.pow(Math.abs(sinT), 2 / n);
  return { x, z };
}

/**
 * Generates the sculpted crown of the molar tooth.
 * Combines a superelliptical lateral wall with an occlusal table featuring
 * 4 rounded cusps (mesiobuccal, distobuccal, mesiolingual, distolingual)
 * and a central fissure depression.
 */
export function createMolarCrownGeometry(): THREE.BufferGeometry {
  const radialSegments = 56;
  const heightSegments = 32;
  const capRings = 16;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const aBase = 0.44; // Half-width (X)
  const bBase = 0.38; // Half-depth (Z)
  const yNeck = -0.16; // Cervical waist bottom
  const yRim = 0.34;   // Occlusal rim height
  const height = yRim - yNeck;

  // 1. LATERAL BODY OF THE CROWN
  for (let j = 0; j <= heightSegments; j++) {
    const v = j / heightSegments;
    const y = yNeck + v * height;

    // Organic waist & height-of-contour bulge:
    // Narrow at cervical neck (v=0), bulging at middle (v=0.45), slight inward bevel at rim (v=1)
    const contour = 0.88 + 0.18 * Math.sin(v * Math.PI * 0.95);

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const theta = u * Math.PI * 2;
      const { x, z } = superellipse(theta, aBase * contour, bBase * contour, 3.0);

      // Subtle lateral developmental grooves
      const grooveIndent = 0.012 * Math.cos(4 * theta) * Math.sin(v * Math.PI);
      const xFinal = x * (1 - grooveIndent);
      const zFinal = z * (1 - grooveIndent);

      positions.push(xFinal, y, zFinal);
      uvs.push(u, v * 0.6);
    }
  }

  // Indices for lateral body
  const ringStride = radialSegments + 1;
  for (let j = 0; j < heightSegments; j++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = j * ringStride + i;
      const b = (j + 1) * ringStride + i;
      const c = (j + 1) * ringStride + (i + 1);
      const d = j * ringStride + (i + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  // 2. OCCLUSAL TOP TABLE (4 Cusps + Central Pit)
  // We grid inward from rim (ring 0) to central pit (ring capRings)
  const bodyVertexOffset = (heightSegments + 1) * ringStride;

  // The 4 cusps: (+X, +Z), (-X, +Z), (-X, -Z), (+X, -Z)
  const cusps = [
    { x: 0.22, z: 0.17, height: 0.18 },   // Distobuccal
    { x: -0.22, z: 0.17, height: 0.20 },  // Mesiobuccal (slightly higher)
    { x: -0.22, z: -0.17, height: 0.19 }, // Mesiolingual
    { x: 0.22, z: -0.17, height: 0.17 },  // Distolingual
  ];

  for (let r = 0; r <= capRings; r++) {
    const frac = r / capRings; // 0 at rim, 1 at center
    const radiusFrac = 1 - frac; // 1 at rim, 0 at center

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const theta = u * Math.PI * 2;
      const { x: xRim, z: zRim } = superellipse(theta, aBase * 0.98, bBase * 0.98, 3.0);

      const x = xRim * radiusFrac;
      const z = zRim * radiusFrac;

      // Base height sloping slightly down toward center
      let y = yRim + 0.05 * Math.sin(radiusFrac * Math.PI * 0.5) - 0.04 * frac;

      // Add the 4 cusp elevations
      for (const cusp of cusps) {
        const dx = x - cusp.x;
        const dz = z - cusp.z;
        const distSq = dx * dx + dz * dz;
        const cuspBump = cusp.height * Math.exp(-distSq / 0.038);
        y += cuspBump;
      }

      // Central fissure depression at the very center
      const distFromCenter = Math.sqrt(x * x + z * z);
      const centralPit = 0.045 * Math.exp(-(distFromCenter * distFromCenter) / 0.02);
      y -= centralPit;

      positions.push(x, y, z);
      uvs.push(0.5 + (x / (aBase * 2.2)), 0.5 + (z / (bBase * 2.2)));
    }
  }

  // Connect rim of lateral body to outer ring of cap
  const lastBodyRing = heightSegments * ringStride;
  const firstCapRing = bodyVertexOffset;
  for (let i = 0; i < radialSegments; i++) {
    const a = lastBodyRing + i;
    const b = firstCapRing + i;
    const c = firstCapRing + (i + 1);
    const d = lastBodyRing + (i + 1);
    indices.push(a, b, d);
    indices.push(b, c, d);
  }

  // Indices for concentric rings of the occlusal cap
  for (let r = 0; r < capRings; r++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = bodyVertexOffset + r * ringStride + i;
      const b = bodyVertexOffset + (r + 1) * ringStride + i;
      const c = bodyVertexOffset + (r + 1) * ringStride + (i + 1);
      const d = bodyVertexOffset + r * ringStride + (i + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Generates an anatomically curved and tapered root for the molar.
 * Features a natural distal curvature sweep, tapering down to a smooth rounded apex.
 */
export function createMolarRootGeometry(side: 'left' | 'right'): THREE.BufferGeometry {
  const sign = side === 'left' ? -1 : 1;
  const radialSegments = 28;
  const heightSegments = 34;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // Spline control points defining the root's organic curvature
  const points = [
    new THREE.Vector3(sign * 0.20, -0.14, 0.0),
    new THREE.Vector3(sign * 0.24, -0.32, 0.01),
    new THREE.Vector3(sign * 0.26, -0.56, 0.02),
    new THREE.Vector3(sign * 0.23, -0.80, 0.03),
    new THREE.Vector3(sign * 0.19, -0.98, 0.035),
    new THREE.Vector3(sign * 0.17, -1.04, 0.04), // Apex tip
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  const samplePoints = curve.getPoints(heightSegments);

  // Radii along root length (cervical trunk to apex)
  const getRadius = (t: number) => {
    if (t < 0.1) return 0.17 - t * 0.15;
    if (t < 0.85) return 0.155 * (1 - (t - 0.1) * 0.72);
    // Hemispherical rounded apex at bottom
    const apexT = (t - 0.85) / 0.15;
    return Math.max(0.005, 0.055 * Math.sqrt(Math.max(0, 1 - apexT * apexT)));
  };

  const ringStride = radialSegments + 1;

  for (let j = 0; j <= heightSegments; j++) {
    const t = j / heightSegments;
    const center = samplePoints[j];
    const r = getRadius(t);

    // Get tangent for proper orthogonal ring orientation
    const tangent = curve.getTangent(t);
    const normal = new THREE.Vector3(0, 0, 1).cross(tangent).normalize();
    if (normal.lengthSq() < 0.01) normal.set(1, 0, 0);
    const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const angle = u * Math.PI * 2;

      // Slight oval cross section (wider bucco-lingually)
      const rx = r * 0.92;
      const rz = r * 1.08;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const pos = new THREE.Vector3()
        .copy(center)
        .addScaledVector(normal, cosA * rx)
        .addScaledVector(binormal, sinA * rz);

      positions.push(pos.x, pos.y, pos.z);
      uvs.push(u, t);
    }
  }

  for (let j = 0; j < heightSegments; j++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = j * ringStride + i;
      const b = (j + 1) * ringStride + i;
      const c = (j + 1) * ringStride + (i + 1);
      const d = j * ringStride + (i + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Bifurcation saddle arch geometry connecting the two roots underneath the crown
 */
export function createBifurcationSaddleGeometry(): THREE.BufferGeometry {
  const segmentsX = 20;
  const segmentsZ = 16;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const width = 0.44;
  const depth = 0.36;

  for (let j = 0; j <= segmentsZ; j++) {
    const vz = j / segmentsZ;
    const z = (vz - 0.5) * depth;

    for (let i = 0; i <= segmentsX; i++) {
      const vx = i / segmentsX;
      const x = (vx - 0.5) * width;

      // Inverted arch between -0.22 and +0.22
      const archFactor = 1 - Math.pow(x / (width * 0.5), 2);
      const y = -0.16 - Math.max(0, archFactor * 0.12) * (1 - Math.pow(z / (depth * 0.5), 2));

      positions.push(x, y, z);
      uvs.push(vx, vz);
    }
  }

  const stride = segmentsX + 1;
  for (let j = 0; j < segmentsZ; j++) {
    for (let i = 0; i < segmentsX; i++) {
      const a = j * stride + i;
      const b = (j + 1) * stride + i;
      const c = (j + 1) * stride + (i + 1);
      const d = j * stride + (i + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

