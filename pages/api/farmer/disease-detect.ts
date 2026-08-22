import type { NextApiRequest, NextApiResponse } from 'next'
import { analyzeLeafImage, diagnoseBySymptoms } from '../../../services/disease-cv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { mode, imageUrl, crop, symptoms, pixelMetrics } = req.body

  if (mode === 'symptoms' || symptoms) {
    const result = diagnoseBySymptoms(symptoms || req.body)
    return res.status(200).json({ ok: true, type: 'SYMPTOM_DIAGNOSIS', result })
  }

  // Leaf Image Vision Analysis
  const result = await analyzeLeafImage(imageUrl || '', crop || 'Groundnut', pixelMetrics)
  return res.status(200).json({ ok: true, type: 'VISION_DIAGNOSIS', result })
}
