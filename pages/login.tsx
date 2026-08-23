import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { 
  ShieldCheck, 
  Smartphone, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Shield, 
  ShoppingBag,
  Landmark,
  Radio,
  Sprout
} from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [mobile, setMobile] = useState('+91 8555864859')
  const [name, setName] = useState('Yaswanth')
  const [role, setRole] = useState<'FARMER' | 'ADMIN' | 'BUYER'>('FARMER')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null)

  // Quick preset selector
  function selectPortal(r: 'FARMER' | 'ADMIN' | 'BUYER') {
    setRole(r)
    if (r === 'FARMER') {
      setName('Yaswanth')
      setMobile('+91 8555864859')
    } else if (r === 'ADMIN') {
      setName('Gram Panchayat & Agri Officer (Kalyandurg)')
      setMobile('+91 90000 00000')
    } else if (r === 'BUYER') {
      setName('Sri Venkateswara Agro Commodities')
      setMobile('+91 91234 56789')
    }
    setMessage(null)
  }

  // Handle Direct Instant Login
  async function handleDirectLogin(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/direct-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile,
          name: name.trim(),
          role
        })
      })

      const data = await res.json()

      if (res.ok && data.ok) {
        if (typeof window !== 'undefined' && data.user) {
          localStorage.setItem('tfg_user', JSON.stringify(data.user))
          window.dispatchEvent(new Event('auth-changed'))
        }
        setMessage({ type: 'success', text: `Welcome ${data.user?.name || ''}! Loading dashboard...` })
        setTimeout(() => {
          if (role === 'ADMIN') {
            router.push('/admin')
          } else if (role === 'BUYER') {
            router.push('/buyer')
          } else {
            router.push('/dashboard')
          }
        }, 300)
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Login failed. Please check your mobile number.'
        })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Network connection error during sign-in.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto my-6 space-y-6">
        
        {/* Main Authentication Box */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-glow-green">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-black text-2xl text-white">
              Sign In to The Farmer's Gamble
            </h1>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Direct mobile authentication for Farmers, Gram Panchayat Officers, and Wholesale Buyers.
            </p>
          </div>

          {/* Role Portal Switcher */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
              Select Your Access Portal
            </label>
            <div className="grid grid-cols-3 gap-2">
              
              {/* Option 1: Farmer */}
              <button
                type="button"
                onClick={() => selectPortal('FARMER')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  role === 'FARMER'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-glow-green'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs font-bold">Farmer Portal</div>
                <div className="text-[10px] text-slate-500">రైతు ప్రవేశం</div>
              </button>

              {/* Option 2: Gram Panchayat Admin */}
              <button
                type="button"
                onClick={() => selectPortal('ADMIN')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  role === 'ADMIN'
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-glow-amber'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xs font-bold">Panchayat Admin</div>
                <div className="text-[10px] text-slate-500">గ్రామ అధికారి</div>
              </button>

              {/* Option 3: Buyer */}
              <button
                type="button"
                onClick={() => selectPortal('BUYER')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  role === 'BUYER'
                    ? 'bg-blue-950/80 border-blue-500 text-blue-300 shadow-glow-blue'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xs font-bold">Agro Buyer</div>
                <div className="text-[10px] text-slate-500">వ్యాపారి ప్రవేశం</div>
              </button>

            </div>
          </div>

          {/* Direct Login Form */}
          <form onSubmit={handleDirectLogin} className="space-y-4">
            
            {/* Name Input */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Your Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Smartphone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 8555864859"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono font-bold tracking-wide focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Notification Messages */}
            {message && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  message.type === 'error'
                    ? 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
                    : message.type === 'success'
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800 border border-slate-700 text-slate-300'
                }`}
              >
                {message.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-heading font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98 ${
                role === 'ADMIN'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-glow-amber'
                  : role === 'BUYER'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-glow-blue'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-glow-green'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>
                    {role === 'ADMIN' 
                      ? 'Sign In to Gram Panchayat Command Center' 
                      : role === 'BUYER'
                      ? 'Sign In to Farmgate Wholesale Portal'
                      : 'Sign In to Farmer Dashboard'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Presets */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 block text-center">
              1-Click Quick Demo Switcher:
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => selectPortal('FARMER')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-semibold hover:border-emerald-500/40"
              >
                👨‍🌾 Yaswanth (+91 8555864859)
              </button>
              <button
                type="button"
                onClick={() => selectPortal('ADMIN')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 font-semibold hover:border-amber-500/40"
              >
                🏛️ Panchayat Officer
              </button>
              <button
                type="button"
                onClick={() => selectPortal('BUYER')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-blue-400 font-semibold hover:border-blue-500/40"
              >
                🛒 Wholesale Buyer
              </button>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  )
}
