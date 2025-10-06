'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/page-transitions'
import { skills } from '@/data'
import * as SimpleIcons from 'react-icons/si'
import { IconType } from 'react-icons'

gsap.registerPlugin(ScrollTrigger)

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      if (marqueeRef.current) {
        const marqueeContent = marqueeRef.current.children
        gsap.to(marqueeContent, {
          xPercent: -100,
          repeat: -1,
          duration: 30,
          ease: "none",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const skillCategories = [
    { name: 'Languages', category: 'language', color: 'from-blue-500 to-cyan-500' },
    { name: 'Frontend', category: 'frontend', color: 'from-green-500 to-emerald-500' },
    { name: 'Backend', category: 'backend', color: 'from-purple-500 to-indigo-500' },
    { name: 'Databases', category: 'database', color: 'from-orange-500 to-red-500' },
    { name: 'Tools & Frameworks', category: 'tool', color: 'from-pink-500 to-rose-500' },
  ]

  const getIcon = (iconName: string): IconType | null => {
    return (SimpleIcons as any)[iconName] || null
  }

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Tech Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technologies I use to build modern, scalable applications
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
          </div>
        </FadeInUp>

        {/* Animated Marquee */}
        <div className="mb-16 overflow-hidden">
          <div ref={marqueeRef} className="flex space-x-8 whitespace-nowrap">
            {[...skills, ...skills].map((skill, index) => {
              const IconComponent = getIcon(skill.icon)
              return (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 flex items-center space-x-3 px-6 py-3 bg-white dark:bg-gray-700 rounded-full shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  )}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {skill.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {skillCategories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category.category)
            
            return (
              <FadeInUp key={category.category} delay={0.1}>
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent inline-block`}>
                      {category.name}
                    </h3>
                  </div>
                  
                  <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {categorySkills.map((skill, index) => {
                      const IconComponent = getIcon(skill.icon)
                      
                      return (
                        <StaggerItem key={skill.name}>
                          <motion.div
                            className="group p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600 text-center"
                            whileHover={{ 
                              y: -5,
                              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                          >
                            <div className="flex items-center justify-center mb-3">
                              {IconComponent ? (
                                <IconComponent className="w-10 h-10 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                              ) : (
                                <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg"></div>
                              )}
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {skill.name}
                            </h4>
                          </motion.div>
                        </StaggerItem>
                      )
                    })}
                  </StaggerContainer>
                </div>
              </FadeInUp>
            )
          })}
        </div>

        {/* Call to Action */}
        <FadeInUp delay={0.5}>
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Always learning and exploring new technologies
            </p>
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Let&apos;s Build Something Amazing</span>
            </motion.div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}