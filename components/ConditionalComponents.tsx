'use client'

import dynamic from 'next/dynamic'
import { useDeviceCapabilities } from '@/lib/hooks'

// Dynamic imports for desktop-only components
const MouseFollower = dynamic(() => import('./MouseFollower'), {
  ssr: false,
  loading: () => null
})

const GenerativeBackground = dynamic(() => import('./GenerativeBackground'), {
  ssr: false,
  loading: () => (
    <div 
      className="fixed inset-0 -z-10"
      style={{
        background: 'linear-gradient(135deg, #F5F5F0 0%, #F0F0E8 50%, #E8E8E0 100%)'
      }}
    />
  )
})

const GenerativeAudio = dynamic(() => import('./GenerativeAudio'), {
  ssr: false,
  loading: () => null
})

export default function ConditionalComponents() {
  const { canHover, hasTouch, isLowEnd, prefersReducedMotion } = useDeviceCapabilities()
  
  // Only load complex components on desktop with hover capability
  const shouldLoadDesktopComponents = canHover && !hasTouch && !isLowEnd && !prefersReducedMotion
  
  return (
    <>
      {/* Background - simplified on mobile/low-end devices */}
      {shouldLoadDesktopComponents ? (
        <GenerativeBackground 
          colors={['#F5F5F0', '#F0F0E8', '#E8E8E0']}
          intensity={0.08}
        />
      ) : (
        <div 
          className="fixed inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #F5F5F0 0%, #F0F0E8 50%, #E8E8E0 100%)'
          }}
        />
      )}
      
      {/* Mouse follower - desktop only */}
      {shouldLoadDesktopComponents && <MouseFollower />}
      
      {/* Audio - desktop only, optional */}
      {shouldLoadDesktopComponents && <GenerativeAudio />}
    </>
  )
}