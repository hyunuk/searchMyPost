import express from 'express'
import { getPosts } from '../controllers/posts.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getSearch)

export default router


// C -> B "fb.com/posts/search?q='alice'"
// B -> C "res = {searchResult, pagetoken, until}"
// C -> B "fb.com/posts/search?q='alice'&pagetoken=''&until=''"
