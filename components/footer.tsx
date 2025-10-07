"use client"

import { Github, Linkedin, Mail, Facebook, Twitter, Instagram } from "lucide-react"
import type { PortfolioData } from "@/lib/types"

interface FooterProps {
  data: PortfolioData
}

export default function Footer({ data }: FooterProps) {
  if (!data.footer) return null

  const t = data.footer.text[data.language]
  const bgColor = data.themeSettings?.sections.footer.bgColor || "#050811"
  const textColor = data.themeSettings?.sections.footer.textColor || "#94a3b8"

  const socialLinks = [
    { icon: Mail, url: data.social?.email ? `mailto:${data.social.email}` : null, label: "Email" },
    { icon: Github, url: data.social?.github, label: "GitHub" },
    { icon: Linkedin, url: data.social?.linkedin, label: "LinkedIn" },
    { icon: Twitter, url: data.social?.twitter, label: "Twitter" },
    { icon: Facebook, url: data.social?.facebook, label: "Facebook" },
    { icon: Instagram, url: data.social?.instagram, label: "Instagram" },
  ].filter((link) => link.url)

  return (
    <footer className="py-12 border-t border-border/50" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {data.footer.showSocial && socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-background/50 hover:bg-background transition-all hover:scale-110"
                  aria-label={link.label}
                  style={{ color: textColor }}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}
          <p className="text-center text-sm" style={{ color: textColor }}>
            {t}
          </p>
          <p className="text-center text-xs opacity-70" style={{ color: textColor }}>
            © {new Date().getFullYear()} {data.profile.name[data.language]}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
