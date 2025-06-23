'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import AnimatedText from './AnimatedText'
import { easings, durations, scrollAnimations } from '@/lib/motion'
import { usePageVisibility, useInViewport, gpuOptimizations } from '@/lib/performance'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isPageVisible = usePageVisibility()
  const [scrollIndicatorRef, isScrollIndicatorInView] = useInViewport()
  
  // Only animate when page is visible and element is in view
  const shouldAnimateScrollIndicator = !shouldReduceMotion && isPageVisible && isScrollIndicatorInView
  
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
      className="relative h-screen md:h-screen flex items-center justify-center overflow-hidden px-4"
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
        className="text-center z-10 px-4 md:px-6 relative max-w-4xl mx-auto"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display mb-4 md:mb-6 relative leading-tight"
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
            
            {/* Subtle glow effect behind text - hidden on mobile */}
            <motion.div
              className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display opacity-20 blur-sm hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: shouldReduceMotion ? 0 : 0.1 }}
              transition={{ delay: 3.5, duration: durations.slow }}
            >
              Big ideas bloom
            </motion.div>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted relative"
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
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 4.2, 
          duration: durations.standard,
          ease: easings.soft 
        }}
        style={gpuOptimizations.forTransforms}
      >
        <motion.div
          animate={shouldAnimateScrollIndicator ? { 
            y: [0, 8, 0]
          } : {}}
          transition={{ 
            duration: 4, 
            repeat: shouldAnimateScrollIndicator ? Infinity : 0,
            ease: easings.fluid,
            repeatType: "reverse"
          }}
          className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center relative overflow-hidden"
        >
          {/* Simplified animated dot */}
          <motion.div
            animate={shouldAnimateScrollIndicator ? { 
              y: [0, 20, 0]
            } : {}}
            transition={{ 
              duration: 4, 
              repeat: shouldAnimateScrollIndicator ? Infinity : 0,
              ease: easings.organic,
              repeatType: "reverse"
            }}
            className="w-1 h-3 bg-charcoal/40 rounded-full mt-2"
          />
        </motion.div>
        
        {/* Static scroll hint text */}
        <motion.p
          className="text-xs text-charcoal/50 mt-3 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ 
            delay: 5, 
            duration: durations.slow
          }}
        >
          Scroll
        </motion.p>
      </motion.div>
    </section>
  )
}