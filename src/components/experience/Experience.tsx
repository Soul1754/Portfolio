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

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
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

      // Animated timeline line
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
          scaleY: 0,
          transformOrigin: "top",
        });
      }

      // Experience items
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".experience-item");
        items.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            opacity: 0,
            x: index % 2 === 0 ? -80 : 80,
            duration: theme.motion.durations.long,
            ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 bg-[#111318]"
    >
      <div className="max-w-5xl mx-auto">
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
          {content.experience.heading}
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-px overflow-hidden hidden md:block">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-primary via-accent to-secondary"
            />
          </div>

          <div className="space-y-16">
            {content.experience.items.map((exp, index) => (
              <div
                key={index}
                className={`experience-item relative ${
                  index % 2 === 0
                    ? "md:pr-[calc(50%+3rem)]"
                    : "md:pl-[calc(50%+3rem)]"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-8 hidden md:block ${
                    index % 2 === 0
                      ? "right-[calc(50%-0.75rem)]"
                      : "left-[calc(50%-0.75rem)]"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-[#111318] shadow-lg shadow-primary/50" />
                </div>

                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group">
                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/80 font-medium text-sm md:text-base">
                          {exp.start} - {exp.end}
                        </p>
                        {exp.location && (
                          <p className="text-white/50 text-sm mt-1">
                            {exp.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-3 mb-6">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="flex items-start gap-3 text-white/80 leading-relaxed"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    {exp.tech && exp.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {exp.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary/90 border border-primary/20 hover:border-primary/50 hover:scale-105 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
