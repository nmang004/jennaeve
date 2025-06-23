# Jenna Eve Portfolio

A stunning, animated portfolio website for graphic designer Jenna Eve, built with modern web technologies and featuring fluid animations inspired by industry-leading design portfolios.

## 🎯 Project Status

✅ **Development Complete** - All features implemented and tested
✅ **Build Status** - Clean build with no errors
✅ **Type Safety** - Full TypeScript coverage
✅ **Code Quality** - ESLint checks passing

## 🚀 Live Demo

The development server can be started at [http://localhost:3000](http://localhost:3000)

## ✨ Key Features Implemented

### Design & Animation
- **Smooth Preloader** - Elegant loading animation on first visit
- **Page Transitions** - Seamless navigation with AnimatePresence
- **Parallax Hero Section** - Scroll-based depth effects with smooth parallax
- **Staggered Text Reveals** - Character-by-character animations with spring physics
- **3D Project Cards** - Mouse-tracked parallax with rotation effects
- **Viewport Animations** - Elements animate as they enter view
- **Interactive Mouse Follower** - Custom cursor with blend modes
- **Accessibility Support** - Reduced motion support for users with preferences

### Technical Implementation
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS v3, Framer Motion 12
- **Modular Components**: Separated foundational, composite, and section components
- **Advanced Animations**: Mouse parallax, 3D transforms, spring physics
- **Performance First**: Static generation, optimized bundles (153KB first load)
- **Responsive Design**: Mobile-first with fluid breakpoints (sm/md/lg)
- **Type Safety**: Strict TypeScript with proper Framer Motion typing
- **Accessibility**: Reduced motion support, semantic HTML, proper ARIA

### Content Structure
- **Home Page**: Hero section with animated quote + 10 project cards
- **Project Pages**: Dynamic routes for each project with case studies
- **About Page**: Personal introduction with skills showcase
- **Contact Footer**: Social links and call-to-action

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion 12.18.1
- **Icons**: Lucide React 0.522.0
- **Font Loading**: Next/font with Inter & Space Grotesk
- **Deployment**: Optimized for Vercel

## 📦 Installation

```bash
# Clone the repository
git clone [repository-url]
cd jennaeve-portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

## 🧪 Development Commands

```bash
npm run dev        # Start development server
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Check TypeScript types
```

## 📁 Project Structure

```
jennaeve-portfolio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page with project grid
│   ├── about/             # About page
│   ├── project/[slug]/    # Dynamic project pages
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Global styles and Tailwind
├── components/            # Reusable components
│   ├── AnimatedText.tsx   # Staggered character animation
│   ├── Header.tsx         # Sticky navigation with scroll effects
│   ├── Footer.tsx         # Contact section
│   ├── ProjectCard.tsx    # 3D animated project cards
│   ├── ProjectGrid.tsx    # Responsive project grid
│   ├── HeroSection.tsx    # Parallax hero with scroll effects
│   ├── PageTransitionWrapper.tsx # Page transition management
│   ├── Preloader.tsx      # Loading animation
│   ├── MouseFollower.tsx  # Custom cursor
│   ├── Tag.tsx           # Project category tags
│   ├── Button.tsx        # Reusable button component
│   └── PlaceholderIcon.tsx # Icon placeholder
├── data/
│   └── projects.ts        # Project data and types
├── public/                # Static assets
├── CLAUDE.md             # AI assistant guide
├── ANALYSIS.md           # Design analysis documentation
└── [config files]        # Various configuration files
```

## 🎨 Design System

### Colors
- **Cream**: `#FAF9F6` - Primary background
- **Charcoal**: `#1A1A1A` - Primary text
- **Accent**: `#FF6B6B` - Highlight color
- **Muted**: `#666666` - Secondary text

### Typography
- **Display**: Space Grotesk - Headings
- **Body**: Inter - Paragraph text

### Animation Timing
- **Easing**: `cubic-bezier(0.19, 1, 0.22, 1)`
- **Duration**: 0.6s - 0.8s for most animations
- **Stagger**: 0.1s between elements

## 🏗 Component Architecture

### Foundational Components
- **Tag**: Category labels with styled backgrounds
- **Button**: Reusable link buttons with hover states
- **PlaceholderIcon**: Consistent icon placeholders using Lucide React

### Composite Components  
- **ProjectCard**: Advanced 3D animated cards with mouse parallax
- **Header**: Scroll-aware navigation with backdrop blur

### Section Components
- **HeroSection**: Full-screen parallax hero with staggered text
- **ProjectGrid**: Responsive grid with viewport-triggered animations

### Animation System
- **Global**: Page transitions with AnimatePresence
- **Scroll-based**: Parallax effects using useScroll and useTransform
- **Mouse-tracking**: 3D rotation effects with useMotionValue
- **Viewport**: whileInView animations with spring physics
- **Accessibility**: useReducedMotion for user preferences

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Deploy with default settings - no configuration needed

### Build Output

```
Route (app)                    Size     First Load JS
┌ ○ /                         7.29 kB   153 kB
├ ○ /_not-found              977 B     102 kB
├ ○ /about                   2.85 kB   146 kB
└ ƒ /project/[slug]          3.29 kB   147 kB
+ First Load JS shared by all 101 kB
```

## 🔧 Performance Optimizations

- **Static Generation**: All pages pre-rendered at build time
- **Component Architecture**: Modular components for better code splitting
- **Font Optimization**: Self-hosted fonts with next/font
- **Animation Performance**: GPU-accelerated transforms and spring physics
- **Bundle Optimization**: Tree shaking and minimal dependencies
- **Responsive Images**: Optimized loading with proper sizing
- **Reduced Motion**: Accessibility-first animation approach

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## 🤝 Contributing

This is a personal portfolio project. For similar projects or collaborations, please contact through the portfolio contact form.

## 📄 License

All rights reserved. This portfolio design is proprietary to Jenna Eve.

---

**Created with**: Next.js, TypeScript, Tailwind CSS, and Framer Motion
**Inspired by**: maxineancheta.com design aesthetics
**Content from**: jennaeve.com