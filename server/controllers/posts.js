import { errorCode } from '../util/error.js'
import db from '../db/index.js'

export const postPosts = async (req, res) => {
  try {
    const { user, creationDate, posts } = req.body.params
    const index = user.id
    if (creationDate) {
      await db.indices.delete({ index })
    }
    
    await db.indices.create({
      index,
      body: {
        settings: { analysis: { analyzer: { nori_analyzer: { tokenizer: 'nori_tokenizer' } } } },
        mappings: { properties: {
          id: { type: 'text' },
          created_time: { type: 'date' },
          message: {
            type: 'text',
            fields: { kor: { type: 'text', analyzer: 'nori' },
              eng: { type: 'text', analyzer: 'english' } }
          },
          link: { type: 'text' },
        } }
      }
    }, { ignore: [400] })
    const body = posts.flatMap(doc => [{ index: { _index: index } }, doc])
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
    const count = await db.count({ index })
    return res.status(201).json(count.body.count)
  } catch (err) {
    return res.status(errorCode(err)).json({ error: err.message })
  }
}
