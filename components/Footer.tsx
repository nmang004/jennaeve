'use client'

import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail, FileText } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/jenxeve', label: '@jenxeve' },
    { icon: Mail, href: 'mailto:jennaevebaloy@gmail.com', label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com/in/jenna-eve-baloy', label: 'LinkedIn' },
    { icon: FileText, href: '#', label: 'Resume' },
  ]

  return (
    <footer id="contact" className="bg-charcoal text-cream py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl font-display">Let&apos;s Create Together</h2>
          
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-cream/10 hover:bg-cream/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              )
            })}
          </div>

          <div className="pt-8 border-t border-cream/20">
            <p className="text-cream/60">
              © {currentYear} Jenna Eve. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}