import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href: string
}

export default function Button({ children, href }: ButtonProps) {
  return (
    <Link 
      href={href}
      className="inline-flex items-center gap-2 bg-charcoal text-cream px-6 py-3 rounded-full font-medium text-sm hover:bg-charcoal/90 active:scale-95 transition-all duration-200"
    >
      {children}
    </Link>
  )
}