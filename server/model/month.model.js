const mongoose = require('mongoose')
const uuid = require('uuid')

const Month = new mongoose.Schema({
  total: {
    type: Object,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: false
  },
  exchange: {
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

module.exports = mongoose.model('monthes', Month)
