import express from 'express'
import { postPosts } from '../controllers/posts.js'

const router = express.Router()

router.post('/', postPosts)

export default router
