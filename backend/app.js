const express = require('express')
const app = express()
const PORT = 3300
require('./helpers/mongodb_init')
const userRoutes = require('./routes/user')

// Basic route
app.get('/', (req, res) => {
    res.send("Welcome to phishing quiz!")
})

// User route middleware
app.use('/api/users', userRoutes)

// Bind and listen the connection on host and port
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})