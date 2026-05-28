'use client'

import { useRef, useMemo, useEffect, useSyncExternalStore } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════
// Constants — Emerald Green Palette
// ═══════════════════════════════════════════════════════════════════════

const GREEN = '#10b981'
const GREEN_ACCENT = '#34d399'
const GREEN_DIM = '#065f46'
const GEAR_COLORS = [GREEN_DIM, '#1a3d2e', '#0f2a1e', '#3d5c4f', '#163828']
const EMISSIVE_COLORS = [GREEN, GREEN_ACCENT, GREEN_DIM]

// Camera positions for each slide
const CAMERA_POSITIONS: [number, number, number][] = [
  [0, 1.5, 7],
  [5, 2, 4],
  [-3, -1, 6],
]

const CAMERA_LOOKATS: [number, number, number][] = [
  [0, 0, 0],
  [0.5, 0.2, 0],
  [-0.3, 0, 0],
]

// ═══════════════════════════════════════════════════════════════════════
// Mobile Detection — Adaptive Quality
// ═══════════════════════════════════════════════════════════════════════

function useIsMobile(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia('(max-width: 768px)')
      mql.addEventListener('change', onStoreChange)
      return () => mql.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(max-width: 768px)').matches,
    () => false, // SSR default
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Gear Geometry Generator
// ═══════════════════════════════════════════════════════════════════════

function createGearShape(
  innerRadius: number,
  outerRadius: number,
  teeth: number,
  toothDepth: number,
): THREE.Shape {
  const shape = new THREE.Shape()
  const anglePerTooth = (Math.PI * 2) / teeth
  const halfTooth = anglePerTooth * 0.3
  const innerR = Math.max(0.01, innerRadius)
  const outerR = Math.max(innerR + 0.01, outerRadius)
  const toothOuter = outerR + toothDepth

  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * anglePerTooth

    const a0 = baseAngle - halfTooth * 1.2
    const a1 = baseAngle - halfTooth * 0.6
    const a2 = baseAngle - halfTooth * 0.4
    const a3 = baseAngle + halfTooth * 0.4
    const a4 = baseAngle + halfTooth * 0.6
    const a5 = baseAngle + halfTooth * 1.2

    if (i === 0) {
      shape.moveTo(Math.cos(a0) * outerR, Math.sin(a0) * outerR)
    }

    shape.lineTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR)
    shape.lineTo(Math.cos(a2) * toothOuter, Math.sin(a2) * toothOuter)
    shape.lineTo(Math.cos(a3) * toothOuter, Math.sin(a3) * toothOuter)
    shape.lineTo(Math.cos(a4) * outerR, Math.sin(a4) * outerR)
    shape.lineTo(Math.cos(a5) * outerR, Math.sin(a5) * outerR)
  }

  const holePath = new THREE.Path()
  const holeSegments = 32
  for (let i = 0; i <= holeSegments; i++) {
    const angle = (i / holeSegments) * Math.PI * 2
    const x = Math.cos(angle) * innerR
    const y = Math.sin(angle) * innerR
    if (i === 0) holePath.moveTo(x, y)
    else holePath.lineTo(x, y)
  }
  shape.holes.push(holePath)

  return shape
}

// ═══════════════════════════════════════════════════════════════════════
// Random Gear Config Generator
// ═══════════════════════════════════════════════════════════════════════

interface GearConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  innerRadius: number
  outerRadius: number
  teeth: number
  toothDepth: number
  thickness: number
  speed: number
  direction: 1 | -1
  color: string
  emissiveColor: string
  emissiveIntensity: number
  metalness: number
  roughness: number
  castShadow: boolean
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Get the pitch radius (where teeth mesh)
function getPitchRadius(config: { outerRadius: number; toothDepth: number }): number {
  return config.outerRadius + config.toothDepth * 0.5
}

// Check if a new gear would overlap any existing gear (2D XY check)
function hasOverlap(
  newPos: [number, number, number],
  newOuterR: number,
  newToothDepth: number,
  existing: GearConfig[],
  margin: number = 0.05,
): boolean {
  const newPitch = newOuterR + newToothDepth * 0.5
  for (const gear of existing) {
    const existingPitch = getPitchRadius(gear)
    const dx = newPos[0] - gear.position[0]
    const dy = newPos[1] - gear.position[1]
    const dist2D = Math.sqrt(dx * dx + dy * dy)
    const minDist = newPitch + existingPitch - margin
    if (dist2D < minDist) return true
  }
  return false
}

// Check if position is within visible area bounds
function isInBounds(pos: [number, number, number], outerR: number): boolean {
  const bound = 5.5
  return (
    pos[0] - outerR > -bound &&
    pos[0] + outerR < bound &&
    pos[1] - outerR > -bound &&
    pos[1] + outerR < bound
  )
}

