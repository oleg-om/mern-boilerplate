const Schema = require('../model/month.model')

exports.getAll = async (req, res) => {
  const list = await Schema.find({})
  return res.json({ status: 'ok', data: list })
}

exports.getById = async (req, res) => {
  const list = await Schema.find({ userId: req.params.id })
  return res.json({ status: 'ok', data: list })
}

exports.update = async (req, res) => {
  let list = await Schema.findOneAndUpdate(
    { id: req.params.id },
    { $set: req.body },
    { upsert: false, useFindAndModify: false }
  )
  list = await Schema.findOne({ id: req.params.id })
  return res.json({ status: 'ok', data: list })
}

exports.create = async (req, res) => {
  const item = new Schema(req.body)
  await item.save()
  return res.json({ status: 'ok', data: item })
}

exports.delete = async (req, res) => {
  await Schema.deleteOne({ id: req.params.id })
  return res.json({ status: 'ok', id: req.params.id })
}
