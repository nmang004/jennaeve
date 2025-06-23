'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { springs, easings, durations } from '@/lib/motion'

export default function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverType, setHoverType] = useState<'default' | 'interactive' | 'text'>('default')
  const shouldReduceMotion = useReducedMotion()
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Enhanced spring physics with different configurations
  const cursorXSpring = useSpring(cursorX, springs.ui)
  const cursorYSpring = useSpring(cursorY, springs.ui)
  
  // Additional trailing elements
  const trailX = useSpring(cursorX, { ...springs.gentle, damping: 20 })
  const trailY = useSpring(cursorY, { ...springs.gentle, damping: 20 })

  useEffect(() => {
    if (shouldReduceMotion) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    
    // Enhanced hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"]')
      const isText = target.closest('h1, h2, h3, h4, h5, h6, p, span')
      
      if (isInteractive) {
        setHoverType('interactive')
        setIsHovering(true)
      } else if (isText && !isInteractive) {
        setHoverType('text')
        setIsHovering(false)
      } else {
        setHoverType('default')
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, shouldReduceMotion])

  if (shouldReduceMotion) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[200] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isVisible ? (isHovering ? 0.5 : 1) : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          duration: durations.micro,
          ease: easings.snap
        }}
      >
        {/* Core cursor */}
        <motion.div 
          className="w-8 h-8 rounded-full bg-white relative"
          animate={{
            scale: hoverType === 'interactive' ? 1.5 : 1,
            rotate: hoverType === 'interactive' ? 45 : 0
          }}
          transition={{
            type: "spring",
            ...springs.bouncy
          }}
        >
          {/* Pulse effect for interactive elements */}
          {hoverType === 'interactive' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-white"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: easings.fluid
              }}
            />
          )}
          
          {/* Inner dot for precision */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-charcoal rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: hoverType === 'text' ? 2 : 1,
              opacity: hoverType === 'text' ? 1 : 0.6
            }}
            transition={{ duration: durations.micro }}
          />
        </motion.div>
      </motion.div>

      {/* Trailing element */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[199] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          scale: isVisible ? 0.6 : 0,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{ 
          duration: durations.fast,
          ease: easings.soft
        }}
      >
        <div className="w-8 h-8 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring for interactive states */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[198]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2.5 : 0,
          opacity: isHovering ? 0.15 : 0,
        }}
        transition={{
          type: "spring",
          ...springs.ui
        }}
      >
        <div className="w-8 h-8 rounded-full border border-charcoal/30" />
      </motion.div>
    </>
  )
}