'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/page-transitions'
import { experiences } from '@/data'
import { MapPin, Calendar, Building2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline animation
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My professional journey and contributions to innovative projects
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
          </div>
        </FadeInUp>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full rounded-full"
          />

          <StaggerContainer className="space-y-12">
            {experiences.map((experience, index) => (
              <StaggerItem key={experience.id}>
                <motion.div
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Experience Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
                      {/* Company and Position */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {experience.company}
                          </h3>
                        </div>
                        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          {experience.position}
                        </h4>
                        
                        {/* Duration and Location */}
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-3 mb-4">
                        {experience.description.map((desc, descIndex) => (
                          <p key={descIndex} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            • {desc}
                          </p>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="flex items-center justify-center w-2/12">
                    <motion.div
                      className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                      whileHover={{ scale: 1.2 }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    />
                  </div>

                  {/* Empty Space */}
                  <div className="w-5/12" />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Current Status */}
        <FadeInUp delay={0.3}>
          <div className="text-center mt-16 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Currently Studying
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              Bachelor of Technology - Computer Science
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
              Vishwakarma Institute of Technology, Pune (CGPA: 8.75)
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Nov 2022 – Present
            </p>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}