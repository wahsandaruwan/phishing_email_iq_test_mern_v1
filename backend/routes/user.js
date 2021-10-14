const express = require('express')
const router = express.Router()

// Register router
router.post('/register', (req, res) => {
    res.send('User Registration')
})

// Login router
router.post('/login', (req, res) => {
    res.send('User Login')
})

module.exports = router