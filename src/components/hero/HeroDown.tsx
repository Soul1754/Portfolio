"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { theme } from "@/config/theme";

export default function HeroDown() {
  const arrowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;

    // Gentle yo-yo animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(arrow, {
      y: 10,
      opacity: 0.6,
      duration: theme.motion.durations.long,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleClick = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      ref={arrowRef}
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group"
      aria-label="Scroll to content"
    >
      <span className="text-sm uppercase tracking-wider">Scroll</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:text-primary transition-colors"
      >
        <path
          d="M12 4L12 20M12 20L6 14M12 20L18 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
