'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/page-transitions'
import { GraduationCap, Code, Brain, User } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      description: "B.Tech in Computer Science from VIT Pune (CGPA: 8.75)"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "Expertise in React, Node.js, Express, and modern web technologies"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI/ML Enthusiast",
      description: "Deep learning, NLP, and AI-powered application development"
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Problem Solver",
      description: "Passionate about optimization and user-centric development"
    }
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <motion.div
            ref={imageRef}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              {/* Animated background circles */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Profile placeholder - you can add your actual image here */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <User size={120} className="text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <div className="space-y-6">
            <FadeInUp delay={0.2}>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Hello! I&apos;m Siddhant Gaikwad
              </h3>
            </FadeInUp>
            
            <FadeInUp delay={0.3}>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  I&apos;m a passionate Computer Science student at Vishwakarma Institute of Technology, Pune, 
                  with a strong foundation in full-stack web development and artificial intelligence.
                </p>
                <p>
                  My journey in technology has led me to work on diverse projects ranging from 
                  service marketplace platforms to AI-powered music generation systems. I thrive 
                  on solving complex problems and creating user-centric solutions.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to 
                  open-source projects, or working on innovative AI research projects that push 
                  the boundaries of what&apos;s possible.
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  CGPA: 8.75
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                  Full-Stack Developer
                </span>
                <span className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-sm font-medium">
                  AI/ML Enthusiast
                </span>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Highlights Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4 text-white">
                  {highlight.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {highlight.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {highlight.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}