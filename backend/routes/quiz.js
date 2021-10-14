const express = require('express')
const router = express.Router()
const {getAllQuizes, addQuiz, getQuizById, getQuizBySearch, updateQuiz, deleteQuiz} = require('../controllers/quizCon')
const {authRole} = require('../middlewares/auth')

// Get all quizes router
router.get('/', authRole(['admin']), getAllQuizes)

// Add quiz router
router.post('/', authRole(['admin']), addQuiz)

// Get quiz by id router
router.get('/:quizId', authRole(['admin']), getQuizById)

// Update quiz by id router
router.put('/:quizId', authRole(['admin']), updateQuiz)

// Delete quiz by id router
router.delete('/:quizId', authRole(['admin']), deleteQuiz)

// Get quiz by search router
router.get('/search/:query', authRole(['admin']), getQuizBySearch)

module.exports = router