# Claude Development Guide

This file contains important information for Claude or other AI assistants working on this project.

## Project Overview

This is a portfolio website for Jenna Eve, a graphic designer. The site features:
- Modern animations inspired by maxineancheta.com
- Content structure from jennaeve.com
- Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion

## Key Commands

Always run these commands before committing changes:

```bash
npm run build      # Build the production bundle
npm run typecheck  # Check TypeScript types
npm run lint       # Run ESLint checks
```

## Project Structure

```
jennaeve-portfolio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page with project grid
│   ├── about/page.tsx     # About page
│   ├── project/[slug]/    # Dynamic project pages
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Global styles and Tailwind
├── components/            # Reusable components
│   ├── AnimatedText.tsx   # Staggered text animation
│   ├── Header.tsx         # Sticky navigation
│   ├── Footer.tsx         # Contact section
│   ├── ProjectCard.tsx    # Project grid cards
│   ├── Preloader.tsx      # Loading animation
│   └── MouseFollower.tsx  # Custom cursor
├── data/
│   └── projects.ts        # Project data and types
└── public/                # Static assets

```

## Important Technical Details

### Animations
- All animations use Framer Motion
- Scroll-triggered animations use `whileInView` with `viewport={{ once: true }}`
- Page transitions handled by AnimatePresence
- Spring physics for smooth interactions

### TypeScript
- Strict mode enabled
- All components fully typed
- Use `as const` for animation variant types to avoid errors

### Styling
- Tailwind CSS v3 (not v4 - causes PostCSS issues)
- Custom colors defined in tailwind.config.js
- Design tokens: cream, charcoal, accent, muted
- Fonts: Inter (body), Space Grotesk (display)

### Common Issues & Solutions

1. **PostCSS/Tailwind Build Errors**
   - Use Tailwind CSS v3, not v4
   - Ensure postcss version matches Next.js requirements

2. **ESLint Unescaped Entities**
   - Replace apostrophes with `&apos;`
   - Use HTML entities for special characters

3. **Framer Motion TypeScript Errors**
   - Add `as const` to animation type strings
   - Ensure variant objects match Framer Motion types

## Development Workflow

1. Make changes to components/pages
2. Test locally with `npm run dev`
3. Run all checks: `npm run build && npm run typecheck && npm run lint`
4. Fix any errors before proceeding
5. Test responsive design at all breakpoints
6. Verify animations work smoothly

## Performance Considerations

- Images use placeholder icons (Lucide React) to avoid external dependencies
- Lazy loading implemented for better performance
- Animations simplified on mobile devices
- Static generation for most pages

## Deployment

The project is optimized for Vercel deployment:
- No environment variables required
- Automatic builds on push
- Static pages pre-rendered at build time

## Motion Design System

This project features an award-worthy Motion Design System documented in `MOTION_DESIGN_SYSTEM.md`. Key features include:

### Advanced Animation Architecture
- **Custom Easing Curves**: 8 signature curves for different emotional responses
- **Spring Physics**: Natural, physics-based interactions throughout
- **Sophisticated Timing**: Orchestrated reveals with position-based variations
- **Organic Motion**: Imperfect, human-like animation patterns

### GPU-Accelerated Visuals
- **Generative Background**: GLSL shader with flowing noise and gradients
- **Shader Distortion**: Interactive ripple and distortion effects
- **Performance Optimized**: 60fps target with reduced motion support

### Generative Audio
- **Ambient Soundscapes**: Subtle, evolving background audio
- **Interaction Feedback**: Harmonic responses to user actions
- **Full Control**: User-controlled volume and mute functionality

### Advanced Cursor
- **Multi-Element Design**: Core cursor, trail, and context-aware states
- **Physics-Based**: Spring animations with hover detection
- **Visual Feedback**: Pulse effects and state transformations

## Future Enhancements

Potential improvements to consider:
- Add real project images when available
- Implement dark mode toggle with motion-aware transitions
- Create a CMS integration for dynamic content
- Add WebXR integration for immersive project viewing
- Implement biometric feedback for responsive ambient effects
- Add AI-driven animation timing based on user behavior patterns