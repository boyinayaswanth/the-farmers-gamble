import React, { useState } from 'react'
import { 
  UploadCloud, 
  Bug, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Leaf, 
  Pill, 
  RotateCcw,
  Camera
} from 'lucide-react'

export default function DiseaseScanner() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [selectedCrop, setSelectedCrop] = useState('Groundnut')

  const sampleLeaves = [
    {
      title: 'Groundnut Leaf with Tikka Spots',
      crop: 'Groundnut',
      url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
      label: 'Groundnut Tikka'
    },
    {
      title: 'Tomato Leaf with Early Blight',
      crop: 'Tomato',
      url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
      label: 'Tomato Early Blight'
    },
    {
      title: 'Healthy Green Foliage',
      crop: 'Groundnut',
      url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
      label: 'Healthy Canopy'
    }
  ]

  async function runDiagnosis(imageUrl: string, cropName: string = selectedCrop) {
    setSelectedImage(imageUrl)
    setAnalyzing(true)
    setDiagnosis(null)

    try {
      const res = await fetch('/api/farmer/disease-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'image', imageUrl, crop: cropName })
      })
      const data = await res.json()
      if (data.ok) {
        setDiagnosis(data.result)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setAnalyzing(false)
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        runDiagnosis(reader.result as string, selectedCrop)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Top Upload Section */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              AI Computer Vision Diagnostic
            </span>
            <h3 className="font-heading font-bold text-xl text-white mt-1 flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              Upload Plant / Leaf Photo
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
            >
              <option value="Groundnut">Groundnut (వేరుశనగ)</option>
              <option value="Tomato">Tomato (టమాటా)</option>
              <option value="Chilli">Red Chilli (మిరప)</option>
              <option value="Cotton">Cotton (ప్రత్తి)</option>
              <option value="Maize">Maize (మొక్కజొన్న)</option>
            </select>
          </div>
        </div>

        {/* Dropzone & Camera Trigger */}
        <div className="mt-4">
          <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-950/60 cursor-pointer transition-all hover:bg-slate-950">
            <UploadCloud className="w-10 h-10 text-emerald-400 mb-2 animate-bounce" />
            <p className="text-sm font-semibold text-slate-200">
              Click to browse or drop leaf photo here
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports JPEG, PNG, WEBP high-resolution smartphone photos
            </p>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Preset Sample Leaf Photos */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 font-medium mb-2.5">
            Or test with sample diseased leaf images:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sampleLeaves.map((leaf, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCrop(leaf.crop)
                  runDiagnosis(leaf.url, leaf.crop)
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-left transition-all hover:scale-[1.01]"
              >
                <img src={leaf.url} alt={leaf.title} className="w-12 h-12 rounded-lg object-cover border border-slate-700" />
                <div>
                  <p className="text-xs font-bold text-slate-200">{leaf.label}</p>
                  <p className="text-[10px] text-slate-400">{leaf.crop}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Processing Loader */}
      {analyzing && (
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-8 text-center animate-pulse">
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-spin mb-3" />
          <h4 className="font-heading font-bold text-base text-white">AI Vision Scanning Leaf Pixels...</h4>
          <p className="text-xs text-slate-400 mt-1">Evaluating necrotic lesion geometry, chlorotic halo patterns, and fungal spore signs...</p>
        </div>
      )}

      {/* Diagnostic Result Card */}
      {diagnosis && !analyzing && (
        <div className="rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 p-6 shadow-2xl space-y-5">
          
          {/* Header Result */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider border border-emerald-500/30">
                AI Vision Detection Result
              </span>
              <h3 className="font-heading font-black text-2xl text-white mt-1">
                {diagnosis.disease}
              </h3>
              <p className="text-xs font-mono text-slate-400 italic">
                Scientific: {diagnosis.scientificName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {selectedImage && (
                <img src={selectedImage} alt="Diagnosed leaf" className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500/40 shadow" />
              )}
              <div className="text-right">
                <span className="text-xs text-slate-400">Diagnosis Confidence</span>
                <div className="font-heading font-black text-2xl text-emerald-400">
                  {diagnosis.confidence}%
                </div>
              </div>
            </div>
          </div>

          {/* Symptoms & Causes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Symptoms */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                <Bug className="w-4 h-4" />
                Observed Symptoms
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {diagnosis.symptoms?.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Causes */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                <Leaf className="w-4 h-4" />
                Probable Environmental Causes
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {diagnosis.possibleCauses?.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Treatment Remedies (Chemical & Organic) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Pill className="w-4 h-4" />
              Recommended Actionable Treatments
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Chemical Remedies */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">
                  Targeted Chemical Formulation
                </span>
                <div className="mt-2 space-y-3">
                  {diagnosis.chemicalTreatment?.map((chem: any, idx: number) => (
                    <div key={idx} className="text-xs">
                      <p className="font-bold text-white">{chem.product}</p>
                      <p className="text-emerald-400 font-semibold mt-0.5">Dosage: {chem.dosage}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{chem.applicationMethod}</p>
                      <span className="text-[10px] text-amber-400 font-medium block mt-1">
                        ⏱️ Harvest waiting period: {chem.waitingPeriodDays} days
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organic Remedies */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                  Organic & Biological Solution
                </span>
                <div className="mt-2 space-y-3">
                  {diagnosis.organicTreatment?.map((org: any, idx: number) => (
                    <div key={idx} className="text-xs">
                      <p className="font-bold text-white">{org.method}</p>
                      <p className="text-slate-300 text-[11px] mt-0.5">{org.preparation}</p>
                      <p className="text-emerald-300 text-[11px] mt-0.5 font-medium">{org.benefits}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Medical / Agronomic Disclaimer */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>IMPORTANT DISCLAIMER:</strong> {diagnosis.disclaimer}
            </p>
          </div>

        </div>
      )}

    </div>
  )
}
