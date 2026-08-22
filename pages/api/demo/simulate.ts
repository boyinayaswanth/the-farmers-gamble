import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'
import { triggerOutboundCall } from '../../../services/telephony'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { action, userId = 'farmer-ravi-1', mobile = '+919876543210' } = req.body

  switch (action) {
    case 'WEATHER_ALERT': {
      const notif = await db.createNotification({
        userId,
        title: '⛈️ Storm Warning: 45mm Rain in 24h',
        message: 'Heavy rain forecasted for Anantapur district. Ensure field drainage channels are cleared to prevent peg rot in Groundnut.',
        type: 'WEATHER',
        isRead: false,
        link: '/dashboard',
      })
      return res.status(200).json({
        ok: true,
        action,
        message: 'Simulated Weather Storm Alert created successfully (DEMO DATA).',
        notification: notif,
      })
    }

    case 'MARKET_ALERT': {
      await db.updateMarketPrice('mp-1', 89.5, 'Rising')
      const notif = await db.createNotification({
        userId,
        title: '📈 Groundnut Price Jumped to ₹89.50/kg',
        message: 'Anantapur APMC Mandi price surged by +₹3.00/kg today with HIGH buyer volume.',
        type: 'MARKET',
        isRead: false,
        link: '/market',
      })
      return res.status(200).json({
        ok: true,
        action,
        message: 'Simulated Market Price Surge applied (+₹3.00/kg) (DEMO DATA).',
        notification: notif,
      })
    }

    case 'DISEASE_DETECTION': {
      const notif = await db.createNotification({
        userId,
        title: '🦠 Plant Doctor: Tikka Spot Detected (93.8%)',
        message: 'Your uploaded Groundnut leaf indicates early Tikka Leaf Spot. Spray Mancozeb 75% WP @ 2.5g/L before rain.',
        type: 'DISEASE',
        isRead: false,
        link: '/plant-doctor',
      })
      return res.status(200).json({
        ok: true,
        action,
        message: 'Simulated Leaf Disease Diagnosis alert created.',
        notification: notif,
      })
    }

    case 'BUYER_REQUEST': {
      const reqItem = await db.createBuyerRequest({
        productId: 'prod-1',
        productTitle: 'Groundnut (K-6 Variety)',
        buyerId: 'buyer-srinivas-2',
        buyerName: 'Sri Venkateswara Agro Commodities',
        buyerMobile: '+91 91234 56789',
        farmerId: userId,
        quantity: 800,
        offeredPrice: 86.0,
        message: 'Revised offer: Ready to procure 800 kg at ₹86.00/kg at farmgate with immediate digital payment.',
        status: 'PENDING',
      })

      const notif = await db.createNotification({
        userId,
        title: '🛒 Buyer Offer Revised: ₹86.00/kg for 800 kg',
        message: 'Sri Venkateswara Agro Commodities offered ₹86.00/kg (Total: ₹68,800).',
        type: 'BUYER_REQUEST',
        isRead: false,
        link: '/marketplace',
      })

      return res.status(200).json({
        ok: true,
        action,
        message: 'Simulated Buyer Purchase Request created.',
        buyerRequest: reqItem,
        notification: notif,
      })
    }

    case 'AI_CALL': {
      const call = await triggerOutboundCall(mobile, 'WEATHER_ALERT')
      return res.status(200).json({
        ok: true,
        action,
        message: 'Simulated Outbound AI Voice Call initiated.',
        callResult: call,
      })
    }

    default:
      return res.status(400).json({ message: `Unknown simulation action: ${action}` })
  }
}
