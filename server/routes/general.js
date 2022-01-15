const express = require('express')
const generalController = require('../controller/general')

const router = express.Router()

router.get('/general/', generalController.get)
router.patch('/general/', generalController.update)
router.post('/general/', generalController.create)

module.exports = router
