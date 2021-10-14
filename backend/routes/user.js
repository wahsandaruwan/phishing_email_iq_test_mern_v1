const express = require('express')
const router = express.Router()
const {userRegistration, userLogin} = require('../controllers/userCon')

// Register user router
router.post('/register', userRegistration)

// Login user router
router.post('/login', userLogin)

module.exports = router