const express = require('express')
const router = express.Router()
const {userRegistration, userLogin, getAllUsers, getUserById, updateUser, deleteUser, getUserBySearch} = require('../controllers/userCon')
const {authUser, authRole} = require('../middlewares/auth')

// Register user router
router.post('/register', authUser, authRole(['admin']), userRegistration)

// Login user router
router.post('/login', userLogin)

// Get all users router
router.get('/', authUser, authRole(['admin']), getAllUsers)

// Get user by id router
router.get('/:userId', authUser, authRole(['admin', 'normal']), getUserById)

// Update user by id router
router.put('/:userId', authUser, authRole(['admin', 'normal']), updateUser)

// Delete user by id router
router.delete('/:userId', authUser, authRole(['admin']), deleteUser)

// Get users by search router
router.get('/search/:query', authUser, authRole(['admin']), getUserBySearch)

module.exports = router