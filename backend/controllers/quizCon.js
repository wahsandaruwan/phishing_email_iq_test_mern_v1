const Quiz = require('../models/Quiz')

// Get all quizes
exports.getAllQuizes = async (req, res) => {
    try{
        const quizes = await Quiz.find()
        res.status(200).json(quizes)
    }catch(err){
        res.status(403).json({errors: {message: err.message}})
    }
}

// Add a quiz
exports.addQuiz = async (req, res) => {
    
}

// Get quiz by id
exports.getQuizById = async (req, res) => {
    
}

// Get quizes by searching
exports.getQuizBySearch = async (req, res) => {
    
}

// Update quiz
exports.updateQuiz = async (req, res) => {
    
}

// Delete quiz
exports.deleteQuiz = async (req, res) => {
    
}