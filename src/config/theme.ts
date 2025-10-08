import type { Theme } from "./types";

export const theme: Theme = {
  colors: {
    background: "#0a0b0e",
    surface: "#111318",
    text: "#e8eaed",
    muted: "#9399a3",
    primary: "#6366f1",
    secondary: "#3b82f6",
    accent: "#8b5cf6",
    gradient: ["#6366f1", "#8b5cf6", "#3b82f6"],
  },
  typography: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
    fontMono:
      "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
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
  layout: {
    container: 1240,
    breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  zIndex: { base: 0, nav: 50, overlay: 100, modal: 200 },
  motion: {
    durations: { xshort: 0.16, short: 0.26, base: 0.36, long: 0.6 },
    easings: {
      easeOut: [0.16, 1, 0.3, 1],
      easeInOut: [0.8, 0, 0.2, 1],
    },
    stagger: { base: 0.06, tight: 0.03 },
    thresholds: { reveal: 0.2 },
    marqueeSpeed: 90,
    parallaxStrength: 12,
  },
};

export default theme;
