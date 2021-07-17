import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => {
  res.send({ test: "Hello World!"})
})


export default router
