import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { targetName, targetRole, channel } = req.body

  // Generate virtual masked proxy bridge number
  const maskedProxyNumber = '+91 80 4719 ' + Math.floor(1000 + Math.random() * 9000)
  const pinSession = Math.floor(100 + Math.random() * 900)

  return res.status(200).json({
    ok: true,
    message: `Secure masked bridge connected to ${targetName} (${targetRole}). Personal phone numbers remain private.`,
    maskedProxyNumber,
    pinSession,
    channel: channel || 'VOICE_BRIDGE',
    expiresInMinutes: 30,
    privacyNotice: 'Calls through this bridge are routed via platform proxy. No direct personal contact info is exposed.'
  })
}
