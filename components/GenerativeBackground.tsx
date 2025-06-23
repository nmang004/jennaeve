'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { usePageVisibility } from '@/lib/performance'
import * as THREE from 'three'

// Vertex shader for the generative background
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Fragment shader with flowing noise and gradients
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uIntensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;

  // Smooth noise function
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec2 uv = vUv;
    
    // Create flowing noise
    float time = uTime * 0.3;
    float noise1 = snoise(vec3(uv * 2.0, time));
    float noise2 = snoise(vec3(uv * 4.0, time * 0.5));
    float noise3 = snoise(vec3(uv * 8.0, time * 0.25));
    
    // Combine noise layers
    float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    
    // Create gradient based on position and noise
    vec3 color1 = uColor1;
    vec3 color2 = uColor2;
    vec3 color3 = uColor3;
    
    float gradient1 = smoothstep(0.0, 1.0, uv.y + combinedNoise * 0.3);
    float gradient2 = smoothstep(0.0, 1.0, length(uv - vec2(0.5)) + combinedNoise * 0.2);
    
    vec3 finalColor = mix(color1, color2, gradient1);
    finalColor = mix(finalColor, color3, gradient2 * 0.5);
    
    // Add subtle breathing effect
    float breathe = sin(time * 2.0) * 0.05 + 0.95;
    finalColor *= breathe;
    
    gl_FragColor = vec4(finalColor, uIntensity);
  }
`

interface GenerativeBackgroundProps {
  colors?: [string, string, string]
  intensity?: number
  className?: string
}

function BackgroundMesh({ colors, intensity }: { colors: [string, string, string], intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const shouldReduceMotion = useReducedMotion()
  const isPageVisible = usePageVisibility()
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(
      typeof window !== 'undefined' ? window.innerWidth : 1920, 
      typeof window !== 'undefined' ? window.innerHeight : 1080
    ) },
    uColor1: { value: new THREE.Color(colors[0]) },
    uColor2: { value: new THREE.Color(colors[1]) },
    uColor3: { value: new THREE.Color(colors[2]) },
    uIntensity: { value: intensity }
  }), [colors, intensity])

  useFrame((state) => {
    if (meshRef.current && !shouldReduceMotion && isPageVisible) {
      // Limit update frequency for better performance
      uniforms.uTime.value = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

export default function GenerativeBackground({ 
  colors = ['#F5F5F0', '#F0F0E8', '#E8E8E0'], 
  intensity = 0.1,
  className = ''
}: GenerativeBackgroundProps) {
  const shouldReduceMotion = useReducedMotion()
  const isPageVisible = usePageVisibility()
  
  if (shouldReduceMotion || !isPageVisible) {
    // Fallback to CSS gradient for reduced motion or when page not visible
    return (
      <div 
        className={`fixed inset-0 -z-10 ${className}`}
        style={{
          background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`
        }}
      />
    )
  }

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <BackgroundMesh colors={colors} intensity={intensity} />
      </Canvas>
    </div>
  )
}