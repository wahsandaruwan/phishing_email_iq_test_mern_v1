const mongoose = require('mongoose')

// Create user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Enter an first name!'],
        minlength: [4, 'Minimum length of first name would be 6 characters'],
        maxlength: [50, 'Maximum length of first name would be 50 characters'],
        validate: [validateName, 'Enter first name only using letters']
    },
    lastName: {
        type: String,
        required: [true, 'Enter an last name!'],
        minlength: [4, 'Minimum length of last name would be 6 characters'],
        maxlength: [50, 'Maximum length of last name would be 50 characters'],
        validate: [validateName, 'Enter last name only using letters']
    },
    email: {
        type: String,
        required: [true, 'Enter an email!'],
        unique: [true, 'Enter an unique email!'],
        lowercase: [true, 'Enter email in lower case!'],
        validate: [validateEmail, 'Enter a proper email!']
    },
    password: {
        type: String,
        required: [true, 'Enter a password!'],
        minlength: [6, 'Minimum length of password would be 6 characters'],
        maxlength: [500, 'Maximum length of password would be 50 characters']
    }
})

// Custom email validation
function validateEmail(email){
    const regEx = /^[a-zA-Z\d\._-]+@[a-zA-Z\d_-]+\.[a-zA-Z\d\.]{2,}$/
    return regEx.test(email)
}

// Custom name validation
function validateName(name){
    const regEx = /^[a-zA-Z\s]+$/
    return regEx.test(name)
}

module.exports = mongoose.model('User', userSchema)