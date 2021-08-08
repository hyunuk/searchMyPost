import { errorCode } from '../util/error.js'
import db from '../db/index.js'

export const getSearch = async (req, res) => {
  try {
    const { id, term } = req.query
    const response = await db.search({
      index: id,
      q: term,
      size: 1000,
    })
    const source = response.body.hits.hits
    const posts = source.map(post => { return post._source })
    return res.status(200).json(posts)
  } catch (err) {
    return res.status(errorCode(err)).json({ error: err.message })
  }
}
