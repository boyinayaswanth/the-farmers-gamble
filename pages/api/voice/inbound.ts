import type { NextApiRequest, NextApiResponse } from 'next'
import { handleInboundCall, buildTwimlXml } from '../../../services/telephony'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Can be called via POST or GET
  const mobile = req.body?.From || req.body?.callerMobile || req.query?.From || '+919876543210'
  const dtmf = req.body?.Digits || req.body?.dtmfInput || req.query?.Digits
  const speechQuery = req.body?.SpeechResult || req.body?.speechQuery || req.query?.SpeechResult

  const result = await handleInboundCall({
    callerMobile: String(mobile),
    direction: 'INBOUND',
    dtmfInput: dtmf ? String(dtmf) : undefined,
    speechQuery: speechQuery ? String(speechQuery) : undefined,
  })

  // If request is from Twilio (expects XML)
  const isTwilio = req.headers['user-agent']?.includes('Twilio') || req.query?.format === 'xml'
  if (isTwilio) {
    res.setHeader('Content-Type', 'text/xml')
    return res.status(200).send(buildTwimlXml(result.speechText))
  }

  // Return standard JSON for Web Phone Simulator and REST clients
  return res.status(200).json({ ok: true, result })
}
