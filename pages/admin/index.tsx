import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { 
  Landmark, 
  Users, 
  ShoppingBag, 
  PhoneCall, 
  BarChart3, 
  CloudLightning, 
  CheckCircle2, 
  Edit3, 
  Radio,
  Send,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  Calendar,
  FileText,
  TrendingUp,
  Plus,
  ShieldCheck
} from 'lucide-react'

export default function GramPanchayatAdminPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null)
  const [newPriceVal, setNewPriceVal] = useState<number>(88.0)
  const [newTrendVal, setNewTrendVal] = useState<'Rising' | 'Falling' | 'Stable'>('Rising')

  // Broadcast state
  const [broadcastCategory, setBroadcastCategory] = useState<'DISASTER' | 'WATER' | 'SEEDS' | 'SCHEME'>('DISASTER')
  const [broadcastTitle, setBroadcastTitle] = useState('⛈️ Heavy Rainfall Warning & Drainage Notice')
  const [broadcastMsg, setBroadcastMsg] = useState('Gram Panchayat advisory: Clean field furrows to prevent root rot in Groundnut and Cotton over the next 48 hours.')
  const [broadcastSuccess, setBroadcastSuccess] = useState(false)
  const [sendingBroadcast, setSendingBroadcast] = useState(false)

  // Subsidy scheme state
  const [schemes, setSchemes] = useState<any[]>([
    {
      id: 'sch-1',
      title: 'YSR Rythu Bharosa / PM-KISAN',
      benefit: '₹13,500 / Year',
      status: 'Active Disbursement',
      beneficiaries: '1,380 Farmers in Kalyandurg',
    },
    {
      id: 'sch-2',
      title: 'AP Micro-Irrigation Drip Subsidy (70%)',
      benefit: '70% Govt Subsidy',
      status: 'Applications Open at Rythu Bharosa Kendra',
      beneficiaries: '420 Units Available',
    },
    {
      id: 'sch-3',
      title: 'Free Soil Testing & Micronutrient Kit',
      benefit: '100% Free Service',
      status: 'Camp Scheduled on Monday',
      beneficiaries: 'All Smallholder Farmers',
    },
  ])

  const [newSchemeTitle, setNewSchemeTitle] = useState('')
  const [newSchemeBenefit, setNewSchemeBenefit] = useState('')
  const [showSchemeModal, setShowSchemeModal] = useState(false)

  async function loadAdminData() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/overview')
      const json = await res.json()
      if (json.ok) setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  async function handlePriceUpdate(priceId: string) {
    try {
      const res = await fetch('/api/admin/overview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_PRICE',
          priceId,
          newPrice: newPriceVal,
          trend: newTrendVal
        })
      })
      if (res.ok) {
        setEditingPriceId(null)
        loadAdminData()
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function handleBroadcastAlert(e: React.FormEvent) {
    e.preventDefault()
    setSendingBroadcast(true)
    setBroadcastSuccess(false)
    try {
      const res = await fetch('/api/admin/overview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'BROADCAST_ALERT',
          alertTitle: broadcastTitle,
          alertMessage: broadcastMsg,
          category: broadcastCategory
        })
      })
      if (res.ok) {
        setBroadcastSuccess(true)
        setTimeout(() => setBroadcastSuccess(false), 4000)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSendingBroadcast(false)
    }
  }

  function handleAddScheme(e: React.FormEvent) {
    e.preventDefault()
    if (!newSchemeTitle.trim()) return
    const newEntry = {
      id: 'sch-' + Date.now(),
      title: newSchemeTitle,
      benefit: newSchemeBenefit || 'Govt Subsidized',
      status: 'Published by Gram Panchayat',
      beneficiaries: 'All Village Farmers',
    }
    setSchemes(prev => [newEntry, ...prev])
    setNewSchemeTitle('')
    setNewSchemeBenefit('')
    setShowSchemeModal(false)
  }

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Gram Panchayat Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              Gram Panchayat & Agricultural Office
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Admin Portal • Kalyandurg Mandal (Anantapur District)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Village Agricultural Administration Center
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Publish village notices, issue storm advisories, update daily APMC mandi rates, and monitor registered farmers' telemetry.
              </p>
            </div>

            <button
              onClick={loadAdminData}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 self-start transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Row */}
        {data?.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Village Farmers</span>
              <div className="font-heading font-black text-xl text-emerald-400">{data.stats.totalFarmers || 1420}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Active Mandis</span>
              <div className="font-heading font-black text-xl text-amber-400">{data.stats.totalMandiMarketsTracked || 4}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Produce Listed</span>
              <div className="font-heading font-black text-xl text-white">3,800 kg</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Voice Calls Logged</span>
              <div className="font-heading font-black text-xl text-teal-400">{data.stats.voiceCallsProcessed || 18}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">SMS Alerts Sent</span>
              <div className="font-heading font-black text-xl text-cyan-400">{data.stats.weatherAlertsDelivered || 42}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">DBT Schemes Active</span>
              <div className="font-heading font-black text-xl text-indigo-400">4 Programs</div>
            </div>
          </div>
        )}

        {/* 2-Column Grid: Notice Board Dispatcher & APMC Mandi Rate Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 6 Cols: Emergency Broadcast Dispatcher */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-amber-400" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Broadcast Notice to All Village Farmers
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  Target: 1,420 Farmers
                </span>
              </div>

              {/* Category selector */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-bold">
                {[
                  { id: 'DISASTER', label: 'Weather Alert' },
                  { id: 'WATER', label: 'Canal Water' },
                  { id: 'SEEDS', label: 'Seed Stock' },
                  { id: 'SCHEME', label: 'Govt Scheme' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setBroadcastCategory(cat.id as any)
                      if (cat.id === 'DISASTER') {
                        setBroadcastTitle('⛈️ Heavy Rainfall Warning & Drainage Notice')
                        setBroadcastMsg('District administration advisory: Clean field furrows to prevent root rot in Groundnut and Cotton over the next 48 hours.')
                      } else if (cat.id === 'WATER') {
                        setBroadcastTitle('🌊 Canal Irrigation Water Release Schedule')
                        setBroadcastMsg('Tungabhadra High Level Canal water will be released to Kalyandurg distributary starting Wednesday 6:00 AM.')
                      } else if (cat.id === 'SEEDS') {
                        setBroadcastTitle('🌱 Subsidized K-6 Groundnut Seed Stock Available')
                        setBroadcastMsg('Subsidized certified K-6 groundnut seed bags are available at Rythu Bharosa Kendra at 50% subsidy.')
                      } else if (cat.id === 'SCHEME') {
                        setBroadcastTitle('🏛️ PM-KISAN 17th Installment e-KYC Camp')
                        setBroadcastMsg('Free Aadhaar biometric e-KYC camp is organized at the Gram Panchayat office tomorrow from 9 AM to 5 PM.')
                      }
                    }}
                    className={`py-1.5 rounded-lg transition-all ${
                      broadcastCategory === cat.id ? 'bg-amber-600 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleBroadcastAlert} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Title</label>
                  <input
                    type="text"
                    value={broadcastTitle}
                    onChange={e => setBroadcastTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Message (Sent via In-App & SMS)</label>
                  <textarea
                    rows={3}
                    value={broadcastMsg}
                    onChange={e => setBroadcastMsg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                {broadcastSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-1.5 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Broadcast successfully delivered to all 1,420 registered farmers!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sendingBroadcast}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black text-xs shadow-glow-gold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{sendingBroadcast ? 'Broadcasting to Village...' : 'Broadcast Notice to All Farmers'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right 6 Cols: APMC Mandi Rate Controller */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Daily APMC Mandi Floor Prices
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400">
                  Direct Mandi Overrides
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Crop</th>
                      <th className="p-3">Mandi</th>
                      <th className="p-3">Current Rate</th>
                      <th className="p-3">Trend</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {data?.marketPrices?.map((item: any) => (
                      <tr key={item.id}>
                        <td className="p-3 font-bold text-white">{item.cropName}</td>
                        <td className="p-3 text-slate-300">{item.marketLocation}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">
                          {editingPriceId === item.id ? (
                            <input
                              type="number"
                              step="0.5"
                              value={newPriceVal}
                              onChange={e => setNewPriceVal(Number(e.target.value))}
                              className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                            />
                          ) : (
                            `₹${item.pricePerKg}/kg`
                          )}
                        </td>
                        <td className="p-3">
                          {editingPriceId === item.id ? (
                            <select
                              value={newTrendVal}
                              onChange={e => setNewTrendVal(e.target.value as any)}
                              className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                            >
                              <option value="Rising">Rising</option>
                              <option value="Falling">Falling</option>
                              <option value="Stable">Stable</option>
                            </select>
                          ) : (
                            <span className="text-slate-300">{item.priceTrend}</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {editingPriceId === item.id ? (
                            <button
                              onClick={() => handlePriceUpdate(item.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingPriceId(item.id)
                                setNewPriceVal(item.pricePerKg)
                                setNewTrendVal(item.priceTrend)
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Village Government Schemes & Telephony Logs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 6 Cols: Village Government Subsidy Schemes */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Government Subsidy Programs & Benefits
                  </h3>
                </div>
                <button
                  onClick={() => setShowSchemeModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Scheme</span>
                </button>
              </div>

              <div className="space-y-3">
                {schemes.map((s) => (
                  <div key={s.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-sm text-white">{s.title}</h4>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                        {s.benefit}
                      </span>
                    </div>
                    <p className="text-slate-400">{s.status}</p>
                    <div className="text-[11px] text-indigo-300 font-semibold">
                      Beneficiaries: {s.beneficiaries}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Telephony Voice Call Hotline Logs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-teal-400" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Recent Farmer Voice Call Audit Logs
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  Toll-Free Hotline
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Caller</th>
                      <th className="p-3">Query / Intent</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-white">+91 8555864859</td>
                      <td className="p-3 text-slate-300">Groundnut Mandi Rate Enquiry</td>
                      <td className="p-3 font-mono text-slate-400">00:42</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Answered</span></td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-white">+91 98765 43210</td>
                      <td className="p-3 text-slate-300">Storm Warning & Drainage Advisory</td>
                      <td className="p-3 font-mono text-slate-400">01:15</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Answered</span></td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-white">+91 91234 56789</td>
                      <td className="p-3 text-slate-300">Gypsum Top-Dressing Dosage</td>
                      <td className="p-3 font-mono text-slate-400">00:38</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Answered</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Modal: Add Subsidy Scheme */}
        {showSchemeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-indigo-500/40 p-6 shadow-2xl space-y-4">
              <h3 className="font-heading font-bold text-base text-white">
                Publish New Government Subsidy Scheme
              </h3>

              <form onSubmit={handleAddScheme} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Scheme Name</label>
                  <input
                    type="text"
                    value={newSchemeTitle}
                    onChange={e => setNewSchemeTitle(e.target.value)}
                    placeholder="e.g. Solar Pump Subsidy Scheme"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Benefit / Subsidy Amount</label>
                  <input
                    type="text"
                    value={newSchemeBenefit}
                    onChange={e => setNewSchemeBenefit(e.target.value)}
                    placeholder="e.g. 60% Govt Subsidy / ₹45,000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSchemeModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
                  >
                    Publish to All Farmers
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </Layout>
  )
}
