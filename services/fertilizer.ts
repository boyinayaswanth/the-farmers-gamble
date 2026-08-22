export interface FertilizerDoseItem {
  name: string
  npk: string
  dosePerAcreKg: number
  totalKg: number
  bagCount50kg: number
  pricePerBag: number
  totalCost: number
  stage: string
  method: string
  purpose: string
}

export interface FertilizerCalculationResult {
  crop: string
  landSize: number
  growthStage: string
  soilPh: number
  soilRating: {
    nitrogen: 'LOW' | 'MEDIUM' | 'OPTIMAL' | 'HIGH'
    phosphorus: 'LOW' | 'MEDIUM' | 'OPTIMAL' | 'HIGH'
    potassium: 'LOW' | 'MEDIUM' | 'OPTIMAL' | 'HIGH'
  }
  schedule: FertilizerDoseItem[]
  totalEstimatedCost: number
  organicAlternatives: {
    name: string
    quantity: string
    benefits: string
  }[]
  stageGuidance: string
  safetyDisclaimer: string
}

/**
 * Precision Fertilizer Intelligence Engine
 * Computes exact nutritional dosage tailored to Soil NPK deficiency and Crop Phenological Stages.
 */
export function calculateFertilizer(params: {
  crop: string
  landSize: number
  soilPh?: number
  nitrogen?: number
  phosphorus?: number
  potassium?: number
  growthStage?: string
  soilType?: string
}): FertilizerCalculationResult {
  const crop = params.crop || 'Groundnut'
  const land = Number(params.landSize) || 3.0
  const ph = Number(params.soilPh) || 6.5
  const n = Number(params.nitrogen) || 210
  const p = Number(params.phosphorus) || 18
  const k = Number(params.potassium) || 140
  const stage = params.growthStage || 'Basal (At Sowing)'

  const soilRating = {
    nitrogen: n < 200 ? ('LOW' as const) : n < 280 ? ('MEDIUM' as const) : ('OPTIMAL' as const),
    phosphorus: p < 15 ? ('LOW' as const) : p < 25 ? ('MEDIUM' as const) : ('OPTIMAL' as const),
    potassium: k < 120 ? ('LOW' as const) : k < 200 ? ('MEDIUM' as const) : ('OPTIMAL' as const),
  }

  // Multiplier adjustments based on soil test
  const nFactor = soilRating.nitrogen === 'LOW' ? 1.2 : 1.0
  const pFactor = soilRating.phosphorus === 'LOW' ? 1.25 : 1.0
  const kFactor = soilRating.potassium === 'LOW' ? 1.15 : 1.0

  let schedule: FertilizerDoseItem[] = []

  if (crop.toLowerCase().includes('groundnut')) {
    schedule = [
      {
        name: 'DAP (Di-Ammonium Phosphate)',
        npk: '18:46:0',
        dosePerAcreKg: Math.round(50 * pFactor),
        totalKg: Math.round(50 * pFactor * land),
        bagCount50kg: Math.ceil((50 * pFactor * land) / 50),
        pricePerBag: 1350,
        totalCost: Math.ceil((50 * pFactor * land) / 50) * 1350,
        stage: 'Basal (Sowing)',
        method: 'Band placement 5cm below seed furrow',
        purpose: 'Deep root development and initial phosphorus supply.'
      },
      {
        name: 'MOP (Muriate of Potash)',
        npk: '0:0:60',
        dosePerAcreKg: Math.round(30 * kFactor),
        totalKg: Math.round(30 * kFactor * land),
        bagCount50kg: Math.ceil((30 * kFactor * land) / 50),
        pricePerBag: 1700,
        totalCost: Math.ceil((30 * kFactor * land) / 50) * 1700,
        stage: 'Basal (Sowing)',
        method: 'Broadcast & incorporate into soil',
        purpose: 'Improves drought tolerance, stalk strength, and seed weight.'
      },
      {
        name: 'Neem-Coated Urea',
        npk: '46:0:0',
        dosePerAcreKg: Math.round(25 * nFactor),
        totalKg: Math.round(25 * nFactor * land),
        bagCount50kg: Math.ceil((25 * nFactor * land) / 50),
        pricePerBag: 270,
        totalCost: Math.ceil((25 * nFactor * land) / 50) * 270,
        stage: 'Vegetative (30-35 Days)',
        method: 'Side dressing after light hoeing/weeding',
        purpose: 'Vegetative canopy and leaf surface growth.'
      },
      {
        name: 'Agricultural Gypsum (Calcium Sulphate)',
        npk: 'Ca: 21%, S: 18%',
        dosePerAcreKg: 200,
        totalKg: 200 * land,
        bagCount50kg: Math.ceil((200 * land) / 50),
        pricePerBag: 220,
        totalCost: Math.ceil((200 * land) / 50) * 220,
        stage: 'Pegging / Flowering (40-45 Days)',
        method: 'Broadcast around root zone followed by earthing-up',
        purpose: 'Essential calcium for pod hardening, prevents hollow pods ("pops") and boosts oil content by 4%.'
      },
      {
        name: 'Zinc Sulphate (21% Zn)',
        npk: 'Micronutrient',
        dosePerAcreKg: 10,
        totalKg: 10 * land,
        bagCount50kg: Math.ceil((10 * land) / 25), // 25kg bag
        pricePerBag: 750,
        totalCost: Math.ceil((10 * land) / 25) * 750,
        stage: 'Basal (Sowing)',
        method: 'Soil application along with basal fertilizer',
        purpose: 'Prevents zinc chlorosis and supports enzymatic activity.'
      }
    ]
  } else if (crop.toLowerCase().includes('maize')) {
    schedule = [
      {
        name: 'DAP (Di-Ammonium Phosphate)',
        npk: '18:46:0',
        dosePerAcreKg: 50,
        totalKg: 50 * land,
        bagCount50kg: Math.ceil((50 * land) / 50),
        pricePerBag: 1350,
        totalCost: Math.ceil((50 * land) / 50) * 1350,
        stage: 'Basal (Sowing)',
        method: 'Basal placement in furrows',
        purpose: 'Early root establishment and seedling vigor.'
      },
      {
        name: 'Neem-Coated Urea (Split 1 & 2)',
        npk: '46:0:0',
        dosePerAcreKg: 70,
        totalKg: 70 * land,
        bagCount50kg: Math.ceil((70 * land) / 50),
        pricePerBag: 270,
        totalCost: Math.ceil((70 * land) / 50) * 270,
        stage: 'Knee-High (30d) & Tasseling (50d)',
        method: 'Top dressing during active growth',
        purpose: 'Rapid biomass expansion, cob size, and grain filling.'
      },
      {
        name: 'MOP (Muriate of Potash)',
        npk: '0:0:60',
        dosePerAcreKg: 30,
        totalKg: 30 * land,
        bagCount50kg: Math.ceil((30 * land) / 50),
        pricePerBag: 1700,
        totalCost: Math.ceil((30 * land) / 50) * 1700,
        stage: 'Basal (Sowing)',
        method: 'Soil incorporation',
        purpose: 'Stalk strength against lodging and moisture retention.'
      }
    ]
  } else {
    // Standard balanced recommendation
    schedule = [
      {
        name: 'NPK Complex (20:20:0:13)',
        npk: '20:20:0 + 13% Sulphur',
        dosePerAcreKg: 75,
        totalKg: 75 * land,
        bagCount50kg: Math.ceil((75 * land) / 50),
        pricePerBag: 1250,
        totalCost: Math.ceil((75 * land) / 50) * 1250,
        stage: 'Basal (Sowing)',
        method: 'Soil application at land prep',
        purpose: 'Balanced starter nourishment.'
      },
      {
        name: 'Neem-Coated Urea',
        npk: '46:0:0',
        dosePerAcreKg: 35,
        totalKg: 35 * land,
        bagCount50kg: Math.ceil((35 * land) / 50),
        pricePerBag: 270,
        totalCost: Math.ceil((35 * land) / 50) * 270,
        stage: 'Vegetative Growth (30 Days)',
        method: 'Top dressing before irrigation',
        purpose: 'Chlorophyll enrichment and vigorous branching.'
      },
      {
        name: 'MOP (Potash)',
        npk: '0:0:60',
        dosePerAcreKg: 25,
        totalKg: 25 * land,
        bagCount50kg: Math.ceil((25 * land) / 50),
        pricePerBag: 1700,
        totalCost: Math.ceil((25 * land) / 50) * 1700,
        stage: 'Flowering & Fruiting',
        method: 'Soil placement with moisture',
        purpose: 'Pest resistance and fruit sizing.'
      }
    ]
  }

  const totalEstimatedCost = schedule.reduce((sum, item) => sum + item.totalCost, 0)

  const organicAlternatives = [
    {
      name: 'Well-Decomposed Farmyard Manure (FYM)',
      quantity: `${2 * land} - ${3 * land} Trolleys`,
      benefits: 'Improves water holding capacity in red sandy loam and increases organic carbon.'
    },
    {
      name: 'Neem Cake (Organic Soil Amendment)',
      quantity: `${100 * land} kg (Broadcast at last ploughing)`,
      benefits: 'Repels subterranean white grubs and acts as a natural nitrification inhibitor.'
    },
    {
      name: 'Biofertilizers (Rhizobium + PSB + Trichoderma)',
      quantity: `${500 * land} grams seed treatment slurry`,
      benefits: 'Fixes atmospheric nitrogen naturally and solubilizes native locked soil phosphorus.'
    }
  ]

  let stageGuidance = ''
  if (stage.includes('Sowing') || stage.includes('Basal')) {
    stageGuidance = 'Apply basal dose (DAP + Potash + Zinc) 5cm below and to the side of the seed line. Never place raw chemical fertilizer in direct touch with seeds to prevent germination burn.'
  } else if (stage.includes('Vegetative')) {
    stageGuidance = 'Apply Urea only when soil has adequate moisture. Avoid broadcasting before heavy thunderstorms to prevent nitrogen leaching into deep subsoil.'
  } else {
    stageGuidance = 'For Pod/Flowering stage, apply Gypsum during earthing-up so calcium is positioned directly in the pod penetration zone.'
  }

  return {
    crop,
    landSize: land,
    growthStage: stage,
    soilPh: ph,
    soilRating,
    schedule,
    totalEstimatedCost,
    organicAlternatives,
    stageGuidance,
    safetyDisclaimer: 'AI recommendations are guidance only. Confirm fertilizer application with a qualified agricultural expert or soil-test recommendation.'
  }
}
