import React from 'react'
import Link from 'next/link'
import { Sprout, PhoneCall, ShieldCheck, Heart, Radio, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/90 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                THE FARMER'S GAMBLE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Turn uncertainty into better farming decisions." An AI-powered decision intelligence engine bridging smartphone apps and ordinary basic phone voice calls.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 text-xs">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Voice Hotline: <strong>+91 80 4719 5000</strong></span>
            </div>
          </div>

          {/* Col 2: Smartphone Farmers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Smartphone Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Farmer Dashboard</Link></li>
              <li><Link href="/crop-recommendation" className="hover:text-emerald-400 transition-colors">AI Crop Recommendation</Link></li>
              <li><Link href="/fertilizer" className="hover:text-emerald-400 transition-colors">Precision Fertilizer Calculator</Link></li>
              <li><Link href="/market" className="hover:text-emerald-400 transition-colors">APMC Market Intelligence</Link></li>
              <li><Link href="/plant-doctor" className="hover:text-emerald-400 transition-colors">AI Plant Doctor (Vision + Symptoms)</Link></li>
              <li><Link href="/marketplace" className="hover:text-emerald-400 transition-colors">Farm-to-Buyer Marketplace</Link></li>
            </ul>
          </div>

          {/* Col 3: Normal-Phone Farmers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              Normal-Phone IVR
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center justify-between">
                <span>Dial 1</span>
                <span className="text-slate-500">Market Mandi Prices</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dial 2</span>
                <span className="text-slate-500">Weather & Storm Alerts</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dial 3</span>
                <span className="text-slate-500">Crop Suitability Advice</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dial 4</span>
                <span className="text-slate-500">Fertilizer Dosage</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dial 5</span>
                <span className="text-slate-500">Plant Disease Remedies</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dial 0</span>
                <span className="text-amber-400 font-semibold">Talk directly to AgriAI</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Security & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/buyer" className="hover:text-emerald-400 transition-colors">Wholesale Buyer Portal</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-400 transition-colors">Admin Control Center</Link></li>
              <li><Link href="/demo" className="hover:text-emerald-400 transition-colors">Hackathon Demo Storyboard</Link></li>
              <li><Link href="/voice-assistant" className="hover:text-emerald-400 transition-colors">In-Browser Phone Simulator</Link></li>
            </ul>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              ⚠️ <span className="italic">AI recommendations are agronomic guidance. Confirm critical inputs with a certified local agricultural officer.</span>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 The Farmer's Gamble. Built with Next.js, TypeScript, Tailwind CSS, Prisma & AI Telephony.</p>
          <div className="flex items-center gap-4">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
              APMC Anantapur • Kurnool • Guntur Feeds
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
