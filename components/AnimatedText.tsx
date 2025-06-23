'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { easings, springs, staggers } from '@/lib/motion'
import { useDeviceCapabilities } from '@/lib/hooks'

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  variant?: 'default' | 'cinematic' | 'organic' | 'bounce'
}

export default function AnimatedText({ 
  children, 
  className = '', 
  delay = 0,
  stagger = staggers.text,
  variant = 'default'
}: AnimatedTextProps) {
  const text = String(children)
  const letters = text.split('')
  const shouldReduceMotion = useReducedMotion()
  const { canHover, hasTouch, isLowEnd } = useDeviceCapabilities()
  
  // Simplify animation on mobile/touch devices
  const useSimpleAnimation = hasTouch || isLowEnd || shouldReduceMotion

  // Simplified container for mobile
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: useSimpleAnimation ? 0 : stagger,
        delayChildren: useSimpleAnimation ? 0 : delay,
        when: "beforeChildren"
      },
    },
  }
  
  // Simple mobile variant
  const simpleVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: easings.soft }
    }
  }

  // Multiple character animation variants
  const variants = {
    default: {
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: 'spring' as const,
          ...springs.gentle,
        },
      },
      hidden: {
        opacity: 0,
        y: 25,
        scale: 0.9,
        filter: "blur(2px)",
        transition: {
          type: 'spring' as const,
          ...springs.gentle,
        },
      },
    },
    
    cinematic: {
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.8,
          ease: easings.cinematic,
        },
      },
      hidden: {
        opacity: 0,
        y: 40,
        scale: 0.8,
        rotateX: -30,
        filter: "blur(4px)",
      },
    },
    
    organic: {
      visible: (index: number) => ({
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: {
          duration: 0.6 + (index * 0.02), // Slightly different timing per letter
          ease: easings.organic,
          delay: index * 0.02,
        },
      }),
      hidden: {
        opacity: 0,
        y: 30,
        rotate: -3,
        scale: 0.95,
      },
    },
    
    bounce: {
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring' as const,
          ...springs.bouncy,
        },
      },
      hidden: {
        opacity: 0,
        y: 50,
        scale: 0.3,
      },
    }
  }

  const childVariant = useSimpleAnimation ? simpleVariant : variants[variant]

  // For mobile, show as a simple block without character-by-character animation
  if (useSimpleAnimation) {
    return (
      <motion.span
        className={`inline-block ${className}`}
        variants={simpleVariant}
        initial="hidden"
        animate="visible"
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span 
          key={index} 
          variants={childVariant}
          custom={index} // Pass index for organic variant
          className="inline-block relative"
          whileHover={canHover && !hasTouch ? {
            y: -2,
            scale: 1.05,
            transition: {
              duration: 0.15,
              ease: easings.snap
            }
          } : {}}
        >
          {letter === ' ' ? '\u00A0' : letter}
          
          {/* Subtle hover glow effect - desktop only */}
          {canHover && !hasTouch && variant === 'cinematic' && letter !== ' ' && (
            <motion.span
              className="absolute inset-0 opacity-0 blur-sm"
              style={{ color: 'inherit' }}
              whileHover={{
                opacity: 0.3,
                scale: 1.2,
                transition: {
                  duration: 0.2,
                  ease: easings.soft
                }
              }}
            >
              {letter}
            </motion.span>
          )}
        </motion.span>
      ))}
    </motion.span>
  )
}