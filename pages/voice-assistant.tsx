import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import PhoneSimulator from '../components/PhoneSimulator'
import { 
  PhoneCall, 
  Radio, 
  CloudLightning, 
  TrendingUp, 
  FlaskConical, 
  ShoppingBag, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  ShieldCheck,
  RotateCcw
} from 'lucide-react'

export default function VoiceAssistantPage() {
  const [callLogs, setCallLogs] = useState<any[]>([])
  const [loadingLogs, setLoadingLogs] = useState(true)
  const [outboundTriggering, setOutboundTriggering] = useState<string | null>(null)
  const [outboundMessage, setOutboundMessage] = useState<string | null>(null)

  async function loadLogs() {
    setLoadingLogs(true)
    try {
      const res = await fetch('/api/voice/call-logs')
      const data = await res.json()
      if (data.ok) setCallLogs(data.logs)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingLogs(false)
    }
  }

  useEffect(() => {
    loadLogs()
  }, [])

  async function triggerOutboundScenario(scenario: 'WEATHER_ALERT' | 'MARKET_ALERT' | 'FERTILIZER_REMINDER' | 'BUYER_REQUEST') {
    setOutboundTriggering(scenario)
    setOutboundMessage(null)
    try {
      const res = await fetch('/api/voice/outbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: '+91 98765 43210', scenario })
      })
      const data = await res.json()
      if (data.ok) {
        setOutboundMessage(data.message)
        loadLogs()
      }
    } catch (e: any) {
      setOutboundMessage('Error: ' + e.message)
    } finally {
      setOutboundTriggering(null)
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Core Telephony Architecture
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                Twilio / Exotel Compatible
              </span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              Two-Way AI Voice Calling System
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Empowering farmers with ordinary basic phones to access real-time market prices, weather warnings, and AI crop advice via ordinary voice calls.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Toll-Free Gateway: <strong className="text-amber-300 font-mono">+91 80 4719 5000</strong>
          </div>
        </div>

        {/* In-Browser Interactive Phone Simulator (Direction B: Farmer -> AI) */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              Direction B: Farmer Inbound Voice & IVR Simulator
            </h3>
            <span className="text-xs text-slate-400">
              Interactive Web Speech & DTMF Simulator
            </span>
          </div>

          <PhoneSimulator />
        </div>

        {/* Direction A: AI -> Farmer Proactive Outbound Call Triggers */}
        <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Direction A: Automated Proactive Outreach
              </span>
              <h3 className="font-heading font-bold text-lg text-white mt-0.5">
                Trigger Outbound AI Advisory Voice Call
              </h3>
              <p className="text-xs text-slate-400">
                The platform initiates automated high-priority telephone calls directly to Ravi Kumar's mobile.
              </p>
            </div>

            {outboundMessage && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {outboundMessage}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            
            {/* Scenario 1: Storm Warning */}
            <button
              onClick={() => triggerOutboundScenario('WEATHER_ALERT')}
              disabled={outboundTriggering !== null}
              className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-left transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2">
                <CloudLightning className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white">1. Storm & Rain Warning</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Alerts farmer about 42mm rain in Anantapur and instructs drainage clearing.
              </p>
              <span className="text-[10px] text-cyan-400 font-bold mt-2 block">
                {outboundTriggering === 'WEATHER_ALERT' ? 'Calling...' : 'Trigger Call →'}
              </span>
            </button>

            {/* Scenario 2: Price Spike */}
            <button
              onClick={() => triggerOutboundScenario('MARKET_ALERT')}
              disabled={outboundTriggering !== null}
              className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-left transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white">2. Mandi Price Surge</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Informs farmer that Groundnut rose by +₹3.50/kg in Anantapur Mandi.
              </p>
              <span className="text-[10px] text-emerald-400 font-bold mt-2 block">
                {outboundTriggering === 'MARKET_ALERT' ? 'Calling...' : 'Trigger Call →'}
              </span>
            </button>

            {/* Scenario 3: Fertilizer Top-Dressing */}
            <button
              onClick={() => triggerOutboundScenario('FERTILIZER_REMINDER')}
              disabled={outboundTriggering !== null}
              className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-teal-500/50 text-left transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2">
                <FlaskConical className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white">3. Fertilizer Schedule</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Reminds farmer to apply 200kg/acre Gypsum top-dressing at 45 days.
              </p>
              <span className="text-[10px] text-teal-400 font-bold mt-2 block">
                {outboundTriggering === 'FERTILIZER_REMINDER' ? 'Calling...' : 'Trigger Call →'}
              </span>
            </button>

            {/* Scenario 4: Buyer Purchase Offer */}
            <button
              onClick={() => triggerOutboundScenario('BUYER_REQUEST')}
              disabled={outboundTriggering !== null}
              className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white">4. Inbound Buyer Bid</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Notifies farmer of new wholesale purchase offer for 800 kg Groundnut.
              </p>
              <span className="text-[10px] text-indigo-400 font-bold mt-2 block">
                {outboundTriggering === 'BUYER_REQUEST' ? 'Calling...' : 'Trigger Call →'}
              </span>
            </button>

          </div>
        </div>

        {/* Telephony Call Log Audit Trail */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              Recent Telephony Call Logs & Audio Transcripts
            </h3>
            <button
              onClick={loadLogs}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Direction</th>
                  <th className="p-3.5">Caller Mobile</th>
                  <th className="p-3.5">Intent / DTMF</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Transcript Summary</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                {callLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.direction === 'INBOUND'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {log.direction}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-200">{log.callerMobile}</td>
                    <td className="p-3.5 font-semibold text-slate-300">{log.intent || 'IVR Query'}</td>
                    <td className="p-3.5 text-slate-400 font-mono">{log.duration}s</td>
                    <td className="p-3.5 text-slate-300 max-w-xs truncate">{log.summary || log.transcript}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                        COMPLETED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  )
}
