const express = require('express')
const app = express()
const PORT = 3300
require('./helpers/mongodb_init')

app.get('/', (req, res) => {
    res.send("Welcome!")
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})