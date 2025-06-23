/**
 * Performance optimization utilities for smooth 60fps animations
 */

import { useEffect, useState, useRef, useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

// Page visibility hook for pausing animations when tab is not active
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

// Intersection observer hook for viewport-based animation activation
export function useInViewport(options = { threshold: 0.1, rootMargin: '50px' }) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      options
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return [ref, isInView] as const
}

// Optimized spring config for better performance
export const performantSprings = {
  // Faster springs with less calculations
  fast: { damping: 25, stiffness: 200, mass: 0.5 },
  gentle: { damping: 20, stiffness: 100, mass: 0.8 },
  ui: { damping: 30, stiffness: 300, mass: 0.6 }
}

// Reduced animation variants for performance
export const performantVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
    }
  },
  
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
    }
  }
}

// Throttled event handler for mouse movements
export function useThrottledCallback<T extends (...args: any[]) => void>(
  callback: T, 
  delay: number
): T {
  const lastExecuted = useRef<number>(0)

  const throttledCallback = useMemo(() => {
    return ((...args: any[]) => {
      const now = Date.now()
      if (now - lastExecuted.current >= delay) {
        callback(...args)
        lastExecuted.current = now
      }
    }) as T
  }, [callback, delay])

  return throttledCallback
}

// Performance-aware animation controller
export function usePerformantAnimation() {
  const shouldReduceMotion = useReducedMotion()
  const isPageVisible = usePageVisibility()
  const [canAnimate, setCanAnimate] = useState(true)

  useEffect(() => {
    // Check if device is low-end
    const isLowEnd = navigator.hardwareConcurrency <= 2 || 
                    (navigator as any).deviceMemory <= 2

    setCanAnimate(!shouldReduceMotion && isPageVisible && !isLowEnd)
  }, [shouldReduceMotion, isPageVisible])

  return {
    canAnimate,
    shouldReduceMotion,
    isPageVisible
  }
}

// GPU optimization utilities
export const gpuOptimizations = {
  // Force GPU layer creation
  willChange: 'transform, opacity',
  transform: 'translateZ(0)',
  
  // Optimize for specific animations
  forTransforms: {
    willChange: 'transform',
    transform: 'translate3d(0, 0, 0)'
  },
  
  forOpacity: {
    willChange: 'opacity',
    transform: 'translateZ(0)'
  }
}

// Debounced resize handler
export function useDebounceResize(callback: () => void, delay = 250) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(callback, delay)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [callback, delay])
}