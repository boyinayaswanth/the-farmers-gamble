import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['tfg_token']
  if (!token) {
    return res.status(401).json({ authenticated: false, message: 'Not authenticated' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026') as any
    const user = await db.findUserById(payload.id) || await db.findUserByMobile(payload.mobile)

    if (!user) {
      return res.status(401).json({ authenticated: false, message: 'User not found' })
    }

    const farmerProfile = user.role === 'FARMER' ? await db.getFarmerProfile(user.id) : null
    const buyerProfile = user.role === 'BUYER' ? await db.getBuyerProfile(user.id) : null
    const notifications = await db.getNotifications(user.id)

    return res.status(200).json({
      authenticated: true,
      user: {
        id: user.id,
        mobile: user.mobile,
        name: user.name || (user.role === 'FARMER' ? 'Ravi Kumar' : 'Agro Buyer'),
        role: user.role,
        language: user.language || 'en',
      },
      farmerProfile,
      buyerProfile,
      unreadNotificationsCount: notifications.filter(n => !n.isRead).length,
    })
  } catch (err) {
    return res.status(401).json({ authenticated: false, message: 'Invalid or expired session token' })
  }
}
