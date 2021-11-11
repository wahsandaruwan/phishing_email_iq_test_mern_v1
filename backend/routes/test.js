const express = require('express')
const router = express.Router()
const {getAllTests, addTest, getTestsByEmail} = require('../controllers/testCon')
const {authRole} = require('../middlewares/auth')

// Get all quizes router
router.get('/', authRole(['admin', 'normal']), getAllTests)

// Add quiz router
router.post('/', authRole(['normal']), addTest)

// Add quiz router
router.get('/:userEmail', authRole(['normal']), getTestsByEmail)

module.exports = router