function generateRandomGears(count: number, isMobile: boolean): GearConfig[] {
  const configs: GearConfig[] = []

  function makeGearShape(isLarge: boolean) {
    const outerR = isLarge ? rand(1.0, 1.8) : rand(0.35, 0.9)
    const innerR = outerR * rand(0.18, 0.3)
    const teethCount = Math.max(8, Math.floor(outerR * rand(10, 16)))
    const toothDepth = isLarge ? rand(0.1, 0.18) : rand(0.05, 0.14)
    return { innerR, outerR, teethCount, toothDepth }
  }

  function makeGear(
    shape: { innerR: number; outerR: number; teethCount: number; toothDepth: number },
    position: [number, number, number],
    parentDirection: 1 | -1 = 1,
    isLarge: boolean = false,
  ): GearConfig {
    return {
      position,
      rotation: [rand(-0.2, 0.2), rand(-0.2, 0.2), 0],
      innerRadius: shape.innerR,
      outerRadius: shape.outerR,
      teeth: shape.teethCount,
      toothDepth: shape.toothDepth,
      thickness: isMobile ? rand(0.15, 0.3) : rand(0.2, 0.45),
      speed: isMobile ? rand(0.1, 0.4) : rand(0.15, 0.7),
      direction: (parentDirection * -1) as 1 | -1,
      color: pickRandom(GEAR_COLORS),
      emissiveColor: pickRandom(EMISSIVE_COLORS),
      emissiveIntensity: isMobile ? rand(0.05, 0.2) : rand(0.03, 0.15),
      metalness: isMobile ? 0.7 : rand(0.84, 0.95),
      roughness: isMobile ? 0.35 : rand(0.1, 0.25),
      castShadow: !isMobile && isLarge,
    }
  }

  // Place the central (root) gear
  const rootShape = makeGearShape(true)
  const rootGear = makeGear(rootShape, [0, 0, rand(-0.3, 0.3)], 1, true)
  rootGear.speed = rand(0.15, 0.3)
  rootGear.direction = 1
  configs.push(rootGear)

  // Grow the gear network by attaching to existing gears
  const maxAttempts = isMobile ? 25 : 50

  for (let i = 1; i < count; i++) {
    const isLarge = Math.random() > 0.75
    const shape = makeGearShape(isLarge)
    const newPitch = shape.outerR + shape.toothDepth * 0.5

    let placed = false

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const parentIdx = Math.floor(Math.random() * configs.length)
      const parent = configs[parentIdx]
      const parentPitch = getPitchRadius(parent)

      const meshDist = parentPitch + newPitch + rand(-0.02, 0.05)
      const angle = rand(0, Math.PI * 2)

      const newX = parent.position[0] + Math.cos(angle) * meshDist
      const newY = parent.position[1] + Math.sin(angle) * meshDist
      const newZ = parent.position[2] + rand(-0.8, 0.8)

      const newPos: [number, number, number] = [newX, newY, newZ]

      if (!isInBounds(newPos, shape.outerR)) continue
      if (hasOverlap(newPos, shape.outerR, shape.toothDepth, configs, 0.08)) continue

      const gear = makeGear(shape, newPos, parent.direction, isLarge)
      configs.push(gear)
      placed = true
      break
    }

    if (!placed) {
      for (let attempt = 0; attempt < 30; attempt++) {
        const fallbackPos: [number, number, number] = [
          rand(-4.5, 4.5),
          rand(-3.5, 3.5),
          rand(-2, 1),
        ]
        if (!isInBounds(fallbackPos, shape.outerR)) continue
        if (hasOverlap(fallbackPos, shape.outerR, shape.toothDepth, configs, 0.1)) continue

        const gear = makeGear(shape, fallbackPos, 1, isLarge)
        configs.push(gear)
        placed = true
        break
      }
    }
  }

  return configs
}

// ═══════════════════════════════════════════════════════════════════════
// Environment map for realistic reflections (desktop only)
// ═══════════════════════════════════════════════════════════════════════

function createEnvMap(): THREE.CubeTexture {
  const size = 64
  const faces: HTMLCanvasElement[] = []

  for (let f = 0; f < 6; f++) {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)')
    gradient.addColorStop(0.3, 'rgba(6, 95, 70, 0.08)')
    gradient.addColorStop(1, 'rgba(4, 18, 10, 0.9)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const spots = f < 3 ? 3 : 2
    for (let s = 0; s < spots; s++) {
      const sx = Math.random() * size
      const sy = Math.random() * size * 0.6
      const sr = 3 + Math.random() * 8
      const spotGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr)
      spotGrad.addColorStop(0, 'rgba(200, 255, 230, 0.4)')
      spotGrad.addColorStop(0.5, 'rgba(52, 211, 153, 0.1)')
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = spotGrad
      ctx.fillRect(0, 0, size, size)
    }

    faces.push(canvas)
  }

  const cubeTexture = new THREE.CubeTexture(faces)
  cubeTexture.needsUpdate = true
  return cubeTexture
}

