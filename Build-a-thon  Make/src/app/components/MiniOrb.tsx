/** A small vanilla-Three.js particle orb using the incumbent orb shaders. */
import { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import {
  vertexShader as outerVS,
  fragmentShader as outerFS,
  innerVertexShader as innerVS,
  innerFragmentShader as innerFS,
} from "../../components/Orb/orbShaders";

const MINI_CORE = 12000;
const MINI_SHOOTER = 150;
const MINI_INNER = 6000;

const miniOuterVS = outerVS
  .replace("float size = 0.025 + aRandom * 0.04;", "float size = 0.028 + aRandom * 0.008;")
  .replace("if (aShootPhase >= 0.0) size *= 1.5;", "if (aShootPhase >= 0.0) size *= 1.3;")
  .replace("vColor += (aRandom - 0.5) * 0.04;", "");
const miniInnerVS = innerVS
  .replace("float size = 0.02 + aRandom * 0.03;", "float size = 0.024 + aRandom * 0.006;")
  .replace("vColor += (aRandom - 0.5) * 0.03;", "");

export interface MiniOrbPreset {
  color1: [number, number, number];
  color2: [number, number, number];
  distortion: number;
  speed: number;
  noiseScale: number;
}

interface MiniOrbProps {
  preset: MiniOrbPreset;
  size?: number;
  reducedMotion?: boolean;
}

function generateLayer(count: number, radiusMin: number, radiusMax: number, shooterStart?: number) {
  const positions = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const originals = new Float32Array(count * 3);
  const shootPhases = shooterStart != null ? new Float32Array(count) : null;
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radiusMin + Math.random() * (radiusMax - radiusMin);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    positions[i * 3] = originals[i * 3] = x;
    positions[i * 3 + 1] = originals[i * 3 + 1] = y;
    positions[i * 3 + 2] = originals[i * 3 + 2] = z;
    randoms[i] = Math.random();
    if (shootPhases) shootPhases[i] = i < (shooterStart ?? 0) ? -1 : Math.random();
  }
  return { positions, randoms, originals, shootPhases };
}

