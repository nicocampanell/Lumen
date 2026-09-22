// Orb shaders
export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDistortion;
  uniform float uSpeed;
  uniform float uNoiseScale;
  uniform float uFacetStrength;
  uniform float uFacetDetail;
  uniform vec3 uAxisScale;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  attribute float aRandom;
  attribute float aShootPhase;
  attribute vec3 aOriginal;

  varying vec3 vColor;
  varying float vAlpha;

  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float t = uTime * uSpeed;
    vec3 pos = aOriginal * uAxisScale;
    vec3 dir = normalize(pos);

    // Blend two low-poly shells so deviation magnitude reads as planar facets,
    // while metric coverage changes their complexity without swapping presets.
    float octaRadius = 1.3 / max(abs(dir.x) + abs(dir.y) + abs(dir.z), 0.001);
    float cubeRadius = 0.82 / max(max(abs(dir.x), abs(dir.y)), abs(dir.z));
    float facetedRadius = mix(octaRadius, cubeRadius, clamp(uFacetDetail, 0.0, 1.0));
    pos *= mix(1.0, facetedRadius, clamp(uFacetStrength, 0.0, 0.55));
    dir = normalize(pos);

    // Noise displacement for the orb shape
    float noise1 = snoise(dir * uNoiseScale + t * 0.5);
    float noise2 = snoise(dir * uNoiseScale * 2.0 + t * 0.3) * 0.5;
    float noise3 = snoise(dir * uNoiseScale * 4.0 + t * 0.7) * 0.25;
    float displacement = (noise1 + noise2 + noise3) * uDistortion;
    // Scale displacement inversely with distortion to keep orb size consistent
    // but preserve the spiky/star shape at high distortion
    float scale = 0.15 / max(uDistortion, 0.15);
    displacement *= scale;

    vec3 displaced = pos + dir * displacement;

    // === CURL-LIKE SWIRL — particles flow in different directions ===
    // Use curl noise idea: take cross product of noise gradient for divergence-free flow
    vec3 tangent1 = normalize(cross(dir, vec3(0.0, 1.0, 0.0)));
    vec3 tangent2 = normalize(cross(dir, tangent1));

    if (aShootPhase < 0.0) {
      float driftT = uTime * 0.2;
      // Two noise fields at different scales create swirling flow
      float flow1 = snoise(dir * 3.0 + driftT * 0.8 + aRandom * 6.0);
      float flow2 = snoise(dir * 3.0 + driftT * 0.8 + aRandom * 6.0 + vec3(7.0, 3.0, 11.0));
      // Third layer at different scale for counter-swirls
      float flow3 = snoise(dir * 5.0 - driftT * 0.5 + aRandom * 4.0);
      float flow4 = snoise(dir * 5.0 - driftT * 0.5 + aRandom * 4.0 + vec3(3.0, 9.0, 5.0));

      float swirl = 0.1;
      displaced += tangent1 * (flow1 * 0.7 + flow3 * 0.3) * swirl;
      displaced += tangent2 * (flow2 * 0.7 + flow4 * 0.3) * swirl;
    }

    // === SHOOTING PARTICLES — close to surface ===
    float shootAlpha = 1.0;
    if (aShootPhase >= 0.0) {
      float cycleSpeed = 0.06 + aRandom * 0.08;
      float cycle = mod(uTime * cycleSpeed + aShootPhase, 1.0);

      float arc = sin(cycle * 3.14159);

      // Much closer — just barely lifts off
      float shootDist = arc * (0.1 + aRandom * 0.2);
      displaced += dir * shootDist;

      // Drift around as it lifts
      float driftAngle = aShootPhase * 6.28 + cycle * 3.14159 * (0.5 + aRandom);
      float driftAmount = arc * (0.15 + aRandom * 0.2);
      displaced += tangent1 * cos(driftAngle) * driftAmount;
      displaced += tangent2 * sin(driftAngle) * driftAmount;

      shootAlpha = 1.0 - arc * 0.7;
    }

    // === FLOWING GRADIENT ===
    // Time-driven gradient that moves across the orb
    float gradientFlow = snoise(dir * 2.0 + t * 0.25);
    float gradientFlow2 = snoise(dir * 1.0 + vec3(5.0, 3.0, 7.0) + t * 0.15);
    float gradientPos = gradientFlow * 0.35 + gradientFlow2 * 0.25 + displacement * 0.8 + aRandom * 0.15 + 0.5;
    gradientPos = clamp(gradientPos, 0.0, 1.0);

    // 5 shade stops
    vec3 darkest = uColor2 * 0.4;
    vec3 dark = uColor2;
    vec3 mid = mix(uColor2, uColor1, 0.5);
    vec3 bright = uColor1;
    vec3 lightest = uColor1 * 1.3 + 0.15;

    if (gradientPos < 0.2) {
      vColor = mix(darkest, dark, gradientPos / 0.2);
    } else if (gradientPos < 0.4) {
      vColor = mix(dark, mid, (gradientPos - 0.2) / 0.2);
    } else if (gradientPos < 0.65) {
      vColor = mix(mid, bright, (gradientPos - 0.4) / 0.25);
    } else {
      vColor = mix(bright, lightest, (gradientPos - 0.65) / 0.35);
    }

    vColor += (aRandom - 0.5) * 0.04;

    vAlpha = (0.85 + aRandom * 0.15) * shootAlpha;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);

    // Noise-dot sized, shooters slightly bigger
    float size = 0.025 + aRandom * 0.04;
    if (aShootPhase >= 0.0) size *= 1.5;
    gl_PointSize = size * (200.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
  }
