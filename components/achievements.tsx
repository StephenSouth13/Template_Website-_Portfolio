"use client"

import { Trophy, Award } from "lucide-react"
import type { BilingualText } from "@/lib/types"

interface AchievementsProps {
  achievements: Array<{
    title: BilingualText
    desc: BilingualText
  }>
  language: "en" | "vi"
}

const translations = {
  en: {
    title: "Achievements",
  },
  vi: {
    title: "Thành tích",
  },
}

export default function Achievements({ achievements, language }: AchievementsProps) {
  const t = translations[language]

  if (!achievements || achievements.length === 0) return null

  return (
    <section id="achievements" className="py-24 animate-fade-in">
      <div className="flex items-center gap-4 mb-16">
        <Trophy className="w-10 h-10 text-accent" />
        <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="group relative bg-card rounded-2xl p-8 border border-border hover:border-accent/50 transition-all hover:shadow-xl hover:shadow-accent/10 animate-slide-in-right"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award className="w-24 h-24 text-accent" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                {achievement.title[language]}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{achievement.desc[language]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
