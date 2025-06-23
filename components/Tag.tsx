import React from 'react'

interface TagProps {
  text: string
}

export default function Tag({ text }: TagProps) {
  return (
    <span className="inline-block bg-charcoal/10 text-charcoal text-xs font-medium px-3 py-1 rounded-full">
      {text}
    </span>
  )
}