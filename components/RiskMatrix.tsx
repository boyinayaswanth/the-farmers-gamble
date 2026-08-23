import React, { useState } from 'react'
import { ShieldAlert, ShieldCheck, AlertTriangle, Bug, CloudRain, TrendingDown, ThermometerSnowflake, CheckCircle2, ChevronRight } from 'lucide-react'

interface RiskMatrixProps {
  district?: string
  crop?: string
}

export default function RiskMatrix({ 
  district = 'Anantapur', 
  crop = 'Groundnut' 
}: RiskMatrixProps) {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null)

  const risks = [
    {
      id: 1,
      title: 'Pest & Disease Outbreak Risk',
      icon: Bug,
      score: 28,
      level: 'LOW-MODERATE',
      color: 'emerald',
      statusText: 'Manageable with scheduled neem prophylactic sprays',
      description: 'Recent 68% relative humidity with warm mornings creates slight potential for Tikka leaf spot and spodoptera litura caterpillars.',
      mitigations: [
        'Erect 10 bird perches per acre for natural predation of caterpillars.',
        'Install 5 pheromone traps per acre to monitor Spodoptera adult moths.',
        'Spray Neem Seed Kernel Extract (NSKE 5%) before flower initiation.'
      ],
      teluguMitigation: 'తిక్కా ఆకుమచ్చ మరియు లద్దెపురుగు నివారణకు ఎకరాకు 5 లింగాకర్షక బుట్టలు అమర్చండి.'
    },
    {
      id: 2,
      title: 'Monsoon & Drought Dry-Spell Risk',
      icon: CloudRain,
      score: 42,
      level: 'MODERATE',
      color: 'amber',
      statusText: '12-day dry spell projected during 40-55 DAS pegging stage',
      description: 'IMD radar forecasts normal showers in early vegetative phase followed by a 12-day dry spell in mid-cycle.',
      mitigations: [
        'Open conservation furrows after every 6 rows of groundnut to harvest rainwater in-situ.',
        'Keep farm pond water ready for 1 life-saving protective sprinkler irrigation at pegging.',
        'Apply Potassium Nitrate (13-0-45 @ 10g/L) foliar spray to induce drought tolerance.'
      ],
      teluguMitigation: 'వరి లేదా వేరుశనగలో వర్షాభావ పరిస్థితులను తట్టుకోవడానికి ప్రతి 6 సాలలకు ఒక బోదె తీయండి.'
    },
    {
      id: 3,
      title: 'Mandi Price Volatility Risk',
      icon: TrendingDown,
      score: 35,
      level: 'LOW-MODERATE',
      color: 'emerald',
      statusText: 'MSP of ₹6,783/Qtl provides robust downside price protection',
      description: 'Wholesale arrivals expected to peak in November. Minimum Support Price (MSP) and APMC Kalyanadurg procurement center guarantee remunerative floor price.',
      mitigations: [
        'Pre-register on e-NAM and AP Markfed portal 15 days prior to harvest.',
        'Dry pods to <8% moisture content to command Grade-A premium price in the market.',
        'Sell 50% harvest immediately at farmgate and store 50% in Gram Panchayat warehouse with NWR negotiable receipts.'
      ],
      teluguMitigation: 'ధరల తగ్గుదల నుండి రక్షణకు కాయలను 8% తేమ శాతం వచ్చే వరకు ఆరబెట్టి మార్కెట్ కు తరలించండి.'
    },
    {
      id: 4,
      title: 'Thermal & Heat Stress Risk',
      icon: ThermometerSnowflake,
      score: 18,
      level: 'LOW',
      color: 'emerald',
      statusText: 'Temperatures 24°C–32°C are ideal for reproductive growth',
      description: 'Night temperatures remain mild (21°C–23°C), preventing flower sterility and pollen desiccation.',
      mitigations: [
        'Maintain light soil mulching using crop residue or dry leaves.',
        'Schedule drip irrigation during early morning (6 AM – 9 AM) or late evening.'
      ],
      teluguMitigation: 'ఉష్ణోగ్రత అనుకూలంగా ఉంది. ఉదయం వేళల్లో మాత్రమే నీటి తడులు ఇవ్వండి.'
    }
  ]

  const overallRiskIndex = 31 // Out of 100

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 backdrop-blur-xl shadow-glass space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-xl text-white">
                Farm Risk Intelligence Matrix
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Low-Medium Risk
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              4-Pillar risk monitoring & proactive mitigations for {crop} in {district}
            </p>
          </div>
        </div>

        {/* Risk Score Pill */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Total Farm Risk Index</div>
            <div className="text-lg font-heading font-black text-emerald-400 font-mono">
              {overallRiskIndex} / 100 <span className="text-xs text-slate-300 font-sans font-normal">(Safe & Manageable)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Pillar Risk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map((risk) => {
          const Icon = risk.icon
          const isSelected = selectedPillar === risk.id

          return (
            <div
              key={risk.id}
              onClick={() => setSelectedPillar(isSelected ? null : risk.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-950 border-emerald-500/70 shadow-glow-green'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    risk.color === 'amber'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white leading-tight">{risk.title}</h4>
                    <span className={`text-[11px] font-bold ${
                      risk.color === 'amber' ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {risk.level} ({risk.score}%)
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform ${isSelected ? 'rotate-90 text-emerald-400' : ''}`} />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {risk.description}
              </p>

              {/* Actionable Mitigations */}
              <div className={`space-y-2 pt-3 border-t border-slate-800/80 ${isSelected ? 'block' : 'hidden sm:block'}`}>
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Required Action Plan:
                </div>
                <ul className="space-y-1 pl-4 list-disc text-xs text-slate-300">
                  {risk.mitigations.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
                <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300 mt-2">
                  🌾 <strong>తెలుగు సలహా:</strong> {risk.teluguMitigation}
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
