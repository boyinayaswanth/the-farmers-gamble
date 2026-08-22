export interface DiseaseDiagnosisResult {
  disease: string
  scientificName: string
  confidence: number // percentage e.g. 93.4
  severity: 'MILD' | 'MODERATE' | 'SEVERE' | 'HEALTHY'
  cropAffected: string
  symptoms: string[]
  possibleCauses: string[]
  chemicalTreatment: {
    product: string
    dosage: string
    applicationMethod: string
    waitingPeriodDays: number
  }[]
  organicTreatment: {
    method: string
    preparation: string
    benefits: string
  }[]
  preventiveMeasures: string[]
  disclaimer: string
  isDemo: boolean
}

export interface SymptomAnswers {
  crop?: string
  leavesYellow?: boolean | string
  brownSpots?: boolean | string
  leavesCurling?: boolean | string
  insectsVisible?: boolean | string
  stemDamaged?: boolean | string
  whitePowder?: boolean | string
  symptomDurationDays?: number | string
}

/**
 * Plant Doctor Service (Image Vision Diagnosis + Symptom Questionnaire Engine)
 */
export async function analyzeLeafImage(imageData: string, cropName: string = 'Groundnut'): Promise<DiseaseDiagnosisResult> {
  // In production, this can call a TensorFlow/PyTorch CV endpoint, Google Cloud Vision, or multimodal LLM
  // For hackathon and offline resilience, we provide realistic agronomic disease patterns
  const isGroundnut = cropName.toLowerCase().includes('groundnut')
  const isTomato = cropName.toLowerCase().includes('tomato')
  const isChilli = cropName.toLowerCase().includes('chilli')

  if (isGroundnut) {
    return {
      disease: 'Tikka Leaf Spot (Cercospora Leaf Spot)',
      scientificName: 'Cercospora arachidicola / Phaeoisariopsis personata',
      confidence: 93.8,
      severity: 'MODERATE',
      cropAffected: 'Groundnut (Arachis hypogaea)',
      symptoms: [
        'Circular dark brown to black spots surrounded by a bright yellow halo on upper leaf surface.',
        'Lesions coalescing causing premature defoliation of lower canopy leaves.',
        'Weakened peg attachment leading to pods detaching in soil during harvest.'
      ],
      possibleCauses: [
        'Prolonged high relative humidity (>85%) combined with intermittent rains.',
        'Warm temperatures between 25°C - 30°C.',
        'Spore carry-over from unburied infected crop stubble from previous season.'
      ],
      chemicalTreatment: [
        {
          product: 'Mancozeb 75% WP (Indofil M-45)',
          dosage: '2.5 grams per litre of water',
          applicationMethod: 'Foliar spray covering both upper and lower leaf surfaces.',
          waitingPeriodDays: 14,
        },
        {
          product: 'Hexaconazole 5% EC (Contaf Plus)',
          dosage: '2.0 ml per litre of water',
          applicationMethod: 'Systemic curative spray if spots have spread to >20% canopy.',
          waitingPeriodDays: 20,
        }
      ],
      organicTreatment: [
        {
          method: 'Neem Seed Kernel Extract (NSKE 5%)',
          preparation: 'Pound 500g dried neem seeds, soak overnight in 10L water, filter and add 10g soap powder.',
          benefits: 'Natural antifungal coating and acts as an insect antifeedant.'
        },
        {
          method: 'Pseudomonas fluorescens (Bio-fungicide)',
          preparation: 'Mix 10g/litre of water and spray at 10-day intervals.',
          benefits: 'Colonizes leaf phyllosphere and outcompetes Cercospora fungal spores.'
        }
      ],
      preventiveMeasures: [
        'Practice deep summer ploughing to bury infested crop residues.',
        'Maintain optimum plant spacing (30cm x 10cm) for adequate sunlight and airflow.',
        'Apply Gypsum @ 200kg/acre at pegging to fortify cell wall calcium.'
      ],
      disclaimer: 'This is an AI-assisted indication. Confirm with a qualified agricultural expert or local Krishi Vigyan Kendra (KVK) officer when necessary.',
      isDemo: true
    }
  }

  if (isTomato || cropName.toLowerCase().includes('potato')) {
    return {
      disease: 'Early Blight (Alternaria Solani)',
      scientificName: 'Alternaria solani',
      confidence: 91.5,
      severity: 'MODERATE',
      cropAffected: 'Tomato / Solanaceous Crops',
      symptoms: [
        'Concentric "bullseye" ring-shaped brown lesions on older bottom leaves.',
        'Surrounding leaf tissue turning yellow and wilting.',
        'Dark sunken cankers on stems near the soil line.'
      ],
      possibleCauses: [
        'High humidity (>80%) with warm temperatures (24°C - 29°C).',
        'Overhead sprinkler irrigation splashing soil-borne spores onto lower leaves.'
      ],
      chemicalTreatment: [
        {
          product: 'Chlorothalonil 75% WP or Mancozeb 75% WP',
          dosage: '2.0 g per litre of water',
          applicationMethod: 'Foliar spray with uniform coverage',
          waitingPeriodDays: 7,
        },
        {
          product: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
          dosage: '1.0 ml per litre of water',
          applicationMethod: 'Curative spray for rapid control',
          waitingPeriodDays: 10,
        }
      ],
      organicTreatment: [
        {
          method: 'Copper Hydroxide / Bordeaux Mixture (1%)',
          preparation: 'Dissolve 100g copper sulphate + 100g quicklime in 10L water.',
          benefits: 'Broad-spectrum organic fungal protector.'
        }
      ],
      preventiveMeasures: [
        'Remove and burn infected bottom leaves (pruning lower 12 inches).',
        'Apply plastic or straw mulching to prevent soil splashing.'
      ],
      disclaimer: 'This is an AI-assisted indication. Confirm with a qualified agricultural expert when necessary.',
      isDemo: true
    }
  }

  // Default General Plant Disease Diagnosis
  return {
    disease: 'Leaf Spot & Foliar Rust Complex',
    scientificName: 'Puccinia spp. / Cercospora Complex',
    confidence: 89.2,
    severity: 'MODERATE',
    cropAffected: cropName || 'General Crop',
    symptoms: [
      'Brown and reddish-orange pustules scattered on leaf underside.',
      'Chlorosis (yellowing) spreading across intermediate leaf veins.'
    ],
    possibleCauses: [
      'Moist leaf canopy for more than 8 continuous hours.',
      'Dense planting with poor wind circulation.'
    ],
    chemicalTreatment: [
      {
        product: 'Propiconazole 25% EC (Tilt)',
        dosage: '1.0 ml per litre of water',
        applicationMethod: 'Foliar spray',
        waitingPeriodDays: 14,
      }
    ],
    organicTreatment: [
      {
        method: 'Fermented Butter-milk (Chaas) Spray',
        preparation: 'Mix 1 litre sour buttermilk with 9 litres water + 5g turmeric.',
        benefits: 'Lactic acid bacteria suppress foliar fungal development organically.'
      }
    ],
    preventiveMeasures: [
      'Avoid flood irrigation during humid cloudy spells.',
      'Ensure balanced potash fertilization to strengthen epidermal cuticle.'
    ],
    disclaimer: 'This is an AI-assisted indication. Confirm with a qualified agricultural expert when necessary.',
    isDemo: true
  }
}

