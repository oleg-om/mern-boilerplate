const mongoose = require('mongoose')
const uuid = require('uuid')

const Account = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'active'
  },
  place: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  id: {
    type: String,
    unique: true,
    default: () => uuid.v4()
  },
  date: {
    type: Date,
    required: false
  }
})

module.exports = mongoose.model('accounts', Account)
