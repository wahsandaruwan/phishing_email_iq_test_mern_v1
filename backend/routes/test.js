const express = require('express')
const router = express.Router()
const {getAllTests, addTest} = require('../controllers/testCon')
const {authRole} = require('../middlewares/auth')

// Get all quizes router
router.get('/', authRole(['admin', 'normal']), getAllTests)

// Add quiz router
router.post('/', authRole(['normal']), addTest)

module.exports = router