import express from 'express'

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.send(`
      <h3>Login Success</h3>
      <a href="/auth/logout">Logout</a>
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
});

export default router
