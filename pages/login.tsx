import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { 
  ShieldCheck, 
  Smartphone, 
  User, 
  KeyRound, 
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
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null)
  const [timer, setTimer] = useState(0)
  const [devCode, setDevCode] = useState<string | null>(null)

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
    setOtpSent(false)
    setOtp('')
    setDevCode(null)
    setMessage(null)
  }

  // Handle Send OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile,
          name: name.trim() || (role === 'ADMIN' ? 'Gram Panchayat Officer' : role === 'BUYER' ? 'Agro Buyer' : 'Yaswanth'),
          role
        })
      })

      const data = await res.json()

      if (res.ok && data.ok) {
        setOtpSent(true)
        if (data.devOtp) setDevCode(data.devOtp)
        setMessage({
          type: 'success',
          text: data.message || `OTP sent via SMS to ${mobile}. Valid for 30 minutes.`
        })
        setTimer(180) // 3 full minutes countdown
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Failed to dispatch OTP. Please check your mobile number.'
        })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Network error connecting to SMS Gateway' })
    } finally {
      setLoading(false)
    }
  }

  // Handle Verify OTP
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile,
          code: otp.trim(),
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
        setMessage({ type: 'success', text: 'Authentication successful! Loading dashboard...' })
        setTimeout(() => {
          if (role === 'ADMIN') {
            router.push('/admin')
          } else if (role === 'BUYER') {
            router.push('/buyer')
          } else {
            router.push('/dashboard')
          }
        }, 400)
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Invalid verification code. Please check your phone SMS.'
        })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Verification error' })
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
            <h2 className="font-heading font-black text-2xl text-white">
              Two-Way Agricultural Portal
            </h2>
            <p className="text-xs text-slate-400">
              Select your role: Gram Panchayat (Information Provider) or Farmer (Information Consumer).
            </p>
          </div>

          {/* Primary 2-Portal Switcher Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* 1. Farmer Portal */}
            <button
              type="button"
              onClick={() => selectPortal('FARMER')}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                role === 'FARMER'
                  ? 'bg-emerald-950/80 border-emerald-500 shadow-glow-green text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  role === 'FARMER' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Sprout className="w-4 h-4" />
                </div>
                {role === 'FARMER' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-bold">
                    Selected
                  </span>
                )}
              </div>
              <div className="font-heading font-black text-sm text-white">1. Farmer Portal</div>
              <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                Reads AI crop advice, APMC mandi rates, fertilizer dosage, and receives voice phone calls.
              </div>
            </button>

            {/* 2. Gram Panchayat Admin Portal */}
            <button
              type="button"
              onClick={() => selectPortal('ADMIN')}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                role === 'ADMIN'
                  ? 'bg-amber-950/80 border-amber-500 shadow-glow-gold text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  role === 'ADMIN' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Landmark className="w-4 h-4" />
                </div>
                {role === 'ADMIN' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 font-bold">
                    Selected
                  </span>
                )}
              </div>
              <div className="font-heading font-black text-sm text-white">2. Gram Panchayat Portal</div>
              <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                Broadcasts village notices, manages govt subsidy schemes, and updates APMC floor prices.
              </div>
            </button>

          </div>

          {/* Quick Buyer link at bottom of selector */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => selectPortal('BUYER')}
              className={`text-xs font-semibold inline-flex items-center gap-1 transition-all ${
                role === 'BUYER' ? 'text-indigo-400 underline font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Wholesale Mandi Buyer / Trader Login &rarr;</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4 relative">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {role === 'ADMIN' ? 'Officer / Office Name' : role === 'BUYER' ? 'Business / Trader Name' : 'Farmer Full Name'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Yaswanth"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                10-Digit Mobile Number
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

            {/* OTP Input Box (Displayed when OTP is sent) */}
            {otpSent && (
              <div className="space-y-3 pt-2 animate-fade-in">
                <div className="p-4 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-emerald-400">
                      Enter Verification Code from SMS
                    </label>
                    <span className="text-[11px] text-emerald-300 font-mono font-semibold">
                      {timer > 0 
                        ? `Valid for 30 Mins (Resend in ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')})` 
                        : 'Valid for 30 Mins • Ready to Resend'}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={10}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP Code"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border-2 border-emerald-500/60 text-white text-base font-mono font-bold tracking-widest focus:border-emerald-400 focus:outline-none text-center"
                      required
                    />
                  </div>

                  {/* Audience-Ready Live Cellular SMS Toast Card */}
                  {devCode && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border-2 border-emerald-500/40 shadow-lg space-y-2 animate-bounce-short">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>💬 Cellular SMS Dispatched to {mobile}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">Just Now</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-3">
                        <div className="text-xs text-slate-200">
                          <p className="font-semibold text-slate-300">
                            Sender: <span className="text-emerald-300 font-bold">FARMER-GOV</span>
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Your verification code is <strong className="text-white text-sm font-mono tracking-widest">{devCode}</strong>.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOtp(devCode)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs shadow-glow-green active:scale-95 transition-all shrink-0"
                        >
                          Tap to Auto-Fill ↵
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Reassuring note for farmers */}
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-200 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">🌾</span>
                    <p className="leading-snug">
                      <strong>రైతులకు గమనిక:</strong> ఈ కోడ్ <strong>30 నిమిషాల</strong> పాటు చెల్లుబాటు అవుతుంది. తీరికగా ఎంటర్ చేయవచ్చు. (Valid for 30 full minutes).
                    </p>
                  </div>
                </div>
              </div>
            )}

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

            {/* Action Buttons */}
            <div className="pt-2">
              {!otpSent ? (
                <button
                  type="submit"
                  disabled={loading || !mobile}
                  className={`w-full py-3 rounded-xl text-white font-bold text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                    role === 'ADMIN'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{loading ? 'Generating & Sending...' : `Send OTP Code (${role === 'ADMIN' ? 'Admin Portal' : 'Farmer Portal'})`}</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={loading || otp.length < 4}
                    className={`w-full py-3 rounded-xl text-white font-bold text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                      role === 'ADMIN'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black'
                        : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{loading ? 'Verifying...' : `Verify OTP & Enter ${role === 'ADMIN' ? 'Gram Panchayat Command Center' : 'Farmer Dashboard'}`}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false)
                      setOtp('')
                      setMessage(null)
                    }}
                    className="w-full py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold transition-colors"
                  >
                    &larr; Change Mobile Number or Role
                  </button>
                </div>
              )}
            </div>

          </form>

        </div>

      </div>
    </Layout>
  )
}
