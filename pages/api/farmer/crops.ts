import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../../lib/db'
import { recommendCrops } from '../../../services/crop-recommender'

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
  const { season, rainfallModifier, costModifier } = req.query

  const recommendations = recommendCrops(profile, {
    season: season as string,
    rainfallModifier: rainfallModifier ? Number(rainfallModifier) : 0,
    costModifier: costModifier ? Number(costModifier) : 0,
  })

  return res.status(200).json({
    ok: true,
    recommendations,
    farmerProfile: profile,
    evaluatedFactors: {
      soilPh: profile?.soilPh || 6.5,
      soilType: profile?.soilType || 'Red Sandy Loam',
      npk: `${profile?.nitrogen || 210} : ${profile?.phosphorus || 18} : ${profile?.potassium || 140}`,
      landSize: `${profile?.landSize || 3.0} ${profile?.landUnit || 'Acres'}`,
      irrigation: profile?.irrigationType || 'Drip Irrigation',
      location: profile?.location || 'Anantapur, Andhra Pradesh',
    }
  })
}
