# Portfolio Website

A modern, high-performance portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and GSAP animations.

## Features

- ✨ Smooth GSAP animations with ScrollTrigger
- 🎨 Modern gradient backgrounds with canvas animations
- 📱 Fully responsive design
- ♿ Accessibility-first approach with reduced motion support
- 🚀 Optimized performance
- 🎯 Centralized configuration for easy customization
- 🌙 Clean, professional design

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP with ScrollTrigger
- **Optional:** Three.js, tsParticles (ready to integrate)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Soul1754/Portfolio.git
cd Portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Configuration

The portfolio is fully configurable through two central files:

### Theme Configuration (`src/config/theme.ts`)

Update colors, typography, spacing, and animation settings:

```typescript
export const theme: Theme = {
  colors: {
    background: "#0a0b0e",
    primary: "#6366f1",
    // ... more colors
  },
  motion: {
    durations: { base: 0.36, long: 0.6 },
    // ... more motion settings
  },
  // ... more theme settings
};
```

### Content Configuration (`src/config/index.ts`)

Update all text content, links, and portfolio data:

```typescript
export const content: Content = {
  hero: {
    name: "Your Name",
    role: "Your Role",
    // ... more content
  },
  // ... more sections
};
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── hero/              # Hero section components
│   ├── nav/               # Navigation
│   ├── about/             # About section
│   ├── skills/            # Skills section
│   ├── projects/          # Projects section
│   ├── experience/        # Experience section
│   ├── contact/           # Contact section
│   └── shared/            # Shared utilities
│       ├── hooks/         # Custom hooks
│       └── animations/    # Animation utilities
└── config/
    ├── types.ts           # TypeScript types
    ├── theme.ts           # Theme configuration
    └── index.ts           # Content configuration
```

## Customization Guide

1. **Update Personal Information:**

   - Edit `src/config/index.ts` with your details
   - Replace placeholder content with your actual data
   - Add your resume PDF to `public/resume.pdf`

2. **Customize Colors:**

   - Modify `src/config/theme.ts` colors section
   - Update gradient colors for the hero section

3. **Adjust Animations:**

   - Tweak animation timings in `theme.motion`
   - All animations respect `prefers-reduced-motion`

4. **Add Images:**
   - Place images in `public/assets/`
   - Update image paths in `src/config/index.ts`

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where appropriate
- Respects `prefers-reduced-motion`
- High contrast text for readability

## Performance

- Optimized for Core Web Vitals
- Lazy loading for heavy components
- Transform-only animations for smooth 60fps
- Minimal JavaScript bundle size

## Optional Enhancements

The project is set up to easily add:

- **Three.js:** 3D graphics and animations
- **tsParticles:** Ambient particle effects

Dependencies are already installed. Import and use as needed.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Built by [Siddhant Gaikwad](https://github.com/Soul1754)

Inspiration: [lukeaelder/portfolioV3](https://github.com/lukeaelder/portfolioV3)
