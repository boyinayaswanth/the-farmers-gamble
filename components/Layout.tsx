import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  hideDemoBar?: boolean
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<any>(null)
  const [unreadCount, setUnreadCount] = useState(3)

  const syncUser = async () => {
    // 1. Instant local cache
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('tfg_user')
      if (cached) {
        try {
          setUser(JSON.parse(cached))
        } catch (e) {}
      }
    }

    // 2. Server verification
    try {
      const res = await fetch('/api/me')
      const data = await res.json()
      if (data.authenticated && data.user) {
        setUser(data.user)
        setUnreadCount(data.unreadNotificationsCount || 3)
        if (typeof window !== 'undefined') {
          localStorage.setItem('tfg_user', JSON.stringify(data.user))
        }
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('tfg_user')
        }
        setUser(null)
      }
    } catch (e) {}
  }

  useEffect(() => {
    syncUser()
    const handleAuthChange = () => syncUser()
    window.addEventListener('auth-changed', handleAuthChange)
    window.addEventListener('storage', handleAuthChange)
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange)
      window.removeEventListener('storage', handleAuthChange)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar user={user} unreadCount={unreadCount} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        {children}
      </main>

      {/* Agricultural Footer */}
      <Footer />
    </div>
  )
}