// ═══════════════════════════════════════════════════════════════════════
// Single Gear Mesh — Adaptive Quality
// ═══════════════════════════════════════════════════════════════════════

function GearMesh({ config, envMap, isMobile }: { config: GearConfig; envMap: THREE.CubeTexture | null; isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const shape = createGearShape(
      config.innerRadius,
      config.outerRadius,
      config.teeth,
      config.toothDepth,
    )
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: config.thickness,
      bevelEnabled: !isMobile, // No bevel on mobile — saves geometry
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: isMobile ? 1 : 3,
      curveSegments: isMobile ? 1 : 2,
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [config.innerRadius, config.outerRadius, config.teeth, config.toothDepth, config.thickness, isMobile])

  const material = useMemo(() => {
    if (isMobile) {
      // MeshPhongMaterial is much cheaper than MeshStandardMaterial on mobile
      return new THREE.MeshPhongMaterial({
        color: config.color,
        emissive: config.emissiveColor,
        emissiveIntensity: config.emissiveIntensity * 2,
        shininess: 40,
        transparent: true,
        opacity: 0.92,
      })
    }
    return new THREE.MeshStandardMaterial({
      color: config.color,
      metalness: config.metalness,
      roughness: config.roughness,
      emissive: config.emissiveColor,
      emissiveIntensity: config.emissiveIntensity,
      transparent: true,
      opacity: 0.92,
      envMap: envMap,
      envMapIntensity: 0.6,
    })
  }, [config.color, config.emissiveColor, config.emissiveIntensity, config.metalness, config.roughness, envMap, isMobile])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * config.speed * config.direction
    }
  })

  const offset = -config.thickness / 2

  return (
    <group position={config.position} rotation={config.rotation}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        position={[0, 0, offset]}
        castShadow={config.castShadow}
        receiveShadow={!isMobile}
      />
      {/* Inner ring accent — only on desktop */}
      {!isMobile && (
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[config.innerRadius * 0.85, 0.025, 8, 32]} />
          <meshBasicMaterial
            color={GREEN_ACCENT}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
      {/* Outer rim — only on desktop */}
      {!isMobile && (
        <mesh position={[0, 0, offset + config.thickness / 2]} rotation={[0, 0, 0]}>
          <torusGeometry args={[config.outerRadius * 0.92, 0.015, 6, 48]} />
          <meshBasicMaterial
            color={GREEN}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Floating Particles — Desktop only
// ═══════════════════════════════════════════════════════════════════════

function GearParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 80

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      vel[i * 3] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const posAttr = ref.current.geometry.getAttribute('position')
    const t = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posAttr.array[i3] += velocities[i3] + Math.sin(t * 0.5 + i) * 0.0005
      posAttr.array[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.3 + i) * 0.0005
      posAttr.array[i3 + 2] += velocities[i3 + 2]

      if (Math.abs(posAttr.array[i3]) > 7) posAttr.array[i3] *= -0.9
      if (Math.abs(posAttr.array[i3 + 1]) > 5) posAttr.array[i3 + 1] *= -0.9
      if (Math.abs(posAttr.array[i3 + 2]) > 4) posAttr.array[i3 + 2] *= -0.9
    }
    posAttr.needsUpdate = true

    ref.current.rotation.y = t * 0.01
    ref.current.rotation.x = Math.sin(t * 0.008) * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={GREEN_ACCENT}
        size={0.03}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Camera Controller
// ═══════════════════════════════════════════════════════════════════════

function CameraController({ activeSlide }: { activeSlide: number }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(...CAMERA_POSITIONS[0]))
  const targetLookAt = useRef(new THREE.Vector3(...CAMERA_LOOKATS[0]))

  useEffect(() => {
    const idx = Math.min(activeSlide, CAMERA_POSITIONS.length - 1)
    targetPos.current.set(...CAMERA_POSITIONS[idx])
    targetLookAt.current.set(...CAMERA_LOOKATS[idx])
  }, [activeSlide])

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.025)
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    const targetDir = targetLookAt.current.clone().sub(camera.position).normalize()
    currentLookAt.lerp(targetDir, 0.025)
    camera.lookAt(
      camera.position.x + currentLookAt.x * 10,
      camera.position.y + currentLookAt.y * 10,
      camera.position.z + currentLookAt.z * 10,
    )
  })

  return null
}

