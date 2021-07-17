import express from 'express'
import router from './Router/test.js'

const app = express()
app.use("/api", router)

const PORT = 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

