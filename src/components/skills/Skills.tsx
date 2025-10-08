"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/config";
import { theme } from "@/config/theme";
import { useReducedMotion } from "@/components/shared/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

      // Skill cards animation
      if (gridRef.current) {
        const groups = gridRef.current.querySelectorAll(".skill-group");
        groups.forEach((group, index) => {
          gsap.from(group, {
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
            },
            opacity: 0,
            y: 60,
            rotation: index % 2 === 0 ? -2 : 2,
            duration: theme.motion.durations.long,
            ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
          });

          // Skill items stagger
          const items = group.querySelectorAll(".skill-item");
          gsap.from(items, {
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
            },
            opacity: 0,
            x: -20,
            duration: theme.motion.durations.base,
            stagger: theme.motion.stagger.tight,
            ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
            delay: 0.2,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-32 px-6 bg-[#111318]"
    >
      <div className="max-w-7xl mx-auto w-full">
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
          {content.skills.heading}
        </h2>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.skills.groups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="skill-group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {group.title[0]}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {group.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="skill-item flex items-center gap-3 text-white/80 hover:text-white transition-colors group/item"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent group-hover/item:scale-150 transition-transform" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
