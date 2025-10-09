"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    // Horizontal scroll animation
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

    gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with real-time inventory and seamless checkout experience.",
      tags: ["React", "Node.js", "Stripe"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Portfolio Website",
      description: "An immersive portfolio showcasing creative work with stunning animations and interactions.",
      tags: ["Three.js", "GSAP", "React"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Dashboard Analytics",
      description: "Real-time analytics dashboard with interactive charts and comprehensive data visualization.",
      tags: ["Next.js", "D3.js", "TypeScript"],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Social Media App",
      description: "A social platform with real-time messaging, stories, and engaging user interactions.",
      tags: ["React Native", "Firebase", "Redux"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "AI Content Generator",
      description: "An AI-powered tool for generating creative content with natural language processing.",
      tags: ["Python", "OpenAI", "React"],
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="h-screen overflow-hidden relative"
    >
      <div className="absolute top-20 left-6 z-10">
        <h2
          className="text-5xl md:text-7xl mb-4 tracking-tighter"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Featured{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="text-xl text-foreground/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Scroll to explore →
        </p>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex items-center h-screen gap-8 px-6 pt-48"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[500px] h-[600px] rounded-3xl bg-background border border-border overflow-hidden group hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div
              className={`h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-pulse" />
                <div className="absolute w-48 h-48 border-4 border-white/20 rounded-full animate-pulse delay-75" />
              </div>
            </div>

            <div className="p-8">
              <h3
                className="text-3xl mb-4 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {project.title}
              </h3>
              <p
                className="text-foreground/70 mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-4 py-2 bg-secondary rounded-full text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  <ExternalLink size={18} />
                  Live Demo
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-purple-500 rounded-full hover:bg-purple-500/10 transition-all duration-300">
                  <Github size={18} />
                  Code
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
