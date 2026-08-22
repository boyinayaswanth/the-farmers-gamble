import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { crop, district, status } = req.query
    const products = await db.getMarketplaceProducts({
      crop: crop ? String(crop) : undefined,
      district: district ? String(district) : undefined,
      status: status ? String(status) : 'ACTIVE',
    })
    return res.status(200).json({ ok: true, products })
  }

  if (req.method === 'POST') {
    const token = req.cookies['tfg_token']
    let farmerId = 'farmer-ravi-1'
    let farmerName = 'Ravi Kumar'
    let farmerMobile = '+91 98765 43210'

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026') as any
        farmerId = payload.id
        farmerMobile = payload.mobile
        farmerName = payload.name || 'Farmer Ravi'
      } catch (e) {}
    }

    const { crop, variety, quantity, unit, price, location, district, state, harvestDate, description, imageUrl } = req.body

    if (!crop || !quantity || !price) {
      return res.status(400).json({ message: 'Crop, quantity, and price per unit are required.' })
    }

    const created = await db.createMarketplaceProduct({
      farmerId,
      farmerName,
      farmerMobile,
      crop,
      variety: variety || 'Standard Grade-A',
      quantity: Number(quantity),
      unit: unit || 'kg',
      price: Number(price),
      location: location || 'Anantapur, AP',
      district: district || 'Anantapur',
      state: state || 'Andhra Pradesh',
      harvestDate: harvestDate || new Date(Date.now() + 86400000 * 7).toISOString(),
      description: description || 'Fresh harvest ready for procurement.',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80',
      status: 'ACTIVE',
    })

    return res.status(201).json({ ok: true, message: 'Harvest listed successfully on Farm Marketplace!', product: created })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
