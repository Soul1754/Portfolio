"use client";

import { useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/config";
import { theme } from "@/config/theme";
import { useReducedMotion } from "@/components/shared/hooks/useReducedMotion";

// Dynamic import for Three.js scene
const AboutScene = dynamic(() => import("@/components/three/AboutScene"), {
  ssr: false,
  loading: () => null,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
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
          duration: theme.motion.durations.long,
          ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
        });
      }

      // Content stagger
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll("p");
        gsap.from(paragraphs, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          },
          opacity: 0,
          y: 40,
          duration: theme.motion.durations.base,
          stagger: theme.motion.stagger.base,
          ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
        });
      }

      // Highlights animation
      if (highlightsRef.current) {
        const items = highlightsRef.current.querySelectorAll(".highlight-item");
        gsap.from(items, {
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 75%",
          },
          opacity: 0,
          x: -40,
          duration: theme.motion.durations.base,
          stagger: theme.motion.stagger.tight,
          ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-32 px-6 bg-gradient-to-b from-[#0a0b0e] to-[#111318]"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold mb-20 text-center"
          style={{
            fontSize: theme.typography.scale.h2,
            background: `linear-gradient(135deg, ${theme.colors.gradient[0]}, ${theme.colors.gradient[1]}, ${theme.colors.gradient[2]})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {content.about.heading}
        </h2>

        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-start">
          {/* Main content */}
          <div ref={contentRef} className="space-y-8">
            {content.about.body.map((paragraph, index) => (
              <p
                key={index}
                className="text-xl md:text-2xl text-white/80 leading-relaxed font-light"
              >
                {paragraph}
              </p>
            ))}

            {/* 3D Interactive Model */}
            <div className="mt-12">
              <Suspense
                fallback={
                  <div className="w-full h-[400px] bg-white/5 rounded-2xl animate-pulse" />
                }
              >
                {/* <AboutScene /> */}
              </Suspense>
            </div>
          </div>

          {/* Highlights */}
          {content.about.highlights && (
            <div ref={highlightsRef} className="relative">
              <div className="sticky top-32 space-y-6 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6 text-primary">
                  Highlights
                </h3>
                {content.about.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="highlight-item flex items-start gap-4 group"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <p className="text-lg text-white/90 leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
