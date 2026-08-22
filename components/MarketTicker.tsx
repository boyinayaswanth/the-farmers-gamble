import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function MarketTicker() {
  const [prices, setPrices] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/market/prices')
        const data = await res.json()
        if (data.ok) setPrices(data.marketData)
      } catch (e) {}
    }
    load()

    // Listen for simulation events
    const handleSim = () => load()
    window.addEventListener('tfg_sim_event', handleSim)
    return () => window.removeEventListener('tfg_sim_event', handleSim)
  }, [])

  if (prices.length === 0) return null

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-3 mb-6 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-300">
            APMC Mandi Real-time Ticker
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            DEMO DATA FEED
          </span>
        </div>
        <Link href="/market" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold">
          View All Mandis <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Ticker Items Horizontal Scroll */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {prices.slice(0, 6).map((item, idx) => {
          const isRising = item.priceTrend === 'Rising'
          const isFalling = item.priceTrend === 'Falling'

          return (
            <div
              key={idx}
              className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-200 truncate">{item.cropName}</span>
                <span className={`flex items-center text-[10px] font-bold ${
                  isRising ? 'text-emerald-400' : isFalling ? 'text-rose-400' : 'text-slate-400'
                }`}>
                  {isRising && <TrendingUp className="w-3 h-3 mr-0.5" />}
                  {isFalling && <TrendingDown className="w-3 h-3 mr-0.5" />}
                  {!isRising && !isFalling && <Minus className="w-3 h-3 mr-0.5" />}
                  {item.priceChange7DaysPercent > 0 ? `+${item.priceChange7DaysPercent}%` : `${item.priceChange7DaysPercent}%`}
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-heading font-black text-sm text-white">
                  ₹{item.modalPrice}
                  <span className="text-[10px] font-normal text-slate-400">/kg</span>
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[70px]">
                  {item.district}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
