'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex items-center justify-between">
        <Link href="/" className="font-display text-xl md:text-2xl font-medium">
          Jenna Eve
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <Link 
            href="/" 
            className="text-charcoal/80 hover:text-charcoal transition-colors duration-300 text-sm md:text-base py-2 px-1 min-h-[44px] flex items-center"
          >
            Work
          </Link>
          <Link 
            href="/about" 
            className="text-charcoal/80 hover:text-charcoal transition-colors duration-300 text-sm md:text-base py-2 px-1 min-h-[44px] flex items-center"
          >
            About
          </Link>
          <Link 
            href="#contact" 
            className="text-charcoal/80 hover:text-charcoal transition-colors duration-300 text-sm md:text-base py-2 px-1 min-h-[44px] flex items-center"
          >
            Contact
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}