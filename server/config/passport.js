import FacebookStrategy from 'passport-facebook'

export const configPassport = (app, passport) => {
  
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env['FACEBOOK_CLIENT_ID'],
        clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
        callbackURL: process.env['FACEBOOK_CALLBACK'],
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, { profile, accessToken, refreshToken })
      }
    )
  )
  app.use(passport.initialize())
  app.use(passport.session())
}
