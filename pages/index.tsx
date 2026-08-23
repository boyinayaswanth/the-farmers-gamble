import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import MarketTicker from '../components/MarketTicker'
import { 
  Sprout, 
  Sparkles, 
  FlaskConical, 
  BarChart3, 
  Bug, 
  PhoneCall, 
  ShoppingBag, 
  Bot, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Radio, 
  Smartphone, 
  Phone,
  Layers,
  Award,
  Zap,
  Landmark,
  Calendar
} from 'lucide-react'

export default function Home() {
  const [selectedCropCalc, setSelectedCropCalc] = useState('Groundnut')
  const [acresCalc, setAcresCalc] = useState(3)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600)

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = []
    const particleCount = 45

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.2,
        color: Math.random() > 0.4 ? '#10b981' : '#f59e0b'
      })
    }

    function render() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.25 * (1 - dist / 130)})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || 600
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const cropRoiData: { [key: string]: { yieldPerAcre: number; price: number; cost: number } } = {
    'Groundnut': { yieldPerAcre: 980, price: 86.5, cost: 18500 },
    'Maize': { yieldPerAcre: 2400, price: 25.5, cost: 19000 },
    'Red Gram': { yieldPerAcre: 680, price: 104.0, cost: 14500 },
    'Red Chilli': { yieldPerAcre: 1850, price: 205.0, cost: 58000 },
    'Cotton': { yieldPerAcre: 850, price: 76.0, cost: 26000 },
  }

  const activeCalc = cropRoiData[selectedCropCalc]
  const estRevenue = Math.round(activeCalc.yieldPerAcre * activeCalc.price * acresCalc)
  const estCost = Math.round(activeCalc.cost * acresCalc)
  const estProfit = estRevenue - estCost

  return (
    <Layout>
      {/* Real-Time Market Price Ticker */}
      <MarketTicker />

      {/* Hero Section */}
      <section className="relative pt-6 pb-16 text-center lg:text-left overflow-hidden">
        {/* Animated Constellation Grid Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 pointer-events-none z-0 opacity-40" 
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide shadow-glow-green">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>Full-Stack AI Agricultural Intelligence</span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
              Turn Uncertainty into <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Better Farming Decisions.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Farming shouldn't be a blind gamble. We combine <strong>Soil Chemistry, Weather Radar, APMC Market Prices, Disease Vision</strong>, and <strong>Two-Way AI Telephony</strong> into one unified decision engine for every Indian farmer.
            </p>

            {/* Dual Farmer Inclusivity Badge */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">1. Smartphone Farmers</p>
                  <p className="text-[11px] text-slate-400">Rich Web & Mobile AI Dashboard</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">2. Normal-Phone Farmers</p>
                  <p className="text-[11px] text-slate-400">Ordinary 2G Voice Calls & IVR</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/login"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-glow-green hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Get Started with Mobile OTP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/voice-assistant"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Try Voice AI Phone Simulator</span>
              </Link>

              <Link
                href="/demo"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-all"
              >
                Explore Demo Story
              </Link>
            </div>
          </div>

          {/* Hero Right Column: Interactive Agronomic ROI Preview Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/40 p-6 shadow-2xl space-y-5 relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Instant Crop Decision Simulator
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  Sample: Anantapur (AP)
                </span>
              </div>

              {/* Crop & Land Selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Select Crop</label>
                  <select
                    value={selectedCropCalc}
                    onChange={(e) => setSelectedCropCalc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                  >
                    {Object.keys(cropRoiData).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Land Size (Acres)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={acresCalc}
                    onChange={(e) => setAcresCalc(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
              </div>

              {/* Live ROI Numbers */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Current APMC Mandi Rate:</span>
                  <span className="font-bold text-white">₹{activeCalc.price}/kg</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Est. Total Harvest Yield:</span>
                  <span className="font-bold text-white">{activeCalc.yieldPerAcre * acresCalc} kg</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Est. Production Input Cost:</span>
                  <span className="font-bold text-slate-300">₹{estCost.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-400">Est. Net Profit Margin:</span>
                  <div className="text-right">
                    <div className="font-heading font-black text-xl text-emerald-400">
                      ₹{estProfit.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-500 italic">Guidance estimate only</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/30 flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Soil Suitability for Anantapur:
                </span>
                <span className="font-bold font-mono">94% (High Fit)</span>
              </div>

              <Link
                href="/crop-recommendation"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Run Full Multivariable AI Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6 Core Feature Pillars */}
      <section className="py-16 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            Comprehensive AgriTech Ecosystem
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mt-3">
            Everything A Farmer Needs to Succeed
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Integrated end-to-end: From soil preparation to harvesting, disease control, and direct farmgate sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: AI Crop Advisor */}
          <Link href="/crop-recommendation" className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 glass-card-hover transition-all space-y-4 block">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              🌱 AI Crop Recommendation
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes Soil NPK, pH, season, irrigation, mandi prices, and production cost to rank the most profitable crops for your land with risk factors.
            </p>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              Explore Advisor <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Card 2: Smart Fertilizer */}
          <Link href="/fertilizer" className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 glass-card-hover transition-all space-y-4 block">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/40">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              🧪 Precision Fertilizer Engine
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates exact kg/acre dosage of DAP, Urea, Potash, and Gypsum for every growth stage based on soil test results, with organic alternatives.
            </p>
            <span className="text-xs text-teal-400 font-bold flex items-center gap-1">
              Calculate Fertilizer <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Card 3: Market Price Intelligence */}
          <Link href="/market" className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 glass-card-hover transition-all space-y-4 block">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              📊 Market Price Intelligence
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time APMC mandi modal rates, 30-day historical price trends, and high-demand opportunities tailored specifically to your harvest.
            </p>
            <span className="text-xs text-cyan-400 font-bold flex items-center gap-1">
              View Mandi Rates <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Card 4: AI Plant Doctor */}
          <Link href="/plant-doctor" className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 glass-card-hover transition-all space-y-4 block">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40">
              <Bug className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              🦠 AI Plant Doctor (CV & Symptoms)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload leaf photos for instant Computer Vision disease detection or use the interactive symptom questionnaire if you don't have a camera.
            </p>
            <span className="text-xs text-rose-400 font-bold flex items-center gap-1">
              Diagnose Disease <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Card 5: Two-Way Voice AI */}
          <Link href="/voice-assistant" className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/40 hover:border-amber-400 glass-card-hover transition-all space-y-4 block">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-white">
                📞 Two-Way Voice AI
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
                Core Feature
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Proactive outbound alerts (Storms, Price spikes) + Inbound basic-phone IVR calling (DTMF 1-6 & 0) with zero smartphone requirement.
            </p>
            <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
              Launch Voice Simulator <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Card 6: Farm Marketplace */}
          <Link href="/marketplace" className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 glass-card-hover transition-all space-y-4 block">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/40">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              🛒 Farm-to-Buyer Marketplace
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart Selling: 1-click list produce from your farm profile, receive verified buyer bids, and communicate through protected masked phone calls.
            </p>
            <span className="text-xs text-indigo-400 font-bold flex items-center gap-1">
              Browse Marketplace <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

        </div>
      </section>

      {/* Dual Story Section: How It Solves for Both Farmers */}
      <section className="py-16 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
            Inclusivity by Design
          </span>
          <h2 className="font-heading font-black text-3xl text-white mt-3">
            Two Farmers. One Unified AI Brain.
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Whether accessing via smartphone touchscreen or ordinary button phone keypad, every farmer receives identical high-precision agronomic guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Smartphone Farmer Persona */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-white">Smartphone Farmer (Mobile App)</h4>
                <p className="text-xs text-emerald-400 font-semibold">Touchscreen • Visuals • Charts</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Full interactive dashboard with 5-day radar weather forecasts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Upload diseased leaf photos directly to AI Computer Vision scanner</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Interactive What-If climate simulation sliders for crop profits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>1-click harvest listings on the digital marketplace</span>
              </li>
            </ul>
          </div>

          {/* Normal-Phone Farmer Persona */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-white">Normal-Phone Farmer (Voice Telephony)</h4>
                <p className="text-xs text-amber-400 font-semibold">2G Phone • No Internet • Voice & DTMF</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Receives proactive outbound phone calls for storm warnings & price surges</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Dials toll-free IVR (Press 1 for prices, 2 for weather, 4 for fertilizer)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Diagnoses plant diseases via simple voice questionnaire without a camera</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Speaks naturally with AgriAI in English or Telugu (తెలుగు)</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-900/80 via-slate-900 to-teal-950 border-2 border-emerald-500/40 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-glow-green">
          <Sprout className="w-8 h-8" />
        </div>
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Ready to Make Confident Farming Decisions?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Experience the complete working MVP with mandatory OTP mobile verification, personalized soil analytics, and live AI voice calling.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-glow-green hover:scale-105 active:scale-95 transition-all"
          >
            Start with Mobile OTP
          </Link>
          <Link
            href="/demo"
            className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold text-sm transition-colors"
          >
            Review Hackathon Demo Flow
          </Link>
        </div>
      </section>

    </Layout>
  )
}
