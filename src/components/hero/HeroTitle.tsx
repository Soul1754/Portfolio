"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { theme } from "@/config/theme";
import { content } from "@/config";
import { splitText } from "@/components/shared/animations/splitText";
import { useReducedMotion } from "@/components/shared/hooks/useReducedMotion";

export default function HeroTitle() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Show everything immediately without animation
      gsap.set(
        [nameRef.current, roleRef.current, taglineRef.current, ctasRef.current],
        {
          opacity: 1,
          y: 0,
        }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate name
      if (nameRef.current) {
        const { chars } = splitText(nameRef.current, { type: "chars" });
        if (chars) {
          gsap.set(chars, { opacity: 0, y: 50 });
          tl.to(
            chars,
            {
              opacity: 1,
              y: 0,
              duration: theme.motion.durations.base,
              stagger: theme.motion.stagger.tight,
              ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
            },
            0
          );
        }
      }

      // Animate role
      if (roleRef.current) {
        tl.from(
          roleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: theme.motion.durations.base,
            ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
          },
          0.3
        );
      }

      // Animate tagline
      if (taglineRef.current) {
        tl.from(
          taglineRef.current,
          {
            opacity: 0,
            y: 30,
            duration: theme.motion.durations.base,
            ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
          },
          0.5
        );
      }

      // Animate CTAs
      if (ctasRef.current) {
        const buttons = ctasRef.current.children;
        tl.from(
          buttons,
          {
            opacity: 0,
            y: 30,
            duration: theme.motion.durations.base,
            stagger: theme.motion.stagger.base,
            ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
          },
          0.7
        );
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1
        ref={nameRef}
        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
        style={{ fontSize: theme.typography.scale.h1 }}
      >
        {content.hero.name}
      </h1>

      <p
        ref={roleRef}
        className="text-xl md:text-2xl lg:text-3xl font-medium mb-4"
        style={{ color: theme.colors.primary }}
      >
        {content.hero.role}
      </p>

      <p
        ref={taglineRef}
        className="text-lg md:text-xl max-w-2xl mb-8 text-white/70"
      >
        {content.hero.tagline}
      </p>

      <div ref={ctasRef} className="flex flex-wrap gap-4 justify-center">
        {content.hero.ctas.map((cta, index) => (
          <a
            key={index}
            href={cta.href}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              index === 0
                ? "bg-primary hover:bg-primary/80 text-white"
                : "border-2 border-white/20 hover:border-primary text-white hover:text-primary"
            }`}
          >
            {cta.label}
          </a>
        ))}
      </div>
    </div>
  );
}
