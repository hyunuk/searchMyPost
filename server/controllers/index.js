import FB from 'fb'
import { errorCode } from '../util/error.js'
import db from '../db/index.js'

export const getIndex = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: 'You must log in.' })
    }
    const index = req.user.profile.id
    const { body } = await db.indices.get({ index })
    const creationDate = body[index].settings.index.creation_date
    return res.status(200).json({ creationDate })
  } catch (err) {
    return res.status(errorCode(err)).json({ error: err.message })
  }
}

export const postIndex = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: 'You must log in.' })
    }
    const index = req.user.profile.id
    const { until, __paging_token, creationDate } = req.query
    const { accessToken } = req.user
    const fb = new FB.Facebook({
      accessToken,
      appId: process.env['FACEBOOK_CLIENT_ID'],
      appSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    })
    fb.api('/me/feed', 'GET', { accessToken, until, __paging_token, limit: 300 },
      async function(response) {
        const paging = new URL(response.paging.next).searchParams
        const posts = response.data.map(elem => {
          const [userLink, postLink] = elem.id.split('_')
          return { id: postLink,
            created_time: elem.created_time,
            message: elem.message ?? '',
            link: `https://www.facebook.com/${userLink}/posts/${postLink}`,
          }
        })

        if (creationDate) {
          await db.indices.delete({ index })
        }
        
        await db.indices.create({
          index,
          body: {
            settings: {
              analysis: {
                analyzer: {
                  nori_analyzer: {
                    tokenizer: 'nori_tokenizer'
                  }
                }
              }
            },
            mappings: {
              properties: {
                id: { type: 'text' },
                created_time: { type: 'date' },
                message: {
                  type: 'text',
                  fields: {
                    kor: {
                      type: 'text',
                      analyzer: 'nori'
                    },
                    eng: {
                      type: 'text',
                      analyzer: 'english'
                    }
                  }
                },
                link: { type: 'text' },
              }
            }
          }
        }, { ignore: [400] })

        const body = posts.flatMap(doc => [{ index: { _index: req.user.profile.id } }, doc])
        const { body: bulkResponse } = await db.bulk({ refresh: true, body })

        if (bulkResponse.errors) {
          const erroredDocuments = []
          bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
              erroredDocuments.push({
                status: action[operation].status,
                error: action[operation].error,
                operation: body[i * 2],
                document: body[i * 2 + 1]
              })
            }
          })
          console.log(erroredDocuments)
        }    

        const { posts: count } = await db.count({ index: req.user.profile.id })
        console.log(count)

        return res.status(200).json({
          until: paging.get('until'),
          __paging_token: paging.get('__paging_token')
        })
      }) 
  } catch (err) {
    return res.status(errorCode(err)).json({ error: err.message })
  }
}
