"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current;

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Pin section animation
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500",
        pin: true,
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) =>
        trigger.kill(),
      );
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description:
        "Writing semantic, maintainable, and scalable code following best practices and modern standards.",
    },
    {
      icon: Palette,
      title: "Creative Design",
      description:
        "Crafting beautiful, intuitive interfaces that blend aesthetics with functionality seamlessly.",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Building lightning-fast experiences optimized for all devices and network conditions.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-7xl mb-6 tracking-tighter"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            I'm a passionate web designer and developer who
            loves creating immersive digital experiences that
            push the boundaries of what's possible on the web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="p-8 rounded-3xl bg-background border border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 inline-block">
                <feature.icon
                  size={32}
                  className="text-purple-500"
                />
              </div>
              <h3
                className="text-2xl mb-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-foreground/70"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}