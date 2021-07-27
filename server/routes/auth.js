import express from 'express'
import passport from 'passport'
const router = express.Router()
const scope = ['public_profile', 'user_posts']

router.get('/login/facebook', passport.authenticate('facebook', { 
  authType: 'rerequest', scope }))
router.get('/login/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login/facebook'
}), (req, res) => {
  res.redirect(`/${req.user.user_id}`)
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout()
    res.redirect('/')
  })
})

export default router
