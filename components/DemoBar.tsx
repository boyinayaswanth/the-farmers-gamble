import React, { useState } from 'react'
import { 
  Zap, 
  CloudLightning, 
  TrendingUp, 
  Bug, 
  PhoneOutgoing, 
  ShoppingBag, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  RotateCcw
} from 'lucide-react'

export default function DemoBar() {
  const [collapsed, setCollapsed] = useState(false)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  async function triggerSimulation(action: string) {
    setLoadingAction(action)
    setLastMessage(null)
    try {
      const res = await fetch('/api/demo/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId: 'farmer-ravi-1', mobile: '+919876543210' })
      })
      const data = await res.json()
      if (data.ok) {
        setLastMessage(data.message)
        // trigger global custom event to update dashboard widgets
        window.dispatchEvent(new CustomEvent('tfg_sim_event', { detail: { action, data } }))
      }
    } catch (e: any) {
      setLastMessage('Simulation error: ' + e.message)
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl">
      <div className="rounded-2xl bg-slate-950/95 border border-emerald-500/40 shadow-2xl backdrop-blur-xl p-3 text-white">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-heading font-black text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              ⚡ HACKATHON LIVE SCENARIO CONTROLLER
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              Demo Mode Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            {lastMessage && (
              <span className="text-xs text-emerald-300 font-medium truncate max-w-xs flex items-center gap-1 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {lastMessage}
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        {!collapsed && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-2">
            
            {/* 1. Simulate Storm Warning */}
            <button
              onClick={() => triggerSimulation('WEATHER_ALERT')}
              disabled={loadingAction !== null}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-xs font-semibold text-cyan-300 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <CloudLightning className="w-3.5 h-3.5 text-cyan-400" />
              <span>{loadingAction === 'WEATHER_ALERT' ? 'Simulating...' : '⛈️ Storm Alert'}</span>
            </button>

            {/* 2. Simulate Price Surge */}
            <button
              onClick={() => triggerSimulation('MARKET_ALERT')}
              disabled={loadingAction !== null}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-xs font-semibold text-emerald-300 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{loadingAction === 'MARKET_ALERT' ? 'Simulating...' : '📈 Price Surge (+₹3)'}</span>
            </button>

            {/* 3. Simulate Leaf Disease Alert */}
            <button
              onClick={() => triggerSimulation('DISEASE_DETECTION')}
              disabled={loadingAction !== null}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-rose-500/50 text-xs font-semibold text-rose-300 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <Bug className="w-3.5 h-3.5 text-rose-400" />
              <span>{loadingAction === 'DISEASE_DETECTION' ? 'Simulating...' : '🦠 Disease Alert'}</span>
            </button>

            {/* 4. Trigger Outbound AI Call */}
            <button
              onClick={() => triggerSimulation('AI_CALL')}
              disabled={loadingAction !== null}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-xs font-semibold text-amber-300 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <PhoneOutgoing className="w-3.5 h-3.5 text-amber-400" />
              <span>{loadingAction === 'AI_CALL' ? 'Calling...' : '📞 AI Outbound Call'}</span>
            </button>

            {/* 5. Simulate Buyer Purchase Request */}
            <button
              onClick={() => triggerSimulation('BUYER_REQUEST')}
              disabled={loadingAction !== null}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 text-xs font-semibold text-indigo-300 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
              <span>{loadingAction === 'BUYER_REQUEST' ? 'Simulating...' : '🛒 Buyer Offer'}</span>
            </button>

          </div>
        )}

      </div>
    </div>
  )
}
