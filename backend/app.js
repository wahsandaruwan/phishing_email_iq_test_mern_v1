const express = require('express')
const app = express()
const PORT = 3300
require('./helpers/mongodb_init')
const userRoutes = require('./routes/user')
const {authUser} = require('./middlewares/auth')
const quizRoutes = require('./routes/quiz')
const testRoutes = require('./routes/test')
const cors = require('cors')

// Common middlewares
app.use(cors())
app.use(express.json())

// Basic route
app.get('/', (req, res) => {
    res.send("Welcome to phishing quiz!")
})

// Quiz routes middleware
app.use('/api/quizes', authUser, quizRoutes)

// User routes middleware
app.use('/api/users', userRoutes)

// Test routes middleware
app.use('/api/tests', authUser, testRoutes)

// Middleware for undefined routes
app.use((req, res) => {
    res.status(404).json({error: {message: "Not found!"}})
})

// Bind and listen the connection on host and port
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
