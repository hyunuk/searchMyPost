import express from 'express'
import passport from 'passport'
const router = express.Router()
const scope = ['public_profile', 'user_posts']

router.get('/login/facebook', passport.authenticate('facebook', { scope }))
router.get('/login/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login/facebook'
}), (req, res) => {
  console.log(req)
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout()
    res.redirect('/')
  })
})

router.get('/me', (req, res) => {
  return res.status(200).send({ params: req.params, query: req.query, body: req.body, user: req.user })
})

export default router
