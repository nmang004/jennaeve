'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import AnimatedText from './AnimatedText'
import { easings, durations, scrollAnimations } from '@/lib/motion'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  // Advanced parallax with multiple layers
  const y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 50 : 400])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.1])
  const blur = useTransform(scrollYProgress, [0, 0.8], [0, shouldReduceMotion ? 0 : 3])

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient that shifts with scroll */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cream via-cream/90 to-cream/70"
        style={{ 
          scale,
          filter: useTransform(blur, (v) => `blur(${v}px)`)
        }}
      />
      
      <motion.div 
        style={{ y, opacity }}
        className="text-center z-10 px-6 relative"
      >
        {/* Cinematic entrance with sophisticated timing */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: durations.cinematic, 
            delay: 2.2, 
            ease: easings.luxe 
          }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-display mb-6 relative"
            initial={{ filter: "blur(8px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ 
              duration: durations.epic, 
              delay: 2.4,
              ease: easings.cinematic 
            }}
          >
            <AnimatedText delay={2.5} stagger={0.04} variant="cinematic">
              Big ideas bloom
            </AnimatedText>
            
            {/* Subtle glow effect behind text */}
            <motion.div
              className="absolute inset-0 text-6xl md:text-8xl font-display opacity-20 blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: shouldReduceMotion ? 0 : 0.1 }}
              transition={{ delay: 3.5, duration: durations.slow }}
            >
              Big ideas bloom
            </motion.div>
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-muted relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: durations.standard, 
              delay: 3.2,
              ease: easings.organic 
            }}
          >
            <AnimatedText delay={3.4} stagger={0.02} variant="organic">
              from the tiniest details. ˚✿｡˚
            </AnimatedText>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator with organic motion */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 4.2, 
          duration: durations.standard,
          ease: easings.soft 
        }}
      >
        <motion.div
          animate={{ 
            y: shouldReduceMotion ? 0 : [0, 8, 0],
            scale: shouldReduceMotion ? 1 : [1, 1.02, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: easings.fluid
          }}
          className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center relative overflow-hidden"
        >
          {/* Animated dot with more organic motion */}
          <motion.div
            animate={{ 
              y: shouldReduceMotion ? 0 : [0, 24, 0],
              opacity: shouldReduceMotion ? 1 : [1, 0.3, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: easings.organic
            }}
            className="w-1 h-3 bg-charcoal/40 rounded-full mt-2"
          />
          
          {/* Subtle glow trail */}
          <motion.div
            animate={{ 
              y: shouldReduceMotion ? 0 : [0, 24, 0],
              opacity: shouldReduceMotion ? 0 : [0, 0.6, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: easings.organic,
              delay: 0.3
            }}
            className="absolute w-1 h-2 bg-charcoal/20 rounded-full mt-2 blur-sm"
          />
        </motion.div>
        
        {/* Scroll hint text */}
        <motion.p
          className="text-xs text-charcoal/50 mt-3 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: shouldReduceMotion ? 0.7 : 1 }}
          transition={{ 
            delay: 5, 
            duration: durations.slow,
            repeat: shouldReduceMotion ? 0 : Infinity,
            repeatType: "reverse",
            repeatDelay: 3
          }}
        >
          Scroll
        </motion.p>
      </motion.div>
    </section>
  )
}