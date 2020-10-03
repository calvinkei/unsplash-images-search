import Unsplash, { toJson } from 'unsplash-js'
import { NextApiRequest, NextApiResponse } from 'next'

const IMAGES_PER_PAGE = 50
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_API_KEY || '' })

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const { keyword, page } = req.query
      const result = await unsplash.search
        .photos(Array.isArray(keyword) ? keyword.join() : keyword, Number(page), IMAGES_PER_PAGE)
        .then(toJson)
      res.status(200).json(result)
    }
  } catch (err) {
    res.status(500).send('unknown error')
  }
}
