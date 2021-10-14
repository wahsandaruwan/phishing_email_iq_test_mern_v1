const express = require('express')
const router = express.Router()
const {getAllQuizes, addQuiz, getQuizById, getQuizBySearch, updateQuiz, deleteQuiz} = require('../controllers/quizCon')

// Get all quizes router
router.get('/', getAllQuizes)

// Add quiz router
router.post('/', addQuiz)

// Get quiz by id router
router.get('/:quizId', getQuizById)

// Update quiz by id router
router.put('/:quizId', updateQuiz)

// Delete quiz by id router
router.delete('/:quizId', deleteQuiz)

// Get quiz by search router
router.get('/search/:query', getQuizBySearch)