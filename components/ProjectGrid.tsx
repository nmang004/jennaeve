'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'
import { containerVariants, easings, durations, staggers } from '@/lib/motion'
import { usePageVisibility, useInViewport, gpuOptimizations } from '@/lib/performance'

export default function ProjectGrid() {
  const shouldReduceMotion = useReducedMotion()
  const isPageVisible = usePageVisibility()
  const [backgroundRef, isBackgroundInView] = useInViewport()
  
  // Only animate background elements when in view and page is visible
  const shouldAnimateBackground = !shouldReduceMotion && isPageVisible && isBackgroundInView

  // Advanced orchestration with cascading reveals
  const gridVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.standard,
        ease: easings.power,
        staggerChildren: shouldReduceMotion ? 0 : staggers.content,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
        // Create wave-like reveal pattern
        when: "beforeChildren"
      }
    }
  }

  // Background reveal with subtle texture
  const backgroundVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.05,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: durations.slow,
        ease: easings.luxe,
        delay: 0.1
      }
    }
  }

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Simplified background */}
      <motion.div
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        variants={backgroundVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cream/50 via-transparent to-cream/30" />
        
        {/* Static geometric elements - removed continuous animations */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-charcoal/4 rounded-full blur-xl"
          animate={shouldAnimateBackground ? {
            y: [0, -10, 0]
          } : {}}
          transition={{
            duration: 6,
            repeat: shouldAnimateBackground ? Infinity : 0,
            ease: easings.fluid,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 bg-charcoal/3 rounded-full blur-xl"
          animate={shouldAnimateBackground ? {
            y: [0, 8, 0]
          } : {}}
          transition={{
            duration: 8,
            repeat: shouldAnimateBackground ? Infinity : 0,
            ease: easings.fluid,
            repeatType: "reverse",
            delay: 3
          }}
        />
      </motion.div>

      <div className="container mx-auto relative">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {projects.map((project, index) => {
            // Calculate position-based timing variations
            const row = Math.floor(index / 3)
            const col = index % 3
            const isCenter = col === 1
            const isEdge = col === 0 || col === 2
            
            return (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 40 + (row * 10), // Vary by row
                    x: isCenter ? 0 : (isEdge && col === 0 ? -20 : 20), // Vary by column
                    scale: 0.95,
                    filter: "blur(2px)"
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    x: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      duration: durations.standard + (index * 0.05),
                      ease: easings.organic,
                      delay: shouldReduceMotion ? 0 : (
                        // Create diagonal wave pattern
                        (row * 0.1) + (col * 0.05) + (index * 0.02)
                      )
                    }
                  }
                }}
                // Removed continuous floating animation for better performance
                style={gpuOptimizations.forTransforms}
              >
                <ProjectCard 
                  project={project} 
                  index={index}
                />
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Reveal completion indicator */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: durations.standard,
            ease: easings.bounce,
            delay: shouldReduceMotion ? 0 : projects.length * 0.08 + 0.5
          }}
        >
          <motion.div
            className="inline-block w-2 h-2 bg-charcoal/30 rounded-full"
            animate={shouldReduceMotion ? {} : {
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: easings.fluid
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}