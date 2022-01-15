const express = require('express')
const monthController = require('../controller/month')

const router = express.Router()

// router.get('/account/', accountController.getAll)
router.get('/month/:id', monthController.getById)
router.patch('/month/:id', monthController.update)
router.post('/month/', monthController.create)
router.delete('/month/:id', monthController.delete)

module.exports = router
