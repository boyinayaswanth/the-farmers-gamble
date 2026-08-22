import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import FertilizerCalculator from '../components/FertilizerCalculator'
import { FlaskConical, DollarSign, ShieldAlert, Sparkles, Leaf, Info } from 'lucide-react'

export default function FertilizerPage() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/farmer/profile')
        const data = await res.json()
        if (data.ok) setProfile(data.profile)
      } catch (e) {}
    }
    load()
  }, [])

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Agronomic Soil Chemistry
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              Precision Fertilizer & Nutrient Advisory
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Custom NPK dosage calculations tailored to your soil test results and plant growth stages.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            Current Farm: <strong className="text-emerald-400">{profile?.currentCrop || 'Groundnut'}</strong> ({profile?.landSize || 3.0} Acres)
          </div>
        </div>

        {/* Core Precision Calculator Widget */}
        <FertilizerCalculator
          defaultCrop={profile?.currentCrop || 'Groundnut'}
          defaultLand={profile?.landSize || 3.0}
        />

        {/* Current Retail Fertilizer Price Index */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            Standard Fertilizer Bag Price Index (AP / Telangana Subsidized Rates)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Neem-Coated Urea (46% N)</span>
              <div className="font-heading font-black text-lg text-emerald-400">₹270 / 45kg Bag</div>
              <p className="text-[11px] text-slate-400">Central Government Subsidized Maximum Retail Price.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">DAP (18:46:0)</span>
              <div className="font-heading font-black text-lg text-emerald-400">₹1,350 / 50kg Bag</div>
              <p className="text-[11px] text-slate-400">Primary basal phosphorus fertilizer.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">MOP (0:0:60 Potash)</span>
              <div className="font-heading font-black text-lg text-emerald-400">₹1,700 / 50kg Bag</div>
              <p className="text-[11px] text-slate-400">Essential for drought resistance & grain weight.</p>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}
