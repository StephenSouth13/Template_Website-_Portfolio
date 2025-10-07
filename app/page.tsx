"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import Education from "@/components/education"
import Achievements from "@/components/achievements"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ThemeToggle from "@/components/theme-toggle"
import LanguageToggle from "@/components/language-toggle"
import BackToTop from "@/components/back-to-top"
import Navigation from "@/components/navigation"
import MobileMenu from "@/components/mobile-menu"
import type { PortfolioData } from "@/lib/types"

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [language, setLanguage] = useState<"en" | "vi">("vi")

  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData")
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setData(parsed)
      setTheme(parsed.theme || "dark")
      setLanguage(parsed.language || "vi")
    } else {
      fetch("/data.json")
        .then((res) => res.json())
        .then((json) => {
          setData(json)
          setTheme(json.theme || "dark")
          setLanguage(json.language || "vi")
        })
    }

    const handleStorageChange = () => {
      const savedData = localStorage.getItem("portfolioData")
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setData(parsed)
        setTheme(parsed.theme || "dark")
        setLanguage(parsed.language || "vi")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const headerStyle = data.themeSettings?.headerStyle || "sticky"

  return (
    <div className="min-h-screen">
      <MobileMenu language={language} />
      <Navigation language={language} />

      <div
        className={`${headerStyle === "sticky" ? "sticky" : ""} top-0 right-0 left-0 z-50 flex justify-end gap-3 p-4 md:p-6 bg-background/80 backdrop-blur-xl border-b border-border/50`}
      >
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24 lg:px-12">
        <div
          style={{
            backgroundColor: data.themeSettings?.sections.hero.bgColor,
            color: data.themeSettings?.sections.hero.textColor,
          }}
          className="rounded-3xl p-8 mb-16"
        >
          <Hero data={data.profile} social={data.social} language={language} />
        </div>

        {data.education && data.education.length > 0 && (
          <div
            style={{
              backgroundColor: data.themeSettings?.sections.education.bgColor,
              color: data.themeSettings?.sections.education.textColor,
            }}
            className="rounded-3xl p-8 mb-16"
          >
            <Education education={data.education} language={language} />
          </div>
        )}

        {data.achievements && data.achievements.length > 0 && (
          <div
            style={{
              backgroundColor: data.themeSettings?.sections.achievements.bgColor,
              color: data.themeSettings?.sections.achievements.textColor,
            }}
            className="rounded-3xl p-8 mb-16"
          >
            <Achievements achievements={data.achievements} language={language} />
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div
            style={{
              backgroundColor: data.themeSettings?.sections.skills.bgColor,
              color: data.themeSettings?.sections.skills.textColor,
            }}
            className="rounded-3xl p-8 mb-16"
          >
            <Skills skills={data.skills} language={language} />
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div
            style={{
              backgroundColor: data.themeSettings?.sections.projects.bgColor,
              color: data.themeSettings?.sections.projects.textColor,
            }}
            className="rounded-3xl p-8 mb-16"
          >
            <Projects projects={data.projects} language={language} />
          </div>
        )}

        {data.contact && (
          <div
            style={{
              backgroundColor: data.themeSettings?.sections.contact.bgColor,
              color: data.themeSettings?.sections.contact.textColor,
            }}
            className="rounded-3xl p-8"
          >
            <Contact contact={data.contact} language={language} />
          </div>
        )}
      </main>

      <Footer data={data} />

      <BackToTop />
    </div>
  )
}
