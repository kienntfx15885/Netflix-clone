const authRouter = require('./auth')
const userRouter = require('./user')
const movieRouter = require('./movie')

function routes (app) {
    app.use('/api/auth', authRouter)

    app.use('/api/users', userRouter)

    app.use('/api/movies', movieRouter)
}

module.exports = routes