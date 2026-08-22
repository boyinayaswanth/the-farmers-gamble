import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import PhoneSimulator from '../components/PhoneSimulator'
import { 
  PhoneCall, 
  Radio, 
  Sparkles, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  CloudLightning,
  TrendingUp,
  FlaskConical,
  ShoppingBag,
  Send,
  UserCheck
} from 'lucide-react'

export default function VoiceAssistantPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [outboundTriggering, setOutboundTriggering] = useState<string | null>(null)
  const [outboundMessage, setOutboundMessage] = useState<string | null>(null)
  const [farmerName, setFarmerName] = useState('Yaswanth')
  const [farmerMobile, setFarmerMobile] = useState('+91 8555864859')

  async function loadLogs() {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('tfg_user')
        if (cached) {
          const u = JSON.parse(cached)
          if (u.name) setFarmerName(u.name)
          if (u.mobile) setFarmerMobile(u.mobile)
        }
      }
      const res = await fetch('/api/voice/call-logs')
      const data = await res.json()
      if (data.ok) setLogs(data.logs || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
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
        body: JSON.stringify({ mobile: farmerMobile, scenario })
      })
      const data = await res.json()
      if (data.ok) {
        setOutboundMessage(`Incoming call triggered to ${farmerName}'s phone!`)
        
        // Dispatch to Phone Hardware Simulator so it immediately rings and speaks!
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('trigger-outbound-call', {
            detail: {
              scenario,
              speechText: data.callResult?.speechText,
              teluguSpeechText: data.callResult?.teluguSpeechText
            }
          }))
          
          // Scroll smoothly to simulator
          document.getElementById('phone-hardware-simulator')?.scrollIntoView({ behavior: 'smooth' })
        }

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
                Twilio / Exotel Active
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
                The platform initiates automated high-priority telephone calls directly to <strong className="text-white">{farmerName}'s</strong> mobile ({farmerMobile}).
              </p>
            </div>

            {outboundMessage && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/40 animate-pulse">
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
              className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-left transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 group"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <CloudLightning className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white">1. Storm & Rain Warning</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Alerts farmer about 42mm rain in Anantapur and instructs drainage clearing.
              </p>
              <span className="text-[10px] text-cyan-400 font-bold mt-2 flex items-center gap-1">
                {outboundTriggering === 'WEATHER_ALERT' ? 'Calling Phone...' : 'Trigger Call →'}
              </span>
            </button>

            {/* Scenario 2: Price Spike */}
            <button
              onClick={() => triggerOutboundScenario('MARKET_ALERT')}
              disabled={outboundTriggering !== null}
              className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-left transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white">2. Mandi Price Surge</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Informs farmer that Groundnut rose by +₹3.50/kg in Anantapur Mandi.
              </p>
              <span className="text-[10px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
                {outboundTriggering === 'MARKET_ALERT' ? 'Calling Phone...' : 'Trigger Call →'}
              </span>
            </button>

            {/* Scenario 3: Fertilizer Reminder */}
            <button
              onClick={() => triggerOutboundScenario('FERTILIZER_REMINDER')}
              disabled={outboundTriggering !== null}
              className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white">3. Fertilizer Schedule</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Reminds farmer to apply 200kg/acre Gypsum top-dressing at 45 days.
              </p>
              <span className="text-[10px] text-amber-400 font-bold mt-2 flex items-center gap-1">
                {outboundTriggering === 'FERTILIZER_REMINDER' ? 'Calling Phone...' : 'Trigger Call →'}
              </span>
            </button>

            {/* Scenario 4: Buyer Request */}
            <button
              onClick={() => triggerOutboundScenario('BUYER_REQUEST')}
              disabled={outboundTriggering !== null}
              className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 group"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white">4. Inbound Buyer Bid</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Notifies farmer of new wholesale purchase offer for 800 kg Groundnut.
              </p>
              <span className="text-[10px] text-indigo-400 font-bold mt-2 flex items-center gap-1">
                {outboundTriggering === 'BUYER_REQUEST' ? 'Calling Phone...' : 'Trigger Call →'}
              </span>
            </button>

          </div>
        </div>

        {/* In-Browser Interactive Phone Simulator (Direction B: Farmer -> AI) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Direction B: Farmer Inbound Access
              </span>
              <h3 className="font-heading font-bold text-lg text-white mt-0.5">
                Interactive 2G Keypad Phone Simulator
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              DTMF & Web Speech API Voice Synthesis
            </span>
          </div>

          <PhoneSimulator />
        </div>

        {/* Telephony Call Records / Audit Trail */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="font-heading font-bold text-base text-white">
                Live Telephony Audit Trail & Call Logs
              </h3>
            </div>
            <button
              onClick={loadLogs}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Refresh Logs
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 text-[10px] uppercase">
                <tr>
                  <th className="p-3">Direction</th>
                  <th className="p-3">Caller</th>
                  <th className="p-3">Intent / Scenario</th>
                  <th className="p-3">Transcript Snippet</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                {logs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.direction === 'INBOUND'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {log.direction}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-200">{log.callerMobile}</td>
                    <td className="p-3 font-semibold text-white">{log.intent || 'INBOUND_CALL'}</td>
                    <td className="p-3 text-slate-300 max-w-xs truncate">{log.transcript || log.summary}</td>
                    <td className="p-3 font-mono text-slate-400">{log.duration ? `${log.duration}s` : '00:35'}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {log.status || 'COMPLETED'}
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
