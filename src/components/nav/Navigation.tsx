"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/config";
import { theme } from "@/config/theme";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Show/hide nav based on scroll
    let lastScroll = 0;
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        if (currentScroll < 100) {
          setIsVisible(true);
        } else if (currentScroll > lastScroll && currentScroll > 200) {
          setIsVisible(false);
        } else if (currentScroll < lastScroll) {
          setIsVisible(true);
        }
        lastScroll = currentScroll;
      },
    });

    // Track active section
    const sections = ["about", "skills", "projects", "experience", "contact"];
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      y: isVisible ? 0 : -100,
      opacity: isVisible ? 1 : 0,
      duration: theme.motion.durations.short,
      ease: `cubic-bezier(${theme.motion.easings.easeOut.join(",")})`,
    });
  }, [isVisible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-lg bg-[#0a0b0e]/90 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          {content.hero.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {content.nav.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? "text-primary bg-primary/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={content.hero.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