`

export const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float strength = 1.0 - smoothstep(0.3, 0.5, d);

    gl_FragColor = vec4(vColor, vAlpha * strength);
  }
`

// === INNER ORB LAYER ===
export const innerVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uAxisScale;

  attribute float aRandom;
  attribute vec3 aOriginal;

  varying vec3 vColor;
  varying float vAlpha;

  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float t = uTime * uSpeed;
    vec3 pos = aOriginal * uAxisScale;
    vec3 dir = normalize(pos);

    // Gentle displacement
    float n = snoise(dir * 1.5 + t * 0.3) * 0.08;
    vec3 displaced = pos + dir * n;

    // Swirling flow — different directions, counter-rotating
    vec3 tan1 = normalize(cross(dir, vec3(0.0, 1.0, 0.0)));
    vec3 tan2 = normalize(cross(dir, tan1));
    float driftT = uTime * 0.25;
    // Large slow swirls
    float s1 = snoise(dir * 2.0 + driftT + aRandom * 8.0);
    float s2 = snoise(dir * 2.0 + driftT + aRandom * 8.0 + vec3(4.0, 6.0, 2.0));
    // Smaller faster counter-swirls
    float s3 = snoise(dir * 4.0 - driftT * 0.7 + aRandom * 5.0);
    float s4 = snoise(dir * 4.0 - driftT * 0.7 + aRandom * 5.0 + vec3(9.0, 2.0, 7.0));

    float swirl = 0.12;
    displaced += tan1 * (s1 * 0.6 + s3 * 0.4) * swirl;
    displaced += tan2 * (s2 * 0.6 + s4 * 0.4) * swirl;

    // Inner layer — same gradient as outer
    float gradientFlow = snoise(dir * 2.0 + t * 0.25);
    float gradientFlow2 = snoise(dir * 1.0 + vec3(5.0, 3.0, 7.0) + t * 0.15);
    float gp = gradientFlow * 0.35 + gradientFlow2 * 0.25 + aRandom * 0.15 + 0.5;
    gp = clamp(gp, 0.0, 1.0);

    vec3 dark = uColor2;
    vec3 mid = mix(uColor2, uColor1, 0.5);
    vec3 bright = uColor1;
    vec3 lightest = uColor1 * 1.2 + 0.1;

    if (gp < 0.3) {
      vColor = mix(dark, mid, gp / 0.3);
    } else if (gp < 0.6) {
      vColor = mix(mid, bright, (gp - 0.3) / 0.3);
    } else {
      vColor = mix(bright, lightest, (gp - 0.6) / 0.4);
    }

    vColor += (aRandom - 0.5) * 0.03;
    vAlpha = 0.6 + aRandom * 0.15;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    float size = 0.02 + aRandom * 0.03;
    gl_PointSize = size * (200.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
  }
`

export const innerFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float strength = 1.0 - smoothstep(0.3, 0.5, d);

    gl_FragColor = vec4(vColor, vAlpha * strength);
  }
`
