import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowUpRight, 
  SlidersHorizontal,
  Layers
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function MarketPage() {
  const [marketData, setMarketData] = useState<any[]>([])
  const [selectedCrop, setSelectedCrop] = useState('ALL')
  const [selectedDistrict, setSelectedDistrict] = useState('ALL')
  const [activeChartCrop, setActiveChartCrop] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function loadPrices() {
    setLoading(true)
    try {
      const res = await fetch(`/api/market/prices?crop=${selectedCrop}&district=${selectedDistrict}`)
      const data = await res.json()
      if (data.ok) {
        setMarketData(data.marketData)
        if (data.marketData.length > 0 && !activeChartCrop) {
          setActiveChartCrop(data.marketData[0])
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPrices()
  }, [selectedCrop, selectedDistrict])

  // Chart dataset configuration
  const chartData = activeChartCrop ? {
    labels: activeChartCrop.historicalPrices?.map((p: any) => p.date) || [],
    datasets: [
      {
        label: `${activeChartCrop.cropName} (₹/kg)`,
        data: activeChartCrop.historicalPrices?.map((p: any) => p.price) || [],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointRadius: 3,
      }
    ]
  } : null

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#94a3b8', font: { size: 11 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#fff',
        bodyColor: '#10b981',
        borderColor: '#334155',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 10 }, maxTicksLimit: 8 }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 10 } }
      }
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                APMC Mandi Intelligence
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                DEMO DATA FEED
              </span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              Market Price & Demand Intelligence
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live APMC mandi pricing, 30-day historical trend curves, and high-demand crop intelligence for South India mandis.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            Last Updated: <strong className="text-white">Today (APMC 11:30 AM Session)</strong>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Filter by Crop</label>
            <select
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
            >
              <option value="ALL">All Crops</option>
              <option value="Groundnut">Groundnut (వేరుశనగ)</option>
              <option value="Cotton">Cotton (ప్రత్తి)</option>
              <option value="Red Chilli">Red Chilli (మిరప)</option>
              <option value="Maize">Maize (మొక్కజొన్న)</option>
              <option value="Red Gram">Red Gram (కందులు)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Filter by Mandi District</label>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
            >
              <option value="ALL">All Districts / Mandis</option>
              <option value="Anantapur">Anantapur Mandi (AP)</option>
              <option value="Kurnool">Kurnool / Adoni Mandi (AP)</option>
              <option value="Guntur">Guntur APMC Yard (AP)</option>
              <option value="Khammam">Khammam Mandi (Telangana)</option>
              <option value="Vikarabad">Tandur Mandi (Telangana)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadPrices}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-bold transition-colors"
            >
              Refresh Mandi Rates
            </button>
          </div>
        </div>

        {/* 30-Day Historical Price Chart */}
        {activeChartCrop && chartData && (
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  30-Day Price Trend Analysis
                </span>
                <h3 className="font-heading font-black text-xl text-white mt-0.5">
                  {activeChartCrop.cropName} — {activeChartCrop.marketLocation}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Today's Modal Rate</span>
                  <strong className="font-heading font-black text-lg text-emerald-400">
                    ₹{activeChartCrop.modalPrice}/kg
                  </strong>
                </div>
                <div className="text-right border-l border-slate-800 pl-4">
                  <span className="text-slate-400 block text-[10px]">Demand Indicator</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[11px]">
                    {activeChartCrop.demandLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Canvas Chart Area */}
            <div className="h-64 w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Mandi Rates Table */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Regional APMC Mandi Rates & Demand Overview
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Crop Name</th>
                  <th className="p-3.5">Mandi / Yard</th>
                  <th className="p-3.5">Modal Price</th>
                  <th className="p-3.5">Price Range (Min-Max)</th>
                  <th className="p-3.5">Price Trend</th>
                  <th className="p-3.5">Demand Level</th>
                  <th className="p-3.5 text-right">Chart View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                {marketData.map((item, idx) => {
                  const isRising = item.priceTrend === 'Rising'
                  const isFalling = item.priceTrend === 'Falling'
                  const isSelected = activeChartCrop?.id === item.id

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-800/40 transition-colors ${isSelected ? 'bg-emerald-950/30' : ''}`}
                    >
                      <td className="p-3.5 font-bold text-white">
                        {item.cropName}
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {item.marketLocation}
                        <span className="block text-[10px] text-slate-500">{item.district}, {item.state}</span>
                      </td>
                      <td className="p-3.5 font-heading font-black text-sm text-emerald-400">
                        ₹{item.modalPrice}/kg
                      </td>
                      <td className="p-3.5 text-slate-400">
                        ₹{item.minPrice} - ₹{item.maxPrice}/kg
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center gap-1 font-bold ${
                          isRising ? 'text-emerald-400' : isFalling ? 'text-rose-400' : 'text-slate-400'
                        }`}>
                          {isRising && <TrendingUp className="w-3.5 h-3.5" />}
                          {isFalling && <TrendingDown className="w-3.5 h-3.5" />}
                          {!isRising && !isFalling && <Minus className="w-3.5 h-3.5" />}
                          {item.priceTrend}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold text-[10px] border border-slate-700">
                          {item.demandLevel}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setActiveChartCrop(item)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-[11px] font-semibold transition-colors"
                        >
                          View Trend
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  )
}
