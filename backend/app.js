const express = require('express')
const app = express()
const PORT = 3300
require('./helpers/mongodb_init')
const userRoutes = require('./routes/user')

// Common middlewares
app.use(express.json())

// Basic route
app.get('/', (req, res) => {
    res.send("Welcome to phishing quiz!")
})

// User route middleware
app.use('/api/users', userRoutes)

// Middleware for undefined routes
app.use((req, res) => {
    res.status(404).json({error: {message: "Not found!"}})
})

// Bind and listen the connection on host and port
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})