'use client'

import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { 
  Package, 
  Palette, 
  Layout, 
  Type, 
  Camera,
  Layers,
  Grid3x3,
  Zap,
  Coffee,
  Music
} from 'lucide-react'
import { Project } from '@/data/projects'
import { easings, springs, durations, hoverStates, variants } from '@/lib/motion'
import { usePageVisibility, useInViewport, gpuOptimizations } from '@/lib/performance'

const iconMap: { [key: string]: any } = {
  'mama-mangos': Coffee,
  'lifelog': Camera,
  'odu-impact-report': Layout,
  'odu-works': Layers,
  'quickway': Zap,
  'brand-guidelines': Palette,
  'utilitarian': Type,
  'ube-cold-brew': Coffee,
  'shiori': Grid3x3,
  'vibeify': Music,
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const Icon = iconMap[project.slug] || Package
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isPageVisible = usePageVisibility()
  const [cardInViewRef, isCardInView] = useInViewport()
  
  // Only animate when page is visible and card is in viewport
  const shouldAnimateCard = !shouldReduceMotion && isPageVisible && isCardInView
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Enhanced 3D transforms with more sophisticated physics
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], shouldReduceMotion ? [0, 0] : [12, -12]), 
    springs.ui
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], shouldReduceMotion ? [0, 0] : [-12, 12]), 
    springs.ui
  )
  
  // Add depth and lighting effects
  const shadowX = useTransform(mouseX, [-300, 300], [-20, 20])
  const shadowY = useTransform(mouseY, [-300, 300], [-20, 20])
  const brightness = useTransform(
    mouseX, 
    [-300, 0, 300], 
    shouldReduceMotion ? [1, 1, 1] : [0.95, 1.05, 0.95]
  )
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || shouldReduceMotion) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={variants.organic}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: durations.standard,
        delay: index * 0.08, // Slightly tighter stagger
        ease: easings.power,
      }}
      whileHover={shouldReduceMotion ? {} : {
        scale: 1.04,
        y: -8,
        transition: {
          type: "spring",
          ...springs.ui
        }
      }}
      style={{ 
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        filter: useTransform(brightness, (v) => `brightness(${v})`)
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div ref={cardInViewRef}>
        <Link href={`/project/${project.slug}`}>
          <motion.div 
            className="relative overflow-hidden rounded-2xl bg-white shadow-sm"
            style={{
              ...gpuOptimizations.forTransforms,
            boxShadow: useTransform([shadowX, shadowY], ([x, y]) => 
              `${x}px ${y}px 40px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.05)`
            )
          }}
          whileHover={{
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.1)"
          }}
          transition={{ duration: durations.fast, ease: easings.soft }}
        >
          {/* Enhanced background with subtle gradient */}
          <motion.div 
            className="aspect-[4/3] flex items-center justify-center p-8 relative overflow-hidden"
            style={{ backgroundColor: project.color + '15' }}
            whileHover={{ backgroundColor: project.color + '25' }}
            transition={{ duration: durations.fast }}
          >
            {/* Static background pattern - removed continuous animation */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 30% 70%, ${project.color}25 0%, transparent 60%)`
              }}
            />
            
            {/* Icon with magnetic hover effect */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : {
                rotate: 8,
                scale: 1.15,
                y: -4,
                transition: {
                  type: "spring",
                  ...springs.bouncy
                }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Removed continuous floating animation */}
              <motion.div>
                <Icon 
                  className="w-24 h-24 drop-shadow-sm"
                  style={{ 
                    color: project.color,
                    filter: `drop-shadow(0 4px 8px ${project.color}40)`
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced content section */}
          <motion.div 
            className="p-6 space-y-3 relative"
            style={{ transform: "translateZ(20px)" }}
          >
            <motion.p 
              className="text-sm text-muted uppercase tracking-wider font-medium"
              whileHover={{ color: project.color }}
              transition={{ duration: durations.micro }}
            >
              {project.category} • {project.year}
            </motion.p>
            
            <motion.h3 
              className="text-xl font-display font-medium text-charcoal leading-tight"
              whileHover={shouldReduceMotion ? {} : {
                y: -1,
                transition: { duration: durations.micro, ease: easings.snap }
              }}
            >
              {project.title}
            </motion.h3>
            
            <motion.p 
              className="text-muted leading-relaxed"
              whileHover={shouldReduceMotion ? {} : {
                opacity: 0.8,
                transition: { duration: durations.micro }
              }}
            >
              {project.description}
            </motion.p>
          </motion.div>

          {/* Enhanced overlay with gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br opacity-0 pointer-events-none"
            style={{ 
              background: `linear-gradient(135deg, ${project.color}08 0%, transparent 70%)` 
            }}
            whileHover={{ opacity: shouldReduceMotion ? 0 : 1 }}
            transition={{ duration: durations.fast, ease: easings.soft }}
          />
          
          {/* Subtle border highlight */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
            whileHover={{ 
              borderColor: shouldReduceMotion ? 'transparent' : project.color + '30' 
            }}
            transition={{ duration: durations.fast }}
          />
        </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}