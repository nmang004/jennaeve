'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedText from '@/components/AnimatedText'
import { projects } from '@/data/projects'

export default function ProjectPage() {
  const params = useParams()
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-charcoal transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <p className="text-sm text-muted uppercase tracking-wider mb-4">
                {project.category} • {project.year}
              </p>
              <h1 className="text-5xl md:text-7xl font-display mb-4">
                <AnimatedText>{project.title}</AnimatedText>
              </h1>
              <p className="text-2xl text-muted">
                {project.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="aspect-video rounded-2xl overflow-hidden mb-16"
              style={{ backgroundColor: project.color + '20' }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-6xl"
                >
                  ✿
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none mb-16"
            >
              <h2>Project Overview</h2>
              <p>
                This project showcases innovative design thinking and creative problem-solving. 
                Through careful consideration of user needs and aesthetic principles, we developed 
                a solution that balances functionality with visual appeal.
              </p>

              <h3>Design Process</h3>
              <p>
                Our approach began with extensive research and ideation, followed by iterative 
                prototyping and refinement. Each decision was guided by the project&apos;s core 
                objectives and the target audience&apos;s needs.
              </p>

              <h3>Key Features</h3>
              <ul>
                <li>Thoughtful typography and color selection</li>
                <li>Intuitive user interface design</li>
                <li>Cohesive visual identity system</li>
                <li>Responsive and accessible implementation</li>
              </ul>

              <h3>Results</h3>
              <p>
                The final deliverables exceeded client expectations and demonstrated the power 
                of strategic design thinking. This project serves as a testament to the impact 
                that thoughtful design can have on user experience and brand perception.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-[4/3] rounded-xl overflow-hidden"
                  style={{ backgroundColor: project.color + '10' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl opacity-50">◈</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  )
}