# 🚀 Quick Start Guide

## Your Portfolio is Ready!

The portfolio has been built according to your specifications with:

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ GSAP animations (NO Framer Motion)
- ✅ Centralized configuration
- ✅ Accessibility features
- ✅ Reduced motion support

## Immediate Next Steps

### 1. Customize Your Content (5-10 minutes)

Open `src/config/index.ts` and update:

```typescript
// Update hero section
hero: {
  name: "Your Full Name",           // Replace with your name
  role: "Your Professional Title",   // e.g., "Senior Full Stack Developer"
  tagline: "Your unique value proposition...",
  // ...
}

// Update about section
about: {
  body: [
    "Write your professional summary here...",
    "Add more details about your experience..."
  ],
  highlights: [
    "Key achievement or skill 1",
    "Key achievement or skill 2"
  ]
}

// Update projects with your actual work
projects: {
  items: [
    {
      title: "Project Name",
      description: "What you built and the impact",
      tags: ["React", "Node.js", "etc"],
      liveUrl: "https://...",
      repoUrl: "https://github.com/...",
    }
  ]
}

// Update experience with your work history
// Update skills with your tech stack
// Update contact info with your email and social links
```

### 2. Customize Theme Colors (Optional)

Edit `src/config/theme.ts`:

```typescript
colors: {
  primary: "#6366f1",    // Your brand color
  secondary: "#3b82f6",  // Accent color
  accent: "#8b5cf6",     // Highlight color
  // ...
}
```

### 3. Add Your Images

Place your images in the `public/assets/` directory:

- Project screenshots
- Profile photo
- Any other images

Then update paths in `src/config/index.ts`.

### 4. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Alternative: Deploy to Netlify

```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

## Running Locally

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Customization Tips

### Change Animation Speed

Edit `src/config/theme.ts`:

```typescript
motion: {
  durations: {
    base: 0.36,  // Make smaller for faster, larger for slower
    long: 0.6
  }
}
```

### Add New Sections

1. Create component in `src/components/[section-name]/`
2. Add GSAP animations following existing patterns
3. Import and add to `src/app/page.tsx`

### Modify Layout

- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind classes inline
- Custom CSS: Add to component files or globals.css

## Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### TypeScript Errors

Check that all types are properly imported from `src/config/types.ts`

### Animation Not Working

Ensure GSAP is properly initialized:

```typescript
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **GSAP Docs:** https://gsap.com/docs/v3/
- **Tailwind CSS:** https://tailwindcss.com/docs

## Support

For issues or questions about the codebase:

1. Check `BUILD_COMPLETE.md` for full documentation
2. Review `README.md` for detailed setup instructions
3. Check component files for inline comments

---

**Pro Tip:** Start by updating just the hero and about sections, then preview in the browser before tackling the rest!

Happy coding! 🎉
