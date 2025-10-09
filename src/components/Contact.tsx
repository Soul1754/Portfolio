"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (!formRef.current) return;

    gsap.fromTo(
      formRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:siddhant.gaikwad1754@gmail.com.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/Soul1754" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-7xl mb-6 tracking-tighter"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Have a project in mind? Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-foreground/70"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-background border-2 border-border rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-foreground/70"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-background border-2 border-border rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-foreground/70"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-background border-2 border-border rounded-2xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3
                className="text-3xl mb-4 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Get in touch
              </h3>
              <p
                className="text-foreground/70 mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                    <link.icon
                      size={24}
                      className="group-hover:text-white transition-colors"
                    />
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-20 text-center text-foreground/50"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <p>© 2025 Web Designer Portfolio. Crafted with passion.</p>
        </div>
      </div>
    </section>
  );
}
