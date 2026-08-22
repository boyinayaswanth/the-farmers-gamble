import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['tfg_token']
  let userId = 'farmer-yaswanth-1'

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026') as any
      userId = payload.id
    } catch (e) {}
  }

  if (req.method === 'GET') {
    const profile = await db.getFarmerProfile(userId)
    const user = await db.findUserById(userId)
    return res.status(200).json({ ok: true, profile, user })
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const data = req.body
    if (data.name) {
      await db.updateUser(userId, { name: data.name })
    }
    const updated = await db.upsertFarmerProfile(userId, {
      location: data.location,
      village: data.village,
      district: data.district,
      state: data.state,
      landSize: Number(data.landSize) || 3.0,
      landUnit: data.landUnit || 'Acres',
      soilType: data.soilType,
      soilPh: Number(data.soilPh) || 6.5,
      nitrogen: Number(data.nitrogen) || 210,
      phosphorus: Number(data.phosphorus) || 18,
      potassium: Number(data.potassium) || 140,
      waterSource: data.waterSource,
      irrigation: data.irrigation === true || data.irrigation === 'true',
      irrigationType: data.irrigationType,
      currentCrop: data.currentCrop,
      previousCrops: data.previousCrops,
      experienceYears: Number(data.experienceYears) || 10,
      preferredCrops: data.preferredCrops,
      budget: Number(data.budget) || 45000,
    })

    return res.status(200).json({ ok: true, message: 'Farmer profile updated successfully', profile: updated })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
