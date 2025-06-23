/**
 * Motion Design System
 * Custom easing curves and animation primitives for award-worthy animations
 */

// SIGNATURE EASING CURVES
export const easings = {
  // Powerful, fast-starting curve for entrances - creates immediate impact
  power: [0.19, 1, 0.22, 1] as const,
  
  // Soft, natural curve for exits - gentle and comfortable
  soft: [0.25, 0.46, 0.45, 0.94] as const,
  
  // Organic bounce for interactive elements - feels physically satisfying
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  
  // Fluid motion for continuous animations - like water flowing
  fluid: [0.4, 0, 0.2, 1] as const,
  
  // Sharp, snappy response for UI feedback - immediate and crisp
  snap: [0.55, 0.085, 0.68, 0.53] as const,
  
  // Luxurious, slow reveal for hero elements - builds anticipation
  luxe: [0.16, 1, 0.3, 1] as const,
  
  // Organic ease inspired by natural phenomena
  organic: [0.25, 0.1, 0.25, 1] as const,
  
  // Cinematic entrance for dramatic reveals
  cinematic: [0.83, 0, 0.17, 1] as const
} as const

// SPRING CONFIGURATIONS
export const springs = {
  // Tight, responsive spring for UI elements
  ui: { 
    damping: 30, 
    stiffness: 300,
    mass: 0.8
  },
  
  // Gentle spring for text and content
  gentle: { 
    damping: 25, 
    stiffness: 120,
    mass: 1
  },
  
  // Bouncy spring for playful interactions
  bouncy: { 
    damping: 15, 
    stiffness: 200,
    mass: 1.2
  },
  
  // Heavy spring for dramatic effects
  heavy: { 
    damping: 40, 
    stiffness: 100,
    mass: 2
  },
  
  // Quick snap for immediate feedback
  snap: { 
    damping: 35, 
    stiffness: 400,
    mass: 0.5
  }
} as const

// DURATION SCALES
export const durations = {
  // Micro-interactions (hover, click feedback)
  micro: 0.15,
  
  // Fast UI transitions
  fast: 0.3,
  
  // Standard content transitions
  standard: 0.6,
  
  // Slow, luxurious reveals
  slow: 0.9,
  
  // Cinematic sequences
  cinematic: 1.2,
  
  // Epic hero animations
  epic: 1.8
} as const

// STAGGER PATTERNS
export const staggers = {
  // Tight stagger for UI elements
  tight: 0.03,
  
  // Standard text stagger
  text: 0.05,
  
  // Comfortable content stagger
  content: 0.08,
  
  // Dramatic reveal stagger
  dramatic: 0.12,
  
  // Cascading effect with acceleration
  cascade: (index: number) => 0.1 / (index + 1)
} as const

// ANIMATION VARIANTS
export const variants = {
  // Fade up with power curve
  fadeUp: {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: durations.standard,
        ease: easings.power
      }
    }
  },
  
  // Cinematic scale reveal
  scaleReveal: {
    hidden: { 
      opacity: 0, 
      scale: 1.1,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: durations.slow,
        ease: easings.cinematic
      }
    }
  },
  
  // Liquid motion for flowing elements
  liquid: {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: durations.standard,
        ease: easings.fluid
      }
    }
  },
  
  // Organic entrance with subtle rotation
  organic: {
    hidden: { 
      opacity: 0, 
      y: 25,
      rotate: -2,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: durations.standard,
        ease: easings.organic
      }
    }
  }
} as const

// HOVER STATES
export const hoverStates = {
  // Gentle lift
  lift: {
    y: -4,
    scale: 1.02,
    transition: {
      duration: durations.micro,
      ease: easings.snap
    }
  },
  
  // Subtle glow effect (via shadow)
  glow: {
    scale: 1.03,
    filter: "brightness(1.05)",
    transition: {
      duration: durations.fast,
      ease: easings.soft
    }
  },
  
  // Playful bounce
  bounce: {
    scale: 1.05,
    rotate: 1,
    transition: {
      duration: durations.micro,
      ease: easings.bounce
    }
  },
  
  // Magnetic attraction effect
  magnetic: {
    scale: 1.08,
    rotate: 2,
    y: -6,
    transition: {
      type: "spring",
      ...springs.bouncy
    }
  }
} as const

// CONTAINER VARIANTS FOR STAGGERED ANIMATIONS
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay = staggers.content) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.2
    }
  })
} as const

// SCROLL-TRIGGERED ANIMATION UTILITIES
export const scrollAnimations = {
  // Parallax transforms
  parallax: (intensity = 0.5) => ({
    y: [0, -100 * intensity],
    scale: [1, 1 + intensity * 0.1]
  }),
  
  // Fade on scroll
  fadeOnScroll: {
    opacity: [1, 0],
    y: [0, -50]
  },
  
  // Scale on scroll
  scaleOnScroll: {
    scale: [1, 0.8],
    opacity: [1, 0.6]
  }
} as const

// PERFORMANCE OPTIMIZATIONS
export const performanceSettings = {
  // Optimized viewport settings
  viewport: {
    once: true,
    amount: 0.2,
    margin: "0px 0px -10% 0px"
  },
  
  // Reduced motion preferences
  reducedMotion: {
    duration: 0.2,
    ease: "linear"
  }
} as const

// PHYSICS-based animations for natural feel
export const physics = {
  // Drag interactions
  drag: {
    dragConstraints: { left: -100, right: 100, top: -100, bottom: 100 },
    dragElastic: 0.1,
    dragTransition: { 
      bounceStiffness: 300, 
      bounceDamping: 20 
    }
  },
  
  // Inertia for thrown objects
  inertia: {
    type: "inertia" as const,
    bounceStiffness: 300,
    bounceDamping: 30,
    timeConstant: 750
  }
} as const