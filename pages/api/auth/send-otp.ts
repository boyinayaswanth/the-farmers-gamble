import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import db from '../../../lib/db'
import { sendSms } from '../../../services/sms'

function generateOtpCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { mobile, role, name } = req.body
  if (!mobile || typeof mobile !== 'string' || mobile.trim().length < 8) {
    return res.status(400).json({ message: 'Please enter a valid mobile number (e.g. +91 98765 43210 or 10-digit number)' })
  }

  const cleanMobile = mobile.trim()
  const code = generateOtpCode()
  const codeHash = crypto.createHash('sha256').update(code).digest('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15) // 15 minutes validity

  // Find or pre-create user with their original name
  let user = await db.findUserByMobile(cleanMobile)
  if (!user) {
    user = await db.createUser({
      mobile: cleanMobile,
      name: name && name.trim() ? name.trim() : (role === 'BUYER' ? 'Agro Buyer' : 'Farmer Friend'),
      role: (role === 'BUYER' || role === 'ADMIN') ? role : 'FARMER'
    })
  } else if (name && name.trim()) {
    user = await db.updateUser(user.id, { name: name.trim() }) || user
  }

  // Save OTP in DB
  await db.saveOtp(cleanMobile, codeHash, expiresAt, user.id)

  // Dispatch SMS (Sends real SMS via Fast2SMS / Twilio if configured in .env)
  const smsText = `Your OTP for The Farmer's Gamble is ${code}. Valid for 5 minutes. Do not share this OTP with anyone.`
  const smsResult = await sendSms(cleanMobile, smsText, code)

  const hasRealSms = smsResult.ok && smsResult.provider !== 'dev-simulator' && smsResult.provider !== 'local-dispatch'
  const isDev = process.env.DEV_OTP_ENABLED === 'true' || process.env.DEV_OTP_ENABLED === '1'

  let userMessage = `OTP sent successfully to ${cleanMobile}. Please check your SMS inbox.`
  if (hasRealSms) {
    userMessage = `OTP sent via SMS to ${cleanMobile}. Please check your mobile inbox.`
  }

  return res.status(200).json({
    ok: true,
    message: userMessage,
    provider: smsResult.provider,
    expiresInSeconds: 300,
  })
}
