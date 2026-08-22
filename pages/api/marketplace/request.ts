import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['tfg_token']
  let currentUserId = 'farmer-ravi-1'
  let currentUserRole: 'FARMER' | 'BUYER' = 'FARMER'
  let currentUserName = 'Ravi Kumar'
  let currentUserMobile = '+91 98765 43210'

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026') as any
      currentUserId = payload.id
      currentUserRole = payload.role || 'FARMER'
      currentUserName = payload.name || 'User'
      currentUserMobile = payload.mobile
    } catch (e) {}
  }

  // GET: Fetch buyer requests
  if (req.method === 'GET') {
    const roleParam = (req.query.role as 'FARMER' | 'BUYER') || currentUserRole
    const requests = await db.getBuyerRequests(currentUserId, roleParam)
    return res.status(200).json({ ok: true, requests })
  }

  // POST: Buyer submits new purchase request
  if (req.method === 'POST') {
    const { productId, farmerId, productTitle, quantity, offeredPrice, message } = req.body
    if (!productId || !farmerId || !quantity || !offeredPrice) {
      return res.status(400).json({ message: 'Missing required request parameters' })
    }

    const created = await db.createBuyerRequest({
      productId,
      productTitle: productTitle || 'Farm Produce',
      buyerId: currentUserId,
      buyerName: currentUserName,
      buyerMobile: currentUserMobile,
      farmerId,
      quantity: Number(quantity),
      offeredPrice: Number(offeredPrice),
      message: message || 'Interested in procuring this harvest.',
      status: 'PENDING',
    })

    // Create Notification for the farmer
    await db.createNotification({
      userId: farmerId,
      title: `🛒 New Purchase Offer for ${productTitle || 'Produce'}`,
      message: `${currentUserName} offered ₹${offeredPrice}/unit for ${quantity} units.`,
      type: 'BUYER_REQUEST',
      isRead: false,
      link: '/marketplace',
    })

    return res.status(201).json({ ok: true, message: 'Purchase request sent to farmer successfully!', request: created })
  }

  // PUT: Update request status (ACCEPTED, REJECTED, NEGOTIATING)
  if (req.method === 'PUT') {
    const { requestId, status } = req.body
    if (!requestId || !status) {
      return res.status(400).json({ message: 'requestId and status are required.' })
    }

    const updated = await db.updateBuyerRequestStatus(requestId, status)
    if (!updated) {
      return res.status(404).json({ message: 'Request not found' })
    }

    return res.status(200).json({ ok: true, message: `Offer ${status.toLowerCase()} successfully!`, request: updated })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
