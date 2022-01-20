const verifySignUp = require('../middleware/verifySignUp')
const controller = require('../controller/auth.controller')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    next()
  })
  console.log(controller)
  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      verifySignUp.сheckFields
    ],
    controller.signup
  )

  app.post('/api/auth/signin', controller.signin)

  app.post('/api/auth/refreshtoken', controller.refreshToken)

  app.post('/api/auth/google', controller.googleAuth)

  app.post('/api/auth/logout', controller.logout)
}
