import express from 'express'
import logger from 'morgan'
import passport from 'passport'
import dotenv from 'dotenv'
import https from 'https'
import path from 'path'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'

import { configSession } from './config/session.js'
import { configPassport } from './config/passport.js'
import postsRouter from './routes/posts.js'
import searchRouter from './routes/search.js'
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
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
app.use(cors({
  origin: 'http://localhost:30000',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true
}))
// app.use(createProxyMiddleware('/api', {
//   target: 'http://localhost:5000/',
//   changeOrigin: true
// }))
configSession(app)
configPassport(app, passport)

app.use(express.static(path.join(path.resolve(), '../client/build')))
app.use('/posts', postsRouter)
app.use('/search', searchRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

const server = https.createServer(options, app)

server.listen(app.get('port'), () => {
  console.log(
    '  App is running at https://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

export default app
