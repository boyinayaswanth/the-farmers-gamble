import React, { useState } from 'react'
import Layout from '../components/Layout'
import DiseaseScanner from '../components/DiseaseScanner'
import SymptomWizard from '../components/SymptomWizard'
import { Bug, Camera, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react'

export default function PlantDoctorPage() {
  const [activeTab, setActiveTab] = useState<'IMAGE' | 'SYMPTOMS'>('IMAGE')

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
              AI Pathology Diagnostic
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              AI Plant Doctor: Crop Disease Diagnostic
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Identify plant diseases through leaf image Computer Vision or interactive symptom diagnostic questionnaires.
            </p>
          </div>

          {/* Diagnostic Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('IMAGE')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'IMAGE'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>1. Leaf Photo Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('SYMPTOMS')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'SYMPTOMS'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>2. Symptom Diagnostic Wizard</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'IMAGE' ? (
          <DiseaseScanner />
        ) : (
          <SymptomWizard />
        )}

      </div>
    </Layout>
  )
}
