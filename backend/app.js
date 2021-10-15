const express = require('express')
const app = express()
const PORT = 3300
require('./helpers/mongodb_init')
const userRoutes = require('./routes/user')
const {authUser} = require('./middlewares/auth')
const quizRoutes = require('./routes/quiz')
const cors = require('cors')

// Common middlewares
app.use(cors())
app.use(express.json())

// Basic route
app.get('/', (req, res) => {
    res.send("Welcome to phishing quiz!")
})

// For testing the authorization
// app.use('/api/protected', authUser, (req, res) => {
//     res.send(`Welcome ${req.user.firstName}`)
// })

app.use('/api/quizes', authUser, quizRoutes)

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