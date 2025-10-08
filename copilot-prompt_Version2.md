# System role
You are GitHub Copilot in VS Code acting as a senior front‑end engineer, motion designer, and creative developer. Build a brand‑new portfolio website from scratch using my uploaded resume as the single content source. Use ONLY GSAP for animations. Do not use Framer Motion. Prefer tasteful, high‑performance interactions. Centralize theme tokens and site content in single config files. Optionally add tsParticles and/or Three.js to elevate interactivity toward an Awwwards‑level experience, with graceful fallbacks and reduced‑motion support.

# Inputs
- Resume file: ./resume.pdf (I will upload this)
- No reliance on any prior repo code. Scaffold a fresh project and implement everything new.
- If any brand hints (colors, typography) appear in the resume, use them; otherwise propose tasteful defaults.

# Primary goal
Create a fully working, production‑ready portfolio site driven entirely by:
- config/theme.(ts|js) for all theme tokens + motion constants
- config/index.(ts|js|json) for all copy and asset paths derived from the resume

# Project scaffold (from scratch)
- Framework: Next.js 14 (App Router) + React + TypeScript
- Styling: Tailwind CSS (or CSS Modules if preferable; pick one and keep consistent)
- Animation: GSAP only (use ScrollTrigger, ScrollToPlugin, Flip, MotionPath as needed; free plugins only)
- Optional: Three.js (with @react-three/fiber and @react-three/drei) for a lightweight hero scene
- Optional: tsParticles for ambient background particles
- Tooling: ESLint + Prettier; strict TypeScript

# Commands to run (in the integrated terminal)
- Create app scaffold:
  - npx create-next-app@latest my-portfolio --ts --eslint --tailwind --app --src-dir --use-npm --import-alias "@/*"
  - cd my-portfolio
- Install deps:
  - npm i gsap
  - Optional (only if used): npm i three @react-three/fiber @react-three/drei
  - Optional (only if used): npm i @tsparticles/react tsparticles-engine
- Dev:
  - npm run dev

# File structure
Create this structure and fill every file with complete, working code:
- src/app/
  - layout.tsx, page.tsx (compose sections)
- src/components/
  - hero/ (Gradient, Hero, HeroBackground, HeroTitle, MarqueeName, HeroLine, HeroDown)
  - nav/
  - about/
  - skills/
  - projects/
  - experience/
  - education/
  - contact/
  - shared/
    - Title
    - animations/ (gsap helpers: timelines, splitText utility without paid plugins)
    - hooks/ (useIsomorphicLayoutEffect, useReducedMotion, useScrollProgress)
    - particles/ (optional tsParticles wrapper)
    - three/ (optional: Scene.tsx, helpers)
- src/config/
  - types.ts      ← shared types for theme/content
  - theme.ts      ← single source of truth for tokens + motion
  - index.ts      ← single source of truth for all copy + image paths from resume
- src/styles/
  - globals.css   ← base/reset; if you need CSS variables, keep minimal and read tokens from theme.ts
- public/assets/… (images referenced from config/index.ts)

# Theme and content schema (generate these files and use them everywhere)
```ts
// src/config/types.ts
export type Motion = {
  durations: { xshort: number; short: number; base: number; long: number };
  easings: { easeOut: [number, number, number, number]; easeInOut: [number, number, number, number] };
  stagger: { base: number; tight: number };
  thresholds: { reveal: number };
  marqueeSpeed: number;
  parallaxStrength: number;
};

export type Theme = {
  colors: {
    background: string; surface: string; text: string; muted: string;
    primary: string; secondary: string; accent: string;
    gradient: [string, string, string];
  };
  typography: {
    fontFamily: string; fontMono?: string;
    scale: { h1: string; h2: string; h3: string; body: string; small: string };
    weights: { regular: number; medium: number; bold: number };
  };
  radii: { sm: string; md: string; lg: string; round: string };
  shadows: { sm: string; md: string; lg: string };
  blurs: { sm: string; md: string };
  layout: { container: number; breakpoints: { sm: number; md: number; lg: number; xl: number } };
  zIndex: { base: number; nav: number; overlay: number; modal: number };
  motion: Motion;
};

export type Link = { label: string; href: string };
export type Social = { name: string; url: string; iconKey?: string; handle?: string };

export type Project = {
  id: string; title: string; description: string;
  tags: string[]; image: string; repoUrl?: string; liveUrl?: string; year?: string;
};

export type Experience = {
  company: string; role: string; start: string; end: string;
  location?: string; bullets: string[]; url?: string; tech?: string[];
};

export type Education = {
  institution: string; degree: string; start: string; end: string; details?: string[];
};

export type Content = {
  site: { title: string; description: string; favicon: string; ogImage: string };
  nav: Link[];
  hero: { name: string; role: string; tagline: string; ctas: Link[]; marquee: string[]; portrait?: string; resumeUrl?: string };
  about: { heading: string; body: string[]; highlights?: string[]; image?: string };
  skills: { heading: string; groups: { title: string; items: string[] }[] };
  projects: { heading: string; items: Project[] };
  experience: { heading: string; items: Experience[] };
  education?: { heading: string; items: Education[] };
  certifications?: { heading: string; items: string[] };
  contact: { heading: string; email: string; socials: Social[] };
  assets: Record<string, string>;
};
```

