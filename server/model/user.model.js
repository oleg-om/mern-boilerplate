const mongoose = require('mongoose')
const uuid = require('uuid')

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true,
    default: () => uuid.v4()
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ]
})

module.exports = mongoose.model('User', User)
