const authRouter = require('./auth')
const userRouter = require('./user')

function routes (app) {
    app.use('/api/auth', authRouter)

    app.use('/api/users', userRouter)
}

module.exports = routes