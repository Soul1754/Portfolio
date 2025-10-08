"use client";

import { useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/config";
import { theme } from "@/config/theme";
import { useReducedMotion } from "@/components/shared/hooks/useReducedMotion";

// Dynamic import for Three.js scene
const ContactScene = dynamic(() => import("@/components/three/ContactScene"), {
  ssr: false,
  loading: () => null,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  twitter: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: theme.motion.durations.long,
          ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
        });
      }

      // Content stagger
      if (contentRef.current) {
        const elements = contentRef.current.children;
        gsap.from(elements, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 40,
          duration: theme.motion.durations.base,
          stagger: theme.motion.stagger.base,
          ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-32 px-6 bg-gradient-to-b from-[#0a0b0e] to-[#111318] overflow-hidden"
    >
      {/* Three.js Particle Background */}
      <Suspense fallback={null}>
        <ContactScene />
      </Suspense>

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold mb-12"
          style={{
            fontSize: theme.typography.scale.h2,
            background: `linear-gradient(135deg, ${theme.colors.gradient[0]}, ${theme.colors.gradient[1]}, ${theme.colors.gradient[2]})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {content.contact.heading}
        </h2>

        <div ref={contentRef} className="space-y-12">
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            I&apos;m always open to new opportunities and collaborations. Feel
            free to reach out!
          </p>

          {/* Email CTA */}
          <div className="flex justify-center">
            <a
              href={`mailto:${content.contact.email}`}
              className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-medium rounded-2xl bg-gradient-to-r from-primary to-accent text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg
                className="w-5 h-5 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="relative z-10">{content.contact.email}</span>
            </a>
          </div>

          {/* Social links */}
          <div>
            <p className="text-white/50 text-sm uppercase tracking-wider mb-6">
              Connect With Me
            </p>
            <div className="flex justify-center gap-6">
              {content.contact.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 text-white/70 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label={social.name}
                  title={social.name}
                >
                  {socialIcons[social.iconKey || "github"]}
                </a>
              ))}
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 py-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Footer */}
          <footer className="pt-8">
            <p className="text-white/50 text-sm mb-2">
              © {new Date().getFullYear()} {content.hero.name}
            </p>
            <p className="text-white/30 text-xs">
              Built with Next.js, TypeScript, Tailwind CSS & GSAP
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
