import React, { useState } from 'react'
import { Calendar, Clock, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, ThermometerSun, Droplets } from 'lucide-react'

interface PlantingWindowProps {
  crop?: string
  soilType?: string
  district?: string
}

export default function PlantingWindow({ 
  crop = 'Groundnut', 
  soilType = 'Red Sandy Loam', 
  district = 'Anantapur' 
}: PlantingWindowProps) {
  const [selectedCrop, setSelectedCrop] = useState(crop)

  const plantingData: Record<string, {
    optimalDates: string
    confidence: number
    status: 'OPTIMAL' | 'EARLY' | 'LATE'
    daysRemaining: number
    season: string
    soilTemp: string
    soilMoisture: string
    timeline: { phase: string; dates: string; status: 'past' | 'current' | 'future'; yieldImpact: string }[]
    advisories: string[]
    teluguAdvice: string
  }> = {
    Groundnut: {
      optimalDates: 'June 15 – July 15 (Kharif) / Oct 15 – Nov 15 (Rabi)',
      confidence: 96,
      status: 'OPTIMAL',
      daysRemaining: 18,
      season: 'Rabi Sowing Season 2026',
      soilTemp: '24°C – 28°C (Optimal for germination)',
      soilMoisture: 'Field Capacity 60-70%',
      timeline: [
        { phase: 'Early Sowing (Higher Pest Risk)', dates: 'Oct 01 – Oct 14', status: 'past', yieldImpact: '90% Potential' },
        { phase: 'Optimal Peak Sowing Window', dates: 'Oct 15 – Nov 15', status: 'current', yieldImpact: '100% Max Yield' },
        { phase: 'Late Sowing (Terminal Heat Risk)', dates: 'Nov 16 – Dec 05', status: 'future', yieldImpact: '75-80% Potential' },
        { phase: 'Critical Cut-Off (Not Recommended)', dates: 'After Dec 05', status: 'future', yieldImpact: '<60% High Risk' },
      ],
      advisories: [
        'Treat seeds with Trichoderma viride @ 4g/kg seed + Rhizobium culture @ 50g/kg seed.',
        'Ensure sowing depth of 5 cm in red sandy loam soil to avoid seed desiccation.',
        'Apply Gypsum @ 200 kg/acre at 45 days after sowing (pegging stage).'
      ],
      teluguAdvice: 'వేరుశనగ విత్తుటకు అక్టోబర్ 15 నుండి నవంబర్ 15 వరకు అనుకూల సమయం. విత్తన శుద్ధి తప్పక చేయండి.'
    },
    Chilli: {
      optimalDates: 'July 15 – Aug 15 (Transplanting)',
      confidence: 94,
      status: 'OPTIMAL',
      daysRemaining: 24,
      season: 'Kharif Main Season',
      soilTemp: '22°C – 30°C',
      soilMoisture: 'Well-Drained Loam',
      timeline: [
        { phase: 'Nursery Sowing', dates: 'June 01 – June 20', status: 'past', yieldImpact: 'Nursery Phase' },
        { phase: 'Optimal Main Field Transplanting', dates: 'July 15 – Aug 15', status: 'current', yieldImpact: '100% Max Yield' },
        { phase: 'Late Transplanting (Thrips Risk)', dates: 'Aug 16 – Sept 05', status: 'future', yieldImpact: '80% Potential' },
        { phase: 'Cut-Off Date', dates: 'After Sept 05', status: 'future', yieldImpact: '<65% Risk' },
      ],
      advisories: [
        'Transplant 35-40 days old healthy seedlings in the evening hours.',
        'Dip seedling roots in Imidacloprid (1ml/L) for 15 minutes before planting to prevent leaf curl virus.',
        'Maintain 60cm x 45cm spacing on raised beds with drip lateral lines.'
      ],
      teluguAdvice: 'మిరప నాట్లు వేయుటకు జూలై 15 నుండి ఆగస్టు 15 వరకు ఉత్తమ సమయం. నారు వేర్లను ఇమిడాక్లోప్రిడ్ ద్రావణంలో ముంచి నాటండి.'
    },
    Cotton: {
      optimalDates: 'June 10 – July 10',
      confidence: 92,
      status: 'OPTIMAL',
      daysRemaining: 12,
      season: 'Kharif Monsoonal',
      soilTemp: '26°C – 32°C',
      soilMoisture: 'Black Cotton Soil Moisture >60%',
      timeline: [
        { phase: 'Pre-Monsoon Sowing', dates: 'May 25 – June 09', status: 'past', yieldImpact: '95% Potential' },
        { phase: 'Optimal Sowing Window', dates: 'June 10 – July 10', status: 'current', yieldImpact: '100% Max Yield' },
        { phase: 'Late Sowing (Bollworm Risk)', dates: 'July 11 – July 31', status: 'future', yieldImpact: '78% Potential' },
        { phase: 'Cut-Off Date', dates: 'After Aug 01', status: 'future', yieldImpact: '<55% High Risk' },
      ],
      advisories: [
        'Sow seeds on ridges and furrows with 90cm x 60cm spacing.',
        'Ensure minimum 50mm soaking rainfall before dibbling cotton seeds.',
        'Maintain refuge non-Bt cotton boundary rows around the field.'
      ],
      teluguAdvice: 'ప్రత్తి విత్తుటకు జూన్ 10 నుండి జూలై 10 వరకు అనుకూలం. సాలుకు సాలుకు 90 సెం.మీ దూరం పాటించండి.'
    },
    Tomato: {
      optimalDates: 'Year-Round (Best: Sept 15 – Oct 30)',
      confidence: 95,
      status: 'OPTIMAL',
      daysRemaining: 20,
      season: 'Rabi Tomato Cycle',
      soilTemp: '20°C – 26°C',
      soilMoisture: 'Moist & Well Aerated',
      timeline: [
        { phase: 'Nursery Bed Preparation', dates: 'Aug 20 – Sept 10', status: 'past', yieldImpact: 'Healthy Seedlings' },
        { phase: 'Optimal Field Transplanting', dates: 'Sept 15 – Oct 30', status: 'current', yieldImpact: '100% Max Yield' },
        { phase: 'Late Planting (Early Blight Risk)', dates: 'Nov 01 – Nov 20', status: 'future', yieldImpact: '82% Potential' },
        { phase: 'Cut-Off Date', dates: 'After Nov 20', status: 'future', yieldImpact: '<65% Risk' },
      ],
      advisories: [
        'Stake plants using bamboo poles and nylon twine within 25 days of transplanting.',
        'Mulch soil with 25-micron silver-black plastic mulch to reduce weed growth by 90%.',
        'Avoid flood irrigation; deliver water via drip every 2 days.'
      ],
      teluguAdvice: 'టమాటా నాట్లు వేయుటకు సెప్టెంబర్ 15 నుండి అక్టోబర్ 30 వరకు ఉత్తమ సమయం. మల్చింగ్ షీట్లు వాడండి.'
    }
  }

  const current = plantingData[selectedCrop] || plantingData['Groundnut']

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 backdrop-blur-xl shadow-glass space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-xl text-white">
                AI Planting Window Intelligence
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {current.confidence}% Match
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Precision sowing schedule calculated for {soilType} in {district}
            </p>
          </div>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          {Object.keys(plantingData).map((cropKey) => (
            <button
              key={cropKey}
              onClick={() => setSelectedCrop(cropKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCrop === cropKey
                  ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-glow-green'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {cropKey}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900/60 to-emerald-950/40 border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
            {current.season}
          </span>
          <h4 className="text-2xl font-heading font-black text-white mt-1">
            {current.optimalDates}
          </h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            {current.teluguAdvice}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-2xl font-mono font-black text-emerald-400">{current.daysRemaining}</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Days in Window</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-2xl font-mono font-black text-sky-400">{current.confidence}%</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">AI Confidence</div>
          </div>
        </div>
      </div>

      {/* Environmental Field Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <ThermometerSun className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs">
            <span className="text-slate-400">Soil Sowing Temperature: </span>
            <strong className="text-slate-200">{current.soilTemp}</strong>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <Droplets className="w-5 h-5 text-sky-400 shrink-0" />
          <div className="text-xs">
            <span className="text-slate-400">Soil Moisture Range: </span>
            <strong className="text-slate-200">{current.soilMoisture}</strong>
          </div>
        </div>
      </div>

      {/* 4-Stage Sowing Timeline */}
      <div className="space-y-3">
        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          Sowing Window Phases & Expected Yield Potential
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {current.timeline.map((phase, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                phase.status === 'current'
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-glow-green'
                  : phase.status === 'past'
                  ? 'bg-slate-950/40 border-slate-800 opacity-75'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className={`font-bold px-2 py-0.5 rounded ${
                  phase.status === 'current' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {phase.status === 'current' ? '● Active Optimal' : `Stage ${idx + 1}`}
                </span>
                <strong className={`font-mono ${
                  phase.status === 'current' ? 'text-emerald-400 font-black' : 'text-slate-300'
                }`}>
                  {phase.yieldImpact}
                </strong>
              </div>

              <h6 className="font-bold text-xs text-white leading-snug">{phase.phase}</h6>
              <p className="text-[11px] text-slate-400 font-mono mt-1">{phase.dates}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Agronomic Advisory Steps */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Recommended Seed Treatment & Sowing Practices:
        </div>
        <ul className="space-y-1.5 pl-6 list-disc text-xs text-slate-300">
          {current.advisories.map((adv, idx) => (
            <li key={idx} className="leading-relaxed">{adv}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}
