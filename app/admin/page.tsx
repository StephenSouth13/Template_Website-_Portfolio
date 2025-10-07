"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  LogOut,
  Save,
  Download,
  Plus,
  Trash2,
  Sparkles,
  Upload,
  Palette,
  User,
  Share2,
  GraduationCap,
  Trophy,
  Code,
  Briefcase,
  Mail,
  Layout,
  Eye,
  EyeOff,
} from "lucide-react"
import type { PortfolioData } from "@/lib/types"

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<PortfolioData | null>(null)
  const [activeTab, setActiveTab] = useState<
    "profile" | "social" | "education" | "achievements" | "skills" | "projects" | "contact" | "theme" | "footer"
  >("profile")
  const [saveSuccess, setSaveSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const projectImageRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
      loadData()
    }
  }, [])

  const loadData = () => {
    const savedData = localStorage.getItem("portfolioData")
    if (savedData) {
      setData(JSON.parse(savedData))
    } else {
      fetch("/data.json")
        .then((res) => res.json())
        .then((json) => setData(json))
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin123" && password === "123456") {
      setIsLoggedIn(true)
      sessionStorage.setItem("adminLoggedIn", "true")
      loadData()
      setError("")
    } else {
      setError("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem("adminLoggedIn")
    setUsername("")
    setPassword("")
  }

  const handleSave = () => {
    if (data) {
      localStorage.setItem("portfolioData", JSON.stringify(data))
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      window.dispatchEvent(new Event("storage"))
    }
  }

  const handleExport = () => {
    if (data) {
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "data.json"
      link.click()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && data) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setData({
          ...data,
          profile: {
            ...data.profile,
            avatar: base64String,
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file && data) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        const newProjects = [...(data.projects || [])]
        newProjects[index] = { ...newProjects[index], image: base64String }
        setData({ ...data, projects: newProjects })
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "social" as const, label: "Social", icon: Share2 },
    { id: "education" as const, label: "Education", icon: GraduationCap },
    { id: "achievements" as const, label: "Achievements", icon: Trophy },
    { id: "skills" as const, label: "Skills", icon: Code },
    { id: "projects" as const, label: "Projects", icon: Briefcase },
    { id: "contact" as const, label: "Contact", icon: Mail },
    { id: "theme" as const, label: "Theme", icon: Palette },
    { id: "footer" as const, label: "Footer", icon: Layout },
  ]

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl" />

            <div className="relative z-10">
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
                  <div className="relative p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Admin Portal
                </h1>
                <p className="text-slate-400 text-sm text-center">Secure Content Management System</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                      placeholder="Enter username"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl animate-shake">
                    <p className="text-red-400 text-sm font-medium text-center">{error}</p>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Access Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg shadow-primary/30">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Portfolio CMS</h1>
              <p className="text-sm text-muted-foreground">Content Management System</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all font-medium text-sm sm:text-base ${
                saveSuccess
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                  : "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-primary/30"
              }`}
            >
              <Save className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{saveSuccess ? "Saved!" : "Save Changes"}</span>
              <span className="sm:hidden">{saveSuccess ? "Saved!" : "Save"}</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-secondary rounded-xl hover:bg-muted transition-all font-medium text-sm sm:text-base hover:shadow-lg"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Export JSON</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-destructive text-destructive-foreground rounded-xl hover:opacity-90 transition-all font-medium text-sm sm:text-base hover:shadow-lg"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium whitespace-nowrap transition-all text-sm sm:text-base ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-105"
                    : "bg-card/50 backdrop-blur-sm hover:bg-card border border-border"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-border shadow-2xl">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold gradient-text">Profile Information</h2>
              </div>

              <div className="space-y-4 p-6 bg-background/50 rounded-2xl border border-border">
                <label className="block text-sm font-medium mb-2">Avatar Image</label>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {data.profile.avatar && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl">
                        <img
                          src={data.profile.avatar || "/placeholder.svg"}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 w-full space-y-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl transition-all font-medium w-full sm:w-auto justify-center hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
                    >
                      <Upload className="w-5 h-5" />
                      Upload New Image
                    </button>
                    <p className="text-sm text-muted-foreground">Or paste image URL below</p>
                    <input
                      type="text"
                      value={data.profile.avatar}
                      onChange={(e) => setData({ ...data, profile: { ...data.profile, avatar: e.target.value } })}
                      className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name (English)</label>
                  <input
                    type="text"
                    value={data.profile.name.en}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, name: { ...data.profile.name, en: e.target.value } },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Name (Vietnamese)</label>
                  <input
                    type="text"
                    value={data.profile.name.vi}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, name: { ...data.profile.name, vi: e.target.value } },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title (English)</label>
                  <input
                    type="text"
                    value={data.profile.title.en}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, title: { ...data.profile.title, en: e.target.value } },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title (Vietnamese)</label>
                  <input
                    type="text"
                    value={data.profile.title.vi}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, title: { ...data.profile.title, vi: e.target.value } },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Bio (English)</label>
                  <textarea
                    value={data.profile.bio.en}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, bio: { ...data.profile.bio, en: e.target.value } },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-32"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bio (Vietnamese)</label>
                  <textarea
                    value={data.profile.bio.vi}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, bio: { ...data.profile.bio, vi: e.target.value } },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-32"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Share2 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold gradient-text">Social Links</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Add your social media profiles and contact information. Leave blank to hide.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={data.social?.email || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={data.social?.github || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, github: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={data.social?.linkedin || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter URL</label>
                  <input
                    type="url"
                    value={data.social?.twitter || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, twitter: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={data.social?.facebook || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, facebook: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://facebook.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={data.social?.instagram || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, instagram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={data.social?.phone || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, phone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="+84 123 456 789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telegram URL</label>
                  <input
                    type="url"
                    value={data.social?.telegram || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, telegram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://t.me/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Discord Username</label>
                  <input
                    type="text"
                    value={data.social?.discord || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, discord: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="username#1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Personal Website</label>
                  <input
                    type="url"
                    value={data.social?.website || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        social: { ...data.social, website: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold gradient-text">Education</h2>
                <button
                  onClick={() => {
                    const newEducation = [
                      ...(data.education || []),
                      { school: { en: "", vi: "" }, degree: { en: "", vi: "" }, year: "" },
                    ]
                    setData({ ...data, education: newEducation })
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              </div>

              {data.education?.map((edu, index) => (
                <div key={index} className="p-6 bg-background rounded-2xl border border-input space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">Education #{index + 1}</h3>
                    <button
                      onClick={() => {
                        const newEducation = data.education?.filter((_, i) => i !== index)
                        setData({ ...data, education: newEducation })
                      }}
                      className="text-destructive hover:opacity-70 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">School (English)</label>
                      <input
                        type="text"
                        placeholder="School name in English"
                        value={edu.school.en}
                        onChange={(e) => {
                          const newEducation = [...(data.education || [])]
                          newEducation[index] = {
                            ...newEducation[index],
                            school: { ...newEducation[index].school, en: e.target.value },
                          }
                          setData({ ...data, education: newEducation })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">School (Vietnamese)</label>
                      <input
                        type="text"
                        placeholder="Tên trường bằng tiếng Việt"
                        value={edu.school.vi}
                        onChange={(e) => {
                          const newEducation = [...(data.education || [])]
                          newEducation[index] = {
                            ...newEducation[index],
                            school: { ...newEducation[index].school, vi: e.target.value },
                          }
                          setData({ ...data, education: newEducation })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Degree (English)</label>
                      <input
                        type="text"
                        placeholder="Degree in English"
                        value={edu.degree.en}
                        onChange={(e) => {
                          const newEducation = [...(data.education || [])]
                          newEducation[index] = {
                            ...newEducation[index],
                            degree: { ...newEducation[index].degree, en: e.target.value },
                          }
                          setData({ ...data, education: newEducation })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Degree (Vietnamese)</label>
                      <input
                        type="text"
                        placeholder="Bằng cấp bằng tiếng Việt"
                        value={edu.degree.vi}
                        onChange={(e) => {
                          const newEducation = [...(data.education || [])]
                          newEducation[index] = {
                            ...newEducation[index],
                            degree: { ...newEducation[index].degree, vi: e.target.value },
                          }
                          setData({ ...data, education: newEducation })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Year</label>
                    <input
                      type="text"
                      placeholder="2020-2024"
                      value={edu.year}
                      onChange={(e) => {
                        const newEducation = [...(data.education || [])]
                        newEducation[index] = { ...newEducation[index], year: e.target.value }
                        setData({ ...data, education: newEducation })
                      }}
                      className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold gradient-text">Achievements</h2>
                <button
                  onClick={() => {
                    const newAchievements = [
                      ...(data.achievements || []),
                      { title: { en: "", vi: "" }, desc: { en: "", vi: "" } },
                    ]
                    setData({ ...data, achievements: newAchievements })
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  <Plus className="w-4 h-4" />
                  Add Achievement
                </button>
              </div>

              {data.achievements?.map((achievement, index) => (
                <div key={index} className="p-6 bg-background rounded-2xl border border-input space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">Achievement #{index + 1}</h3>
                    <button
                      onClick={() => {
                        const newAchievements = data.achievements?.filter((_, i) => i !== index)
                        setData({ ...data, achievements: newAchievements })
                      }}
                      className="text-destructive hover:opacity-70 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title (English)</label>
                      <input
                        type="text"
                        placeholder="Achievement title in English"
                        value={achievement.title.en}
                        onChange={(e) => {
                          const newAchievements = [...(data.achievements || [])]
                          newAchievements[index] = {
                            ...newAchievements[index],
                            title: { ...newAchievements[index].title, en: e.target.value },
                          }
                          setData({ ...data, achievements: newAchievements })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title (Vietnamese)</label>
                      <input
                        type="text"
                        placeholder="Tiêu đề thành tích bằng tiếng Việt"
                        value={achievement.title.vi}
                        onChange={(e) => {
                          const newAchievements = [...(data.achievements || [])]
                          newAchievements[index] = {
                            ...newAchievements[index],
                            title: { ...newAchievements[index].title, vi: e.target.value },
                          }
                          setData({ ...data, achievements: newAchievements })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Description (English)</label>
                      <textarea
                        placeholder="Description in English"
                        value={achievement.desc.en}
                        onChange={(e) => {
                          const newAchievements = [...(data.achievements || [])]
                          newAchievements[index] = {
                            ...newAchievements[index],
                            desc: { ...newAchievements[index].desc, en: e.target.value },
                          }
                          setData({ ...data, achievements: newAchievements })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description (Vietnamese)</label>
                      <textarea
                        placeholder="Mô tả bằng tiếng Việt"
                        value={achievement.desc.vi}
                        onChange={(e) => {
                          const newAchievements = [...(data.achievements || [])]
                          newAchievements[index] = {
                            ...newAchievements[index],
                            desc: { ...newAchievements[index].desc, vi: e.target.value },
                          }
                          setData({ ...data, achievements: newAchievements })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-24"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold gradient-text">Skills</h2>
                <button
                  onClick={() => {
                    const newSkills = [...(data.skills || []), ""]
                    setData({ ...data, skills: newSkills })
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>
              <div className="space-y-3">
                {data.skills?.map((skill, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => {
                        const newSkills = [...(data.skills || [])]
                        newSkills[index] = e.target.value
                        setData({ ...data, skills: newSkills })
                      }}
                      className="flex-1 px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Skill name"
                    />
                    <button
                      onClick={() => {
                        const newSkills = data.skills?.filter((_, i) => i !== index)
                        setData({ ...data, skills: newSkills })
                      }}
                      className="px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold gradient-text">Projects</h2>
                <button
                  onClick={() => {
                    const newProjects = [
                      ...(data.projects || []),
                      { name: { en: "", vi: "" }, desc: { en: "", vi: "" }, link: "", image: "" },
                    ]
                    setData({ ...data, projects: newProjects })
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              {data.projects?.map((project, index) => (
                <div key={index} className="p-6 bg-background rounded-2xl border border-input space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">Project #{index + 1}</h3>
                    <button
                      onClick={() => {
                        const newProjects = data.projects?.filter((_, i) => i !== index)
                        setData({ ...data, projects: newProjects })
                      }}
                      className="text-destructive hover:opacity-70 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium mb-2">Project Image</label>
                    <div className="flex flex-col gap-4">
                      {project.image && (
                        <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-primary/30">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt="Project preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex gap-3">
                        <input
                          type="file"
                          ref={(el) => (projectImageRefs.current[index] = el)}
                          onChange={(e) => handleProjectImageUpload(e, index)}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => projectImageRefs.current[index]?.click()}
                          className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-muted rounded-xl transition-all font-medium"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Image
                        </button>
                      </div>
                      <input
                        type="text"
                        value={project.image || ""}
                        onChange={(e) => {
                          const newProjects = [...(data.projects || [])]
                          newProjects[index] = { ...newProjects[index], image: e.target.value }
                          setData({ ...data, projects: newProjects })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Or paste image URL"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Name (English)</label>
                      <input
                        type="text"
                        placeholder="Project name in English"
                        value={project.name.en}
                        onChange={(e) => {
                          const newProjects = [...(data.projects || [])]
                          newProjects[index] = {
                            ...newProjects[index],
                            name: { ...newProjects[index].name, en: e.target.value },
                          }
                          setData({ ...data, projects: newProjects })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Name (Vietnamese)</label>
                      <input
                        type="text"
                        placeholder="Tên dự án bằng tiếng Việt"
                        value={project.name.vi}
                        onChange={(e) => {
                          const newProjects = [...(data.projects || [])]
                          newProjects[index] = {
                            ...newProjects[index],
                            name: { ...newProjects[index].name, vi: e.target.value },
                          }
                          setData({ ...data, projects: newProjects })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Description (English)</label>
                      <textarea
                        placeholder="Description in English"
                        value={project.desc.en}
                        onChange={(e) => {
                          const newProjects = [...(data.projects || [])]
                          newProjects[index] = {
                            ...newProjects[index],
                            desc: { ...newProjects[index].desc, en: e.target.value },
                          }
                          setData({ ...data, projects: newProjects })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description (Vietnamese)</label>
                      <textarea
                        placeholder="Mô tả bằng tiếng Việt"
                        value={project.desc.vi}
                        onChange={(e) => {
                          const newProjects = [...(data.projects || [])]
                          newProjects[index] = {
                            ...newProjects[index],
                            desc: { ...newProjects[index].desc, vi: e.target.value },
                          }
                          setData({ ...data, projects: newProjects })
                        }}
                        className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Link</label>
                    <input
                      type="text"
                      placeholder="Project URL"
                      value={project.link}
                      onChange={(e) => {
                        const newProjects = [...(data.projects || [])]
                        newProjects[index] = { ...newProjects[index], link: e.target.value }
                        setData({ ...data, projects: newProjects })
                      }}
                      className="w-full px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold gradient-text">Contact Information</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                These contact details will be displayed in the contact section and used for the contact form.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={data.contact?.email || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact!, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={data.contact?.linkedin || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact!, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={data.contact?.github || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact!, github: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={data.contact?.phone || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact!, phone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="+84 123 456 789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telegram URL</label>
                  <input
                    type="url"
                    value={data.contact?.telegram || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact!, telegram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://t.me/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Discord Username</label>
                  <input
                    type="text"
                    value={data.contact?.discord || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact!, discord: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="username#1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Personal Website</label>
                  <input
                    type="url"
                    value={data.contact?.website || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact!, website: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "theme" && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold gradient-text">Theme Settings</h2>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Layout Options</h3>
                <div>
                  <label className="block text-sm font-medium mb-2">Header Style</label>
                  <select
                    value={data.themeSettings?.headerStyle || "sticky"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        themeSettings: {
                          ...data.themeSettings!,
                          headerStyle: e.target.value as "sticky" | "normal",
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="sticky">Sticky (Fixed at top)</option>
                    <option value="normal">Normal (Scrolls with page)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Section Colors</h3>
                <p className="text-sm text-muted-foreground">Customize background and text colors for each section</p>

                {Object.entries(data.themeSettings?.sections || {}).map(([section, colors]) => (
                  <div key={section} className="p-6 bg-background rounded-2xl border border-input space-y-4">
                    <h4 className="font-semibold capitalize">{section}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Background Color</label>
                        <div className="flex gap-3">
                          <input
                            type="color"
                            value={colors.bgColor}
                            onChange={(e) =>
                              setData({
                                ...data,
                                themeSettings: {
                                  ...data.themeSettings!,
                                  sections: {
                                    ...data.themeSettings!.sections,
                                    [section]: { ...colors, bgColor: e.target.value },
                                  },
                                },
                              })
                            }
                            className="w-16 h-12 rounded-lg cursor-pointer border border-input"
                          />
                          <input
                            type="text"
                            value={colors.bgColor}
                            onChange={(e) =>
                              setData({
                                ...data,
                                themeSettings: {
                                  ...data.themeSettings!,
                                  sections: {
                                    ...data.themeSettings!.sections,
                                    [section]: { ...colors, bgColor: e.target.value },
                                  },
                                },
                              })
                            }
                            className="flex-1 px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Text Color</label>
                        <div className="flex gap-3">
                          <input
                            type="color"
                            value={colors.textColor}
                            onChange={(e) =>
                              setData({
                                ...data,
                                themeSettings: {
                                  ...data.themeSettings!,
                                  sections: {
                                    ...data.themeSettings!.sections,
                                    [section]: { ...colors, textColor: e.target.value },
                                  },
                                },
                              })
                            }
                            className="w-16 h-12 rounded-lg cursor-pointer border border-input"
                          />
                          <input
                            type="text"
                            value={colors.textColor}
                            onChange={(e) =>
                              setData({
                                ...data,
                                themeSettings: {
                                  ...data.themeSettings!,
                                  sections: {
                                    ...data.themeSettings!.sections,
                                    [section]: { ...colors, textColor: e.target.value },
                                  },
                                },
                              })
                            }
                            className="flex-1 px-4 py-3 bg-card border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "footer" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6 gradient-text">Footer Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.footer?.showSocial ?? true}
                      onChange={(e) =>
                        setData({
                          ...data,
                          footer: { ...data.footer!, showSocial: e.target.checked },
                        })
                      }
                      className="w-5 h-5 rounded border-input"
                    />
                    <span className="text-sm font-medium">Show Social Links in Footer</span>
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Footer Text (English)</label>
                    <textarea
                      value={data.footer?.text.en || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          footer: {
                            ...data.footer!,
                            text: { ...data.footer!.text, en: e.target.value },
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-24"
                      placeholder="Footer text in English"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Footer Text (Vietnamese)</label>
                    <textarea
                      value={data.footer?.text.vi || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          footer: {
                            ...data.footer!,
                            text: { ...data.footer!.text, vi: e.target.value },
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-24"
                      placeholder="Nội dung footer bằng tiếng Việt"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
