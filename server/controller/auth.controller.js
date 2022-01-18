/* eslint-disable no-lonely-if */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')

const config = require('../config')
const db = require('../model')

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
const { user: User, role: Role, refreshToken: RefreshToken } = db

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  // eslint-disable-next-line no-shadow
  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (error, roles) => {
          if (err) {
            res.status(500).send({ message: error })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((e) => {
            if (error) {
              res.status(500).send({ message: e })
              return
            }

            res.send({ message: 'User was registered successfully!' })
          })
        }
      )
    } else {
      Role.findOne({ name: 'user' }, (error, role) => {
        if (error) {
          res.status(500).send({ message: error })
          return
        }

        user.roles = [role._id]
        user.save((e) => {
          if (err) {
            res.status(500).send({ message: e })
            return
          }

          res.send({ message: 'User was registered successfully!' })
        })
      })
    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate('roles', '-__v')
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        res.status(404).send({ message: 'User Not found.' })
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        })
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      })

      const refreshToken = await RefreshToken.createToken(user)

      const authorities = []

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`)
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        refreshToken
      })
    })
}

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body

  if (requestToken == null) {
    return res.status(403).json({ message: 'Refresh Token is required!' })
  }

  try {
    const refreshToken = await RefreshToken.findOne({ token: requestToken })

    if (!refreshToken) {
      res.status(403).json({ message: 'Refresh token is not in database!' })
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec()

      res.status(403).json({
        message: 'Refresh token was expired. Please make a new signin request'
      })
    }

    const newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration
    })

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token
    })
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}

exports.googleAuth = async (req, res) => {
  // const { token } = req.body

  const refreshToken = await RefreshToken.findOne({ token: req.body.token })

  client
    .verifyIdToken({
      idToken: req.body.token,
      audience: config.REACT_APP_GOOGLE_CLIENT_ID
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            console.log('error')
            return res.status(403).json({
              message: 'Something went wrong...'
            })
          } else {
            if (user) {
              const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
              })
              const authorities = []

              for (let i = 0; i < user.roles.length; i++) {
                authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`)
              }

              res.json({
                id: user._id,
                username: user.name,
                email: user.email,
                roles: authorities,
                accessToken: token,
                refreshToken
              })
              console.log('user exist')
              return () => {}
            } else {
              const password = bcrypt.hashSync(`${email}$${config.REACT_APP_GOOGLE_CLIENT_ID}`, 8)
              const newUser = new User({ username: name, email, password, picture, roles: [] })

              // get role

              Role.findOne({ name: 'user' }, (error, role) => {
                if (error) {
                  res.status(500).send({ message: error })
                  return
                }

                newUser.roles = [role._id]
              })

              newUser.save((error, data) => {
                if (error) {
                  return res.status(403).json({
                    message: 'Something went wrong...'
                  })
                }
                const token = jwt.sign({ id: data._id }, config.secret, {
                  expiresIn: config.jwtExpiration
                })
                res.json({
                  id: newUser._id,
                  username: newUser.name,
                  email: newUser.email,
                  roles: newUser.roles,
                  accessToken: token,
                  refreshToken
                })
              })
              console.log('user is created')
            }
          }
          return () => {}
        })
      }
    })

  // const ticket = await client.verifyIdToken({
  //   idToken: token,
  //   audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
  // })
  // const { name, email, picture } = ticket.getPayload()
  // const user = await db.user.upsert({
  //   where: { email },
  //   update: { name, picture },
  //   create: { name, email, picture }
  // })
  // res.status(201)
  // res.json(user)
}

// exports.logout = await (req,res) => {
//   await req.session.destroy();
//   res.status(200);
//   res.json({
//       message: "Logged out successfully"
//   });
//   return ()=> {}
// }
exports.logout = async (req, res) => {
  await req.session.destroy()
  res.status(200)
  res.json({
    message: 'Logged out successfully'
  })
}
