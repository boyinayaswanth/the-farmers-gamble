import type { NextApiRequest, NextApiResponse } from 'next'
import { getMarketIntelligence } from '../../../services/market'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { crop, district } = req.query

  const marketData = await getMarketIntelligence(
    crop ? String(crop) : undefined,
    district ? String(district) : undefined
  )

  return res.status(200).json({
    ok: true,
    marketData,
    totalMarkets: marketData.length,
    timestamp: new Date().toISOString(),
    isDemo: true,
    demoLabel: 'DEMO DATA — APMC MANDI SIMULATED FEED'
  })
}
