import React, { useState, useEffect } from 'react'
import { 
  CloudRain, 
  Sun, 
  CloudLightning, 
  CloudSun, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  Calendar,
  ShieldAlert
} from 'lucide-react'

export default function WeatherWidget({ location = 'Anantapur, Andhra Pradesh' }: { location?: string }) {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/farmer/weather?location=${encodeURIComponent(location)}`)
        const data = await res.json()
        if (data.ok) setWeather(data.weather)
      } catch (e) {
      } finally {
        setLoading(false)
      }
    }
    load()

    const handleSim = () => load()
    window.addEventListener('tfg_sim_event', handleSim)
    return () => window.removeEventListener('tfg_sim_event', handleSim)
  }, [location])

  if (loading || !weather) {
    return (
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 animate-pulse text-xs text-slate-400">
        Loading agricultural weather forecasts...
      </div>
    )
  }

  const hasAlert = Boolean(weather.weatherAlert)

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Agro-Meteorology
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              DEMO WEATHER ENGINE
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-white mt-1">
            {weather.location}
          </h3>
        </div>

        {/* Current Temp and condition */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-heading font-black text-2xl text-white">
              {weather.currentTemp}°C
            </div>
            <p className="text-xs text-slate-400">{weather.condition}</p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Rain Probability</p>
            <p className="font-heading font-bold text-sm text-cyan-300">
              {weather.rainProbabilityPercent}%
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Humidity</p>
            <p className="font-heading font-bold text-sm text-blue-300">
              {weather.humidityPercent}%
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-700/40 text-slate-300 flex items-center justify-center">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Wind Speed</p>
            <p className="font-heading font-bold text-sm text-slate-200">
              {weather.windSpeedKmh} km/h
            </p>
          </div>
        </div>
      </div>

      {/* Weather Storm Alert Banner */}
      {hasAlert && (
        <div className="mt-4 p-4 rounded-xl bg-cyan-950/60 border-2 border-cyan-500/50 shadow-lg relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 shrink-0">
              <CloudLightning className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-sm text-cyan-200">
                  {weather.weatherAlert.title}
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/30 text-cyan-200 font-bold uppercase">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-cyan-100/90 mt-1">
                {weather.weatherAlert.message}
              </p>
              <div className="mt-2 p-2 rounded-lg bg-slate-950/70 border border-cyan-500/30 text-xs text-emerald-300 font-medium">
                💡 <strong>Advisor Action:</strong> {weather.weatherAlert.action}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5-Day Forecast Grid */}
      <div className="mt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          5-Day Agricultural Weather Forecast
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {weather.forecast5Days?.map((day: any, idx: number) => {
            const isStormy = day.rainProbabilityPercent >= 70
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                  isStormy
                    ? 'bg-cyan-950/40 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span>{day.dayName}</span>
                    <span className="text-[10px] text-slate-500 font-normal">{day.date}</span>
                  </div>

                  <div className="my-2 flex items-center gap-2">
                    {day.icon === 'cloud-lightning' ? (
                      <CloudLightning className="w-5 h-5 text-cyan-400" />
                    ) : day.icon === 'cloud-rain' ? (
                      <CloudRain className="w-5 h-5 text-blue-400" />
                    ) : (
                      <CloudSun className="w-5 h-5 text-amber-400" />
                    )}
                    <div>
                      <span className="font-heading font-black text-sm text-white">
                        {day.tempMax}°
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        {day.tempMin}°
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold text-cyan-300">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    <span>{day.rainProbabilityPercent}% Rain ({day.rainMm}mm)</span>
                  </div>
                </div>

                <p className="mt-2 text-[10px] text-slate-400 line-clamp-2 border-t border-slate-800/80 pt-1.5 italic">
                  {day.advisory}
                </p>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
