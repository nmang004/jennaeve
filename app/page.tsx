'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import ProjectGrid from '@/components/ProjectGrid'
import Preloader from '@/components/Preloader'

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      
      <main className="min-h-screen">
        <HeroSection />
        <ProjectGrid />
      </main>

      <Footer />
    </>
  )
}