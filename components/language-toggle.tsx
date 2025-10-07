"use client"

interface LanguageToggleProps {
  language: "en" | "vi"
  setLanguage: (lang: "en" | "vi") => void
}

export default function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  return (
    <button
      onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
      className="px-4 py-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 font-mono font-semibold"
      aria-label="Toggle language"
    >
      {language === "vi" ? "EN" : "VN"}
    </button>
  )
}
