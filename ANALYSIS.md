# Design Analysis Documentation

## MaxineAncheta.com Analysis

### Color Palette
- Primary: Light, minimalist color scheme
- Background: Off-white/cream (#FAF9F6)
- Text: Dark charcoal (#1A1A1A)
- Accents: Subtle pastels and muted tones

### Typography
- Display Font: Large, sans-serif headings (similar to Space Grotesk)
- Body Font: Clean, readable sans-serif (Inter)
- Font Weights: Multiple weights for hierarchy
- Special Characters: Decorative Unicode (⌘˚⊹, ✿, ◈)

### Animation Specifications

#### Hero Section
- **Text Reveal**: Sequential character animation
  - Effect: Fade-in-up with stagger
  - Transform: translateY(100%) → translateY(0%)
  - Opacity: 0 → 1
  - Duration: 0.8s
  - Easing: cubic-bezier(0.19, 1, 0.22, 1)
  
#### Scroll Animations
- **Parallax**: Hero content moves slower than scroll
  - Y-axis movement based on scroll progress
  - Opacity fade on scroll
  
- **Project Cards**: Viewport-triggered animations
  - Trigger: Intersection Observer
  - Effect: Fade-in-up
  - Stagger: 0.1s between cards
  - Duration: 0.6s

#### Hover States
- **Project Thumbnails**
  - Scale: 1.0 → 1.05
  - Overlay: Subtle color wash
  - Icon rotation/scale animation
  
#### Page Transitions
- **Route Changes**
  - Exit: Fade out (0.45s)
  - Enter: Fade in (0.45s)
  - Type: Smooth opacity transitions

#### Interactive Elements
- **Mouse Follower**
  - Spring physics for smooth tracking
  - Mix-blend-mode for contrast
  - Scale on hover states

### Layout Structure
- CSS Grid-based responsive system
- Asymmetrical grid placement
- Mobile-first breakpoints
- Container max-widths for readability

## JennaEve.com Content

### Navigation
- Work
- About 
- Contact

### Hero Quote
"Big ideas bloom from the tiniest details." ˚✿｡˚

### Projects (10 total)
1. Mama Mango's: More Than Just A Bakery
2. LifeLog: Turn Daily Snaps Into Lifelong Memories
3. ODU Student Recreation & Wellness Center - Impact Report 2025
4. ODU Student Recreation & Wellness Center - Works
5. QuickWay: Say Goodbye to Bus Confusions
6. Department of Graphic Design Brand Guidelines
7. Utilitarian
8. Ube Cold Brew: From Bean to Screen
9. Shiori: The Art of Simplicity
10. Vibeify: Your City, Your Sound

### Contact Information
- Instagram: @jenxeve
- Email: jennaevebaloy@gmail.com
- LinkedIn: Jenna Eve A. Baloy
- Resume: Available for download

### Footer
"© 2025 Jenna Eve. All rights reserved."

## Implementation Notes

### Performance Optimizations
- Reduced motion for accessibility
- Lazy loading for images
- Code splitting per route
- Optimized animation keyframes

### Responsive Considerations
- Simplified animations on mobile
- Touch-friendly interactions
- Adjusted typography scale
- Grid layout adaptations