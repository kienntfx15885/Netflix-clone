const express = require('express')
const router = express.Router()
const listController = require('../app/controllers/ListController')
const verifyToken = require('../app/middlewares/verifyToken')

router.post('/create', verifyToken, listController.create)

router.delete('/:_id', verifyToken, listController.delete)

router.get('/', verifyToken, listController.show)

module.exports = router