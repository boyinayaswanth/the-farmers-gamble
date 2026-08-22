import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query
  const logs = await db.getVoiceCalls(userId ? String(userId) : undefined)

  return res.status(200).json({
    ok: true,
    totalCalls: logs.length,
    logs,
  })
}
