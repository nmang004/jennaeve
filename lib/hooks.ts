/**
 * Custom hooks for mobile optimization and responsive behavior
 */

import { useEffect, useState } from 'react'

// Mobile detection hook
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      
      setIsMobile(isTouchDevice || isSmallScreen)
    }

    // Check on mount
    checkDevice()

    // Check on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

// Media query hook for responsive design
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    if (media.addEventListener) {
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [query])

  return matches
}

// Device capability detection
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    canHover: false,
    hasTouch: false,
    isLowEnd: false,
    prefersReducedMotion: false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const canHover = window.matchMedia('(hover: hover)').matches
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isLowEnd = navigator.hardwareConcurrency <= 2 || 
                     (navigator as any).deviceMemory <= 2
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setCapabilities({
      canHover,
      hasTouch,
      isLowEnd,
      prefersReducedMotion
    })
  }, [])

  return capabilities
}