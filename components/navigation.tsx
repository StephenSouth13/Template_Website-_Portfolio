"use client"

import { useState, useEffect } from "react"

interface NavigationProps {
  language: "en" | "vi"
}

const translations = {
  en: {
    about: "About",
    education: "Education",
    achievements: "Achievements",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
  },
  vi: {
    about: "Giới thiệu",
    education: "Học vấn",
    achievements: "Thành tích",
    skills: "Kỹ năng",
    projects: "Dự án",
    contact: "Liên hệ",
  },
}

export default function Navigation({ language }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("")
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "education", "achievements", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-6">
        {[
          { id: "about", label: t.about },
          { id: "education", label: t.education },
          { id: "achievements", label: t.achievements },
          { id: "skills", label: t.skills },
          { id: "projects", label: t.projects },
          { id: "contact", label: t.contact },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`group flex items-center gap-3 transition-all ${
              activeSection === item.id ? "opacity-100" : "opacity-50 hover:opacity-100"
            }`}
          >
            <div
              className={`h-px transition-all ${
                activeSection === item.id ? "w-16 bg-primary" : "w-8 bg-muted-foreground"
              }`}
            />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
