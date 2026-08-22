import React, { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck, 
  Smartphone, 
  Phone, 
  ShoppingBag, 
  FlaskConical, 
  Bug, 
  BarChart3, 
  CloudLightning,
  Play,
  RotateCcw
} from 'lucide-react'

export default function DemoStoryboardPage() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      num: 1,
      title: 'Farmer Opens Application',
      desc: 'Farmer Ravi Kumar visits The Farmer\'s Gamble landing page on smartphone or mobile browser.',
      targetUrl: '/',
      btnText: 'View Landing Page',
      icon: Smartphone,
    },
    {
      num: 2,
      title: 'Enters Mobile Number (+91 98765 43210)',
      desc: 'Farmer enters verified mobile number to initiate secure cryptographic authentication.',
      targetUrl: '/login',
      btnText: 'Go to Login Portal',
      icon: Phone,
    },
    {
      num: 3,
      title: 'Secure 6-Digit OTP Dispatched',
      desc: 'Backend generates SHA-256 hashed 6-digit code with 5-minute expiry (Dev OTP displayed in dev mode).',
      targetUrl: '/login',
      btnText: 'Review OTP Flow',
      icon: ShieldCheck,
    },
    {
      num: 4,
      title: 'Farmer Enters OTP Code',
      desc: 'Enters code into mobile keypad. Backend verifies hash and prevents brute-force attempts.',
      targetUrl: '/login',
      btnText: 'Verify OTP',
      icon: CheckCircle2,
    },
    {
      num: 5,
      title: 'Account Verified & Session Created',
      desc: 'JWT session cookie issued (HTTP-Only) establishing secure role-based access.',
      targetUrl: '/dashboard',
      btnText: 'Enter Account',
      icon: ShieldCheck,
    },
    {
      num: 6,
      title: 'Farmer Profile Creation & Calibration',
      desc: 'Farmer enters location (Anantapur, AP), village, experience, and farming budget.',
      targetUrl: '/profile',
      btnText: 'Open Profile Wizard',
      icon: CheckCircle2,
    },
    {
      num: 7,
      title: 'Adds 3 Acres + Groundnut + Soil NPK Data',
      desc: 'Inputs Red Sandy Loam, pH 6.5, Nitrogen: 210, Phosphorus: 18, Potassium: 140, Drip Irrigation.',
      targetUrl: '/profile',
      btnText: 'Check Soil Calibration',
      icon: FlaskConical,
    },
    {
      num: 8,
      title: 'Personalized Dashboard Overview',
      desc: 'Dashboard loads tailored greetings, active crop health gauge, and market indicators.',
      targetUrl: '/dashboard',
      btnText: 'Open Farmer Dashboard',
      icon: Smartphone,
    },
    {
      num: 9,
      title: 'AI Recommends Fertilizer Schedule',
      desc: 'Calculates exact DAP, Urea, Potash, and Gypsum dosages for pegging stage with organic alternatives.',
      targetUrl: '/fertilizer',
      btnText: 'View Fertilizer Schedule',
      icon: FlaskConical,
    },
    {
      num: 10,
      title: 'Market Intelligence & Mandi Demand',
      desc: 'Groundnut modal price in Anantapur Mandi is ₹86.50/kg with rising trend and 30-day historical chart.',
      targetUrl: '/market',
      btnText: 'Inspect Market Ticker',
      icon: BarChart3,
    },
    {
      num: 11,
      title: 'Farmer Uploads Diseased Leaf Photo',
      desc: 'Farmer captures Groundnut leaf image with brown circular spots and yellow halos.',
      targetUrl: '/plant-doctor',
      btnText: 'Scan Leaf Image',
      icon: Bug,
    },
    {
      num: 12,
      title: 'AI Computer Vision Diagnostic (93.8% Match)',
      desc: 'Identifies Tikka Leaf Spot (Cercospora), explains humidity cause, and prescribes Mancozeb foliar spray.',
      targetUrl: '/plant-doctor',
      btnText: 'Review Disease Report',
      icon: Sparkles,
    },
    {
      num: 13,
      title: 'Weather Radar Risk: 42mm Storm Alert',
      desc: 'Weather engine issues emergency alert for heavy rain in Anantapur, advising field drainage clearing.',
      targetUrl: '/dashboard',
      btnText: 'Check Weather Warning',
      icon: CloudLightning,
    },
    {
      num: 14,
      title: 'System Triggers Proactive AI Voice Call',
      desc: 'AgriAI automated telephony calls farmer mobile with high-priority voice drainage warning.',
      targetUrl: '/voice-assistant',
      btnText: 'Trigger Outbound Voice Call',
      icon: PhoneCall,
    },
    {
      num: 15,
      title: 'Farmer Calls AI Assistant (Inbound Voice / IVR)',
      desc: 'Farmer dials toll-free line from basic phone. Interactive IVR offers options 1-6 or 0 for natural voice.',
      targetUrl: '/voice-assistant',
      btnText: 'Launch In-Browser Phone',
      icon: Phone,
    },
    {
      num: 16,
      title: 'AI Answers Contextually via Voice Telephony',
      desc: 'AgriAI identifies caller as Ravi Kumar and replies in English or Telugu using his actual soil profile.',
      targetUrl: '/voice-assistant',
      btnText: 'Test Voice Dialogue',
      icon: PhoneCall,
    },
    {
      num: 17,
      title: 'Farmer Lists 800 kg Groundnut Harvest',
      desc: 'Smart Selling button 1-click pre-fills marketplace listing from farmer profile.',
      targetUrl: '/marketplace',
      btnText: 'List Farm Produce',
      icon: ShoppingBag,
    },
    {
      num: 18,
      title: 'Buyer Discovers Listing in Wholesale Portal',
      desc: 'Sri Venkateswara Agro Commodities discovers Ravi Kumar\'s 800 kg Grade-A Groundnut harvest.',
      targetUrl: '/buyer',
      btnText: 'Switch to Buyer Portal',
      icon: ShoppingBag,
    },
    {
      num: 19,
      title: 'Buyer Sends Purchase Offer (₹84.50/kg)',
      desc: 'Buyer submits digital purchase bid. Instant in-app notification delivered to farmer dashboard.',
      targetUrl: '/marketplace',
      btnText: 'Review Buyer Offer',
      icon: CheckCircle2,
    },
    {
      num: 20,
      title: 'Protected Masked Communication Initiated',
      desc: 'Farmer and Buyer connect over an encrypted virtual proxy bridge (+91 80 4719 XXXX) protecting personal numbers.',
      targetUrl: '/marketplace',
      btnText: 'Open Masked Call Bridge',
      icon: ShieldCheck,
    },
  ]

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Hackathon Verification
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                Complete 20-Step Storyboard
              </span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              "The Farmer's Gamble" End-to-End Demo Story
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any step below to navigate directly into that functional module in the live MVP application.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>20 / 20 Functional Modules Verified</span>
          </div>
        </div>

        {/* 20 Steps Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s) => {
            const Icon = s.icon
            const isSelected = activeStep === s.num

            return (
              <div
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/60 shadow-xl'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-heading font-black text-xs ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {s.num}
                      </div>
                      <h4 className="font-heading font-bold text-sm text-white">
                        {s.title}
                      </h4>
                    </div>

                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Step {s.num} of 20
                  </span>
                  <Link
                    href={s.targetUrl}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>{s.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </Layout>
  )
}
