const express = require('express')
const accountController = require('../controller/account')

const router = express.Router()

// router.get('/account/', accountController.getAll)
router.get('/account/:id', accountController.getById)
router.patch('/account/:id', accountController.update)
router.post('/account/', accountController.create)
router.delete('/account/:id', accountController.delete)

module.exports = router