/**
 * Symptom-Based Disease Diagnostic Engine
 * For farmers without a smartphone camera or calling via basic phone IVR
 */
export function diagnoseBySymptoms(answers: SymptomAnswers): DiseaseDiagnosisResult {
  const isYellow = answers.leavesYellow === true || answers.leavesYellow === 'true' || answers.leavesYellow === 'yes'
  const hasSpots = answers.brownSpots === true || answers.brownSpots === 'true' || answers.brownSpots === 'yes'
  const isCurling = answers.leavesCurling === true || answers.leavesCurling === 'true' || answers.leavesCurling === 'yes'
  const hasInsects = answers.insectsVisible === true || answers.insectsVisible === 'true' || answers.insectsVisible === 'yes'
  const hasWhitePowder = answers.whitePowder === true || answers.whitePowder === 'true' || answers.whitePowder === 'yes'

  if (hasWhitePowder) {
    return {
      disease: 'Powdery Mildew (Erysiphe spp.)',
      scientificName: 'Erysiphe cichoracearum',
      confidence: 94.0,
      severity: 'MODERATE',
      cropAffected: answers.crop || 'Field Crops',
      symptoms: [
        'White talcum-powder-like coating on upper leaf surface.',
        'Affected leaves turn yellow, curl upward, and dry out prematurely.'
      ],
      possibleCauses: [
        'Dry atmospheric weather coupled with high humidity in the shade of dense foliage.',
        'Over-application of chemical nitrogen fertilizer.'
      ],
      chemicalTreatment: [
        {
          product: 'Wettable Sulphur 80% WP (Sulfex)',
          dosage: '3.0 grams per litre of water',
          applicationMethod: 'Foliar spray in the early morning or evening.',
          waitingPeriodDays: 10,
        }
      ],
      organicTreatment: [
        {
          method: 'Baking Soda (Sodium Bicarbonate) Spray',
          preparation: 'Mix 5 grams baking soda + 2 ml vegetable oil in 1 litre water.',
          benefits: 'Changes surface pH to alkaline, halting fungal mycelium growth.'
        }
      ],
      preventiveMeasures: [
        'Ensure proper pruning and crop aeration.',
        'Avoid excessive chemical nitrogen application.'
      ],
      disclaimer: 'Symptom-based indication. Confirm with your local agricultural officer.',
      isDemo: true
    }
  }

  if (isCurling && (hasInsects || isYellow)) {
    return {
      disease: 'Leaf Curl Viral Complex / Thrips & Whitefly Vector',
      scientificName: 'Begomovirus transmitted by Bemisia tabaci / Scirtothrips dorsalis',
      confidence: 91.0,
      severity: 'SEVERE',
      cropAffected: answers.crop || 'Chilli / Tomato / Cotton',
      symptoms: [
        'Leaves curling upwards (Boat shaped) or downwards with puckering.',
        'Stunted plant growth and shortened internodes with flower drop.'
      ],
      possibleCauses: [
        'High population of sucking pests (Thrips & Whiteflies) transmitting virus.',
        'Dry hot weather favoring rapid insect breeding.'
      ],
      chemicalTreatment: [
        {
          product: 'Diafenthiuron 50% WP (Pegasus) or Fipronil 5% SC',
          dosage: '1.2 g / 2 ml per litre of water',
          applicationMethod: 'Knapsack spray with fine mist nozzle.',
          waitingPeriodDays: 15,
        }
      ],
      organicTreatment: [
        {
          method: 'Yellow & Blue Sticky Traps',
          preparation: 'Install 15 yellow traps (for whiteflies) and 15 blue traps (for thrips) per acre.',
          benefits: 'Traps flying vector insects physically without chemical residues.'
        }
      ],
      preventiveMeasures: [
        'Border crop of 3 rows of Maize or Sorghum as a live insect barrier.',
        'Spray 5% Neem Oil at early seedling stage.'
      ],
      disclaimer: 'Symptom-based indication. Confirm with your local agricultural officer.',
      isDemo: true
    }
  }

  if (hasSpots && isYellow) {
    return {
      disease: 'Cercospora Leaf Spot / Early Blight',
      scientificName: 'Cercospora / Alternaria Complex',
      confidence: 88.5,
      severity: 'MODERATE',
      cropAffected: answers.crop || 'Groundnut / Field Crops',
      symptoms: [
        'Dark brown circular necrotic spots with surrounding chlorotic halo.',
        'Gradual drying and premature falling of bottom leaves.'
      ],
      possibleCauses: [
        'Prolonged humidity with intermittent morning dew.',
        'Nutritional stress (Nitrogen & Magnesium deficiency).'
      ],
      chemicalTreatment: [
        {
          product: 'Mancozeb 75% WP + Carbendazim 12% (Saaf)',
          dosage: '2.0 grams per litre of water',
          applicationMethod: 'Foliar spray',
          waitingPeriodDays: 14,
        }
      ],
      organicTreatment: [
        {
          method: 'Trichoderma viride Bio-fungicide',
          preparation: 'Mix 5g per litre of water with 10g jaggery and spray.',
          benefits: 'Natural bio-agent that parasites pathogenic fungal hyphae.'
        }
      ],
      preventiveMeasures: [
        'Avoid water stagnation in root zone.',
        'Apply Gypsum and balanced micronutrient spray.'
      ],
      disclaimer: 'Symptom-based indication. Confirm with your local agricultural officer.',
      isDemo: true
    }
  }

  // General Nutrient Chlorosis
  return {
    disease: 'Nutritional Chlorosis (Nitrogen / Iron Deficiency)',
    scientificName: 'Abiotic Nutrient Deficiency',
    confidence: 85.0,
    severity: 'MILD',
    cropAffected: answers.crop || 'General Crop',
    symptoms: [
      'Uniform yellowing of younger foliage (Iron deficiency) or older foliage (Nitrogen deficiency).',
      'No fungal spots or insect webbing visible.'
    ],
    possibleCauses: [
      'High soil pH (>7.5) fixing micronutrients into insoluble forms.',
      'Root compaction or temporary waterlogging.'
    ],
    chemicalTreatment: [
      {
        product: 'Water Soluble Foliar 19:19:19 + Chelated Iron (Fe-EDTA 12%)',
        dosage: '5g NPK + 1g Chelated Iron per litre of water',
        applicationMethod: 'Morning foliar spray',
        waitingPeriodDays: 3,
      }
    ],
    organicTreatment: [
      {
        method: 'Liquid Jeevamrutha Application',
        preparation: 'Drench 200 litres fermented Jeevamrutha per acre through irrigation line.',
        benefits: 'Multiplies beneficial soil microbes and releases native soil minerals.'
      }
    ],
    preventiveMeasures: [
      'Incorporate 2 tonnes of FYM/Vermicompost per acre.',
      'Check and correct soil pH.'
    ],
    disclaimer: 'Symptom-based indication. Confirm with your local agricultural officer.',
    isDemo: true
  }
}
