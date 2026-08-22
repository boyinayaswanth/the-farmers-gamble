import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../../lib/db'
import { getWeatherData } from '../../../services/weather'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['tfg_token']
  let location = 'Anantapur, Andhra Pradesh'

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026') as any
      const profile = await db.getFarmerProfile(payload.id)
      if (profile?.location) location = profile.location
    } catch (e) {}
  }

  if (req.query.location && typeof req.query.location === 'string') {
    location = req.query.location
  }

  const weather = await getWeatherData(location)
  return res.status(200).json({ ok: true, weather })
}
