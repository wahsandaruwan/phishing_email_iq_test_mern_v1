const express = require('express')
const router = express.Router()

// Register router
router.post('/register', (req, res) => {
    res.send(req.body)
})

// Login router
router.post('/login', (req, res) => {
    res.send(req.body)
})

module.exports = router