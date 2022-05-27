const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {sendEmail} = require('../helpers/sendmail')
require('dotenv/config')

// User registration
exports.userRegistration = async (req, res) => {
    const {firstName, lastName, userType, email, password} = req.body

    // Password hashing
    const hashPass = await bcrypt.hash(password, 8)

    // Check if email already exist
    const user = await User.findOne({email})
    if(user){
        return res.json({errors: {message: "Email already exist!"}})
    }

    // Add hashed password
    const newPass = password.length >= 6 ? hashPass : false

    // Create a new user
    const newUser = new User({
        firstName,
        lastName,
        userType,
        email,
        password: newPass
    })
    console.log(newUser)
    try{
        await newUser.save()
        // Send email to user
        sendEmail(email, "Your Phishing Test Account has been Successfully Created!", password)
        res.status(200).json({created: true, success: {message: "Successfully created a new user!"}})
    }catch(err){
        res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// User login
exports.userLogin = async (req, res) => {
    const {email, password} = req.body

    if(email === ""){
        return res.json({errors: {message: "Enter an email address!"}})
    }
    else if(password === ""){
        return res.json({errors: {message: "Enter the password!"}})
    }
    else{
        // Check if email matches
        const user = await User.findOne({email})
        if(!user){
            return res.json({errors: {message: "Wrong email address!"}})
        }

        // Check if password matches
        const passOk = await bcrypt.compare(password, user.password)
        if(!passOk){
            console.log(user.password)
            return res.json({errors: {message: "Wrong Passwrod!"}})
        }
        // Get jwt
        const token = getLoginRegToken(user)
        res.status(200).json({auth: true, success: token, userInfo: user})
    }
}

// Get all users
exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        // console.log(users)
        res.status(200).json(users)
    }catch(err){
        res.json({errors: {message: err.message}})
    }
}

// Get user by id
exports.getUserById = async (req, res) => {
    const {userId} = req.params

    try{
        const user = await User.findById(userId)
        res.status(200).json(user)
    }catch(err){
        res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Update user
exports.updateUser = async (req, res) => {
    const {userId} = req.params
    const {email, password} = req.body
    let originalPass = ""

    // Password hashing
    const hashPass = await bcrypt.hash(password, 8)

    // Get existing user password using id
    const userById = await User.findOne({ _id: userId })
    console.log(password)
    if (userById) {
        if (password === "") {
            req.body.password = userById.password
        }
        else {
            originalPass = password
            // Add hashed password
            req.body.password = password.length >= 6 ? hashPass : false
        }
    }

    // Check if email already exist
    const userByEmail = await User.findOne({email})
    if(userByEmail){
        if(userByEmail.id !== userId){
            return res.status(403).json({errors: {message: "Email already exist!"}})
        }
    }

    try{
        await User.findOneAndUpdate({_id: userId}, req.body, {new: true, runValidators: true})
        // Send email to user
        if(originalPass){
            console.log(email)
            console.log(originalPass)
            sendEmail(email, "Your Phishing Test Account has been Successfully Updated!", originalPass)
        }
        res.status(200).json({created: true, success: {message: "User successfully updated!"}})
    }catch(err){
        res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    const {userId} = req.params

    try{
        await User.findByIdAndDelete(userId)
        res.status(200).json({created: true, success: {message: "User successfully deleted!"}})
    }catch(err){
        res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Get users by searching
exports.getUserBySearch = async (req, res) => {
    try{
        const regexQuery = new RegExp(req.params.query, 'i')
        const users = await User.find({$or: [{firstName: regexQuery}, {lastName: regexQuery}, {email: regexQuery}, {userType: regexQuery}]})
        res.status(200).json(users)
    }catch(err){
        res.status(403).json({errors: {message: err.message}})
    }
}

// Generate jwt
function getLoginRegToken(user){
    return jwt.sign({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
    }, process.env.SECRET_KEY, {expiresIn: '1h'})
}
