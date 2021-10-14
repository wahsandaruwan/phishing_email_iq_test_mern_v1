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
    const {title, quizImage, quizAns} = req.body

    // Check if quiz title already exist
    const quiz = await Quiz.findOne({title})
    if(quiz){
        return res.status(403).json({error: {message: "Quiz title already exist!"}})
    }

    // Create new quiz
    const newQuiz = new Quiz({title, quizImage, quizAns})
    try{
        const quiz = await newQuiz.save()
        res.status(200).json(quiz)
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
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