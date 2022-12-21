const express = require('express')
const router = express.Router()
const movieController = require('../app/controllers/MovieController')
const verifyToken = require('../app/middlewares/verifyToken')

router.post('/create', verifyToken, movieController.create)

router.get('/random', verifyToken, movieController.random)

router.get('/:slug', verifyToken, movieController.show)

router.get('/', verifyToken, movieController.showAll)

router.put('/:_id', verifyToken, movieController.update)

router.delete('/:_id', verifyToken, movieController.delete)

module.exports = router