import express from 'express'

const router = express.Router()

router.get('/', function(req, res) {
  if (req.user) {
    res.send(`
      <h3>Login Success</h3>
      <a href="/posts">See posts</a><br>
      <input type="text" name="searchText">
      <input type="submit" value="Search"><br>
      <a href="/auth/logout">Logout</a><br>
      <p>
        ${JSON.stringify(req.user, null, 2)}
      </p>
    `)
  } else {
    res.send(`
      <h3>Node Passport FB Login</h3>
      <a href="/auth/login/facebook">Login with Facebook</a>
    `)
  }
})

export default router
