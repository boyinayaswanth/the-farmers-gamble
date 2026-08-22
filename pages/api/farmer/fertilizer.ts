import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../../lib/db'
import { calculateFertilizer } from '../../../services/fertilizer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['tfg_token']
  let userId = 'farmer-ravi-1'

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026') as any
      userId = payload.id
    } catch (e) {}
  }

  const profile = await db.getFarmerProfile(userId)
  const { crop, landSize, growthStage, soilPh, nitrogen, phosphorus, potassium } = req.method === 'POST' ? req.body : req.query

  const calculation = calculateFertilizer({
    crop: (crop as string) || profile?.currentCrop || 'Groundnut',
    landSize: landSize ? Number(landSize) : (profile?.landSize || 3.0),
    growthStage: (growthStage as string) || 'Basal (At Sowing)',
    soilPh: soilPh ? Number(soilPh) : (profile?.soilPh || 6.5),
    nitrogen: nitrogen ? Number(nitrogen) : (profile?.nitrogen || 210),
    phosphorus: phosphorus ? Number(phosphorus) : (profile?.phosphorus || 18),
    potassium: potassium ? Number(potassium) : (profile?.potassium || 140),
    soilType: profile?.soilType || 'Red Sandy Loam',
  })

  return res.status(200).json({ ok: true, calculation })
}
