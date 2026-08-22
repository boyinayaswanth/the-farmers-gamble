import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import MaskedCallModal from '../../components/MaskedCallModal'
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  Building2,
  Filter,
  ArrowRight
} from 'lucide-react'

export default function BuyerPortalPage() {
  const [products, setProducts] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [selectedCrop, setSelectedCrop] = useState('ALL')
  const [loading, setLoading] = useState(true)

  // Masked Call Modal State
  const [maskedCallOpen, setMaskedCallOpen] = useState(false)
  const [maskedCallTarget, setMaskedCallTarget] = useState<{ name: string; role: 'Farmer' | 'Buyer'; crop: string }>({
    name: 'Ravi Kumar',
    role: 'Farmer',
    crop: 'Groundnut'
  })

  useEffect(() => {
    async function load() {
      try {
        const [pRes, rRes] = await Promise.all([
          fetch(`/api/marketplace/products?crop=${selectedCrop}`),
          fetch('/api/marketplace/request?role=BUYER')
        ])
        const [pData, rData] = await Promise.all([pRes.json(), rRes.json()])
        if (pData.ok) setProducts(pData.products)
        if (rData.ok) setRequests(rData.requests)
      } catch (e) {}
      finally { setLoading(false) }
    }
    load()
  }, [selectedCrop])

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Buyer Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border-2 border-indigo-500/40 p-6 sm:p-8 shadow-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
              Wholesale Sourcing Portal
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Role: BUYER
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Sri Venkateswara Agro Commodities
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Wholesale Mandi Trader & Processor • Guntur & Anantapur Terminal Yards (GST: 37AAAAA0000A1Z5)
              </p>
            </div>

            <Link
              href="/marketplace"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all self-start"
            >
              Browse Full Marketplace
            </Link>
          </div>
        </div>

        {/* 2-Column Grid: Active Farm Listings & My Sourcing Bids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 8 Cols: Verified Farmer Listings */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                Direct Farmgate Harvests Available for Procurement
              </h3>

              <select
                value={selectedCrop}
                onChange={e => setSelectedCrop(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
              >
                <option value="ALL">All Crops</option>
                <option value="Groundnut">Groundnut</option>
                <option value="Red Gram">Red Gram</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        {prod.quantity} {prod.unit || 'kg'} Available
                      </span>
                      <span className="font-heading font-black text-sm text-emerald-400">
                        ₹{prod.price}/{prod.unit || 'kg'}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-white">
                      {prod.crop}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {prod.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{prod.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>Farmer: <strong className="text-white">{prod.farmerName || 'Ravi Kumar'}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => {
                        setMaskedCallTarget({ name: prod.farmerName || 'Ravi Kumar', role: 'Farmer', crop: prod.crop })
                        setMaskedCallOpen(true)
                      }}
                      className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 border border-slate-700"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>Masked Call</span>
                    </button>

                    <Link
                      href="/marketplace"
                      className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <span>Send Bid</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 4 Cols: Active Procurement Bids */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
              <h3 className="font-heading font-bold text-sm text-white">
                My Sourcing Purchase Requests
              </h3>

              {requests.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">No active purchase requests sent yet.</p>
              ) : (
                <div className="space-y-3">
                  {requests.map((r: any) => (
                    <div key={r.id} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white truncate max-w-[140px]">{r.productTitle}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          {r.status}
                        </span>
                      </div>
                      <p className="text-slate-400">
                        Bid: <strong className="text-emerald-400">₹{r.offeredPrice}/kg</strong> for <strong>{r.quantity} kg</strong>
                      </p>
                      <p className="text-[11px] text-slate-500 italic">
                        "{r.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Masked Call Modal */}
        <MaskedCallModal
          isOpen={maskedCallOpen}
          onClose={() => setMaskedCallOpen(false)}
          targetName={maskedCallTarget.name}
          targetRole={maskedCallTarget.role}
          cropInfo={maskedCallTarget.crop}
        />

      </div>
    </Layout>
  )
}
