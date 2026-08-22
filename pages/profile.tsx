import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { 
  User, 
  Sprout, 
  FlaskConical, 
  Droplets, 
  DollarSign, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  MapPin,
  Layers
} from 'lucide-react'

export default function FarmerProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState({
    name: 'Yaswanth',
    mobile: '+91 8555864859',
    location: 'Anantapur, Andhra Pradesh',
    village: 'Kalyandurg',
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    landSize: 3.0,
    landUnit: 'Acres',
    soilType: 'Red Sandy Loam',
    soilPh: 6.5,
    nitrogen: 210,
    phosphorus: 18,
    potassium: 140,
    waterSource: 'Borewell + Rainfed',
    irrigation: true,
    irrigationType: 'Drip Irrigation',
    currentCrop: 'Groundnut',
    previousCrops: 'Paddy, Maize',
    experienceYears: 12,
    preferredCrops: 'Groundnut, Cotton, Chilli',
    budget: 45000,
  })

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/farmer/profile')
        const data = await res.json()
        if (data.ok && data.profile) {
          setForm(prev => ({
            ...prev,
            ...data.profile,
            name: data.user?.name || prev.name,
            mobile: data.user?.mobile || prev.mobile
          }))
        }
      } catch (e) {
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSavedSuccess(false)
    try {
      const res = await fetch('/api/farmer/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 3000)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  function loadSampleRavi() {
    setForm({
      name: 'Ravi Kumar',
      mobile: '+91 98765 43210',
      location: 'Anantapur, Andhra Pradesh',
      village: 'Kalyandurg',
      district: 'Anantapur',
      state: 'Andhra Pradesh',
      landSize: 3.0,
      landUnit: 'Acres',
      soilType: 'Red Sandy Loam',
      soilPh: 6.5,
      nitrogen: 210,
      phosphorus: 18,
      potassium: 140,
      waterSource: 'Borewell + Rainfed',
      irrigation: true,
      irrigationType: 'Drip Irrigation',
      currentCrop: 'Groundnut',
      previousCrops: 'Paddy, Maize',
      experienceYears: 12,
      preferredCrops: 'Groundnut, Cotton, Chilli',
      budget: 45000,
    })
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Personalized Agronomic Profile
            </span>
            <h2 className="font-heading font-black text-2xl text-white mt-1">
              Farmer & Farm Intelligence Profile
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              The AI decision engine personalizes all crop, fertilizer, and price advisories using these parameters.
            </p>
          </div>

          <button
            type="button"
            onClick={loadSampleRavi}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors self-start"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Load Sample Farmer (Ravi Kumar)</span>
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Farmer & Location */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" />
              1. Basic Farmer Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Farmer Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Verified Mobile Number</label>
                <input
                  type="text"
                  value={form.mobile}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Farming Experience (Years)</label>
                <input
                  type="number"
                  value={form.experienceYears}
                  onChange={e => setForm({ ...form, experienceYears: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Village / Mandal</label>
                <input
                  type="text"
                  value={form.village}
                  onChange={e => setForm({ ...form, village: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">District</label>
                <input
                  type="text"
                  value={form.district}
                  onChange={e => setForm({ ...form, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">State</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={e => setForm({ ...form, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Land & Soil Parameters */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-teal-400" />
              2. Land & Soil Health Metrics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Land Size</label>
                <input
                  type="number"
                  step="0.5"
                  value={form.landSize}
                  onChange={e => setForm({ ...form, landSize: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Land Unit</label>
                <select
                  value={form.landUnit}
                  onChange={e => setForm({ ...form, landUnit: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                >
                  <option value="Acres">Acres</option>
                  <option value="Guntas">Guntas</option>
                  <option value="Bigha">Bigha</option>
                  <option value="Hectares">Hectares</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Soil Type</label>
                <select
                  value={form.soilType}
                  onChange={e => setForm({ ...form, soilType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                >
                  <option value="Red Sandy Loam">Red Sandy Loam (ఎర్ర నేల)</option>
                  <option value="Black Cotton Soil">Black Cotton Soil (నల్లరేగడి)</option>
                  <option value="Clayey Loam">Clayey Loam (బంకమట్టి నేల)</option>
                  <option value="Alluvial Soil">Alluvial Soil (ఒండ్రు నేల)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Soil pH: {form.soilPh}</label>
                <input
                  type="range"
                  min="5.0"
                  max="8.5"
                  step="0.1"
                  value={form.soilPh}
                  onChange={e => setForm({ ...form, soilPh: Number(e.target.value) })}
                  className="w-full accent-emerald-500 mt-2"
                />
              </div>

              {/* NPK Inputs */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nitrogen (N) kg/ha</label>
                <input
                  type="number"
                  value={form.nitrogen}
                  onChange={e => setForm({ ...form, nitrogen: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phosphorus (P) kg/ha</label>
                <input
                  type="number"
                  value={form.phosphorus}
                  onChange={e => setForm({ ...form, phosphorus: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Potassium (K) kg/ha</label>
                <input
                  type="number"
                  value={form.potassium}
                  onChange={e => setForm({ ...form, potassium: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Approx. Budget (INR)</label>
                <input
                  type="number"
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Crops & Water Resources */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-400" />
              3. Water Source & Crop History
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Water Source</label>
                <input
                  type="text"
                  value={form.waterSource}
                  onChange={e => setForm({ ...form, waterSource: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Irrigation Type</label>
                <select
                  value={form.irrigationType}
                  onChange={e => setForm({ ...form, irrigationType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                >
                  <option value="Drip Irrigation">Drip Irrigation (డ్రిప్)</option>
                  <option value="Sprinkler Irrigation">Sprinkler Irrigation (స్ప్రింక్లర్)</option>
                  <option value="Flood / Canal">Flood / Canal (కాలువ)</option>
                  <option value="Rainfed Only">Rainfed Only (వర్షాధారం)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current Active Crop</label>
                <input
                  type="text"
                  value={form.currentCrop}
                  onChange={e => setForm({ ...form, currentCrop: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Previous Crops Rotated</label>
                <input
                  type="text"
                  value={form.previousCrops}
                  onChange={e => setForm({ ...form, previousCrops: e.target.value })}
                  placeholder="e.g. Paddy, Maize, Cotton"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Profile changes saved & synced to AI engines!
              </span>
            )}
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-glow-green active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Profile...' : 'Save & Update AI Profile'}</span>
            </button>
          </div>

        </form>

      </div>
    </Layout>
  )
}
