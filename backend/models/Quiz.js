const mongoose = require('mongoose')

// Create user schema
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Enter a title!']
    },
    quizImage: {
        type: String,
        required: [true, 'Select an image!']
    },
    quizAns: {
        type: String,
        required: [true, 'Enter an user type!'],
        enum: {
            values: ['legitimate', 'phishing'],
            message: 'Enter either legitimate or phishing as quiz answer!'
        }
    }
})

module.exports = mongoose.model('Quiz', quizSchema)