```ts
// src/config/theme.ts (provide tasteful defaults; adjust from resume if hints exist)
import type { Theme } from "./types";

export const theme: Theme = {
  colors: {
    background: "#0b0d12",
    surface: "#121622",
    text: "#e6e8ef",
    muted: "#9aa0ad",
    primary: "#7c5cff",
    secondary: "#50e3c2",
    accent: "#ffb86b",
    gradient: ["#7c5cff", "#50e3c2", "#ffb86b"],
  },
  typography: {
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    fontMono: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    scale: {
      h1: "clamp(2.5rem, 6vw, 5rem)",
      h2: "clamp(2rem, 4vw, 3rem)",
      h3: "clamp(1.5rem, 2.5vw, 2rem)",
      body: "1rem",
      small: "0.875rem",
    },
    weights: { regular: 400, medium: 500, bold: 700 },
  },
  radii: { sm: "6px", md: "12px", lg: "20px", round: "999px" },
  shadows: {
    sm: "0 2px 8px rgba(0,0,0,0.15)",
    md: "0 8px 24px rgba(0,0,0,0.2)",
    lg: "0 16px 48px rgba(0,0,0,0.25)",
  },
  blurs: { sm: "8px", md: "16px" },
  layout: { container: 1240, breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 } },
  zIndex: { base: 0, nav: 50, overlay: 100, modal: 200 },
  motion: {
    durations: { xshort: 0.16, short: 0.26, base: 0.36, long: 0.6 },
    easings: { easeOut: [0.16, 1, 0.3, 1], easeInOut: [0.8, 0, 0.2, 1] },
    stagger: { base: 0.06, tight: 0.03 },
    thresholds: { reveal: 0.2 },
    marqueeSpeed: 90,
    parallaxStrength: 12,
  },
};

export default theme;
```

```ts
// src/config/index.ts (populate purely from resume; placeholders only if missing)
import type { Content } from "./types";

export const content: Content = {
  site: {
    title: "Your Name — Portfolio",
    description: "Your role | specialties | value proposition",
    favicon: "/assets/favicon.ico",
    ogImage: "/assets/og.jpg",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    name: "Your Name",
    role: "Your Role",
    tagline: "One-liner from your resume summary",
    ctas: [
      { label: "View Resume", href: "/assets/resume.pdf" },
      { label: "Contact", href: "#contact" },
    ],
    marquee: ["Your Role", "Keywords", "Industries"],
    portrait: "/assets/portrait.jpg",
    resumeUrl: "/assets/resume.pdf",
  },
  about: {
    heading: "About",
    body: [
      "Short summary from your resume highlighting impact and focus.",
      "Second paragraph with strengths, domains, and tools.",
    ],
    highlights: ["Key achievement 1", "Key achievement 2", "Key achievement 3"],
    image: "/assets/about.jpg",
  },
  skills: {
    heading: "Skills",
    groups: [
      { title: "Frontend", items: ["React", "Next.js", "TypeScript"] },
      { title: "Animations", items: ["GSAP", "ScrollTrigger"] },
      { title: "Design", items: ["Figma", "Design Systems"] },
    ],
  },
  projects: {
    heading: "Projects",
    items: [
      // Fill from resume projects or experience bullets:
      // { id: "proj-1", title: "...", description: "...", tags: ["React","GSAP"], image: "/assets/projects/1.jpg", repoUrl: "", liveUrl: "" }
    ],
  },
  experience: {
    heading: "Experience",
    items: [
      // Map each role from resume:
      // { company: "...", role: "...", start: "MMM YYYY", end: "Present", location: "City, Country", bullets: ["...","..."], url: "https://...", tech: ["..."] }
    ],
  },
  education: {
    heading: "Education",
    items: [
      // { institution: "...", degree: "...", start: "YYYY", end: "YYYY", details: ["..."] }
    ],
  },
  certifications: {
    heading: "Certifications",
    items: [
      // "Certification name — issuer (YYYY)"
    ],
  },
  contact: {
    heading: "Contact",
    email: "you@example.com",
    socials: [
      { name: "GitHub", url: "https://github.com/yourhandle", iconKey: "github" },
      { name: "LinkedIn", url: "https://linkedin.com/in/yourhandle", iconKey: "linkedin" },
      { name: "Twitter", url: "https://twitter.com/yourhandle", iconKey: "twitter" },
    ],
  },
  assets: {
    // Centralized mapping for images used throughout the site
  },
};

export default content;
```

