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
const STEEL_GREEN = '#1a3d2e'
const STEEL_DARK = '#0f2a1e'
const CHROME = '#3d5c4f'

// Camera positions for each slide
const CAMERA_POSITIONS: [number, number, number][] = [
  [0, 1.5, 7],    // Slide 0: Front-wide overview
  [5, 2, 4],      // Slide 1: Side angle close-up
  [-3, -1, 6],    // Slide 2: Below-left perspective
]

const CAMERA_LOOKATS: [number, number, number][] = [
  [0, 0, 0],
  [0.5, 0.2, 0],
  [-0.3, 0, 0],
]

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
// Gear Config
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

const GEAR_CONFIGS: GearConfig[] = [
  {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    innerRadius: 0.4,
    outerRadius: 1.6,
    teeth: 24,
    toothDepth: 0.18,
    thickness: 0.4,
    speed: 0.3,
    direction: 1,
    color: CHROME,
    emissiveColor: GREEN,
    emissiveIntensity: 0.08,
    metalness: 0.92,
    roughness: 0.15,
    castShadow: true,
  },
  {
    position: [2.4, 1.8, 0.1],
    rotation: [0.1, 0, 0],
    innerRadius: 0.25,
    outerRadius: 0.95,
    teeth: 16,
    toothDepth: 0.14,
    thickness: 0.35,
    speed: 0.45,
    direction: -1,
    color: STEEL_GREEN,
    emissiveColor: GREEN_ACCENT,
    emissiveIntensity: 0.12,
    metalness: 0.9,
    roughness: 0.18,
    castShadow: true,
  },
  {
    position: [-2.1, -1.5, -0.2],
    rotation: [-0.15, 0.1, 0],
    innerRadius: 0.18,
    outerRadius: 0.65,
    teeth: 12,
    toothDepth: 0.1,
    thickness: 0.3,
    speed: 0.6,
    direction: 1,
    color: STEEL_GREEN,
    emissiveColor: GREEN,
    emissiveIntensity: 0.15,
    metalness: 0.88,
    roughness: 0.2,
    castShadow: true,
  },
  {
    position: [-2.8, 1.0, -0.8],
    rotation: [0.2, -0.15, 0],
    innerRadius: 0.2,
    outerRadius: 0.85,
    teeth: 14,
    toothDepth: 0.12,
    thickness: 0.35,
    speed: 0.5,
    direction: -1,
    color: CHROME,
    emissiveColor: GREEN_DIM,
    emissiveIntensity: 0.06,
    metalness: 0.93,
    roughness: 0.12,
    castShadow: true,
  },
  {
    position: [3.6, -0.5, 0.5],
    rotation: [-0.1, 0.2, 0],
    innerRadius: 0.12,
    outerRadius: 0.45,
    teeth: 10,
    toothDepth: 0.08,
    thickness: 0.25,
    speed: 0.8,
    direction: 1,
    color: GREEN_DIM,
    emissiveColor: GREEN,
    emissiveIntensity: 0.2,
    metalness: 0.85,
    roughness: 0.25,
    castShadow: false,
  },
  {
    position: [4.0, 2.5, -2.5],
    rotation: [0.1, 0.3, 0],
    innerRadius: 0.5,
    outerRadius: 2.0,
    teeth: 28,
    toothDepth: 0.2,
    thickness: 0.3,
    speed: 0.2,
    direction: -1,
    color: STEEL_DARK,
    emissiveColor: GREEN_DIM,
    emissiveIntensity: 0.04,
    metalness: 0.9,
    roughness: 0.2,
    castShadow: true,
  },
  {
    position: [-3.5, 3.0, -2.0],
    rotation: [-0.2, 0.1, 0],
    innerRadius: 0.3,
    outerRadius: 1.1,
    teeth: 18,
    toothDepth: 0.15,
    thickness: 0.3,
    speed: 0.35,
    direction: 1,
    color: STEEL_DARK,
    emissiveColor: GREEN_DIM,
    emissiveIntensity: 0.05,
    metalness: 0.88,
    roughness: 0.22,
    castShadow: true,
  },
]

// ═══════════════════════════════════════════════════════════════════════
// Environment map for realistic reflections
// ═══════════════════════════════════════════════════════════════════════

function createEnvMap(): THREE.CubeTexture {
  const size = 64
  const faces: HTMLCanvasElement[] = []

  for (let f = 0; f < 6; f++) {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    // Create dark green environment with bright spots for reflections
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)')
    gradient.addColorStop(0.3, 'rgba(6, 95, 70, 0.08)')
    gradient.addColorStop(1, 'rgba(4, 18, 10, 0.9)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    // Add bright spots for specular highlights
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
// Single Gear Mesh — Realistic metallic
// ═══════════════════════════════════════════════════════════════════════

function GearMesh({ config, envMap }: { config: GearConfig; envMap: THREE.CubeTexture | null }) {
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
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
      curveSegments: 2,
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [config.innerRadius, config.outerRadius, config.teeth, config.toothDepth, config.thickness])

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
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
    return mat
  }, [config.color, config.emissiveColor, config.emissiveIntensity, config.metalness, config.roughness, envMap])

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
        receiveShadow
      />
      {/* Inner ring accent glow */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[config.innerRadius * 0.85, 0.025, 8, 32]} />
        <meshBasicMaterial
          color={GREEN_ACCENT}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Outer rim subtle highlight */}
      <mesh position={[0, 0, offset + config.thickness / 2]} rotation={[0, 0, 0]}>
        <torusGeometry args={[config.outerRadius * 0.92, 0.015, 6, 48]} />
        <meshBasicMaterial
          color={GREEN}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Floating Particles — Green sparks
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

      // Wrap around
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
// Gear Scene — Enhanced lighting + shadows
// ═══════════════════════════════════════════════════════════════════════

function GearScene({ activeSlide, envMap }: { activeSlide: number; envMap: THREE.CubeTexture | null }) {
  return (
    <>
      {/* Ambient fill — very subtle */}
      <ambientLight intensity={0.08} color="#0a2a18" />

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

      {GEAR_CONFIGS.map((config, i) => (
        <GearMesh key={i} config={config} envMap={envMap} />
      ))}

      <GearParticles />

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

  const envMap = useMemo(() => {
    if (typeof document === 'undefined') return null
    return createEnvMap()
  }, [])

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

      {/* Organic glow blob — top right */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 40% 35% at 75% 25%, rgba(52, 211, 153, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Organic glow blob — bottom left */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 35% 30% at 20% 80%, rgba(6, 95, 70, 0.05) 0%, transparent 65%)',
        }}
      />

      <Canvas
        camera={{ position: CAMERA_POSITIONS[0], fov: 50 }}
        shadows
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: 'transparent' }}
      >
        <GearScene activeSlide={activeSlide} envMap={envMap} />
      </Canvas>

      {/* Top vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(1, 8, 4, 0.6) 100%)',
        }}
      />
    </div>
  )
}
