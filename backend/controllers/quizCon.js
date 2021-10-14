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
        await newQuiz.save()
        res.status(200).json({success: {message: "Quiz successfully created!"}})
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Get quiz by id
exports.getQuizById = async (req, res) => {
    const {quizId} = req.params

    try{
        const quiz = await Quiz.findById(quizId)
        res.status(200).json(quiz)
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Update quiz
exports.updateQuiz = async (req, res) => {
    const {quizId} = req.params

    // Check if quiz title already exist
    const quiz = await Quiz.findOne({title: req.body.title})
    if(quiz){
        return res.status(403).json({error: {message: "Quiz title already exist!"}})
    }

    try{
        await Quiz.findByIdAndUpdate(quizId, req.body)
        res.status(200).json({success: {message: "Quiz successfully updated!"}})
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Delete quiz
exports.deleteQuiz = async (req, res) => {
    const {quizId} = req.params

    try{
        await Quiz.findByIdAndDelete(quizId)
        res.status(200).json({success: {message: "Quiz successfully deleted!"}})
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Get quizes by searching
exports.getQuizBySearch = async (req, res) => {
    
}