const Schema = require('../model/account.model')

exports.getAll = async (req, res) => {
  const list = await Schema.find({})
  return res.json({ status: 'ok', data: list })
}

// exports.getById = async (req, res) => {
//   const list = await Schema.find({ userId: req.params.id })
//   return res.json({ status: 'ok', data: list })
// }

exports.getByPage = async (req, res) => {
  const { page, id } = req.params
  try {
    const LIMIT = 1 // process.env.NUMBER_OF_PAGES
    const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page

    const total = await Schema.countDocuments({ userId: id })
    const posts = await Schema.find({ userId: id })
      // .sort({ id_autoparts: -1 })
      .limit(LIMIT)
      .skip(startIndex)

    res.json({
      status: 'ok',
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT)
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
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
