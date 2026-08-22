import React, { useState, useRef } from 'react'
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
  Camera,
  Volume2,
  VolumeX,
  Globe2,
  Image as ImageIcon
} from 'lucide-react'

export default function DiseaseScanner() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [selectedCrop, setSelectedCrop] = useState('Groundnut')
  const [language, setLanguage] = useState<'en' | 'te'>('en')
  const [speaking, setSpeaking] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const sampleLeaves = [
    {
      title: 'Groundnut Leaf with Tikka Spots',
      crop: 'Groundnut',
      url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
      label: 'Groundnut Tikka Spots',
      badge: 'Fungal Spot'
    },
    {
      title: 'Chilli Leaf Curl & Pest Vector',
      crop: 'Chilli',
      url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
      label: 'Chilli Leaf Curl',
      badge: 'Viral Vector'
    },
    {
      title: 'Tomato Leaf with Early Blight',
      crop: 'Tomato',
      url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
      label: 'Tomato Early Blight',
      badge: 'Alternaria'
    },
    {
      title: 'Healthy Green Leaf Canopy',
      crop: 'Groundnut',
      url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
      label: 'Healthy Green Canopy',
      badge: 'Optimal Health'
    }
  ]

  async function runDiagnosis(imageUrl: string, cropName: string = selectedCrop) {
    setSelectedImage(imageUrl)
    setAnalyzing(true)
    setDiagnosis(null)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setSpeaking(false)

    try {
      const res = await fetch('/api/farmer/disease-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'image', imageUrl, crop: cropName })
      })
      const data = await res.json()
      if (data.ok && data.result) {
        setDiagnosis(data.result)
        
        // Auto speak doctor's advice
        const speech = language === 'te' && data.result.teluguSummary
          ? data.result.teluguSummary
          : `Diagnosis complete. Detected ${data.result.disease} with ${data.result.confidence} percent confidence on ${data.result.cropAffected}. ${data.result.chemicalTreatment?.[0]?.product ? `Recommended treatment is ${data.result.chemicalTreatment[0].product} with dosage ${data.result.chemicalTreatment[0].dosage}.` : ''}`
        speakAdvice(speech)
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
        const base64Url = reader.result as string
        runDiagnosis(base64Url, selectedCrop)
      }
      reader.readAsDataURL(file)
    }
  }

  function speakAdvice(textToSpeak: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.rate = 0.95
    utterance.pitch = 1.0
    utterance.lang = language === 'te' ? 'te-IN' : 'en-IN'
    setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  function toggleVoice() {
    if (speaking) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setSpeaking(false)
    } else if (diagnosis) {
      const text = language === 'te' && diagnosis.teluguSummary
        ? diagnosis.teluguSummary
        : `Detected ${diagnosis.disease}. ${diagnosis.symptoms?.[0] || ''}. Recommended treatment: ${diagnosis.chemicalTreatment?.[0]?.product || 'Organic bio-fungicide'}.`
      speakAdvice(text)
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Top Upload & Camera Scanner Section */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                AI Vision Pathology
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                Multimodal Computer Vision
              </span>
            </div>
            <h3 className="font-heading font-black text-xl text-white mt-1 flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              Scan Plant / Leaf Photo
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload a smartphone photo of your crop leaf to identify fungal, bacterial, or pest diseases instantly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'te' : 'en')}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-emerald-300 flex items-center gap-1.5"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'English' : 'తెలుగు'}</span>
            </button>

            {/* Crop Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400">Crop:</span>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
              >
                <option value="Groundnut">Groundnut (వేరుశనగ)</option>
                <option value="Chilli">Red Chilli (మిరప)</option>
                <option value="Cotton">Cotton (ప్రత్తి)</option>
                <option value="Tomato">Tomato (టమాటా)</option>
                <option value="Maize">Maize (మొక్కజొన్న)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Upload Dropzone & Camera Launcher */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Main Upload Box */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500 bg-slate-950/60 cursor-pointer transition-all hover:bg-slate-950 group text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 animate-bounce" />
            </div>
            <p className="text-sm font-bold text-slate-200">
              Click to Upload Leaf Photo from Device
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports Camera Snapshots, JPG, PNG, WEBP files
            </p>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </div>

          {/* Camera Trigger Box */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500 bg-slate-950/60 cursor-pointer transition-all hover:bg-slate-950 group text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-200">
              Take Live Photo with Smartphone Camera
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Hold camera 15cm from the diseased leaf surface
            </p>
          </div>

        </div>

        {/* Preset Sample Leaf Photos (1-Click Test) */}
        <div className="pt-3 border-t border-slate-800">
          <p className="text-xs text-slate-400 font-bold mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Or click any sample diseased leaf to test instant AI diagnostic:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sampleLeaves.map((leaf, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCrop(leaf.crop)
                  runDiagnosis(leaf.url, leaf.crop)
                }}
                className="flex flex-col p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 text-left transition-all hover:scale-[1.02] active:scale-98 group shadow-sm"
              >
                <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2 border border-slate-800">
                  <img src={leaf.url} alt={leaf.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-emerald-300 backdrop-blur-sm">
                    {leaf.badge}
                  </span>
                </div>
                <div className="font-heading font-bold text-xs text-white truncate">{leaf.label}</div>
                <div className="text-[10px] text-slate-400">{leaf.crop}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Analyzing Laser Scanner Loader */}
      {analyzing && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
          {/* Animated Scanning Laser Line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
          
          <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-spin" />
          <h4 className="font-heading font-black text-lg text-white">
            AI Vision Model Scanning Leaf Pathology...
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Extracting lesion contours, chlorotic halos, fungal hyphae signs, and calculating disease severity index...
          </p>
        </div>
      )}

      {/* Diagnostic Result Card */}
      {diagnosis && !analyzing && (
        <div className="rounded-3xl bg-slate-900/90 border-2 border-emerald-500/50 p-6 shadow-2xl space-y-6 animate-fade-in">
          
          {/* Header Result */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider border border-emerald-500/30">
                  AI Vision Pathology Result
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  diagnosis.severity === 'SEVERE'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : diagnosis.severity === 'HEALTHY'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  Severity: {diagnosis.severity}
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1.5">
                {diagnosis.disease}
              </h3>
              <p className="text-xs font-mono text-slate-400 italic mt-0.5">
                Scientific: {diagnosis.scientificName} • Target Crop: {diagnosis.cropAffected}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {selectedImage && (
                <img src={selectedImage} alt="Diagnosed leaf" className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-lg" />
              )}
              
              <div className="text-right">
                <span className="text-xs text-slate-400">Confidence</span>
                <div className="font-heading font-black text-3xl text-emerald-400">
                  {diagnosis.confidence}%
                </div>
              </div>

              {/* Voice Readout Button */}
              <button
                onClick={toggleVoice}
                className={`p-3 rounded-2xl border transition-all ${
                  speaking
                    ? 'bg-emerald-600 text-white animate-pulse shadow-glow-green border-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-emerald-300 hover:bg-slate-800'
                }`}
                title="Listen to Doctor's Advice"
              >
                {speaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Telugu Bilingual Notice (if available) */}
          {diagnosis.teluguSummary && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
              <strong className="text-emerald-300 font-bold uppercase tracking-wider text-[10px]">
                🌿 రైతుకు శీఘ్ర సలహా (Telugu Advisory):
              </strong>
              <p className="leading-relaxed">{diagnosis.teluguSummary}</p>
            </div>
          )}

          {/* Symptoms & Causes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Symptoms */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Bug className="w-4 h-4" />
                Observed Leaf Symptoms
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {diagnosis.symptoms?.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Causes */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4" />
                Probable Environmental Triggers
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {diagnosis.possibleCauses?.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Recommended Treatments (Chemical & Organic Solutions) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Pill className="w-4 h-4" />
              Prescribed Medical Treatments & Dosages
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Chemical Remedies */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">
                  Targeted Chemical Formulation
                </span>
                <div className="space-y-3">
                  {diagnosis.chemicalTreatment && diagnosis.chemicalTreatment.length > 0 ? (
                    diagnosis.chemicalTreatment.map((chem: any, idx: number) => (
                      <div key={idx} className="text-xs border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                        <p className="font-bold text-white">{chem.product}</p>
                        <p className="text-emerald-400 font-bold mt-0.5">Dosage: {chem.dosage}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{chem.applicationMethod}</p>
                        <span className="text-[10px] text-amber-400 font-semibold block mt-1">
                          ⏱️ Harvest waiting period: {chem.waitingPeriodDays} days
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No synthetic chemical spray required. Crop is healthy.</p>
                  )}
                </div>
              </div>

              {/* Organic Remedies */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                  Organic & Biological Solution
                </span>
                <div className="space-y-3">
                  {diagnosis.organicTreatment?.map((org: any, idx: number) => (
                    <div key={idx} className="text-xs border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                      <p className="font-bold text-white">{org.method}</p>
                      <p className="text-slate-300 text-[11px] mt-0.5">{org.preparation}</p>
                      <p className="text-emerald-300 text-[11px] mt-0.5 font-medium">{org.benefits}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Preventive Measures */}
          {diagnosis.preventiveMeasures && diagnosis.preventiveMeasures.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Agronomic Preventive Practices
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {diagnosis.preventiveMeasures.map((p: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold mt-0.5">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>ADVISORY DISCLAIMER:</strong> {diagnosis.disclaimer}
            </p>
          </div>

        </div>
      )}

    </div>
  )
}
