const mongoose = require('mongoose')
const uuid = require('uuid')

const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  color: {
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
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('categories', Category)
