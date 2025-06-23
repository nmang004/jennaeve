import React from 'react'
import { ImageIcon } from 'lucide-react'

interface PlaceholderIconProps {
  className?: string
}

export default function PlaceholderIcon({ className = '' }: PlaceholderIconProps) {
  return (
    <ImageIcon className={`w-full h-full text-muted/30 ${className}`} />
  )
}