import express from 'express'
import path from 'path'
import logger from 'morgan'
import indexRouter from './routes/index.js'
import passport from 'passport'
import dotenv from 'dotenv'
import https from 'https'

import { configSession } from './config/session.js'
import { configPassport } from './config/passport.js'
import authRouter from './routes/auth.js'
import { privateKey, certificate } from './config/ssl.js'

dotenv.config()

const app = express()
const __dirname = path.resolve();

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
const server = https.createServer(options, app)

server.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

// const start = () => {
// }

// start()

export default app
