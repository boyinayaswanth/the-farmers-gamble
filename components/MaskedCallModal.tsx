import React, { useState } from 'react'
import { Phone, ShieldCheck, X, CheckCircle2, Lock, MessageSquare } from 'lucide-react'

interface MaskedCallModalProps {
  isOpen: boolean
  onClose: () => void
  targetName: string
  targetRole: 'Farmer' | 'Buyer'
  cropInfo: string
}

export default function MaskedCallModal({ isOpen, onClose, targetName, targetRole, cropInfo }: MaskedCallModalProps) {
  const [loading, setLoading] = useState(false)
  const [bridgeData, setBridgeData] = useState<any>(null)

  if (!isOpen) return null

  async function connectBridge() {
    setLoading(true)
    try {
      const res = await fetch('/api/marketplace/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetName, targetRole, channel: 'VOICE_BRIDGE' })
      })
      const data = await res.json()
      if (data.ok) setBridgeData(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 shadow-2xl space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-white">
              Protected Masked Communication
            </h3>
            <p className="text-xs text-slate-400">
              Direct personal mobile numbers are kept strictly private.
            </p>
          </div>
        </div>

        {/* Counterpart Info */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Connecting to:</span>
            <span className="font-bold text-white">{targetName} ({targetRole})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Listing:</span>
            <span className="font-semibold text-emerald-300">{cropInfo}</span>
          </div>
        </div>

        {!bridgeData ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              When you initiate this call, the platform establishes an encrypted virtual bridge. Both parties connect securely without sharing personal contact information.
            </p>
            <button
              onClick={connectBridge}
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-glow-green active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{loading ? 'Establishing Masked Bridge...' : 'Establish Secure Call Bridge'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-600/40 text-center space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Virtual Proxy Number Assigned
              </span>
              <div className="font-mono font-black text-xl text-white">
                {bridgeData.maskedProxyNumber}
              </div>
              <p className="text-xs text-slate-300">
                Extension PIN: <strong className="font-mono text-amber-300">{bridgeData.pinSession}#</strong>
              </p>
              <span className="text-[10px] text-slate-400 block">
                ⏱️ Bridge valid for {bridgeData.expiresInMinutes} minutes
              </span>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 text-xs text-emerald-300 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{bridgeData.privacyNotice}</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
            >
              Done / Close
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
