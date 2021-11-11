const mongoose = require('mongoose')

// Create user schema
const testSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    currentDate: {
        type: String,
        required: true
    },
    currentTime: {
        type: String,
        required: true
    },
    timeDuration: {
        type: String,
        required: true
    },
    correct: {
        type: Number,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Test', testSchema)