import type { NextApiRequest, NextApiResponse } from 'next'
import { askAi } from '../../../services/ai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { prompt } = req.body
  if (!prompt) return res.status(400).json({ message: 'Missing prompt' })
  const result = await askAi(prompt)
  res.json({ result })
}
