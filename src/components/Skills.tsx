"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  level: number;
  icon: string;
  color: string;
};

type SkillCategory = {
  name: string;
  skills: Skill[];
  color: string;
};

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode on client side
  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof document !== "undefined") {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };

    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    const boxes = gridRef.current.querySelectorAll(".skill-box");

    boxes.forEach((box, index) => {
      gsap.fromTo(
        box,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      color: "from-blue-500 to-cyan-500",
      skills: [
        {
          name: "React",
          level: 95,
          icon: "https://cdn.simpleicons.org/react/61DAFB",
          color: "#61DAFB",
        },
        {
          name: "TypeScript",
          level: 90,
          icon: "https://cdn.simpleicons.org/typescript/3178C6",
          color: "#3178C6",
        },
        {
          name: "Next.js",
          level: 88,
          icon: "https://cdn.simpleicons.org/nextdotjs/000000",
          color: "#000000",
        },
        {
          name: "Tailwind CSS",
          level: 95,
          icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
          color: "#06B6D4",
        },
        {
          name: "HTML5",
          level: 98,
          icon: "https://cdn.simpleicons.org/html5/E34F26",
          color: "#E34F26",
        },
        {
          name: "CSS3",
          level: 95,
          icon: "https://cdn.simpleicons.org/css3/1572B6",
          color: "#1572B6",
        },
      ],
    },
    {
      name: "Backend",
      color: "from-green-500 to-emerald-500",
      skills: [
        {
          name: "Node.js",
          level: 85,
          icon: "https://cdn.simpleicons.org/nodedotjs/339933",
          color: "#339933",
        },
        {
          name: "Express",
          level: 82,
          icon: "https://cdn.simpleicons.org/express/000000",
          color: "#000000",
        },
        {
          name: "Python",
          level: 80,
          icon: "https://cdn.simpleicons.org/python/3776AB",
          color: "#3776AB",
        },
        {
          name: "GraphQL",
          level: 78,
          icon: "https://cdn.simpleicons.org/graphql/E10098",
          color: "#E10098",
        },
      ],
    },
    {
      name: "Database",
      color: "from-orange-500 to-red-500",
      skills: [
        {
          name: "MongoDB",
          level: 85,
          icon: "https://cdn.simpleicons.org/mongodb/47A248",
          color: "#47A248",
        },
        {
          name: "PostgreSQL",
          level: 80,
          icon: "https://cdn.simpleicons.org/postgresql/4169E1",
          color: "#4169E1",
        },
        {
          name: "Firebase",
          level: 83,
          icon: "https://cdn.simpleicons.org/firebase/FFCA28",
          color: "#FFCA28",
        },
        {
          name: "Supabase",
          level: 82,
          icon: "https://cdn.simpleicons.org/supabase/3FCF8E",
          color: "#3FCF8E",
        },
      ],
    },
    {
      name: "Tools & Libraries",
      color: "from-purple-500 to-pink-500",
      skills: [
        {
          name: "Git",
          level: 90,
          icon: "https://cdn.simpleicons.org/git/F05032",
          color: "#F05032",
        },
        {
          name: "Figma",
          level: 92,
          icon: "https://cdn.simpleicons.org/figma/F24E1E",
          color: "#F24E1E",
        },
        {
          name: "GSAP",
          level: 90,
          icon: "https://cdn.simpleicons.org/greensock/88CE02",
          color: "#88CE02",
        },
        {
          name: "Three.js",
          level: 85,
          icon: "https://cdn.simpleicons.org/threedotjs/000000",
          color: "#000000",
        },
        {
          name: "Webpack",
          level: 78,
          icon: "https://cdn.simpleicons.org/webpack/8DD6F9",
          color: "#8DD6F9",
        },
        {
          name: "Vite",
          level: 88,
          icon: "https://cdn.simpleicons.org/vite/646CFF",
          color: "#646CFF",
        },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-7xl mb-6 tracking-tighter"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            My{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            A collection of technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div ref={gridRef} className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-box">
              <div className="mb-6">
                <h3
                  className={`text-3xl md:text-4xl bg-gradient-to-r ${category.color} bg-clip-text text-transparent inline-block`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {category.name}
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-box group relative rounded-2xl p-6 bg-card border border-border hover:border-skill-foreground hover:shadow-skill-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
                      {/* Icon */}
                      <div className="w-16 h-16 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-xl group-hover:scale-110 transition-transform duration-300" />
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            filter:
                              isDark && skill.color === "#000000"
                                ? "invert(1)"
                                : "none",
                          }}
                        />
                      </div>

                      {/* Name */}
                      <h4
                        className="text-center min-h-[2.5rem] flex items-center"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {skill.name}
                      </h4>

                      {/* Progress bar */}
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-foreground/50">
                            Proficiency
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
