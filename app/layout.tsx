import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import MouseFollower from '@/components/MouseFollower'
import PageTransitionWrapper from '@/components/PageTransitionWrapper'
import GenerativeBackground from '@/components/GenerativeBackground'
import GenerativeAudio from '@/components/GenerativeAudio'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Jenna Eve - Graphic Designer',
  description: 'Big ideas bloom from the tiniest details.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <GenerativeBackground 
          colors={['#F5F5F0', '#F0F0E8', '#E8E8E0']}
          intensity={0.08}
        />
        <MouseFollower />
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
        <GenerativeAudio />
      </body>
    </html>
  )
}