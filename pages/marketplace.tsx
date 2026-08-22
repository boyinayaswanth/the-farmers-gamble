import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import MaskedCallModal from '../components/MaskedCallModal'
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Tag, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck,
  Send,
  ExternalLink
} from 'lucide-react'

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'BROWSE' | 'LIST' | 'OFFERS'>('BROWSE')
  const [products, setProducts] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Smart Selling Pre-Fill Form State
  const [listForm, setListForm] = useState({
    crop: 'Groundnut (K-6 Variety)',
    variety: 'Kadiri-6 (High Oil 48%)',
    quantity: 800,
    unit: 'kg',
    price: 85.0,
    location: 'Kalyandurg, Anantapur, AP',
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    harvestDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    description: 'Sun-dried high pod density Groundnut. Machine cleaned and graded.',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80',
  })
  const [submittingList, setSubmittingList] = useState(false)
  const [listSuccess, setListSuccess] = useState(false)

  // Purchase Request Modal State
  const [selectedProductForBid, setSelectedProductForBid] = useState<any>(null)
  const [bidQuantity, setBidQuantity] = useState(500)
  const [bidPrice, setBidPrice] = useState(84.0)
  const [bidMessage, setBidMessage] = useState('Ready for farmgate pickup with digital payment.')
  const [submittingBid, setSubmittingBid] = useState(false)
  const [bidSuccess, setBidSuccess] = useState(false)

  // Masked Call Modal State
  const [maskedCallOpen, setMaskedCallOpen] = useState(false)
  const [maskedCallTarget, setMaskedCallTarget] = useState<{ name: string; role: 'Farmer' | 'Buyer'; crop: string }>({
    name: 'Ravi Kumar',
    role: 'Farmer',
    crop: 'Groundnut'
  })

  async function loadData() {
    setLoading(true)
    try {
      const [prodRes, reqRes] = await Promise.all([
        fetch(`/api/marketplace/products?crop=${selectedCropFilter}`),
        fetch('/api/marketplace/request')
      ])
      const [prodData, reqData] = await Promise.all([prodRes.json(), reqRes.json()])
      if (prodData.ok) setProducts(prodData.products)
      if (reqData.ok) setRequests(reqData.requests)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [selectedCropFilter])

  async function handleCreateListing(e: React.FormEvent) {
    e.preventDefault()
    setSubmittingList(true)
    setListSuccess(false)
    try {
      const res = await fetch('/api/marketplace/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listForm)
      })
      const data = await res.json()
      if (res.ok) {
        setListSuccess(true)
        loadData()
        setTimeout(() => {
          setListSuccess(false)
          setActiveTab('BROWSE')
        }, 1500)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSubmittingList(false)
    }
  }

  async function handleSendPurchaseRequest(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedProductForBid) return
    setSubmittingBid(true)
    setBidSuccess(false)

    try {
      const res = await fetch('/api/marketplace/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProductForBid.id,
          farmerId: selectedProductForBid.farmerId,
          productTitle: selectedProductForBid.crop,
          quantity: bidQuantity,
          offeredPrice: bidPrice,
          message: bidMessage,
        })
      })
      const data = await res.json()
      if (res.ok) {
        setBidSuccess(true)
        loadData()
        setTimeout(() => {
          setBidSuccess(false)
          setSelectedProductForBid(null)
          setActiveTab('OFFERS')
        }, 1500)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSubmittingBid(false)
    }
  }

  async function handleUpdateRequestStatus(requestId: string, status: string) {
    try {
      await fetch('/api/marketplace/request', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status })
      })
      loadData()
    } catch (e) {
      console.error(e)
    }
  }

  function openMaskedCall(targetName: string, targetRole: 'Farmer' | 'Buyer', crop: string) {
    setMaskedCallTarget({ name: targetName, role: targetRole, crop })
    setMaskedCallOpen(true)
  }

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                Direct Farm-to-Buyer Portal
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                Verified Traders
              </span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              Farm Produce Marketplace & Smart Selling
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Farmers list harvests with 1-click AI pre-fill; buyers submit digital purchase bids; communicate through protected masked phone calls.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('BROWSE')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'BROWSE' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Browse Produce
            </button>
            <button
              onClick={() => setActiveTab('LIST')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'LIST' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Smart Sell Produce</span>
            </button>
            <button
              onClick={() => setActiveTab('OFFERS')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'OFFERS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Purchase Offers ({requests.length})
            </button>
          </div>
        </div>

        {/* TAB 1: BROWSE MARKETPLACE */}
        {activeTab === 'BROWSE' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 relative">
                <input
                  type="text"
                  placeholder="Search by crop, variety, or farmer location..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <select
                  value={selectedCropFilter}
                  onChange={e => setSelectedCropFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                >
                  <option value="ALL">All Crop Categories</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Red Gram">Red Gram (Tur Dal)</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Red Chilli">Red Chilli</option>
                  <option value="Maize">Maize</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(p => searchQuery === '' || p.crop.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((prod) => (
                  <div
                    key={prod.id}
                    className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 glass-card-hover overflow-hidden shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-44 w-full bg-slate-950">
                        <img
                          src={prod.imageUrl}
                          alt={prod.crop}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                          {prod.unit ? `${prod.quantity} ${prod.unit} Available` : `${prod.quantity} kg`}
                        </div>
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-emerald-600 font-heading font-black text-sm text-white shadow-lg">
                          ₹{prod.price}/{prod.unit || 'kg'}
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="font-heading font-bold text-lg text-white">
                            {prod.crop}
                          </h3>
                          <p className="text-xs text-emerald-400 font-semibold">
                            {prod.variety || 'Grade-A Harvest'}
                          </p>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2">
                          {prod.description}
                        </p>

                        <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate">{prod.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>Farmer: <strong className="text-slate-200">{prod.farmerName || 'Ravi Kumar'}</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openMaskedCall(prod.farmerName || 'Ravi Kumar', 'Farmer', prod.crop)}
                        className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Masked Call</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProductForBid(prod)
                          setBidQuantity(prod.quantity)
                          setBidPrice(prod.price)
                        }}
                        className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-glow-green transition-all"
                      >
                        <span>Send Offer</span>
                      </button>
                    </div>

                  </div>
                ))}
            </div>

          </div>
        )}

        {/* TAB 2: SMART SELLING LIST PRODUCE */}
        {activeTab === 'LIST' && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Smart Selling Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="font-heading font-bold text-xs uppercase tracking-wider text-emerald-400">
                    Smart Selling Assistant
                  </span>
                </div>
                <p className="text-xs text-slate-200">
                  Pre-filled using your <strong>3-acre Groundnut farm</strong> in Anantapur. Demand is currently <strong>HIGH (+₹3.50/kg)</strong> in local APMC mandis.
                </p>
              </div>

              <form onSubmit={handleCreateListing} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Crop Name</label>
                    <input
                      type="text"
                      value={listForm.crop}
                      onChange={e => setListForm({ ...listForm, crop: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Variety / Grade</label>
                    <input
                      type="text"
                      value={listForm.variety}
                      onChange={e => setListForm({ ...listForm, variety: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Available Quantity</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={listForm.quantity}
                        onChange={e => setListForm({ ...listForm, quantity: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                        required
                      />
                      <select
                        value={listForm.unit}
                        onChange={e => setListForm({ ...listForm, unit: e.target.value })}
                        className="px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                      >
                        <option value="kg">kg</option>
                        <option value="Quintal">Quintal</option>
                        <option value="Ton">Ton</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Expected Price per {listForm.unit} (INR)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={listForm.price}
                      onChange={e => setListForm({ ...listForm, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Farm Location / Village</label>
                    <input
                      type="text"
                      value={listForm.location}
                      onChange={e => setListForm({ ...listForm, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Expected Harvest / Ready Date</label>
                    <input
                      type="date"
                      value={listForm.harvestDate}
                      onChange={e => setListForm({ ...listForm, harvestDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Quality Description / Certification</label>
                  <textarea
                    rows={3}
                    value={listForm.description}
                    onChange={e => setListForm({ ...listForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingList}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-glow-green active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{submittingList ? 'Publishing Listing...' : listSuccess ? 'Listing Published!' : 'Publish Farm Produce to Marketplace'}</span>
                </button>

              </form>

            </div>
          </div>
        )}

        {/* TAB 3: PURCHASE OFFERS */}
        {activeTab === 'OFFERS' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <h3 className="font-heading font-bold text-base text-white">
              Incoming Purchase Requests & Bid Negotiations
            </h3>

            {requests.length === 0 ? (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                No purchase requests currently in negotiation.
              </div>
            ) : (
              requests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-sm text-white">
                        {req.buyerName}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        req.status === 'ACCEPTED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : req.status === 'REJECTED'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <p className="text-slate-300">
                      Product: <strong>{req.productTitle}</strong> • Offered: <strong className="text-emerald-400">₹{req.offeredPrice}/kg</strong> for <strong>{req.quantity} kg</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      "{req.message}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openMaskedCall(req.buyerName || 'Buyer', 'Buyer', req.productTitle)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Masked Call</span>
                    </button>

                    {req.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleUpdateRequestStatus(req.id, 'ACCEPTED')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
                        >
                          Accept Offer
                        </button>
                        <button
                          onClick={() => handleUpdateRequestStatus(req.id, 'REJECTED')}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white text-xs font-bold"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal: Buyer Send Offer */}
        {selectedProductForBid && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 shadow-2xl space-y-4">
              <h3 className="font-heading font-bold text-base text-white">
                Submit Purchase Offer for {selectedProductForBid.crop}
              </h3>
              <p className="text-xs text-slate-400">
                Farmer: {selectedProductForBid.farmerName} • Listed Price: ₹{selectedProductForBid.price}/kg
              </p>

              <form onSubmit={handleSendPurchaseRequest} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    value={bidQuantity}
                    onChange={e => setBidQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Offered Price per kg (INR)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={bidPrice}
                    onChange={e => setBidPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message to Farmer</label>
                  <textarea
                    rows={2}
                    value={bidMessage}
                    onChange={e => setBidMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProductForBid(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingBid}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-glow-green"
                  >
                    {submittingBid ? 'Sending...' : 'Send Offer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Masked Call Privacy Bridge Modal */}
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
