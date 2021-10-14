const express = require('express')
const router = express.Router()
const {userRegistration, userLogin} = require('../controllers/userCon')

// Register router
router.post('/register', userRegistration)

// Login router
router.post('/login', userLogin)

module.exports = router