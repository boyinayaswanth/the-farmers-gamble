export interface WeatherDayForecast {
  dayName: string
  date: string
  tempMax: number
  tempMin: number
  rainProbabilityPercent: number
  rainMm: number
  condition: string
  icon: 'sun' | 'cloud-rain' | 'cloud' | 'cloud-lightning' | 'cloud-sun'
  windSpeedKmh: number
  advisory: string
}

export interface FarmerWeatherOverview {
  location: string
  district: string
  state: string
  currentTemp: number
  feelsLike: number
  humidityPercent: number
  windSpeedKmh: number
  rainProbabilityPercent: number
  condition: string
  weatherAlert?: {
    severity: 'WARNING' | 'ALERT' | 'ADVISORY'
    title: string
    message: string
    action: string
  } | null
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE'
  forecast5Days: WeatherDayForecast[]
  isDemo: boolean
}

/**
 * Weather & Agro-Meteorological Risk Service
 */
export async function getWeatherData(location: string = 'Anantapur, Andhra Pradesh'): Promise<FarmerWeatherOverview> {
  const apiKey = process.env.WEATHER_API_KEY
  const provider = process.env.WEATHER_PROVIDER || 'demo'

  // If real OpenWeather / WeatherAPI key is supplied, query live
  if (apiKey && apiKey !== 'your_api_key_here') {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`)
      if (res.ok) {
        const data = await res.json()
        // parse and return live data
      }
    } catch (e) {
      console.warn('[Live Weather Query Failed, using Agronomic Simulation]', e)
    }
  }

  // Realistic Agronomic Meteorological Simulation for Andhra Pradesh / Deccan Plateau
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = new Date()

  const forecast5Days: WeatherDayForecast[] = [
    {
      dayName: 'Today',
      date: today.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      tempMax: 33,
      tempMin: 22,
      rainProbabilityPercent: 20,
      rainMm: 0,
      condition: 'Partly Cloudy & Warm',
      icon: 'cloud-sun',
      windSpeedKmh: 14,
      advisory: 'Good weather for harvesting and weed management.'
    },
    {
      dayName: 'Tomorrow',
      date: new Date(today.getTime() + 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      tempMax: 29,
      tempMin: 21,
      rainProbabilityPercent: 85,
      rainMm: 42,
      condition: '⛈️ Moderate to Heavy Rain',
      icon: 'cloud-lightning',
      windSpeedKmh: 24,
      advisory: 'Urgent: Ensure field drainage furrows are cleared to prevent water stagnation around Groundnut roots.'
    },
    {
      dayName: days[(today.getDay() + 2) % 7],
      date: new Date(today.getTime() + 86400000 * 2).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      tempMax: 28,
      tempMin: 20,
      rainProbabilityPercent: 65,
      rainMm: 18,
      condition: 'Scattered Showers',
      icon: 'cloud-rain',
      windSpeedKmh: 18,
      advisory: 'Avoid foliar pesticide or chemical fertilizer spraying as rain will wash off chemicals.'
    },
    {
      dayName: days[(today.getDay() + 3) % 7],
      date: new Date(today.getTime() + 86400000 * 3).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      tempMax: 31,
      tempMin: 22,
      rainProbabilityPercent: 15,
      rainMm: 0,
      condition: 'Clearing Skies',
      icon: 'cloud-sun',
      windSpeedKmh: 12,
      advisory: 'Inspect crop canopy for fungal leaf spot symptoms post-rain.'
    },
    {
      dayName: days[(today.getDay() + 4) % 7],
      date: new Date(today.getTime() + 86400000 * 4).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      tempMax: 34,
      tempMin: 23,
      rainProbabilityPercent: 10,
      rainMm: 0,
      condition: 'Sunny & Dry',
      icon: 'sun',
      windSpeedKmh: 10,
      advisory: 'Optimal window for intercultural operations and gypsum top-dressing.'
    }
  ]

  return {
    location: 'Anantapur District, Andhra Pradesh',
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    currentTemp: 32,
    feelsLike: 35,
    humidityPercent: 74,
    windSpeedKmh: 16,
    rainProbabilityPercent: 85, // Tomorrow's alert
    condition: 'Partly Cloudy (Storm Approaching)',
    riskLevel: 'HIGH',
    weatherAlert: {
      severity: 'WARNING',
      title: '⛈️ Heavy Rain & Thunderstorm Alert (42mm)',
      message: 'A localized low-pressure trough is expected to bring 42mm precipitation across Anantapur within 24-36 hours.',
      action: 'Check drainage channels in your 3-acre Groundnut field to prevent peg rot and root asphyxiation.'
    },
    forecast5Days,
    isDemo: true
  }
}
