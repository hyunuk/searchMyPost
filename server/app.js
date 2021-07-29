import express from 'express'
import logger from 'morgan'
import passport from 'passport'
import dotenv from 'dotenv'
import https from 'https'

import { configSession } from './config/session.js'
import { configPassport } from './config/passport.js'
import indexRouter from './routes/index.js'
import authRouter from './routes/auth.js'
import postsRouter from './routes/posts.js'
import searchRouter from './routes/posts.js'
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
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
configSession(app)
configPassport(app, passport)

// app.use(express.static(path.join(__dirname, '../public')))
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use('/search', searchRouter)

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
