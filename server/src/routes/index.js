const authRouter = require('./auth')
const userRouter = require('./user')
const movieRouter = require('./movie')
const listRouter = require('./list')

function routes (app) {
    app.use('/api/auth', authRouter)

    app.use('/api/users', userRouter)

    app.use('/api/movies', movieRouter)

    app.use('/api/lists', listRouter)
}

module.exports = routes