const express = require('express')
const app = express()
const PORT = 3300
require('./helpers/mongodb_init')

// Basic route
app.get('/', (req, res) => {
    res.send("Welcome!")
})

// Bind and listen the connection on host and port
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})