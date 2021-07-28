import express from 'express'
import passport from 'passport'
const router = express.Router()

router.get('/login/facebook', 
  passport.authenticate('facebook', {
    scope: ['public_profile', 'user_posts']
  })
)

router.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/' 
  }), (req, res) => {
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout()
    res.redirect('/')
  })
})

export default router
