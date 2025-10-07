"use client"

import { Code2, Sparkles } from "lucide-react"

interface SkillsProps {
  skills: string[]
  language: "en" | "vi"
}

const translations = {
  en: {
    title: "Skills & Technologies",
  },
  vi: {
    title: "Kỹ năng & Công nghệ",
  },
}

export default function Skills({ skills, language }: SkillsProps) {
  const t = translations[language]

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 animate-fade-in">
      <div className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16 justify-center px-4">
        <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text text-center">{t.title}</h2>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-4xl mx-auto px-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-secondary rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all hover:scale-105 cursor-default animate-scale-in overflow-hidden"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 animate-shimmer" />
            </div>

            <div className="relative flex items-center gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm sm:text-base lg:text-lg font-medium">{skill}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
