"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface MobileMenuProps {
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

export default function MobileMenu({ language }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = translations[language]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-card/80 backdrop-blur-xl border border-border rounded-xl hover:bg-card transition-all shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-24 left-6 right-6 z-40 lg:hidden bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl">
            <nav className="flex flex-col gap-4">
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
                  className="text-left px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
