import FB from 'fb'
import { errorCode } from '../util/error.js'
import db from '../db/index.js'

export const getUser = async (req, res) => {
  try {
    const { id, name, accessToken } = req.query
    const fb = new FB.Facebook({
      accessToken,
      appId: process.env['FACEBOOK_CLIENT_ID'],
      appSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    })
    fb.api('/me', 'GET', { accessToken }, async response => {
      if (name === response.name && id === response.id) {
        const { body } = await db.indices.get({
          index: id,
          allow_no_indices: true,
        }).catch(() => res.status(404).json({ error: 'No user data in ES' }))
        const creationDate = body[id].settings.index.creation_date
        const count = await db.count({ index: id })
        return res.status(200).json({ creationDate, count: count.body.count })
      } else {
        return res.status(404).json({ error: 'User is not accurate' })
      }
    })
  } catch (err) {
    return res.status(errorCode(err)).json({ error: err.message })
  }
}