// ═══════════════════════════════════════════════════════════════════════
// Gear Scene — Adaptive Lighting
// ═══════════════════════════════════════════════════════════════════════

function GearScene({ activeSlide, gearConfigs, envMap, isMobile }: { activeSlide: number; gearConfigs: GearConfig[]; envMap: THREE.CubeTexture | null; isMobile: boolean }) {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={isMobile ? 0.2 : 0.08} color="#0a2a18" />

      {isMobile ? (
        <>
          {/* Mobile: Only 2 lights — minimal GPU cost */}
          <directionalLight
            position={[5, 4, 5]}
            intensity={0.8}
            color="#e8fff0"
          />
          <pointLight
            position={[0, 0, 3]}
            intensity={1.2}
            color={GREEN}
            distance={18}
            decay={2}
          />
        </>
      ) : (
        <>
          {/* Desktop: Full lighting setup */}
          {/* Main directional light — key light with shadows */}
          <directionalLight
            position={[8, 6, 5]}
            intensity={0.6}
            color="#e8fff0"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={25}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
            shadow-bias={-0.001}
          />

          {/* Fill light — softer from opposite side */}
          <directionalLight
            position={[-6, 3, 4]}
            intensity={0.25}
            color="#a8f0c8"
          />

          {/* Rim light — back edge highlight for depth */}
          <directionalLight
            position={[0, -2, -6]}
            intensity={0.15}
            color="#34d399"
          />

          {/* Green point light — center glow */}
          <pointLight
            position={[0, 0, 3]}
            intensity={1.0}
            color={GREEN}
            distance={18}
            decay={2}
          />

          {/* Accent point light — top right warm green */}
          <pointLight
            position={[4, 3, 1]}
            intensity={0.5}
            color={GREEN_ACCENT}
            distance={14}
            decay={2}
          />

          {/* Deep fill point light — bottom left */}
          <pointLight
            position={[-4, -2, 2]}
            intensity={0.3}
            color="#047857"
            distance={12}
            decay={2}
          />

          {/* Cool rim point light — back */}
          <pointLight
            position={[0, 1, -5]}
            intensity={0.2}
            color="#6ee7b7"
            distance={10}
            decay={2}
          />

          {/* Spot light — dramatic highlight on main gear */}
          <spotLight
            position={[2, 5, 4]}
            intensity={0.4}
            color="#d0ffe8"
            angle={0.5}
            penumbra={0.8}
            distance={15}
            decay={2}
            castShadow
          />
        </>
      )}

      {gearConfigs.map((config, i) => (
        <GearMesh key={i} config={config} envMap={envMap} isMobile={isMobile} />
      ))}

      {/* Particles — desktop only */}
      {!isMobile && <GearParticles />}

      <CameraController activeSlide={activeSlide} />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Main Export
// ═══════════════════════════════════════════════════════════════════════

export function GearBackground({ activeSlide }: { activeSlide: number }) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const isMobile = useIsMobile()

  // Generate random gears — fewer on mobile
  const gearConfigs = useMemo(() => {
    const count = isMobile ? Math.floor(rand(4, 7)) : Math.floor(rand(6, 11))
    return generateRandomGears(count, isMobile)
  }, [isMobile])

  // Environment map — desktop only
  const envMap = useMemo(() => {
    if (typeof document === 'undefined' || isMobile) return null
    return createEnvMap()
  }, [isMobile])

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#04120a]" />
  }

  return (
    <div className="fixed inset-0 z-0">
      {/* Base dark green gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#021008] via-[#04120a] to-[#010a05]" />

      {/* Radial vignette — lighter center, darker edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(16, 185, 129, 0.07) 0%, rgba(6, 95, 70, 0.03) 35%, rgba(4, 18, 10, 0) 60%, rgba(1, 10, 5, 0.5) 100%)',
        }}
      />

      {/* Organic glow blobs — desktop only (CSS gradients are cheap, but reduce on mobile) */}
      {!isMobile && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 40% 35% at 75% 25%, rgba(52, 211, 153, 0.04) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 35% 30% at 20% 80%, rgba(6, 95, 70, 0.05) 0%, transparent 65%)',
            }}
          />
        </>
      )}

      <Canvas
        camera={{ position: CAMERA_POSITIONS[0], fov: isMobile ? 55 : 50 }}
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          alpha: true,
          antialias: !isMobile,
          toneMapping: isMobile ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: 'high-performance',
        }}
        performance={{ min: 0.5 }}
        style={{ background: 'transparent' }}
      >
        <GearScene activeSlide={activeSlide} gearConfigs={gearConfigs} envMap={envMap} isMobile={isMobile} />
      </Canvas>

      {/* Edge vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(1, 8, 4, 0.6) 100%)',
        }}
      />
    </div>
  )
}
