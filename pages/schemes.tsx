import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Landmark, CheckCircle2, FileText, ArrowRight, ShieldCheck, Download, Search, Filter, IndianRupee, Sparkles, ChevronRight, Check } from 'lucide-react'

interface Scheme {
  id: string
  name: string
  teluguName: string
  category: 'FINANCIAL' | 'INSURANCE' | 'IRRIGATION' | 'MACHINERY' | 'ORGANIC'
  benefit: string
  subsidyPct?: string
  eligibility: string[]
  documents: string[]
  deadline: string
  activeNow: boolean
  officialPortal: string
}

export default function SchemesPage() {
  const [activeTab, setActiveTab] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null)
  const [appliedSchemes, setAppliedSchemes] = useState<Record<string, string>>({})
  const [isApplying, setIsApplying] = useState(false)
  const [aadhaarNumber, setAadhaarNumber] = useState('XXXX-XXXX-4859')
  const [passbookNumber, setPassbookNumber] = useState('AP-PATTADAR-84920')
  const [successAppId, setSuccessAppId] = useState<string | null>(null)

  const schemes: Scheme[] = [
    {
      id: 'pm-kisan',
      name: 'PM-Kisan Samman Nidhi & YSR Rythu Bharosa',
      teluguName: 'పి.ఎం-కిసాన్ & రైతు భరోసా పథకం',
      category: 'FINANCIAL',
      benefit: '₹13,500 / Year Direct Bank Transfer (DBT)',
      subsidyPct: '100% Direct Cash Transfer',
      eligibility: [
        'Small & marginal landholding farmer families.',
        'Must possess valid Pattadar Passbook & Aadhaar card.',
        'Family with cultivable land up to 5.0 acres.'
      ],
      documents: ['Aadhaar Card', 'Pattadar Passbook / 1-B Record', 'Bank Passbook (Aadhaar Seeded)', 'Ration Card'],
      deadline: 'Ongoing 2026 Installment Cycle',
      activeNow: true,
      officialPortal: 'https://pmkisan.gov.in'
    },
    {
      id: 'pmfby',
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      teluguName: 'ప్రధాన మంత్రి పంట బీమా యోజన',
      category: 'INSURANCE',
      benefit: '100% Comprehensive Yield Loss & Drought Insurance',
      subsidyPct: 'Farmer pays only 2% Kharif / 1.5% Rabi premium',
      eligibility: [
        'All farmers growing notified crops (Groundnut, Cotton, Chilli, Tomato, Paddy).',
        'Includes both loanee and non-loanee farmers, tenant cultivators, and sharecroppers.'
      ],
      documents: ['Crop Sowing Certificate / e-Crop Registration', 'Aadhaar Card', 'Land 1-B Record', 'Bank Account Details'],
      deadline: 'Cut-off: July 31 (Kharif) / Dec 15 (Rabi)',
      activeNow: true,
      officialPortal: 'https://pmfby.gov.in'
    },
    {
      id: 'pmksy-drip',
      name: 'PMKSY - AP Micro-Irrigation Drip & Sprinkler Scheme',
      teluguName: 'సూక్ష్మ సేద్యం - డ్రిప్ మరియు స్ప్రింక్లర్ సబ్సిడీ',
      category: 'IRRIGATION',
      benefit: '90% Subsidy on Drip Irrigation System (Worth ₹65,000/Acre)',
      subsidyPct: '90% Subsidy for SC/ST/Small Farmers, 70% for Others',
      eligibility: [
        'Farmers with functional borewell or open well with valid electricity connection.',
        'Minimum land holding of 1.0 acre.'
      ],
      documents: ['Borewell Yield Certificate', 'Pattadar Passbook', 'Aadhaar Card', 'Electricity Bill / Proof'],
      deadline: 'Open for 2026 Kharif/Rabi Sanctions',
      activeNow: true,
      officialPortal: 'https://pmksy.gov.in'
    },
    {
      id: 'smam-machinery',
      name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      teluguName: 'వ్యవసాయ యాంత్రీకరణ సబ్-మిషన్ (ట్రాక్టర్ & డ్రోన్ సబ్సిడీ)',
      category: 'MACHINERY',
      benefit: '50% Subsidy on Agri Drones, Power Weeders, Rotavators & Mini Tractors',
      subsidyPct: '40% - 50% Financial Assistance',
      eligibility: [
        'Individual farmers, Custom Hiring Centers (CHCs), and Farmer Producer Organizations (FPOs).',
        'Preference given to women farmers and SC/ST smallholders.'
      ],
      documents: ['Land Records (Adangal / ROR 1-B)', 'Aadhaar Card', 'Quotation from authorized implement dealer', 'Bank statement'],
      deadline: 'Annual District Target Quota Active',
      activeNow: true,
      officialPortal: 'https://agrimachinery.nic.in'
    },
    {
      id: 'soil-health-pkvy',
      name: 'Paramparagat Krishi Vikas Yojana (PKVY Organic Farming)',
      teluguName: 'సేంద్రియ వ్యవసాయ ప్రోత్సాహక పథకం (పీకేవీవై)',
      category: 'ORGANIC',
      benefit: '₹50,000 / Hectare for Organic Certification & Bio-Inputs',
      subsidyPct: '₹31,000 direct input subsidy + ₹8,800 packaging support',
      eligibility: [
        'Farmers willing to adopt 100% natural / organic farming practices without synthetic chemicals.',
        'Farmer clusters formed with minimum 20 farmers across 50 acres.'
      ],
      documents: ['Soil Health Card', 'Aadhaar Card', 'Cluster Membership Form', 'Bank Passbook'],
      deadline: 'Phase-3 Cluster Enrollment Active',
      activeNow: true,
      officialPortal: 'https://pgsindia-ncof.gov.in'
    }
  ]

  const filteredSchemes = schemes.filter(s => {
    const matchesCategory = activeTab === 'ALL' || s.category === activeTab
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.teluguName.includes(searchQuery) ||
                         s.benefit.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesQuery
  })

  function handleApplyScheme(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedScheme) return
    setIsApplying(true)

    setTimeout(() => {
      const generatedAppId = `AP-AGRI-${Math.floor(100000 + Math.random() * 900000)}`
      setAppliedSchemes(prev => ({
        ...prev,
        [selectedScheme.id]: generatedAppId
      }))
      setSuccessAppId(generatedAppId)
      setIsApplying(false)
    }, 800)
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        
        {/* Header Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-emerald-950/60 border border-blue-500/30 p-8 md:p-10 shadow-glass">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" />
                Government Direct Subsidies Hub
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                100% DBT Aadhaar Seeded
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mt-3">
              Government Schemes & Direct Subsidies
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Explore state & central agriculture schemes, calculate your exact financial benefits, and submit direct applications with zero intermediaries.
            </p>
            <p className="text-xs text-blue-300 font-medium mt-1">
              రైతు సంక్షేమ పథకాలు, ఇన్పుట్ సబ్సిడీలు మరియు ఉచిత పంట బీమా వివరాలు.
            </p>
          </div>

          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-15 pointer-events-none">
            <Landmark className="w-64 h-64 text-blue-400" />
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {[
              { id: 'ALL', label: 'All Schemes' },
              { id: 'FINANCIAL', label: 'Cash & Income Support' },
              { id: 'INSURANCE', label: 'Crop Insurance (PMFBY)' },
              { id: 'IRRIGATION', label: 'Drip & Sprinklers' },
              { id: 'MACHINERY', label: 'Tractors & Drones' },
              { id: 'ORGANIC', label: 'Organic (PKVY)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-glow-green'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme name or crop..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            const hasApplied = appliedSchemes[scheme.id]

            return (
              <div
                key={scheme.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-glow-blue group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Sanctions
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-black text-lg text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {scheme.name}
                    </h3>
                    <p className="text-xs text-blue-400/90 font-medium mt-0.5">
                      {scheme.teluguName}
                    </p>
                  </div>

                  {/* Benefit Card */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      Direct Financial Benefit:
                    </span>
                    <div className="text-sm font-bold text-emerald-400 font-mono">
                      {scheme.benefit}
                    </div>
                    {scheme.subsidyPct && (
                      <div className="text-[11px] text-slate-300">
                        {scheme.subsidyPct}
                      </div>
                    )}
                  </div>

                  {/* Key Eligibility */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      Eligibility Criteria:
                    </span>
                    <ul className="space-y-1 pl-4 list-disc text-xs text-slate-400">
                      {scheme.eligibility.slice(0, 2).map((crit, idx) => (
                        <li key={idx} className="leading-snug">{crit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between gap-3">
                  {hasApplied ? (
                    <div className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                      <span className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4" /> Application Submitted
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        ID: {hasApplied}
                      </span>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedScheme(scheme)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs shadow-glow-blue transition-all flex items-center justify-center gap-2"
                      >
                        <span>Apply / Check Eligibility</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Application Modal */}
        {selectedScheme && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                    {selectedScheme.category}
                  </span>
                  <h3 className="font-heading font-black text-xl text-white mt-1">
                    {selectedScheme.name}
                  </h3>
                  <p className="text-xs text-blue-300 mt-0.5">
                    {selectedScheme.teluguName}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedScheme(null)
                    setSuccessAppId(null)
                  }}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {successAppId ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-black text-xl text-white">
                    Application Successfully Dispatched!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Your scheme claim has been linked to your Aadhaar & Pattadar record and routed to the Kalyandurg Agricultural Extension Officer.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-xs text-slate-400">Application Reference ID:</span>
                    <div className="text-lg font-mono font-black text-emerald-400">{successAppId}</div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedScheme(null)
                      setSuccessAppId(null)
                    }}
                    className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyScheme} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Direct Scheme Benefit:</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">
                      {selectedScheme.benefit}
                    </div>
                  </div>

                  {/* Required Documents Checklist */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-200">
                      Required Documents for Verification:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedScheme.documents.map((doc, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Aadhaar Number (Linked)</label>
                      <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Pattadar Passbook / 1-B</label>
                      <input
                        type="text"
                        value={passbookNumber}
                        onChange={(e) => setPassbookNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedScheme(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isApplying}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold shadow-glow-blue transition-all"
                    >
                      {isApplying ? 'Submitting Application...' : 'Confirm & Submit Application'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </Layout>
  )
}
