import express from 'express'
import { getPosts } from '../controllers/posts.js'
import { postIndex, getIndex } from '../controllers/index.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/index', postIndex)
router.get('/indices', getIndex)

export default router