function disposeScene(scene: THREE.Scene | null) {
  scene?.traverse((object) => {
    object.geometry?.dispose();
    if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
    else object.material?.dispose();
  });
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export default function MiniOrb({ preset, size = 51, reducedMotion }: MiniOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const staticRenderRef = useRef<(() => void) | null>(null);
  const [systemReduced, setSystemReduced] = useState(prefersReducedMotion);
  const [webglFailed, setWebglFailed] = useState(false);
  const isReduced = reducedMotion ?? systemReduced;

  useEffect(() => {
    if (reducedMotion != null || typeof window === "undefined") return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setSystemReduced(media.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, [reducedMotion]);

  const init = useCallback((reduced: boolean) => {
    const el = containerRef.current;
    if (!el) return () => {};
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let group: THREE.Group;
    let outerU: any;
    let innerU: any;
    let raf: number | null = null;
    let lastTime = performance.now();
    let hidden = document.hidden;
    let stopped = false;

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(size, size);
      el.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 4.7);
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      group = new THREE.Group();
      scene.add(group);
      const compact = reduced || size < 64;
      const scale = compact ? 0.35 : 1;
      const innerData = generateLayer(Math.round(MINI_INNER * scale), 0.55, 0.7);
      const innerGeo = new THREE.BufferGeometry();
      innerGeo.setAttribute("position", new THREE.BufferAttribute(innerData.positions, 3));
      innerGeo.setAttribute("aRandom", new THREE.BufferAttribute(innerData.randoms, 1));
      innerGeo.setAttribute("aOriginal", new THREE.BufferAttribute(innerData.originals, 3));
      innerU = { uTime: { value: 0 }, uSpeed: { value: preset.speed }, uColor1: { value: new THREE.Vector3(...preset.color1) }, uColor2: { value: new THREE.Vector3(...preset.color2) } };
      group.add(new THREE.Points(innerGeo, new THREE.ShaderMaterial({ vertexShader: miniInnerVS, fragmentShader: innerFS, uniforms: innerU, transparent: true, depthWrite: false })));

      const coreCount = Math.round(MINI_CORE * scale);
      const shooterCount = reduced ? 0 : Math.round(MINI_SHOOTER * scale);
      const outerData = generateLayer(coreCount + shooterCount, 0.95, 1.05, coreCount);
      const outerGeo = new THREE.BufferGeometry();
      outerGeo.setAttribute("position", new THREE.BufferAttribute(outerData.positions, 3));
      outerGeo.setAttribute("aRandom", new THREE.BufferAttribute(outerData.randoms, 1));
      outerGeo.setAttribute("aOriginal", new THREE.BufferAttribute(outerData.originals, 3));
      outerGeo.setAttribute("aShootPhase", new THREE.BufferAttribute(outerData.shootPhases!, 1));
      outerU = { uTime: { value: 0 }, uDistortion: { value: preset.distortion }, uSpeed: { value: preset.speed }, uNoiseScale: { value: preset.noiseScale }, uColor1: { value: new THREE.Vector3(...preset.color1) }, uColor2: { value: new THREE.Vector3(...preset.color2) } };
      group.add(new THREE.Points(outerGeo, new THREE.ShaderMaterial({ vertexShader: miniOuterVS, fragmentShader: outerFS, uniforms: outerU, transparent: true, depthWrite: false })));
    } catch {
      rendererRef.current?.dispose();
      rendererRef.current?.domElement.remove();
      setWebglFailed(true);
      return () => {};
    }

    const render = (delta: number, elapsed: number) => {
      const lerp = 1 - Math.exp(-2 * Math.min(delta, 0.1));
      const amount = reduced ? 1 : lerp;
      for (const uniforms of [outerU, innerU]) uniforms.uTime.value += reduced ? 0 : delta;
      outerU.uSpeed.value += (preset.speed - outerU.uSpeed.value) * amount;
      outerU.uDistortion.value += (preset.distortion - outerU.uDistortion.value) * amount;
      outerU.uNoiseScale.value += (preset.noiseScale - outerU.uNoiseScale.value) * amount;
      if (!reduced) {
        group.position.y = Math.sin(elapsed * 0.6) * 0.04;
        group.rotation.y += delta * 0.2;
        group.rotation.x = Math.sin(elapsed * 0.3) * 0.08;
      }
      renderer.render(scene, camera);
    };
    const tick = (now: number) => {
      if (hidden || stopped) { raf = null; return; }
      const delta = Math.min(Math.max((now - lastTime) / 1000, 0), 0.1);
      lastTime = now;
      render(delta, now / 1000);
      raf = requestAnimationFrame(tick);
    };
    const onVisibilityChange = () => {
      hidden = document.hidden;
      lastTime = performance.now();
      if (!hidden && !reduced && raf == null) raf = requestAnimationFrame(tick);
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      stopped = true;
      if (raf != null) cancelAnimationFrame(raf);
      raf = null;
      disposeScene(scene);
      renderer.dispose();
      renderer.domElement.remove();
      setWebglFailed(true);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    staticRenderRef.current = reduced ? () => render(0, 0) : null;
    if (reduced) render(0, 0);
    else raf = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      if (raf != null) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      staticRenderRef.current = null;
      disposeScene(scene);
      renderer.dispose();
      renderer.domElement.remove();
      rendererRef.current = null;
    };
  }, [preset, size]);

  useEffect(() => {
    setWebglFailed(false);
    return init(isReduced);
  }, [init, isReduced]);

  useEffect(() => {
    if (isReduced && !webglFailed) staticRenderRef.current?.();
  }, [preset, isReduced, webglFailed]);

  return (
    <div ref={containerRef} className={webglFailed ? "lumin-orb-fallback" : undefined} role="img" aria-label="Sample signal orb" style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }} />
  );
}
