import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../../lib/db'
import { getHighDemandMatches } from '../../../services/market'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['tfg_token']
  let soilType = 'Red Sandy Loam'
  let irrigation = true

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026') as any
      const profile = await db.getFarmerProfile(payload.id)
      if (profile?.soilType) soilType = profile.soilType
      if (typeof profile?.irrigation === 'boolean') irrigation = profile.irrigation
    } catch (e) {}
  }

  const highDemandOpportunities = await getHighDemandMatches(soilType, irrigation)

  return res.status(200).json({
    ok: true,
    highDemandOpportunities,
    matchedForSoil: soilType,
    hasIrrigation: irrigation,
    message: 'High-demand crops suitable for YOUR specific farm profile.',
  })
}
