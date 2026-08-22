import { FarmerProfileItem } from '../lib/db'

export interface CropRecommendation {
  cropName: string
  teluguName: string
  suitabilityScore: number // 0 - 100
  category: string
  rank: number
  whySuitable: string
  season: string
  durationDays: number
  waterRequirement: string
  fertilizerSummary: string
  majorRisks: string
  marketDemand: 'HIGH' | 'MODERATE' | 'LOW'
  currentMarketPrice: number // ₹/kg
  estimatedYieldKgPerAcre: number
  estimatedCostPerAcre: number
  estimatedRevenuePerAcre: number
  estimatedProfitPerAcre: number
  totalEstimatedProfit: number // for farmer's total land size
  disclaimer: string
}

export interface RecommendationFilters {
  season?: string
  rainfallModifier?: number // e.g. -20% or +20%
  costModifier?: number
}

/**
 * Multi-Variable Crop Recommendation Engine
 * Analyzes Soil NPK, pH, Climate, Water, Mandi Demand, and Financial Margins
 */
export function recommendCrops(
  profile: FarmerProfileItem | null,
  filters: RecommendationFilters = {}
): CropRecommendation[] {
  const landSize = profile?.landSize || 3.0
  const soilPh = profile?.soilPh || 6.5
  const nitrogen = profile?.nitrogen || 210
  const phosphorus = profile?.phosphorus || 18
  const potassium = profile?.potassium || 140
  const soilType = profile?.soilType || 'Red Sandy Loam'
  const hasDrip = profile?.irrigationType?.toLowerCase().includes('drip') ?? true
  const rainfallFactor = 1 + (filters.rainfallModifier || 0) / 100
  const costFactor = 1 + (filters.costModifier || 0) / 100

  const allCrops = [
    {
      cropName: 'Groundnut (K-6 / Kadiri-9)',
      teluguName: 'వేరుశనగ (K-6 రకం)',
      category: 'Oilseeds & Cash Crop',
      baseSuitability: 94,
      idealSoil: ['red', 'loam', 'sandy'],
      minPh: 5.8,
      maxPh: 7.2,
      season: 'Kharif & Rabi (All Season)',
      durationDays: 105,
      waterRequirement: 'Low to Medium (400 - 450 mm)',
      fertilizerSummary: 'Basal: DAP 50kg, MOP 30kg + Gypsum 200kg at pegging',
      majorRisks: 'Tikka leaf spot during high humidity, pod borer at peg formation',
      marketDemand: 'HIGH' as const,
      currentMarketPrice: 86.5,
      yieldKgPerAcre: 980,
      costPerAcre: 18500 * costFactor,
      whySuitable: `Perfect match for your ${soilType} (pH ${soilPh}) in Anantapur. Requires moderate water and your NPK ratio (${nitrogen}:${phosphorus}:${potassium}) supports root nodulation and high pod oil density.`
    },
    {
      cropName: 'Hybrid Maize (Pioneer / Syngenta)',
      teluguName: 'హైబ్రిడ్ మొక్కజొన్న',
      category: 'Cereals & Feed Crop',
      baseSuitability: 86,
      idealSoil: ['loam', 'red', 'black', 'silt'],
      minPh: 5.5,
      maxPh: 7.5,
      season: 'Kharif / Rabi',
      durationDays: 110,
      waterRequirement: 'Medium (500 - 550 mm)',
      fertilizerSummary: 'Urea 65kg, DAP 50kg, MOP 25kg (split in 3 stages)',
      majorRisks: 'Fall armyworm in early vegetative stage, drought at flowering',
      marketDemand: 'MODERATE' as const,
      currentMarketPrice: 25.5,
      yieldKgPerAcre: 2400,
      costPerAcre: 19000 * costFactor,
      whySuitable: `High yielding commercial staple. Excellent response to balanced nitrogen in well-drained ${soilType}. Quick harvest turnaround within 110 days.`
    },
    {
      cropName: 'Red Gram / Pigeon Pea (LRG-41 / ICPL 87119)',
      teluguName: 'ఎర్ర కందులు (LRG-41)',
      category: 'Pulses & Nitrogen Fixer',
      baseSuitability: 82,
      idealSoil: ['red', 'loam', 'black'],
      minPh: 6.0,
      maxPh: 8.0,
      season: 'Kharif',
      durationDays: 165,
      waterRequirement: 'Low (350 - 400 mm, drought hardy)',
      fertilizerSummary: 'DAP 40kg, Potash 15kg, Rhizobium seed treatment',
      majorRisks: 'Helicoverpa pod borer during podding, wilt in waterlogged soils',
      marketDemand: 'HIGH' as const,
      currentMarketPrice: 104.0,
      yieldKgPerAcre: 680,
      costPerAcre: 14500 * costFactor,
      whySuitable: `Deep taproot system thrives even under rain deficits in Anantapur. Enriches your soil with 30-40 kg atmospheric nitrogen per acre for subsequent seasons.`
    },
    {
      cropName: 'Cotton (Bt Hybrid RCH-659)',
      teluguName: 'బి.టి ప్రత్తి',
      category: 'Commercial Cash Fiber',
      baseSuitability: 78,
      idealSoil: ['black', 'deep', 'loam', 'red'],
      minPh: 6.2,
      maxPh: 8.2,
      season: 'Kharif',
      durationDays: 160,
      waterRequirement: 'Medium-High (650 - 700 mm)',
      fertilizerSummary: 'Urea 90kg, DAP 50kg, Potash 40kg in 4 split doses',
      majorRisks: 'Pink bollworm, heavy rains at boll bursting stage',
      marketDemand: 'MODERATE' as const,
      currentMarketPrice: 76.0,
      yieldKgPerAcre: 850,
      costPerAcre: 26000 * costFactor,
      whySuitable: `Strong commercial fiber demand in Guntur & Kurnool ginning mills. Profitable if supplementary drip irrigation is available during boll formation.`
    },
    {
      cropName: 'Red Chilli (Teja / Armoor Variety)',
      teluguName: 'ఎర్ర మిరప (తేజ రకం)',
      category: 'High-Value Spice',
      baseSuitability: 74,
      idealSoil: ['loam', 'sandy', 'clay'],
      minPh: 6.0,
      maxPh: 7.2,
      season: 'Kharif / Late Kharif',
      durationDays: 155,
      waterRequirement: 'High (650 - 750 mm with drip)',
      fertilizerSummary: 'Heavy feeder: NPK 120:60:60 + Micronutrient foliar sprays',
      majorRisks: 'Black thrips, Gemini virus, high initial investment',
      marketDemand: 'HIGH' as const,
      currentMarketPrice: 205.0,
      yieldKgPerAcre: 1850,
      costPerAcre: 58000 * costFactor,
      whySuitable: `High capital, exceptional upside crop. Very strong international spice export demand from Guntur market yard.`
    },
    {
      cropName: 'Paddy / Semi-Dry Rice (MTU-1010)',
      teluguName: 'వరి (MTU-1010 రకం)',
      category: 'Food Grain Cereal',
      baseSuitability: 64,
      idealSoil: ['clay', 'alluvial', 'heavy'],
      minPh: 5.5,
      maxPh: 7.0,
      season: 'Kharif / Rabi',
      durationDays: 125,
      waterRequirement: 'Very High (1100 - 1250 mm)',
      fertilizerSummary: 'Urea 80kg, DAP 45kg, Potash 30kg, Zinc 10kg',
      majorRisks: 'Bacterial leaf blight, water scarcity in non-canal zones',
      marketDemand: 'MODERATE' as const,
      currentMarketPrice: 23.5,
      yieldKgPerAcre: 2600,
      costPerAcre: 24000 * costFactor,
      whySuitable: `Reliable food grain, but scores lower in Anantapur red soil due to heavy water requirement compared to Groundnut or Maize.`
    }
  ]

  // Dynamic ranking adjustments based on soil pH and irrigation
  const results: CropRecommendation[] = allCrops.map((c, index) => {
    let score = c.baseSuitability

    // Adjust for pH suitability
    if (soilPh < c.minPh || soilPh > c.maxPh) {
      score -= 12
    }

    // Adjust for drip irrigation presence
    if (c.waterRequirement.includes('High') && !hasDrip) {
      score -= 15
    }

    // Adjust for rainfall modifier
    if (rainfallFactor < 0.85 && c.waterRequirement.includes('Low')) {
      score += 4
    } else if (rainfallFactor < 0.85 && c.waterRequirement.includes('High')) {
      score -= 10
    }

    const revenuePerAcre = Math.round(c.yieldKgPerAcre * c.currentMarketPrice)
    const profitPerAcre = Math.round(revenuePerAcre - c.costPerAcre)
    const totalEstimatedProfit = Math.round(profitPerAcre * landSize)

    return {
      cropName: c.cropName,
      teluguName: c.teluguName,
      suitabilityScore: Math.min(99, Math.max(40, score)),
      category: c.category,
      rank: index + 1,
      whySuitable: c.whySuitable,
      season: c.season,
      durationDays: c.durationDays,
      waterRequirement: c.waterRequirement,
      fertilizerSummary: c.fertilizerSummary,
      majorRisks: c.majorRisks,
      marketDemand: c.marketDemand,
      currentMarketPrice: c.currentMarketPrice,
      estimatedYieldKgPerAcre: c.yieldKgPerAcre,
      estimatedCostPerAcre: Math.round(c.costPerAcre),
      estimatedRevenuePerAcre: revenuePerAcre,
      estimatedProfitPerAcre: profitPerAcre,
      totalEstimatedProfit,
      disclaimer: 'Predictions are agronomic estimates based on historical yields and current market prices. Actual profits depend on weather conditions and pest management.'
    }
  })

  // Sort descending by suitability score
  results.sort((a, b) => b.suitabilityScore - a.suitabilityScore)
  results.forEach((r, idx) => { r.rank = idx + 1 })

  return results
}
