import React, { useState, useEffect } from 'react'
import { FlaskConical, DollarSign, Leaf, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react'

export default function FertilizerCalculator({ defaultCrop = 'Groundnut', defaultLand = 3.0 }: { defaultCrop?: string; defaultLand?: number }) {
  const [crop, setCrop] = useState(defaultCrop)
  const [landSize, setLandSize] = useState(defaultLand)
  const [stage, setStage] = useState('Basal (At Sowing)')
  const [soilPh, setSoilPh] = useState(6.5)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function calculate() {
    setLoading(true)
    try {
      const res = await fetch('/api/farmer/fertilizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, landSize, growthStage: stage, soilPh })
      })
      const data = await res.json()
      if (data.ok) setResult(data.calculation)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    calculate()
  }, [crop, landSize, stage, soilPh])

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            Soil-to-Fertilizer Engine
          </span>
          <h3 className="font-heading font-bold text-xl text-white mt-1 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            Precision Fertilizer Intelligence
          </h3>
        </div>
        <div className="text-xs text-slate-400">
          Target: <strong className="text-emerald-300">{landSize} Acres</strong> • <strong className="text-emerald-300">{crop}</strong>
        </div>
      </div>

      {/* Input Parameters Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Crop Selection</label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
          >
            <option value="Groundnut">Groundnut (వేరుశనగ)</option>
            <option value="Maize">Hybrid Maize (మొక్కజొన్న)</option>
            <option value="Red Gram">Red Gram (కందులు)</option>
            <option value="Cotton">Bt Cotton (ప్రత్తి)</option>
            <option value="Red Chilli">Red Chilli (మిరప)</option>
            <option value="Paddy">Paddy / Rice (వరి)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Land Size (Acres)</label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="100"
            value={landSize}
            onChange={(e) => setLandSize(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Crop Growth Stage</label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
          >
            <option value="Basal (At Sowing)">Basal (At Sowing)</option>
            <option value="Vegetative (30-35 Days)">Vegetative (30-35 Days)</option>
            <option value="Pegging / Flowering (45 Days)">Pegging / Flowering (45 Days)</option>
            <option value="Pod Filling / Grain Maturity">Pod Filling / Grain Maturity</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Soil pH Level: {soilPh}</label>
          <input
            type="range"
            min="5.0"
            max="8.5"
            step="0.1"
            value={soilPh}
            onChange={(e) => setSoilPh(Number(e.target.value))}
            className="w-full accent-emerald-500 mt-2"
          />
        </div>
      </div>

      {/* Results Display */}
      {result && (
        <div className="space-y-4">
          
          {/* Total Cost & Stage Guidance Banner */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
                Stage Recommendation ({stage})
              </span>
              <p className="text-xs text-slate-200 mt-1">
                {result.stageGuidance}
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-slate-400">Total Fertilizer Cost Estimate</span>
              <div className="font-heading font-black text-2xl text-emerald-400">
                ₹{result.totalEstimatedCost.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Fertilizer Dosage Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Fertilizer Product</th>
                  <th className="p-3">NPK / Grade</th>
                  <th className="p-3">Dose / Acre</th>
                  <th className="p-3">Total Quantity</th>
                  <th className="p-3">Bags Needed</th>
                  <th className="p-3">Est. Cost</th>
                  <th className="p-3">Application Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                {result.schedule?.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white">
                      {item.name}
                      <span className="block text-[10px] text-slate-400 font-normal">{item.purpose}</span>
                    </td>
                    <td className="p-3 font-mono text-emerald-300">{item.npk}</td>
                    <td className="p-3 font-bold text-slate-200">{item.dosePerAcreKg} kg/acre</td>
                    <td className="p-3 font-black text-emerald-400">{item.totalKg} kg</td>
                    <td className="p-3 text-slate-200">{item.bagCount50kg} Bags</td>
                    <td className="p-3 font-bold text-amber-300">₹{item.totalCost.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-slate-300">{item.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Organic & Bio-fertilizer Alternatives */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
              <Leaf className="w-4 h-4" />
              Eco-Friendly Organic & Bio-fertilizer Supplements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {result.organicAlternatives?.map((alt: any, i: number) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                  <p className="font-bold text-slate-200">{alt.name}</p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">{alt.quantity}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{alt.benefits}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Disclaimer */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Safety Disclaimer:</strong> {result.safetyDisclaimer}
            </p>
          </div>

        </div>
      )}

    </div>
  )
}
