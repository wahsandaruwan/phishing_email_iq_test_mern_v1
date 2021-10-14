const express = require('express')
const router = express.Router()
const {userRegistration, userLogin} = require('../controllers/userCon')
const {authUser, authRole} = require('../middlewares/auth')

// Register user router
router.post('/register', authUser, authRole(['admin']), userRegistration)

// Login user router
router.post('/login', userLogin)

module.exports = router