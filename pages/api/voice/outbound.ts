import type { NextApiRequest, NextApiResponse } from 'next'
import { triggerOutboundCall } from '../../../services/telephony'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { mobile, scenario } = req.body
  const targetMobile = mobile || '+919876543210'

  const callResult = await triggerOutboundCall(
    targetMobile,
    scenario || 'WEATHER_ALERT'
  )

  return res.status(200).json({
    ok: true,
    message: `Proactive AI voice call initiated to ${targetMobile}.`,
    callResult,
  })
}
