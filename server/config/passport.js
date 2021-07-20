import FacebookStrategy from 'passport-facebook'

export const configPassport = (app, passport) => {
  
  passport.serializeUser((user, done) => {
    console.log('serialize user', user)
    done(null, user)
  })
  
  passport.deserializeUser((user, done) => {
    console.log('deserialize user', user)
    done(null, user)
  })
  
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env['FACEBOOK_CLIENT_ID'],
        clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
        callbackURL: process.env['FACEBOOK_CALLBACK'],
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        console.log('profile', profile)
        return cb(null, profile)
      }
    )
  )
  app.use(passport.initialize())
  app.use(passport.session())
}
