'use client'

import { useRef, useMemo, ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

// Vertex shader for distortion effect
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    
    // Apply subtle wave distortion on hover
    if (uHover > 0.0) {
      float wave = sin(pos.x * 10.0 + uTime * 3.0) * sin(pos.y * 10.0 + uTime * 2.0);
      pos.z += wave * uHover * 0.1;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Fragment shader with ripple and distortion effects
const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform vec3 uColor;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  varying vec3 vPosition;

  // Simple noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Smooth noise
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    
    // Create ripple effect from mouse interaction
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 20.0 - uTime * 8.0) * exp(-dist * 5.0);
    
    // Distort UV coordinates
    vec2 distortedUv = uv;
    if (uHover > 0.0) {
      distortedUv += ripple * uHover * 0.02;
      
      // Add flowing distortion
      float noiseValue = noise(uv * 5.0 + uTime * 0.5) * 0.02;
      distortedUv += noiseValue * uHover;
    }
    
    // Sample the background color with distortion
    vec3 color = uColor;
    
    // Add shimmer effect
    float shimmer = noise(uv * 10.0 + uTime) * 0.1;
    color += shimmer * uHover;
    
    // Add edge glow
    float edge = 1.0 - distance(uv, vec2(0.5));
    edge = smoothstep(0.3, 1.0, edge);
    color += edge * uHover * 0.1;
    
    // Fade based on hover intensity
    float alpha = 0.1 + uHover * 0.4;
    
    gl_FragColor = vec4(color, alpha);
  }
`

interface ShaderDistortionProps {
  children: ReactNode
  color?: string
  intensity?: number
  className?: string
  isHovered?: boolean
  mousePosition?: { x: number; y: number }
}

function DistortionMesh({ 
  color, 
  isHovered, 
  mousePosition 
}: { 
  color: string
  isHovered: boolean
  mousePosition: { x: number; y: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uColor: { value: new THREE.Color(color) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) }
  }), [color, size])

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime
      
      // Smooth hover transition
      const targetHover = isHovered ? 1 : 0
      uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, 0.1)
      
      // Update mouse position
      uniforms.uMouse.value.set(mousePosition.x, 1 - mousePosition.y)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function ShaderDistortion({ 
  children, 
  color = '#6366f1', 
  intensity = 1,
  className = '',
  isHovered = false,
  mousePosition = { x: 0.5, y: 0.5 }
}: ShaderDistortionProps) {
  const shouldReduceMotion = useReducedMotion()
  
  if (shouldReduceMotion) {
    // Return children without shader effects for reduced motion
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Shader overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          style={{ width: '100%', height: '100%' }}
          dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        >
          <DistortionMesh 
            color={color}
            isHovered={isHovered}
            mousePosition={mousePosition}
          />
        </Canvas>
      </div>
    </div>
  )
}