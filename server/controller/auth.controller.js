/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const db = require('../model')

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
    username: req.body.username
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
