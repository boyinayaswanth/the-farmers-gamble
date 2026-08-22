import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import WeatherWidget from '../components/WeatherWidget'
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
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Calendar,
  Layers,
  Radio,
  ExternalLink,
  Plus,
  Landmark,
  ShieldCheck,
  Award,
  Zap,
  HelpCircle,
  FileText
} from 'lucide-react'

export default function Dashboard() {
  const [profile, setProfile] = useState<any>({
    name: 'Yaswanth',
    location: 'Anantapur, Andhra Pradesh',
    landSize: 3.0,
    landUnit: 'Acres',
    currentCrop: 'Groundnut',
    soilType: 'Red Sandy Loam',
    soilPh: 6.5,
  })
  const [marketOpportunities, setMarketOpportunities] = useState<any[]>([])
  const [buyerRequests, setBuyerRequests] = useState<any[]>([])
  const [selectedScheme, setSelectedScheme] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Instant local sync
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('tfg_user')
      if (cached) {
        try {
          const u = JSON.parse(cached)
          if (u.name) setProfile((p: any) => ({ ...p, name: u.name }))
        } catch (e) {}
      }
    }

    async function load() {
      try {
        const [profRes, oppRes, reqRes] = await Promise.all([
          fetch('/api/farmer/profile'),
          fetch('/api/market/high-demand'),
          fetch('/api/marketplace/request?role=FARMER')
        ])
        const [profData, oppData, reqData] = await Promise.all([
          profRes.json(),
          oppRes.json(),
          reqRes.json()
        ])

        if (profData.ok && profData.profile) {
          setProfile((prev: any) => ({
            ...prev,
            ...profData.profile,
            name: profData.user?.name || profData.profile.name || prev.name || 'Yaswanth'
          }))
        }
        if (oppData.ok) setMarketOpportunities(oppData.highDemandOpportunities)
        if (reqData.ok) setBuyerRequests(reqData.requests)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()

    const handleSim = () => load()
    window.addEventListener('tfg_sim_event', handleSim)
    return () => window.removeEventListener('tfg_sim_event', handleSim)
  }, [])

  // Government Agricultural Subsidy Schemes Data
  const subsidySchemes = [
    {
      id: 'pm-kisan',
      name: 'PM-KISAN Samman Nidhi',
      category: 'Direct Income Support',
      benefit: '₹6,000 / Year',
      status: 'Active (16th Installment Verified)',
      coverage: '100% Central Govt Funded',
      description: 'Direct cash transfer in 3 equal installments of ₹2,000 directly into farmer Aadhaar-linked bank account.',
      eligibility: 'All small & marginal landholder farmer families with cultivable land.',
      applyUrl: 'https://pmkisan.gov.in',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      id: 'pmfby',
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Crop Loss Insurance',
      benefit: 'Up to ₹1,20,000 Coverage',
      status: 'Enrolled (Kharif Season)',
      coverage: '98% Premium Subsidized by Govt',
      description: 'Comprehensive risk insurance against non-preventable natural risks (drought, flood, unseasonal storm, pests) from pre-sowing to post-harvest.',
      eligibility: 'Farmers growing notified crops (Groundnut, Cotton, Red Gram, Paddy). Premium is only 2% for Kharif crops.',
      applyUrl: 'https://pmfby.gov.in',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    },
    {
      id: 'smam-drip',
      name: 'Micro-Irrigation & Drip Subsidy (SMAM / PMKSY)',
      category: 'Irrigation & Machinery',
      benefit: '55% - 70% Subsidy',
      status: 'Eligible for 3.0 Acres',
      coverage: 'State & Center Shared Grant',
      description: 'Subsidized installation of high-efficiency drip/sprinkler systems and solar agricultural pumps under "Per Drop More Crop".',
      eligibility: 'Farmers with verified land title and functional borewell/source. Saves 40% water and boosts Groundnut yield by 28%.',
      applyUrl: 'https://pmksy.gov.in',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'fertilizer-subsidy',
      name: 'National Fertilizer Price Buffer Scheme',
      category: 'Soil Nutrition & Inputs',
      benefit: '₹1,500+ / Bag Subsidy',
      status: 'Direct Benefit at Point of Sale',
      coverage: 'DBT Fertilizer Portal',
      description: 'Supplies Neem-Coated Urea at fixed MRP ₹270/45kg bag (actual cost ₹2,400) and DAP at ₹1,350/bag with central price stabilization.',
      eligibility: 'Available to all registered farmers via Aadhaar-authenticated POS terminals at authorized cooperative societies.',
      applyUrl: 'https://urvarak.nic.in',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    },
  ]

  return (
    <Layout>
      {/* Mandi Price Ticker */}
      <MarketTicker />

      <div className="space-y-8">
        
        {/* Futuristic AI-Animated Farm Header */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Animated AI Pulse Halo Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  AgriAI Live Telemetry
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Farm ID: TFG-AP-{Math.abs(profile.name?.length || 7) * 1234}
                </span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white flex items-center gap-2">
                Namaskaram, {profile.name}! 👨‍🌾
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Managing <strong className="text-emerald-300">{profile.landSize} {profile.landUnit}</strong> of <strong className="text-emerald-300">{profile.currentCrop}</strong> in <strong className="text-white">{profile.location}</strong> ({profile.soilType}, pH {profile.soilPh}).
              </p>

              {/* Status Indicators */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Drip Irrigation: <strong>Active</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Crop Insurance: <strong>PMFBY Covered</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Voice Hotline: <strong>+91 80 4719 5000</strong></span>
                </div>
              </div>
            </div>

            {/* AI Optimization Vitality Gauge Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-4 shrink-0 shadow-lg">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-400 transition-all duration-1000 ease-out"
                    strokeDasharray="94, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-heading font-black text-sm text-white">94%</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">AI Vitality Index</span>
                <div className="text-xs font-bold text-emerald-300">Optimal Growth Phase</div>
                <div className="text-[10px] text-slate-400">Pegging & Pod Formation</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Metric 1: Fertilizer Top-Dressing */}
          <Link
            href="/fertilizer"
            className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 glass-card-hover shadow-xl space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Stage: 45 Days
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Nutrient Schedule</span>
              <div className="font-heading font-black text-lg text-white mt-0.5">
                Gypsum Top-Dressing
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                200 kg/acre required for pod shell calcification.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Calculation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Metric 2: Mandi Price Opportunity */}
          <Link
            href="/market"
            className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 glass-card-hover shadow-xl space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +₹3.50/kg
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Anantapur Mandi</span>
              <div className="font-heading font-black text-lg text-white mt-0.5">
                ₹86.50 / kg
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Groundnut price surging due to terminal mill demand.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>30-Day Trends</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Metric 3: AI Crop Disease Scanner */}
          <Link
            href="/plant-doctor"
            className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 glass-card-hover shadow-xl space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bug className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                AI Vision
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Crop Health Scanner</span>
              <div className="font-heading font-black text-lg text-white mt-0.5">
                AI Plant Doctor
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Upload leaf photo or diagnose symptoms in 5 steps.
              </p>
            </div>
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Scan Leaf Image</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Metric 4: Two-Way Voice Telephony */}
          <Link
            href="/voice-assistant"
            className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 glass-card-hover shadow-xl space-y-3 block group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Basic Phone IVR
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Toll-Free Assistant</span>
              <div className="font-heading font-black text-lg text-white mt-0.5">
                Two-Way Voice AI
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Call +91 80 4719 5000 in English & Telugu (తెలుగు).
              </p>
            </div>
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Launch Phone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

        </div>

        {/* GOVERNMENT SUBSIDY & BENEFIT SCHEMES HUB */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5" />
                  Direct Benefit Transfer (DBT)
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  Verified Schemes for {profile.district || 'Anantapur'}
                </span>
              </div>
              <h3 className="font-heading font-black text-xl text-white mt-1">
                Government Subsidies & Agricultural Support Schemes
              </h3>
              <p className="text-xs text-slate-400">
                Track your active direct income transfers, crop loss insurance claims, and micro-irrigation grant eligibility.
              </p>
            </div>

            <span className="text-xs text-slate-400 self-start sm:self-auto bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Aadhaar Linked: <strong className="text-emerald-400">XXXX-XXXX-8921</strong>
            </span>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subsidySchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {scheme.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${scheme.badgeColor}`}>
                      {scheme.benefit}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-white">
                    {scheme.name}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scheme.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1 text-[11px]">
                    <div className="text-emerald-400 font-semibold">
                      Status: <strong>{scheme.status}</strong>
                    </div>
                    <div className="text-slate-400">
                      Eligibility: {scheme.eligibility}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {scheme.coverage}
                  </span>
                  <a
                    href={scheme.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-600 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Check Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Section: Weather Radar Forecast & Smart Selling Market Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 6 Cols: Weather Radar Forecast */}
          <div className="lg:col-span-6 space-y-4">
            <WeatherWidget />
          </div>

          {/* Right 6 Cols: Smart Selling & Active Buyer Requests */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Smart Selling Card */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Direct Farm-to-Buyer Smart Selling
                  </h3>
                </div>
                <Link
                  href="/marketplace"
                  className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open Market</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* High Demand Highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-950 to-slate-950 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-white">
                    Groundnut (K-6 Pods)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                    High Wholesale Demand
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Wholesale Mandi Buyers in Guntur & Anantapur are seeking <strong>800 kg - 2,000 kg</strong> Grade-A Groundnut at <strong>₹85 - ₹88/kg</strong>.
                </p>
                <div className="pt-1">
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-glow-green transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>1-Click List 800 kg Produce</span>
                  </Link>
                </div>
              </div>

              {/* Inbound Buyer Bids */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Active Procurement Offers
                </span>
                {buyerRequests.length === 0 ? (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                    No pending buyer offers at this moment.
                  </div>
                ) : (
                  buyerRequests.slice(0, 2).map((req) => (
                    <div key={req.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{req.buyerName}</div>
                        <div className="text-slate-400 text-[11px]">
                          Bid: <strong className="text-emerald-400">₹{req.offeredPrice}/kg</strong> for <strong>{req.quantity} kg</strong>
                        </div>
                      </div>
                      <Link
                        href="/marketplace"
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                      >
                        Negotiate
                      </Link>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  )
}
