"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { theme } from "@/config/theme";
import { content } from "@/config";

export default function MarqueeName() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const items = marquee.children;
    if (items.length === 0) return;

    // Calculate total width
    const firstItem = items[0] as HTMLElement;
    const itemWidth = firstItem.offsetWidth;
    const totalWidth = itemWidth * items.length;

    // Create seamless loop
    gsap.set(marquee, { x: 0 });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(marquee, {
      x: -totalWidth / 2,
      duration: totalWidth / theme.motion.marqueeSpeed,
      ease: "none",
    });

    // Pause on hover
    const handleMouseEnter = () => tl.pause();
    const handleMouseLeave = () => tl.resume();

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tl.kill();
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicate items for seamless loop
  const items = [...content.hero.marquee, ...content.hero.marquee];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-white/10">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        {items.map((text, index) => (
          <span
            key={index}
            className="inline-block px-8 text-2xl md:text-3xl font-medium text-white/60"
          >
            {text}
            <span className="mx-4 text-primary">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
