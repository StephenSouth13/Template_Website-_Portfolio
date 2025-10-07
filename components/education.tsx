"use client"

import { GraduationCap } from "lucide-react"
import type { BilingualText } from "@/lib/types"

interface EducationProps {
  education: Array<{
    school: BilingualText
    degree: BilingualText
    year: string
  }>
  language: "en" | "vi"
}

const translations = {
  en: {
    title: "Education",
  },
  vi: {
    title: "Học vấn",
  },
}

export default function Education({ education, language }: EducationProps) {
  const t = translations[language]

  if (!education || education.length === 0) return null

  return (
    <section id="education" className="py-24 animate-fade-in">
      <div className="flex items-center gap-4 mb-16">
        <GraduationCap className="w-10 h-10 text-primary" />
        <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.title}</h2>
      </div>

      <div className="grid gap-8">
        {education.map((edu, index) => (
          <div
            key={index}
            className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 animate-slide-in-left"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-primary font-mono mb-2">{edu.year}</p>
                <h3 className="text-2xl font-bold mb-2">{edu.school[language]}</h3>
                <p className="text-lg text-muted-foreground">{edu.degree[language]}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
