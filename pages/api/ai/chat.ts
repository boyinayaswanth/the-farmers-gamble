import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../../lib/db'
import { askAi } from '../../../services/ai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { message, language } = req.body
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'Message text is required.' })
  }

  const token = req.cookies['tfg_token']
  let farmerProfile = null

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026') as any
      farmerProfile = await db.getFarmerProfile(payload.id)
    } catch (e) {}
  }

  // Fallback to Yaswanth profile if not logged in
  if (!farmerProfile) {
    farmerProfile = await db.getFarmerProfile('farmer-yaswanth-1')
  }

  const aiResponse = await askAi(message, {
    farmerProfile,
    language: (language as 'en' | 'te') || 'en',
  })

  return res.status(200).json({
    ok: true,
    response: aiResponse.text,
    provider: aiResponse.provider,
    isDemo: aiResponse.isDemo,
  })
}
