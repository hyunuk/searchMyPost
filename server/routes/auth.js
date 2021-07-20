import express from 'express'
import passport from 'passport'
const router = express.Router()

// router.get('/login/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'user_posts'] }))
router.get('/login/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'user_posts'] }))

router.get(
  '/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    console.log('callback login from facebook', req.user)
    res.redirect('/')
  }
)

export default router
