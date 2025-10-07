"use client"

import { ExternalLink, Folder } from "lucide-react"
import type { BilingualText } from "@/lib/types"

interface Project {
  name: BilingualText
  desc: BilingualText
  link: string
  image?: string
}

interface ProjectsProps {
  projects: Project[]
  language: "en" | "vi"
}

const translations = {
  en: {
    title: "Featured Projects",
    visit: "Visit Project",
  },
  vi: {
    title: "Dự án nổi bật",
    visit: "Xem dự án",
  },
}

export default function Projects({ projects, language }: ProjectsProps) {
  const t = translations[language]

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 animate-fade-in">
      <div className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16 justify-center px-4">
        <Folder className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text text-center">{t.title}</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-scale-in card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {project.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name[language]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/15 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4 gap-3">
                  <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors text-balance">
                    {project.name[language]}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:scale-110 flex-shrink-0" />
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base text-pretty">
                  {project.desc[language]}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
