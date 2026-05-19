'use client'

import { useRef, useMemo, useState, useEffect, useSyncExternalStore } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════

const GLOBE_RADIUS = 1.5
const DOT_COUNT = 2000
const NODE_COUNT = 18
const ARC_COUNT = 8
const PARTICLE_COUNT = 80

const EMERALD = '#10b981'
const EMERALD_DIM = '#065f46'
const AMBER = '#f59e0b'

// ═══════════════════════════════════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════════════════════════════════

/** Generate evenly-distributed points on a sphere using Fibonacci spiral */
function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return positions
}

/** Random point on a sphere surface */
function randomSpherePoint(radius: number): THREE.Vector3 {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  )
}

/** Create an arc curve elevated above the globe surface between two points */
function createArcCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  elevation = 0.35
): THREE.QuadraticBezierCurve3 {
  const mid = start.clone().add(end).multiplyScalar(0.5)
  const dist = start.distanceTo(end)
  mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * elevation)
  return new THREE.QuadraticBezierCurve3(start, mid, end)
}

// ═══════════════════════════════════════════════════════════════════════
// 3D Scene Components
// ═══════════════════════════════════════════════════════════════════════

/** Dot-matrix globe surface – the primary visual of the globe */
function GlobeDots() {
  const geometry = useMemo(() => {
    const positions = fibonacciSphere(DOT_COUNT, GLOBE_RADIUS)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={EMERALD}
        size={0.015}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/** Subtle wireframe underneath the dots for structural depth */
function GlobeWireframe() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 24, 24]} />
      <meshBasicMaterial
        color={EMERALD}
        wireframe
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/** Highlighted active transaction nodes – amber pulsing dots */
function ActiveNodes() {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const p = randomSpherePoint(GLOBE_RADIUS * 1.01)
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.03
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={AMBER}
        size={0.05}
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Arc System ──────────────────────────────────────────────────────

interface ArcData {
  curve: THREE.QuadraticBezierCurve3
  linePoints: [number, number, number][]
  speed: number
  offset: number
}

/** Single arc with a traveling pulse sphere that represents data flow */
function ArcWithPulse({ arc }: { arc: ArcData }) {
  const pulseRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() * arc.speed) + arc.offset) % 1
    const point = arc.curve.getPoint(t)
    if (pulseRef.current) pulseRef.current.position.copy(point)
    if (glowRef.current) glowRef.current.position.copy(point)
  })

  return (
    <>
      <Line
        points={arc.linePoints}
        color={EMERALD}
        lineWidth={1}
        transparent
        opacity={0.25}
      />
      {/* Bright core of the pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial
          color={AMBER}
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Soft glow around the pulse */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshBasicMaterial
          color={AMBER}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}

/** Group of all data-flow arcs */
function ArcsGroup() {
  const arcs = useMemo<ArcData[]>(() => {
    const result: ArcData[] = []
    let attempts = 0
    while (result.length < ARC_COUNT && attempts < 100) {
      const start = randomSpherePoint(GLOBE_RADIUS * 1.01)
      const end = randomSpherePoint(GLOBE_RADIUS * 1.01)
      attempts++
      if (start.distanceTo(end) < GLOBE_RADIUS * 0.8) continue
      const curve = createArcCurve(start, end)
      const pts = curve.getPoints(50)
      const linePoints: [number, number, number][] = pts.map(
        (p) => [p.x, p.y, p.z] as [number, number, number]
      )
      result.push({
        curve,
        linePoints,
        speed: 0.12 + Math.random() * 0.15,
        offset: Math.random(),
      })
    }
    return result
  }, [])

  return (
    <>
      {arcs.map((arc, i) => (
        <ArcWithPulse key={i} arc={arc} />
      ))}
    </>
  )
}

// ─── Atmosphere & Glow ───────────────────────────────────────────────

/** Atmospheric glow around the globe – outer haze + inner tint */
function GlobeGlow() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.8) * 0.02
    if (outerRef.current) outerRef.current.scale.setScalar(pulse)
    if (innerRef.current) innerRef.current.scale.setScalar(pulse)
  })

  return (
    <>
      {/* Outer atmospheric haze */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 1.18, 32, 32]} />
        <meshBasicMaterial
          color={EMERALD}
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Inner atmosphere tint */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 1.03, 32, 32]} />
        <meshBasicMaterial
          color={EMERALD_DIM}
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  )
}

/** Orbital rings circling the globe at various tilts */
function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null)

  const rings = useMemo(() => {
    const configs: { radius: number; rotation: [number, number, number]; opacity: number }[] = [
      { radius: GLOBE_RADIUS * 1.25, rotation: [Math.PI / 6, 0, 0], opacity: 0.12 },
      { radius: GLOBE_RADIUS * 1.32, rotation: [0, 0, Math.PI / 4], opacity: 0.08 },
      { radius: GLOBE_RADIUS * 1.38, rotation: [Math.PI / 3, Math.PI / 5, 0], opacity: 0.06 },
    ]
    return configs.map(({ radius, rotation, opacity }) => {
      const segments = 100
      const points: [number, number, number][] = []
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        points.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0])
      }
      return { points, rotation, opacity }
    })
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <group key={i} rotation={ring.rotation}>
          <Line
            points={ring.points}
            color={EMERALD}
            lineWidth={1}
            transparent
            opacity={ring.opacity}
          />
        </group>
      ))}
    </group>
  )
}

/** Ambient floating particles drifting around the globe */
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = GLOBE_RADIUS * (1.4 + Math.random() * 1.2)
      const p = randomSpherePoint(r)
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={EMERALD}
        size={0.02}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Scene Composition ───────────────────────────────────────────────

/** Complete 3D scene with all globe elements */
function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <GlobeGlow />
      <GlobeWireframe />
      <GlobeDots />
      <ActiveNodes />
      <ArcsGroup />
      <OrbitalRings />
      <FloatingParticles />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Main Export
// ═══════════════════════════════════════════════════════════════════════

export function Globe({ className }: { className?: string }) {
  // Handle SSR – only render Canvas on the client
  const mounted = useSyncExternalStore(
    () => () => {},   // subscribe (no-op, nothing to subscribe to)
    () => true,       // client snapshot – always mounted
    () => false       // server snapshot – never mounted
  )

  const [counter, setCounter] = useState(2_847_563)

  // Live transaction counter – increments at irregular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + Math.floor(Math.random() * 7) + 1)
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative overflow-hidden rounded-xl ${className ?? 'h-[500px]'}`}>
      {/* Dark gradient background for the globe */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

      {/* 3D Globe Canvas */}
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <GlobeScene />
        </Canvas>
      )}

      {/* Cinematic vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 30%, rgba(3,7,18,0.7) 100%)',
        }}
      />

      {/* Transaction Counter Overlay */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1">
        <span
          className="font-mono text-3xl font-bold tracking-wider text-amber-400 sm:text-4xl"
          style={{
            textShadow:
              '0 0 20px rgba(245,158,11,0.5), 0 0 40px rgba(245,158,11,0.2)',
          }}
        >
          {counter.toLocaleString()}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-emerald-400/70 sm:text-xs">
          Transactions Processed
        </span>
      </div>
    </div>
  )
}
