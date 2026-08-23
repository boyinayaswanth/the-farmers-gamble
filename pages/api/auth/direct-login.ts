import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import db from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { mobile, name, role } = req.body || {}

  if (!mobile || typeof mobile !== 'string' || mobile.trim().length < 8) {
    return res.status(400).json({ message: 'Please enter a valid mobile number (e.g. +91 8555864859 or 10-digit number)' })
  }

  const cleanMobile = mobile.trim()
  const userRole = (role === 'BUYER' || role === 'ADMIN') ? role : 'FARMER'
  const defaultName = userRole === 'ADMIN' ? 'Gram Panchayat & Agri Officer' : userRole === 'BUYER' ? 'Agro Commodity Buyer' : 'Yaswanth'
  const userName = name && name.trim() ? name.trim() : defaultName

  // Find or create user directly
  let user = await db.findUserByMobile(cleanMobile)
  if (!user) {
    user = await db.createUser({
      mobile: cleanMobile,
      name: userName,
      role: userRole
    })
  } else {
    user = await db.updateUser(user.id, {
      name: userName,
      role: userRole
    }) || user
  }

  // Create Farmer Profile if missing
  if (user.role === 'FARMER') {
    const existingProfile = await db.getFarmerProfile(user.id)
    if (!existingProfile) {
      await db.upsertFarmerProfile(user.id, {
        location: 'Kalyandurg, Anantapur, Andhra Pradesh',
        district: 'Anantapur',
        state: 'Andhra Pradesh',
        landSize: 3.0,
        landUnit: 'Acres',
        soilType: 'Red Sandy Loam',
        soilPh: 6.5,
        nitrogen: 142,
        phosphorus: 18,
        potassium: 210,
        waterSource: 'Borewell (Drip Connected)',
        irrigation: true,
        irrigationType: 'Drip',
        currentCrop: 'Groundnut'
      })
    }
  }

  // Generate JWT token
  const secret = process.env.JWT_SECRET || 'tfg_super_secure_jwt_secret_key_2026'
  const token = jwt.sign(
    { 
      id: user.id, 
      mobile: user.mobile, 
      name: user.name, 
      role: user.role 
    },
    secret,
    { expiresIn: '30d' }
  )

  // Set HTTP-Only Cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('tfg_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
  )

  return res.status(200).json({
    ok: true,
    message: `Welcome ${user.name}! Login successful.`,
    user: {
      id: user.id,
      mobile: user.mobile,
      name: user.name,
      role: user.role,
      language: user.language || 'en'
    }
  })
}
