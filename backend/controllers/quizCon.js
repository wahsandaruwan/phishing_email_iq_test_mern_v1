const Quiz = require('../models/Quiz')
const {upload} = require('../helpers/imageup')

// Get all quizes
exports.getAllQuizes = async (req, res) => {
    try{
        const quizes = await Quiz.find()
        res.status(200).json(quizes)
    }catch(err){
        res.json({errors: {message: err.message}})
    }
}

// Add a quiz
exports.addQuiz = async (req, res) => {
    upload(req, res, async (err) => {
        // Image errors
        if(err){
            return res.json({errors: {message: err.message}})
        }
        
        const {title, quizAns} = req.body
        const quizImage = req.file.filename

        // Check if quiz title already exist
        const quiz = await Quiz.findOne({title})
        if(quiz){
            return res.json({errors: {message: "Quiz title already exist!"}})
        }

        // Create new quiz
        const newQuiz = new Quiz({
            title,
            quizImage,
            quizAns
        })
        try{
            console.log("File upload1")
            await newQuiz.save()
            res.status(200).json({created: true, success: {message: "Quiz successfully created!"}})
        }catch(err){
            console.log("File upload2")
            res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
        }
    })
    
}

// Get quiz by id
exports.getQuizById = async (req, res) => {
    const {quizId} = req.params

    try{
        const quiz = await Quiz.findById(quizId)
        res.status(200).json(quiz)
    }catch(err){
        res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Update quiz
exports.updateQuiz = async (req, res) => {
    upload.single("quizImage")
    const {quizId} = req.params
    const {title, quizAns} = req.body
    const {quizImage} = req.file

    // Check if quiz title already exist
    const quiz = await Quiz.findOne({title: req.body.title})
    if(quiz){
        if(quiz.id !== quizId){
            return res.json({errors: {message: "Quiz title already exist!"}})
        }
    }

    try{
        await Quiz.findOneAndUpdate({_id: quizId}, {title, quizImage, quizAns}, {new: true, runValidators: true})
        res.status(200).json({created: true, success: {message: "Quiz successfully updated!"}})
    }catch(err){
        res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Delete quiz
exports.deleteQuiz = async (req, res) => {
    const {quizId} = req.params

    try{
        await Quiz.findByIdAndDelete(quizId)
        res.status(200).json({created: true, success: {message: "Quiz successfully deleted!"}})
    }catch(err){
        res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Get quizes by searching
exports.getQuizBySearch = async (req, res) => {
    try{
        const regexQuery = new RegExp(req.params.query, 'i')
        const quizes = await Quiz.find({$or: [{title: regexQuery}, {quizAns: regexQuery}]})
        res.status(200).json(quizes)
    }catch(err){
        res.status(403).json({errors: {message: err.message}})
    }
}