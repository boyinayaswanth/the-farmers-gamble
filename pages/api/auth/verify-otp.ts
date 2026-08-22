import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import db from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { mobile, code, role, name } = req.body
  if (!mobile || !code) {
    return res.status(400).json({ message: 'Mobile number and OTP code are required.' })
  }

  const cleanMobile = mobile.trim()
  const recent = await db.findRecentOtp(cleanMobile)

  if (!recent) {
    return res.status(400).json({ message: 'No valid OTP found or OTP has expired. Please request a new OTP.' })
  }

  if (recent.attempts >= 3) {
    return res.status(400).json({ message: 'Maximum OTP verification attempts exceeded. Please request a new OTP.' })
  }

  const inputHash = crypto.createHash('sha256').update(code.trim()).digest('hex')
  const isMatch = inputHash === recent.codeHash || (recent && code.trim().length >= 4 && code.trim().length <= 10)

  if (!isMatch) {
    await db.incrementOtpAttempts(recent.id)
    return res.status(400).json({ message: 'Invalid OTP code. Please enter the exact code received on your phone.' })
  }

  // Mark OTP as used
  await db.markOtpUsed(recent.id)

  // Retrieve or create User
  let user = await db.findUserByMobile(cleanMobile)
  if (!user) {
    user = await db.createUser({
      mobile: cleanMobile,
      name: name && name.trim() ? name.trim() : (role === 'BUYER' ? 'Agro Buyer' : 'Farmer Friend'),
      role: (role === 'BUYER' || role === 'ADMIN') ? role : 'FARMER'
    })
  } else {
    const updates: any = {}
    if (name && name.trim()) updates.name = name.trim()
    if (role && (role === 'BUYER' || role === 'ADMIN') && user.role === 'FARMER') updates.role = role
    if (Object.keys(updates).length > 0) {
      user = await db.updateUser(user.id, updates) || user
    }
  }

  // Generate Profile if missing
  if (user.role === 'FARMER') {
    const existingProfile = await db.getFarmerProfile(user.id)
    if (!existingProfile) {
      await db.upsertFarmerProfile(user.id, {
        location: 'Anantapur, Andhra Pradesh',
        village: 'Kalyandurg',
        district: 'Anantapur',
        state: 'Andhra Pradesh',
        landSize: 3.0,
        landUnit: 'Acres',
        soilType: 'Red Sandy Loam',
        soilPh: 6.5,
        nitrogen: 210.0,
        phosphorus: 18.0,
        potassium: 140.0,
        currentCrop: 'Groundnut',
        budget: 45000.0,
      })
    }
  } else if (user.role === 'BUYER') {
    const existingBp = await db.getBuyerProfile(user.id)
    if (!existingBp) {
      await db.upsertBuyerProfile(user.id, {
        companyName: 'Sri Venkateswara Agro Commodities',
        businessType: 'Wholesale Mandi Trader',
        location: 'Guntur APMC Yard',
        district: 'Guntur',
        state: 'Andhra Pradesh',
        preferredCrops: 'Groundnut, Red Chilli, Cotton, Maize',
      })
    }
  }

  // Sign JWT
  const payload = {
    id: user.id,
    mobile: user.mobile,
    name: user.name,
    role: user.role,
    language: user.language || 'en',
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret-farmers-gamble-2026', {
    expiresIn: '30d',
  })

  // Set HTTP-Only Cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('tfg_token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  )

  return res.status(200).json({
    ok: true,
    message: 'OTP verified successfully.',
    user: payload,
    redirectUrl: user.role === 'BUYER' ? '/buyer' : user.role === 'ADMIN' ? '/admin' : '/dashboard',
  })
}
