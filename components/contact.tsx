"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Linkedin, Github, MessageCircle, Send, Phone, Globe, MessageSquare } from "lucide-react"
import type { ThemeSettings } from "@/lib/types"

interface ContactProps {
  contact: {
    email: string
    linkedin: string
    github: string
    phone?: string
    telegram?: string
    discord?: string
    website?: string
  }
  language: "en" | "vi"
  themeSettings?: ThemeSettings
}

const translations = {
  en: {
    title: "Get In Touch",
    subtitle: "Feel free to reach out for collaborations or just a friendly hello",
    emailMe: "Email Me",
    connectLinkedIn: "Connect on LinkedIn",
    viewGithub: "View GitHub",
    callMe: "Call Me",
    telegram: "Telegram",
    discord: "Discord",
    website: "Visit Website",
    sendMessage: "Send a Message",
    formTitle: "Send Me a Message",
    formSubtitle: "Fill out the form below and I'll get back to you as soon as possible",
    name: "Your Name",
    email: "Your Email",
    message: "Your Message",
    sendButton: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Failed to send message. Please try again.",
  },
  vi: {
    title: "Liên hệ",
    subtitle: "Hãy liên hệ với tôi để hợp tác hoặc chỉ đơn giản là chào hỏi",
    emailMe: "Gửi Email",
    connectLinkedIn: "Kết nối LinkedIn",
    viewGithub: "Xem GitHub",
    callMe: "Gọi điện",
    telegram: "Telegram",
    discord: "Discord",
    website: "Truy cập Website",
    sendMessage: "Gửi tin nhắn",
    formTitle: "Gửi tin nhắn cho tôi",
    formSubtitle: "Điền vào form bên dưới và tôi sẽ phản hồi bạn sớm nhất có thể",
    name: "Tên của bạn",
    email: "Email của bạn",
    message: "Tin nhắn của bạn",
    sendButton: "Gửi tin nhắn",
    sending: "Đang gửi...",
    success: "Gửi tin nhắn thành công!",
    error: "Gửi tin nhắn thất bại. Vui lòng thử lại.",
  },
}

export default function Contact({ contact, language, themeSettings }: ContactProps) {
  const t = translations[language]
  const sectionColors = themeSettings?.sections?.contact || {
    bgColor: "transparent",
    textColor: "inherit",
  }

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("sending")

    // Simulate sending email (in production, this would call an API)
    setTimeout(() => {
      setFormStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setFormStatus("idle"), 3000)
    }, 1500)
  }

  const contactMethods = [
    { icon: Mail, label: t.emailMe, value: contact.email, href: `mailto:${contact.email}`, show: !!contact.email },
    {
      icon: Linkedin,
      label: t.connectLinkedIn,
      value: "LinkedIn",
      href: contact.linkedin,
      show: !!contact.linkedin,
    },
    { icon: Github, label: t.viewGithub, value: "GitHub", href: contact.github, show: !!contact.github },
    { icon: Phone, label: t.callMe, value: contact.phone, href: `tel:${contact.phone}`, show: !!contact.phone },
    {
      icon: MessageSquare,
      label: t.telegram,
      value: "Telegram",
      href: contact.telegram,
      show: !!contact.telegram,
    },
    { icon: Globe, label: t.website, value: "Website", href: contact.website, show: !!contact.website },
  ].filter((method) => method.show)

  return (
    <section
      id="contact"
      className="py-24 animate-fade-in relative overflow-hidden"
      style={{
        backgroundColor: sectionColors.bgColor,
        color: sectionColors.textColor,
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        <div className="flex items-center gap-4 mb-6 justify-center">
          <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg shadow-primary/30 animate-float">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.title}</h2>
        </div>

        <p className="text-xl text-center mb-16 text-pretty max-w-2xl mx-auto opacity-90">{t.subtitle}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <a
                key={index}
                href={method.href}
                target={method.href?.startsWith("http") ? "_blank" : undefined}
                rel={method.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-center">{method.label}</h3>
                  <p className="text-sm opacity-70 truncate text-center">{method.value}</p>
                </div>
              </a>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold gradient-text mb-2">{t.formTitle}</h3>
              <p className="text-sm opacity-70">{t.formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t.name}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder={t.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.email}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder={t.email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.message}</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder={t.message}
                />
              </div>

              {formStatus === "success" && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center font-medium">
                  {t.success}
                </div>
              )}

              {formStatus === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center font-medium">
                  {t.error}
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:scale-105 transition-all hover:shadow-2xl hover:shadow-primary/40 font-semibold text-lg group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {formStatus === "sending" ? t.sending : t.sendButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
