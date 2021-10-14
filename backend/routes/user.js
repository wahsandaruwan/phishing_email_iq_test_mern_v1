const express = require('express')
const router = express.Router()
const {userRegistration} = require('../controllers/userCon')

// Register router
router.post('/register', userRegistration)

// Login router
router.post('/login', (req, res) => {
    res.send(req.body)
})

module.exports = router