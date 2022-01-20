/* eslint-disable no-plusplus */
const db = require('../model')

const { ROLES } = db
const User = db.user

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  // User.findOne({
  //   username: req.body.username
  // }).exec((err, user) => {
  //   if (err) {
  //     res.status(500).send({ message: err })
  //     return
  //   }

  //   if (user) {
  //     res.status(400).send({ message: 'Failed! Username is already in use!' })
  //     return
  //   }

  // Email
  User.findOne({
    email: req.body.email
  }).exec((error, usr) => {
    if (error) {
      res.status(500).send({ message: error })
      return
    }

    if (usr) {
      res.status(400).send({ message: 'Failed! Email is already in use!' })
      return
    }

    next()
  })
  // })
}

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        })
        return
      }
    }
  }

  next()
}

const сheckFields = (req, res, next) => {
  const ValidateEmail = (email) => {
    if (email.length > 2 && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
    //   alert('You have entered an invalid email address!')
    return false
  }
  const mediumPassword =
    /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/
  if (!ValidateEmail(req.body.email)) {
    res.status(400).send({
      message: `You have entered an invalid email address!`
    })
  }
  if (req.body.password.length > 5 && mediumPassword.test(req.body.password)) {
    res.status(400).send({
      message: `Password is not strong enough!`
    })
  }

  next()
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  сheckFields
}

module.exports = verifySignUp
