// Scene component — vanilla Three.js (no R3F)
import { useRef, useEffect, useCallback, useState } from 'react'
import * as THREE from 'three'
import {
  vertexShader, fragmentShader,
  innerVertexShader, innerFragmentShader,
} from './Orb/orbShaders'
import { signalVisual } from '../lib/signal-visuals.ts'

const CORE_COUNT = 80000
const SHOOTER_COUNT = 800
const INNER_COUNT = 30000
const DEFAULT_PRESET = signalVisual('insufficient_data')

function generateLayer(count, radiusMin, radiusMax, shooterStart) {
  const positions = new Float32Array(count * 3)
  const randoms = new Float32Array(count)
  const originals = new Float32Array(count * 3)
  const shootPhases = shooterStart != null ? new Float32Array(count) : null

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = radiusMin + Math.random() * (radiusMax - radiusMin)
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    originals[i * 3] = x
    originals[i * 3 + 1] = y
    originals[i * 3 + 2] = z
    randoms[i] = Math.random()
    if (shootPhases) shootPhases[i] = i < shooterStart ? -1.0 : Math.random()
  }
  return { positions, randoms, originals, shootPhases }
}

function normalizePreset(emotion) {
  if (typeof emotion === 'string') return signalVisual(emotion)
  const candidate = emotion && Array.isArray(emotion.color1) ? emotion : null
  if (candidate) return { ...DEFAULT_PRESET, ...candidate }
  return DEFAULT_PRESET
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function disposeScene(scene) {
  scene?.traverse((object) => {
    object.geometry?.dispose()
    if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
    else object.material?.dispose()
  })
}

export default function Scene({ visual, emotion, style, reducedMotion }) {
  const containerRef = useRef(null)
  const presetRef = useRef(normalizePreset(visual ?? emotion))
  const staticRenderRef = useRef(null)
  const [systemReduced, setSystemReduced] = useState(prefersReducedMotion)
  const [webglFailed, setWebglFailed] = useState(false)
  const isReduced = reducedMotion ?? systemReduced

  useEffect(() => {
    presetRef.current = normalizePreset(visual ?? emotion)
  }, [visual, emotion])

  useEffect(() => {
    if (reducedMotion != null || typeof window === 'undefined') return undefined
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setSystemReduced(media.matches)
    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [reducedMotion])

  const init = useCallback((reduced) => {
    const container = containerRef.current
    if (!container) return () => {}

    let renderer
    let scene
    let camera
    let group
    let outerUniforms
    let innerUniforms
    let raf = null
    let lastTime = performance.now()
    let hidden = document.hidden
    let stopped = false

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(35, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 100)
      camera.position.set(0, 0, 4.7)
      scene.add(new THREE.AmbientLight(0xffffff, 0.2))
      const pointLight = new THREE.PointLight(0xffffff, 0.5)
      pointLight.position.set(5, 5, 5)
      scene.add(pointLight)
      group = new THREE.Group()
      scene.add(group)

      const compact = reduced || Math.min(container.clientWidth, container.clientHeight) < 360
      const coreCount = compact ? Math.round(CORE_COUNT * 0.2) : CORE_COUNT
      const shooterCount = reduced ? 0 : compact ? Math.round(SHOOTER_COUNT * 0.2) : SHOOTER_COUNT
      const innerCount = compact ? Math.round(INNER_COUNT * 0.2) : INNER_COUNT
      const em = presetRef.current

      const innerData = generateLayer(innerCount, 0.55, 0.7)
      const innerGeo = new THREE.BufferGeometry()
      innerGeo.setAttribute('position', new THREE.BufferAttribute(innerData.positions, 3))
      innerGeo.setAttribute('aRandom', new THREE.BufferAttribute(innerData.randoms, 1))
      innerGeo.setAttribute('aOriginal', new THREE.BufferAttribute(innerData.originals, 3))
      innerUniforms = {
        uTime: { value: 0 }, uSpeed: { value: em.speed },
        uColor1: { value: new THREE.Vector3(...em.color1) },
        uColor2: { value: new THREE.Vector3(...em.color2) },
        uAxisScale: { value: new THREE.Vector3(...em.axisScale) },
      }
      const innerMat = new THREE.ShaderMaterial({ vertexShader: innerVertexShader, fragmentShader: innerFragmentShader, uniforms: innerUniforms, transparent: true, depthWrite: false })
      group.add(new THREE.Points(innerGeo, innerMat))

      const outerData = generateLayer(coreCount + shooterCount, 0.95, 1.05, coreCount)
      const outerGeo = new THREE.BufferGeometry()
      outerGeo.setAttribute('position', new THREE.BufferAttribute(outerData.positions, 3))
      outerGeo.setAttribute('aRandom', new THREE.BufferAttribute(outerData.randoms, 1))
      outerGeo.setAttribute('aOriginal', new THREE.BufferAttribute(outerData.originals, 3))
      outerGeo.setAttribute('aShootPhase', new THREE.BufferAttribute(outerData.shootPhases, 1))
      outerUniforms = {
        uTime: { value: 0 }, uDistortion: { value: em.distortion }, uSpeed: { value: em.speed },
        uNoiseScale: { value: em.noiseScale },
        uFacetStrength: { value: em.facetStrength },
        uFacetDetail: { value: em.facetDetail },
        uAxisScale: { value: new THREE.Vector3(...em.axisScale) },
        uColor1: { value: new THREE.Vector3(...em.color1) },
        uColor2: { value: new THREE.Vector3(...em.color2) },
      }
      const outerMat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: outerUniforms, transparent: true, depthWrite: false })
      group.add(new THREE.Points(outerGeo, outerMat))
    } catch {
      renderer?.dispose()
      renderer?.domElement.remove()
      setWebglFailed(true)
      return () => {}
    }

    const render = (delta, elapsed) => {
      const em = presetRef.current
      const lerp = 1 - Math.exp(-2 * Math.min(delta, 0.1))
      const amount = reduced ? 1 : lerp
      for (const uniforms of [outerUniforms, innerUniforms]) {
        uniforms.uTime.value += reduced ? 0 : delta
        uniforms.uSpeed.value += (em.speed - uniforms.uSpeed.value) * amount
        uniforms.uColor1.value.lerp(new THREE.Vector3(...em.color1), amount)
        uniforms.uColor2.value.lerp(new THREE.Vector3(...em.color2), amount)
        uniforms.uAxisScale.value.lerp(new THREE.Vector3(...em.axisScale), amount)
      }
      outerUniforms.uDistortion.value += (em.distortion - outerUniforms.uDistortion.value) * amount
      outerUniforms.uNoiseScale.value += (em.noiseScale - outerUniforms.uNoiseScale.value) * amount
      outerUniforms.uFacetStrength.value += (em.facetStrength - outerUniforms.uFacetStrength.value) * amount
      outerUniforms.uFacetDetail.value += (em.facetDetail - outerUniforms.uFacetDetail.value) * amount
      if (!reduced) {
        group.position.y = Math.sin(elapsed * 0.6) * 0.06 + Math.sin(elapsed * 1.3) * 0.02
        group.position.x = Math.sin(elapsed * 0.4) * 0.03
        group.rotation.y += delta * 0.15
        group.rotation.x = Math.sin(elapsed * 0.3) * 0.1
      }
      renderer.render(scene, camera)
    }

    const tick = (now) => {
      if (hidden || stopped) { raf = null; return }
      const delta = Math.min(Math.max((now - lastTime) / 1000, 0), 0.1)
      lastTime = now
      render(delta, now / 1000)
      raf = requestAnimationFrame(tick)
    }
    const onVisibilityChange = () => {
      hidden = document.hidden
      lastTime = performance.now()
      if (!hidden && !reduced && raf == null) raf = requestAnimationFrame(tick)
    }
    const onResize = () => {
      const width = container.clientWidth
      const height = Math.max(container.clientHeight, 1)
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      if (reduced) render(0, 0)
    }
    const onContextLost = (event) => {
      event.preventDefault()
      stopped = true
      if (raf != null) cancelAnimationFrame(raf)
      raf = null
      disposeScene(scene)
      renderer.dispose()
      renderer.domElement.remove()
      setWebglFailed(true)
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('resize', onResize)
    renderer.domElement.addEventListener('webglcontextlost', onContextLost)
    staticRenderRef.current = reduced ? () => render(0, 0) : null
    if (reduced) render(0, 0)
    else raf = requestAnimationFrame(tick)

    return () => {
      stopped = true
      if (raf != null) cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
      staticRenderRef.current = null
      disposeScene(scene)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  useEffect(() => {
    setWebglFailed(false)
    return init(isReduced)
  }, [init, isReduced])

  useEffect(() => {
    if (isReduced && !webglFailed) staticRenderRef.current?.()
  }, [visual, emotion, isReduced, webglFailed])

  return (
    <div ref={containerRef} className={webglFailed ? 'lumin-orb-fallback' : undefined} style={{ ...style, overflow: 'hidden' }} aria-label="Signal visualization" role="img" />
  )
}
