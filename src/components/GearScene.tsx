'use client'

import { useRef, useMemo, useEffect, useSyncExternalStore } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════

const BLUE = '#4f8fff'
const BLUE_ACCENT = '#60a5fa'
const BLUE_DIM = '#1a3a6e'
const STEEL = '#2a3f5f'

// Camera positions for each slide
const CAMERA_POSITIONS: [number, number, number][] = [
  [0, 1.5, 7],    // Slide 0: Front-wide, slightly above — overview of gears
  [5, 2, 4],      // Slide 1: Side angle, closer — gear interlocking detail
  [-3, -1, 6],    // Slide 2: Below-left perspective — power/depth feel
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

    // Root start
    const a0 = baseAngle - halfTooth * 1.2
    // Tooth start
    const a1 = baseAngle - halfTooth * 0.6
    // Tooth peak start
    const a2 = baseAngle - halfTooth * 0.4
    // Tooth peak end
    const a3 = baseAngle + halfTooth * 0.4
    // Tooth end
    const a4 = baseAngle + halfTooth * 0.6
    // Root end
    const a5 = baseAngle + halfTooth * 1.2

    if (i === 0) {
      shape.moveTo(Math.cos(a0) * outerR, Math.sin(a0) * outerR)
    }

    // Rise to tooth
    shape.lineTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR)
    shape.lineTo(Math.cos(a2) * toothOuter, Math.sin(a2) * toothOuter)
    // Tooth top
    shape.lineTo(Math.cos(a3) * toothOuter, Math.sin(a3) * toothOuter)
    // Fall from tooth
    shape.lineTo(Math.cos(a4) * outerR, Math.sin(a4) * outerR)
    // Root
    shape.lineTo(Math.cos(a5) * outerR, Math.sin(a5) * outerR)
  }

  // Center hole
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
  emissiveIntensity: number
}

const GEAR_CONFIGS: GearConfig[] = [
  // Main large gear — center
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
    color: STEEL,
    emissiveIntensity: 0.15,
  },
  // Medium gear — top-right, interlocking
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
    color: BLUE_DIM,
    emissiveIntensity: 0.2,
  },
  // Small gear — bottom-left
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
    color: BLUE_DIM,
    emissiveIntensity: 0.25,
  },
  // Medium gear — left side, behind
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
    color: STEEL,
    emissiveIntensity: 0.12,
  },
  // Tiny gear — far right
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
    color: BLUE_DIM,
    emissiveIntensity: 0.3,
  },
  // Large gear — background, right
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
    color: STEEL,
    emissiveIntensity: 0.08,
  },
  // Medium background gear — top left
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
    color: STEEL,
    emissiveIntensity: 0.1,
  },
]

// ═══════════════════════════════════════════════════════════════════════
// Single Gear Mesh
// ═══════════════════════════════════════════════════════════════════════

function GearMesh({ config }: { config: GearConfig }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

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
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
      curveSegments: 1,
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [config.innerRadius, config.outerRadius, config.teeth, config.toothDepth, config.thickness])

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: config.color,
      metalness: 0.85,
      roughness: 0.25,
      emissive: BLUE,
      emissiveIntensity: config.emissiveIntensity,
      transparent: true,
      opacity: 0.7,
    })
  }, [config.color, config.emissiveIntensity])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * config.speed * config.direction
    }
  })

  // Center the extruded gear
  const offset = -config.thickness / 2

  return (
    <group ref={groupRef} position={config.position} rotation={config.rotation}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        position={[0, 0, offset]}
      />
      {/* Inner ring glow */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[config.innerRadius * 0.85, 0.02, 8, 32]} />
        <meshBasicMaterial
          color={BLUE_ACCENT}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Floating Particles
// ═══════════════════════════════════════════════════════════════════════

function GearParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 40

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={BLUE}
        size={0.04}
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Camera Controller — smooth transitions between slides
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
    // Smooth lerp camera position
    camera.position.lerp(targetPos.current, 0.025)
    // Smooth look-at
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
// Gear Scene (all 3D objects)
// ═══════════════════════════════════════════════════════════════════════

function GearScene({ activeSlide }: { activeSlide: number }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.4}
        color="#ffffff"
      />
      <pointLight
        position={[0, 0, 3]}
        intensity={0.8}
        color={BLUE}
        distance={15}
        decay={2}
      />
      <pointLight
        position={[-3, 2, -2]}
        intensity={0.3}
        color={BLUE_ACCENT}
        distance={12}
        decay={2}
      />
      <pointLight
        position={[4, -1, 2]}
        intensity={0.2}
        color="#1e40af"
        distance={10}
        decay={2}
      />

      {/* Gears */}
      {GEAR_CONFIGS.map((config, i) => (
        <GearMesh key={i} config={config} />
      ))}

      {/* Particles */}
      <GearParticles />

      {/* Camera */}
      <CameraController activeSlide={activeSlide} />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// Main Export — Fixed Full-Screen Gear Background
// ═══════════════════════════════════════════════════════════════════════

export function GearBackground({ activeSlide }: { activeSlide: number }) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#060d1b]" />
  }

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#060d1b] via-[#0a1628] to-[#0f1d32]" />
      <Canvas
        camera={{ position: CAMERA_POSITIONS[0], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <GearScene activeSlide={activeSlide} />
      </Canvas>
    </div>
  )
}
