'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedText from '@/components/AnimatedText'
import { Sparkles, Heart, Palette, Code } from 'lucide-react'

export default function AboutPage() {
  const skills = [
    { icon: Palette, name: 'Visual Design', description: 'Creating beautiful, purposeful designs' },
    { icon: Code, name: 'Digital Craft', description: 'Bringing ideas to life with technology' },
    { icon: Heart, name: 'User Focus', description: 'Designing with empathy and intention' },
    { icon: Sparkles, name: 'Innovation', description: 'Pushing creative boundaries' },
  ]

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display mb-8">
              <AnimatedText>About Me</AnimatedText>
            </h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted space-y-6 mb-16"
            >
              <p>
                Hello! I&apos;m Jenna Eve, a graphic designer passionate about creating 
                meaningful visual experiences that connect with people on a deeper level.
              </p>
              <p>
                My approach to design is rooted in the belief that big ideas bloom from 
                the tiniest details. I find inspiration in the subtle moments and 
                intricate patterns that others might overlook.
              </p>
              <p>
                Through my work, I strive to blend aesthetic beauty with functional 
                purpose, creating designs that not only look good but also serve their 
                intended purpose effectively.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-display mb-8">What I Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      <Icon className="w-8 h-8 mb-4 text-accent" />
                      <h3 className="text-xl font-medium mb-2">{skill.name}</h3>
                      <p className="text-muted">{skill.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <p className="text-2xl text-muted mb-8">
                Let&apos;s create something beautiful together.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-charcoal text-cream px-8 py-4 rounded-full font-medium hover:bg-charcoal/90 transition-colors"
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}