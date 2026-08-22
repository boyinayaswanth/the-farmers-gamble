import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('tfg_token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0),
    })
  )
  return res.status(200).json({ ok: true, message: 'Logged out successfully' })
}
