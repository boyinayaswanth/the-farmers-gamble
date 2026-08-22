import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  Droplets, 
  Clock, 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert,
  DollarSign,
  ArrowRight,
  Info
} from 'lucide-react'

export default function CropRecommendationPage() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [evaluatedFactors, setEvaluatedFactors] = useState<any>(null)
  const [rainfallMod, setRainfallMod] = useState(0)
  const [costMod, setCostMod] = useState(0)
  const [season, setSeason] = useState('Kharif')
  const [loading, setLoading] = useState(true)
  const [expandedCrop, setExpandedCrop] = useState<string | null>('Groundnut (K-6 / Kadiri-9)')

  async function loadRecommendations() {
    setLoading(true)
    try {
      const res = await fetch(`/api/farmer/crops?season=${season}&rainfallModifier=${rainfallMod}&costModifier=${costMod}`)
      const data = await res.json()
      if (data.ok) {
        setRecommendations(data.recommendations)
        setEvaluatedFactors(data.evaluatedFactors)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecommendations()
  }, [rainfallMod, costMod, season])

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              AI Decision Intelligence
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              Personalized Crop Suitability & ROI Ranking
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-variable agronomic optimization answering: <em>"What is the best decision for THIS farmer?"</em>
            </p>
          </div>

          {evaluatedFactors && (
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-4">
              <div>
                <span className="text-slate-500 block text-[10px]">Soil / pH</span>
                <strong className="text-emerald-400">{evaluatedFactors.soilType} (pH {evaluatedFactors.soilPh})</strong>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-500 block text-[10px]">NPK Rating</span>
                <strong className="text-white">{evaluatedFactors.npk}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Interactive "What-If" Climate & Cost Simulation Control Box */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Interactive "What-If" Scenario Simulation
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
              Live Recalculation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Season Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Season Window</label>
              <select
                value={season}
                onChange={e => setSeason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              >
                <option value="Kharif">Kharif (Monsoon Sowing)</option>
                <option value="Rabi">Rabi (Post-Monsoon Winter)</option>
                <option value="Zaid">Zaid (Summer Cropping)</option>
              </select>
            </div>

            {/* Rainfall Modifier Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Rainfall Variance:</span>
                <span className={rainfallMod < 0 ? 'text-amber-400' : 'text-cyan-400'}>
                  {rainfallMod > 0 ? `+${rainfallMod}% Rain` : rainfallMod < 0 ? `${rainfallMod}% Deficit` : 'Normal Rainfall'}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={rainfallMod}
                onChange={e => setRainfallMod(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <span className="text-[10px] text-slate-500 flex justify-between mt-1">
                <span>-30% Drought</span>
                <span>Normal</span>
                <span>+30% Excess</span>
              </span>
            </div>

            {/* Input Cost Inflation Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Input Cost Variation:</span>
                <span className={costMod > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                  {costMod > 0 ? `+${costMod}% Inflation` : costMod < 0 ? `${costMod}% Discount` : 'Standard Cost'}
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="30"
                step="5"
                value={costMod}
                onChange={e => setCostMod(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 flex justify-between mt-1">
                <span>-20% Cheaper</span>
                <span>Standard</span>
                <span>+30% Inflation</span>
              </span>
            </div>

          </div>
        </div>

        {/* Ranked Crops List */}
        {loading ? (
          <div className="rounded-2xl bg-slate-900 p-8 text-center animate-pulse text-slate-400 text-xs">
            Evaluating NPK dynamics, historical yields, and market trends...
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((crop, idx) => {
              const isTop = idx === 0
              const isExpanded = expandedCrop === crop.cropName

              return (
                <div
                  key={idx}
                  className={`rounded-3xl border transition-all ${
                    isTop
                      ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/50 shadow-2xl'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header Row */}
                  <div
                    onClick={() => setExpandedCrop(isExpanded ? null : crop.cropName)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-black text-lg shrink-0 ${
                        isTop
                          ? 'bg-emerald-500 text-slate-950 shadow-glow-green'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        #{crop.rank}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-bold text-xl text-white">
                            {crop.cropName}
                          </h3>
                          {isTop && (
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                              🏆 HIGHEST FIT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-emerald-400 font-telugu mt-0.5">
                          {crop.teluguName} • <span className="text-slate-400">{crop.category}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quick Metrics (Suitability Score & Est. Net Profit) */}
                    <div className="flex items-center gap-6 self-start md:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Suitability
                        </span>
                        <div className="font-heading font-black text-2xl text-emerald-400">
                          {crop.suitabilityScore}%
                        </div>
                      </div>

                      <div className="text-right border-l border-slate-800 pl-6">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Est. Profit / Acre
                        </span>
                        <div className="font-heading font-black text-2xl text-amber-400">
                          ₹{crop.estimatedProfitPerAcre.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detailed Breakdown */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 space-y-5 animate-fade-in text-xs">
                      
                      {/* Why Suitable Explanation */}
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                        <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                          Agronomic Recommendation Rationale:
                        </span>
                        <p className="text-slate-200 leading-relaxed">
                          {crop.whySuitable}
                        </p>
                      </div>

                      {/* Agronomic Specs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-400 text-[10px] flex items-center gap-1">
                            <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Water Requirement
                          </span>
                          <p className="font-bold text-white mt-1">{crop.waterRequirement}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-400 text-[10px] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-400" /> Growing Period
                          </span>
                          <p className="font-bold text-white mt-1">{crop.durationDays} Days</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-400 text-[10px] flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Market Demand
                          </span>
                          <p className="font-bold text-emerald-300 mt-1">{crop.marketDemand} (₹{crop.currentMarketPrice}/kg)</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-400 text-[10px] flex items-center gap-1">
                            <FlaskConical className="w-3.5 h-3.5 text-teal-400" /> Fertilizer Summary
                          </span>
                          <p className="font-semibold text-slate-200 mt-1 text-[11px] truncate">{crop.fertilizerSummary}</p>
                        </div>
                      </div>

                      {/* Financial Margins Table */}
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                          Financial Revenue & Cost Breakdown (Per Acre)
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 text-xs">
                          <div>
                            <span className="text-slate-400">Est. Average Yield:</span>
                            <p className="font-bold text-white">{crop.estimatedYieldKgPerAcre} kg / acre</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Est. Gross Revenue:</span>
                            <p className="font-bold text-emerald-400">₹{crop.estimatedRevenuePerAcre.toLocaleString('en-IN')}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Est. Input Costs:</span>
                            <p className="font-bold text-rose-300">₹{crop.estimatedCostPerAcre.toLocaleString('en-IN')}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Total Profit (3 Acres):</span>
                            <p className="font-heading font-black text-emerald-400 text-sm">₹{crop.totalEstimatedProfit.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>

                      {/* Major Risks & Disclaimer */}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px]">
                        <div>
                          <strong className="text-amber-400">Key Risks:</strong> <span className="text-slate-300">{crop.majorRisks}</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 italic">
                        ⚠️ {crop.disclaimer}
                      </p>

                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

      </div>
    </Layout>
  )
}
