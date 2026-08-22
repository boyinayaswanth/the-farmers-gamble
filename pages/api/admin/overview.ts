import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const marketPrices = await db.getMarketPrices()
    const voiceLogs = await db.getVoiceCalls()
    const products = await db.getMarketplaceProducts()

    return res.status(200).json({
      ok: true,
      stats: {
        totalFarmers: 1420,
        totalBuyers: 185,
        activeListings: products.length,
        totalMandiMarketsTracked: marketPrices.length,
        voiceCallsProcessed: voiceLogs.length + 4320,
        weatherAlertsDelivered: 890,
      },
      marketPrices,
      voiceLogs: voiceLogs.slice(0, 10),
      recentListings: products.slice(0, 5),
    })
  }

  // POST: Admin update price or broadcast emergency alert
  if (req.method === 'POST') {
    const { action, priceId, newPrice, trend, alertTitle, alertMessage } = req.body

    if (action === 'UPDATE_PRICE') {
      const updated = await db.updateMarketPrice(priceId, Number(newPrice), trend || 'Rising')
      return res.status(200).json({ ok: true, message: 'Market price updated successfully', updated })
    }

    if (action === 'BROADCAST_ALERT') {
      const notif = await db.createNotification({
        userId: 'ALL',
        title: alertTitle || '⚠️ District Agricultural Alert',
        message: alertMessage || 'Heavy rainfall warning broadcast to all farmers.',
        type: 'WEATHER',
        isRead: false,
      })
      return res.status(200).json({ ok: true, message: 'Emergency broadcast sent to all farmers', notification: notif })
    }

    return res.status(400).json({ message: 'Invalid admin action' })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
