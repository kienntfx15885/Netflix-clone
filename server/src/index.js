
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const db = require('./config/db')
const routes = require('./routes')

app.use(express.json())

// Connect DB
db.connect()

// Routes
routes(app)

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})