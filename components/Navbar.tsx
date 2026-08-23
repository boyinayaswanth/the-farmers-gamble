import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  Sprout, 
  PhoneCall, 
  BarChart3, 
  FlaskConical, 
  Bug, 
  ShoppingBag, 
  Bot, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Globe2,
  Sparkles,
  Landmark
} from 'lucide-react'

interface NavbarProps {
  user?: any
  unreadCount?: number
}

export default function Navbar({ user, unreadCount = 0 }: NavbarProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<string>('en')
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    // Check saved language
    const savedLang = localStorage.getItem('tfg_lang') || 'en'
    setLanguage(savedLang)

    // Fetch notifications if logged in
    async function loadNotifs() {
      try {
        const res = await fetch('/api/me')
        const data = await res.json()
        if (data.authenticated) {
          const nRes = await fetch('/api/farmer/weather')
          // seed sample notifications
          setNotifications([
            {
              id: '1',
              title: '⛈️ Storm Warning (42mm)',
              message: 'Check drainage in your 3-acre Groundnut field in Anantapur.',
              time: '10m ago',
              link: '/dashboard'
            },
            {
              id: '2',
              title: '📈 Price Surge: Groundnut ₹86.50/kg',
              message: 'Mandi prices rose by +₹3.50/kg today with HIGH demand.',
              time: '1h ago',
              link: '/market'
            },
            {
              id: '3',
              title: '🛒 Buyer Offer Received',
              message: 'Sri Venkateswara Agro offered ₹84.50/kg for 800 kg Groundnut.',
              time: '3h ago',
              link: '/marketplace'
            }
          ])
        }
      } catch (e) {}
    }
    loadNotifs()
  }, [])

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang)
    localStorage.setItem('tfg_lang', newLang)
    window.dispatchEvent(new Event('storage'))
  }

  async function handleLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tfg_user')
      window.dispatchEvent(new Event('auth-changed'))
    }
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const navLinks = [
    { href: '/dashboard', label: language === 'te' ? 'డాష్‌బోర్డ్' : 'Dashboard', icon: Sprout },
    { href: '/crop-recommendation', label: language === 'te' ? 'పంట సలహా' : 'Crop AI', icon: Sparkles },
    { href: '/fertilizer', label: language === 'te' ? 'ఎరువులు' : 'Fertilizer', icon: FlaskConical },
    { href: '/schemes', label: language === 'te' ? 'పథకాలు' : 'Govt Schemes', icon: Landmark },
    { href: '/market', label: language === 'te' ? 'మార్కెట్' : 'Market Intelligence', icon: BarChart3 },
    { href: '/plant-doctor', label: language === 'te' ? 'తెగుళ్ల డాక్టర్' : 'Plant Doctor', icon: Bug },
    { href: '/voice-assistant', label: language === 'te' ? 'వాయిస్ AI' : 'Voice Hotline', icon: PhoneCall, highlight: true },
    { href: '/marketplace', label: language === 'te' ? 'మార్కెట్‌ప్లేస్' : 'Marketplace', icon: ShoppingBag },
    { href: '/ai-chat', label: language === 'te' ? 'AI చాట్' : 'AgriAI Chat', icon: Bot },
  ]

  const isActive = (path: string) => router.pathname === path

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-emerald-900/40 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center shadow-glow-green group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-heading font-black text-xl tracking-tight text-white flex items-center gap-1.5">
                THE FARMER'S GAMBLE
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  AI MVP
                </span>
              </span>
              <p className="text-[11px] text-emerald-400/80 font-medium tracking-wide">
                Turn uncertainty into better farming decisions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : item.highlight
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.highlight ? 'text-amber-400' : 'text-emerald-400'}`} />
                  {item.label}
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-emerald-300 focus:border-emerald-500 focus:outline-none cursor-pointer"
                aria-label="Select Language"
              >
                <option value="en">🌐 English</option>
                <option value="te">🌐 తెలుగు (Telugu)</option>
                <option value="hi">🌐 हिंदी (Hindi)</option>
                <option value="ta">🌐 தமிழ் (Tamil)</option>
                <option value="kn">🌐 ಕನ್ನಡ (Kannada)</option>
                <option value="mr">🌐 मराठी (Marathi)</option>
              </select>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-slate-950 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {language === 'te' ? 'నోటిఫికేషన్లు' : 'Agri Alerts'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                      3 New
                    </span>
                  </div>
                  <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.link || '/dashboard'}
                        onClick={() => setNotifOpen(false)}
                        className="block p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-colors text-left"
                      >
                        <p className="text-xs font-bold text-slate-200">{n.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-emerald-400 mt-1 block">{n.time}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth State */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/40 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                    {user.name ? user.name[0] : 'R'}
                  </div>
                  <span className="hidden sm:inline">{user.name || 'Ravi Kumar'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                    {user.role || 'FARMER'}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-glow-green transition-all"
                >
                  {language === 'te' ? 'లాగిన్' : 'Sign In'}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  active
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  {item.label}
                </div>
                {item.highlight && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    Normal Phone IVR
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