# Sections to implement
- Navigation/Header: sticky or reveal‑on‑scroll, keyboard navigable, skip‑to‑content link.
- Hero: gradient background, large typographic title from resume, animated marquee, decorative line, down indicator. Optional: particles and/or Three.js hero scene. Respect reduced‑motion.
- About: summary and highlights from resume with subtle stagger.
- Skills: grouped skills from resume; balanced layout; micro‑interactions on hover.
- Projects: cards with responsive images, repo/live links; reveal and hover parallax.
- Experience: timeline/cards with scroll‑linked reveals and consistent rhythm.
- Education/Certifications: compact, readable layout with reveals.
- Contact/Footer: CTA, email, socials; accessibility first.

# Animations (GSAP only)
- Use GSAP timelines + ScrollTrigger for section reveals, staggers, parallax, and pinning.
- Centralize durations/easings/stagger in theme.motion.
- Transform‑only animations; will‑change applied prudently.
- Marquee: seamless GPU loop (translateX modulo), pause on hover, speed tied to viewport width. No layout thrash.
- Down indicator: subtle yo‑yo translateY with gentle opacity breathing.
- Split text: implement lightweight span splitter (no paid SplitText).
- Reduced motion: prefer once‑reveals, shortened durations, or static states while preserving layout.

# Optional enhancements
- tsParticles: tasteful, low‑density ambient particles in hero/footer; pause offscreen; disabled on reduced‑motion.
- Three.js (keep very light):
  - Option A: shader gradient/noise swirl subtly reacting to cursor/scroll.
  - Option B: point cloud/instanced geometry responding to interactions.
  - Option C: minimal 3D logotype with toned‑down bloom/FXAA.
- Client‑only dynamic imports; SSR‑safe guards; clean teardown on unmount.

# Accessibility & SEO
- Semantic landmarks and heading hierarchy.
- Keyboard operability and visible focus states aligned to theme.
- Alt text from content config. Color contrast maintained.
- JSON‑LD (Person + WebSite) using config/index.ts values.
- Meta + Open Graph tags sourced from content config.

# Performance
- Lazy load heavy modules (Three/Particles) with fallbacks.
- Optimize images (Next/Image or responsive <img> with sizes/srcset).
- Avoid layout shifts; pre‑size media; CSS containment where useful.
- Use ScrollTrigger once‑thresholds/intersection observers; throttle rAF loops.
- Target ≥ 90 Lighthouse for Performance and Accessibility.

# Resume parsing
- Extract: name, headline/summary, roles, location, contact, socials, skills (grouped), tools, experience (company, role, dates, bullets, links), education, certifications/awards, projects with links and tags.
- Populate config/index.ts comprehensively. Use placeholders and TODOs only when data is missing.
- Derive hero marquee terms from roles/skills/industries in resume.

# Output format (what you should produce)
- Write all files into the workspace with full contents and correct paths.
- Update package.json, tailwind config, tsconfig, and Next app files as needed.
- Provide a short README at project root with:
  - How to run and build
  - Dependencies added
  - How to edit config/theme and config/index
  - Notes on optional Three.js/tsParticles toggles and reduced‑motion

# Acceptance criteria
- Fresh Next.js project scaffolded; no Framer Motion usage anywhere; GSAP is the only animation engine.
- Theme and content 100% configurable via src/config/theme.ts and src/config/index.ts.
- Resume content mapped thoroughly across sections.
- Visual/structural polish with consistent motion language; no removed animations once defined.
- Reduced‑motion respected; keyboard navigable; strong contrast and alt text coverage.
- No TypeScript errors; no runtime console warnings.
- Strong Lighthouse scores (Performance & A11y ≥ 90).
- Optional Three.js/tsParticles integrate safely (code‑split, SSR‑safe, reduced‑motion aware) and remain tasteful.

# Kickoff
- Start by scaffolding the Next.js project and creating the src/config files.
- Parse resume.pdf and populate src/config/index.ts.
- Implement hero first (including marquee and down indicator), then nav, then the rest of the sections.
- Add GSAP animations with centralized tokens; verify reduced‑motion handling early.

Use this as the inspiration
https://github.com/lukeaelder/portfolioV3/

also create the project in this same directory