import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function handler(req, res) {
  const slug = req.query.slug
  const key = `viewcount:${slug}`

  if (!slug) {
    return res.status(400).json({ error: 'Missing slug' })
  }

  if (req.method === 'GET') {
    await redis.incr(key)
    const count = await redis.get(key)
    return res.status(200).json({ slug, count })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
