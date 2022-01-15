const mongoose = require('mongoose')

const General = new mongoose.Schema({
  USD: {
    type: Number,
    required: true
  },
  EUR: {
    type: Number,
    required: true
  },
  updateDate: {
    type: Date,
    required: false,
    default: () => new Date()
  }
})

module.exports = mongoose.model('general', General)
