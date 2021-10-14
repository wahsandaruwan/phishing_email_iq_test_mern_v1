const express = require('express')
const router = express.Router()
const {userRegistration, userLogin, getAllUsers, getUserById, updateUser} = require('../controllers/userCon')
const {authUser, authRole} = require('../middlewares/auth')

// Register user router
router.post('/register', authUser, authRole(['admin']), userRegistration)

// Login user router
router.post('/login', userLogin)

// Get all users router
router.get('/', getAllUsers)

// Get user by id router
router.get('/:userId', getUserById)

// Update user by id router
router.put('/:userId', updateUser)

// // Delete user by id router
// router.delete('/:userId', deleteUser)

// // Get users by search router
// router.get('/search/:query', getUserBySearch)

module.exports = router