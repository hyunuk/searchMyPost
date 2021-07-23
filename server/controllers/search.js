import FB from 'fb'
import { errorCode } from '../util/error.js'

export const getSearch = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: 'You should log in to search.' })
    }
    const { accessToken } = req.user
    const fb = new FB.Facebook({
      accessToken,
      appId: process.env['FACEBOOK_CLIENT_ID'],
      appSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    })
    fb.api('/me/feed', 'GET', {
      accessToken,
      until: req.query.until,
      __paging_token: req.query.__paging_token,
      limit: 300
    }, function(response) {
      const paging = new URL(response.paging.next).searchParams
      const posts = response.data.map(elem => {
        const [userLink, postLink] = elem.id.split('_')
        return { created_time: elem.created_time,
          message: elem.message ?? '',
          link: `https://www.facebook.com/${userLink}/posts/${postLink}`
        }
      })
      const searchResult = posts.filter(post => {
        return post.message.includes(req.query.keyword)
      })
      return res.status(200).json({
        searchResult,
        until: paging.get('until'),
        __paging_token: paging.get('__paging_token')
      })
    }) 
  } catch (err) {
    return res.status(errorCode(err)).json({ error: err.message })
  }
}
