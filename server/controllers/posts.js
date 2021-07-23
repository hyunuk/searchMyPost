import FB from 'fb'
import { errorCode } from '../util/error.js'

export const getPosts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: 'You should log in to search.' })
    }
    const { accessToken } = req.user
    const { until, __paging_token } = req.query
    const limit = 300
    const fb = new FB.Facebook({
      accessToken,
      appId: process.env['FACEBOOK_CLIENT_ID'],
      appSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    })
    fb.api('/me/feed', 'GET', { limit, accessToken, until, __paging_token },
      function(response) {
        const posts = response.data.map(elem => {
          const [userLink, postLink] = elem.id.split('_')
          return { created_time: elem.created_time,
            message: elem.message,
            link: `https://www.facebook.com/${userLink}/posts/${postLink}`
          }
        })
        res.send(`
          ${JSON.stringify(posts, null, 2)}
        `)
      }
    )
  } catch (err) {
    return res.status(errorCode(err)).json({ error: err.message })
  }
}
