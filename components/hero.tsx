"use client"

import Image from "next/image"
import { Github, Linkedin, Mail, Twitter, Facebook, Instagram } from "lucide-react"
import type { BilingualText } from "@/lib/types"

interface HeroProps {
  data: {
    name: BilingualText
    title: BilingualText
    bio: BilingualText
    avatar: string
  }
  social?: {
    email?: string
    github?: string
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  language: "en" | "vi"
}

const translations = {
  en: {
    greeting: "Hello, I'm",
  },
  vi: {
    greeting: "Xin chào, tôi là",
  },
}

export default function Hero({ data, social, language }: HeroProps) {
  const t = translations[language]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center animate-fade-in px-4">
      <div className="text-center max-w-4xl w-full">
        <div className="mb-8 inline-block animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse-glow" />
            <Image
              src={data.avatar || "/placeholder.svg"}
              alt={data.name[language]}
              width={200}
              height={200}
              className="relative rounded-full border-4 border-primary/30 transition-all hover:scale-105 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52"
            />
          </div>
        </div>

        <p className="text-primary text-base sm:text-lg mb-4 font-mono animate-slide-in-left">{t.greeting}</p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance gradient-text animate-slide-in-right px-4">
          {data.name[language]}
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-8 font-light animate-fade-in px-4">
          {data.title[language]}
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty animate-fade-in px-4">
          {data.bio[language]}
        </p>

        {social && (
          <div className="flex gap-4 sm:gap-6 justify-center mt-12 animate-scale-in flex-wrap">
            {social.email && (
              <a
                href={`mailto:${social.email}`}
                className="p-3 sm:p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
