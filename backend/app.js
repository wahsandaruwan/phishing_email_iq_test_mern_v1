const express = require('express')
const app = express()
const PORT = 3300

app.get('/', (req, res) => {
    res.send("Welcome!")
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})