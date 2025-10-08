// Type definitions for theme and content configuration

export type Motion = {
  durations: { xshort: number; short: number; base: number; long: number };
  easings: {
    easeOut: [number, number, number, number];
    easeInOut: [number, number, number, number];
  };
  stagger: { base: number; tight: number };
  thresholds: { reveal: number };
  marqueeSpeed: number;
  parallaxStrength: number;
};

export type Theme = {
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    secondary: string;
    accent: string;
    gradient: [string, string, string];
  };
  typography: {
    fontFamily: string;
    fontMono?: string;
    scale: { h1: string; h2: string; h3: string; body: string; small: string };
    weights: { regular: number; medium: number; bold: number };
  };
  radii: { sm: string; md: string; lg: string; round: string };
  shadows: { sm: string; md: string; lg: string };
  blurs: { sm: string; md: string };
  layout: {
    container: number;
    breakpoints: { sm: number; md: number; lg: number; xl: number };
  };
  zIndex: { base: number; nav: number; overlay: number; modal: number };
  motion: Motion;
};

export type Link = { label: string; href: string };
export type Social = {
  name: string;
  url: string;
  iconKey?: string;
  handle?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  repoUrl?: string;
  liveUrl?: string;
  year?: string;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  bullets: string[];
  url?: string;
  tech?: string[];
};

export type Education = {
  institution: string;
  degree: string;
  start: string;
  end: string;
  details?: string[];
};

export type Content = {
  site: {
    title: string;
    description: string;
    favicon: string;
    ogImage: string;
  };
  nav: Link[];
  hero: {
    name: string;
    role: string;
    tagline: string;
    ctas: Link[];
    marquee: string[];
    portrait?: string;
    resumeUrl?: string;
  };
  about: {
    heading: string;
    body: string[];
    highlights?: string[];
    image?: string;
  };
  skills: { heading: string; groups: { title: string; items: string[] }[] };
  projects: { heading: string; items: Project[] };
  experience: { heading: string; items: Experience[] };
  education?: { heading: string; items: Education[] };
  certifications?: { heading: string; items: string[] };
  contact: { heading: string; email: string; socials: Social[] };
  assets: Record<string, string>;
};
