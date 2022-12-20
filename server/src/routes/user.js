const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/UserController')
const verifyToken = require('../app/middlewares/verifyToken')


router.put('/:_id', verifyToken, userController.update)

router.delete('/:_id', verifyToken, userController.delete)

router.get('/find/:_id', verifyToken, userController.findOne)

router.get('/starts', verifyToken, userController.starts)

router.get('/', verifyToken, userController.getAll)

module.exports = router