import React, { useState } from 'react'
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Bug, Pill } from 'lucide-react'

export default function SymptomWizard() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<any>({
    crop: 'Groundnut',
    leavesYellow: null,
    brownSpots: null,
    leavesCurling: null,
    insectsVisible: null,
    whitePowder: null,
    stemDamaged: null,
    symptomDurationDays: '3-7 days',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function submitDiagnosis() {
    setLoading(true)
    try {
      const res = await fetch('/api/farmer/disease-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'symptoms', symptoms: answers })
      })
      const data = await res.json()
      if (data.ok) setResult(data.result)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const questions = [
    {
      key: 'leavesYellow',
      question: 'Are the plant leaves turning pale or yellow?',
      telugu: 'ఆకులు పసుపు రంగులోకి మారుతున్నాయా?',
      subtext: 'Check if yellowing is on older bottom leaves or new top shoots.'
    },
    {
      key: 'brownSpots',
      question: 'Are there dark brown or black spots on the leaf surface?',
      telugu: 'ఆకులపై నల్లటి లేదా గోధుమ రంగు మచ్చలు ఉన్నాయా?',
      subtext: 'Circular lesions often indicate fungal Cercospora or Alternaria.'
    },
    {
      key: 'leavesCurling',
      question: 'Are the leaf edges curling upwards or downwards?',
      telugu: 'ఆకులు పైకి లేదా కిందకి ముడుచుకుంటున్నాయా?',
      subtext: 'Leaf curling indicates sucking insect vectors (thrips/whiteflies) or viral infection.'
    },
    {
      key: 'insectsVisible',
      question: 'Can you see tiny insects, caterpillars, or webbing under leaves?',
      telugu: 'ఆకుల అడుగున చిన్న కీటకాలు లేదా పురుగులు కనిపిస్తున్నాయా?',
      subtext: 'Inspect the underside of leaves and tender bud growth.'
    },
    {
      key: 'whitePowder',
      question: 'Is there a white powdery or dusty coating on leaves or stems?',
      telugu: 'ఆకులపై తెల్లటి పొడి పూత లేదా బూడిద లాంటిది ఉందా?',
      subtext: 'Common sign of powdery mildew during dry, shaded humidity.'
    }
  ]

  function handleSelect(key: string, val: boolean) {
    const updated = { ...answers, [key]: val }
    setAnswers(updated)
    if (step < questions.length) {
      setStep(step + 1)
    } else {
      setStep(step + 1)
    }
  }

  function resetWizard() {
    setStep(1)
    setAnswers({
      crop: 'Groundnut',
      leavesYellow: null,
      brownSpots: null,
      leavesCurling: null,
      insectsVisible: null,
      whitePowder: null,
      stemDamaged: null,
      symptomDurationDays: '3-7 days',
    })
    setResult(null)
  }

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            Symptom-Based Disease Wizard
          </span>
          <h3 className="font-heading font-bold text-xl text-white mt-1 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            No Photo? Diagnose by Simple Plant Symptoms
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ideal for farmers with basic phones or poor camera lighting. Same system used over voice phone calls!
          </p>
        </div>

        <button
          onClick={resetWizard}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 p-2 rounded-lg bg-slate-950 border border-slate-800"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Questionnaire Progression */}
      {!result ? (
        <div className="space-y-6">
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {questions.map((q, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step > i + 1
                    ? 'bg-emerald-500'
                    : step === i + 1
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>

          {step <= questions.length ? (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-4 max-w-xl mx-auto">
              <span className="text-xs font-mono text-emerald-400 font-bold">
                QUESTION {step} OF {questions.length}
              </span>
              <h4 className="font-heading font-bold text-lg text-white">
                {questions[step - 1].question}
              </h4>
              <p className="text-xs text-emerald-300 font-telugu">
                {questions[step - 1].telugu}
              </p>
              <p className="text-xs text-slate-400 italic">
                {questions[step - 1].subtext}
              </p>

              {/* Yes / No Buttons */}
              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => handleSelect(questions[step - 1].key, true)}
                  className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-glow-green active:scale-95 transition-all"
                >
                  YES (అవును)
                </button>
                <button
                  onClick={() => handleSelect(questions[step - 1].key, false)}
                  className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 active:scale-95 transition-all"
                >
                  NO (కాదు)
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-4 max-w-xl mx-auto">
              <h4 className="font-heading font-bold text-lg text-white">
                Ready to Analyze Symptoms
              </h4>
              <p className="text-xs text-slate-400">
                You answered all 5 diagnostic symptom questions. Click below to run the Agronomic inference engine.
              </p>
              <button
                onClick={submitDiagnosis}
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-glow-green transition-all"
              >
                {loading ? 'Analyzing Plant Symptoms...' : 'Generate Disease Diagnosis'}
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Diagnosis Result from Questionnaire */
        <div className="p-6 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider">
                Symptom Diagnostic Inference
              </span>
              <h3 className="font-heading font-black text-2xl text-white mt-1">
                {result.disease}
              </h3>
              <p className="text-xs text-slate-400 font-mono italic">
                Scientific: {result.scientificName}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Match Probability</span>
              <div className="font-heading font-black text-2xl text-emerald-400">
                {result.confidence}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h5 className="text-xs font-bold uppercase text-amber-400 mb-2 flex items-center gap-1">
                <Bug className="w-4 h-4" /> Probable Cause
              </h5>
              <ul className="space-y-1 text-xs text-slate-300">
                {result.possibleCauses?.map((c: string, i: number) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h5 className="text-xs font-bold uppercase text-emerald-400 mb-2 flex items-center gap-1">
                <Pill className="w-4 h-4" /> Recommended Treatment
              </h5>
              {result.chemicalTreatment?.[0] && (
                <div className="text-xs text-slate-200">
                  <p className="font-bold">{result.chemicalTreatment[0].product}</p>
                  <p className="text-emerald-400 text-[11px]">Dosage: {result.chemicalTreatment[0].dosage}</p>
                </div>
              )}
              {result.organicTreatment?.[0] && (
                <div className="mt-2 text-xs text-slate-300 border-t border-slate-800 pt-1.5">
                  <p className="font-bold text-white">Organic: {result.organicTreatment[0].method}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            ⚠️ <strong>Safety Disclaimer:</strong> {result.disclaimer}
          </div>
        </div>
      )}

    </div>
  )
}
