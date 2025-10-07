export interface BilingualText {
  en: string
  vi: string
}

export interface ThemeSettings {
  headerStyle: "sticky" | "normal"
  sections: {
    hero: { bgColor: string; textColor: string }
    about: { bgColor: string; textColor: string }
    education: { bgColor: string; textColor: string }
    achievements: { bgColor: string; textColor: string }
    skills: { bgColor: string; textColor: string }
    projects: { bgColor: string; textColor: string }
    contact: { bgColor: string; textColor: string }
    footer: { bgColor: string; textColor: string }
  }
}

export interface PortfolioData {
  language: "en" | "vi"
  theme: "light" | "dark"
  themeSettings?: ThemeSettings
  profile: {
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
    phone?: string
    telegram?: string
    discord?: string
    website?: string
  }
  education?: Array<{
    school: BilingualText
    degree: BilingualText
    year: string
  }>
  achievements?: Array<{
    title: BilingualText
    desc: BilingualText
  }>
  skills?: string[]
  projects?: Array<{
    name: BilingualText
    desc: BilingualText
    link: string
    image?: string
  }>
  contact?: {
    email: string
    linkedin: string
    github: string
    phone?: string
    telegram?: string
    discord?: string
    website?: string
  }
  footer?: {
    text: BilingualText
    showSocial: boolean
  }
}
