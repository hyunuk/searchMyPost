import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config()
export const configSession = (app) => {
  app.use(session({
    secret: process.env['SESSION_SECRET'],
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: false,
  }))
}
