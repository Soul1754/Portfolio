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

export default function Projects() {
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

      // Project cards with parallax
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card");
        cards.forEach((card, index) => {
          // Initial reveal
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
            opacity: 0,
            y: 100,
            scale: 0.9,
            duration: theme.motion.durations.long,
            ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
            delay: index * 0.1,
          });

          // Parallax effect on scroll
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -30,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 bg-gradient-to-b from-[#111318] to-[#0a0b0e]"
    >
      <div className="max-w-7xl mx-auto">
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
          {content.projects.heading}
        </h2>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.items.map((project, index) => (
            <article
              key={project.id}
              className="project-card group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* Project image/gradient */}
              <div className="relative aspect-video overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${
                      theme.colors.gradient[index % 3]
                    }, ${theme.colors.gradient[(index + 1) % 3]})`,
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Project title overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                    <div className="text-6xl font-bold text-white/20 mb-2">
                      {project.title.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Year badge */}
                {project.year && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/80 font-medium">
                    {project.year}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-white/70 mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 4).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 hover:border-primary/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/50">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 text-center text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 text-center text-sm font-medium rounded-lg border border-white/20 text-white/80 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
