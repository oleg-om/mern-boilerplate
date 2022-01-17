const express = require('express')
const categoryController = require('../controller/category')

const router = express.Router()

// router.get('/account/', categoryController.getAll)
router.get('/category/:id', categoryController.getById)
router.get('/category/:id/:page', categoryController.getByPage)
router.patch('/category/:id', categoryController.update)
router.post('/category/', categoryController.create)
router.delete('/category/:id', categoryController.delete)

module.exports = router
