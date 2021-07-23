import express from 'express'
import { getPosts } from '../controllers/posts.js'
import { getSearch } from '../controllers/search.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getSearch)

export default router
