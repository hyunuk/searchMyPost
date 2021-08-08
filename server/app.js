import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import https from 'https'

import { configSession } from './config/session.js'
import postsRouter from './routes/posts.js'
import searchRouter from './routes/search.js'
import userRouter from './routes/users.js'
import { privateKey, certificate } from './config/ssl.js'

dotenv.config()

const app = express()

const options = {
  key: privateKey,
  cert: certificate,
  passphrase: process.env.LOCALHOST_HTTPS_PASS
}
app.set('port', process.env.PORT)
app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))
configSession(app)

// app.use(express.static(path.join(__dirname, '../public')))
app.use('/posts', postsRouter)
app.use('/search', searchRouter)
app.use('/user', userRouter)

const server = https.createServer(options, app)

server.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

export default app
