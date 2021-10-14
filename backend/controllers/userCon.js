const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')

// User registration
exports.userRegistration = async (req, res) => {
    const {firstName, lastName, userType, email, password} = req.body

    // Password hashing
    console.log(password)
    const hashPass = await bcrypt.hash(password, 8)

    // Check if email already exist
    const user = await User.findOne({email})
    if(user){
        return res.status(403).json({error: {message: "Email already exist!"}})
    }

    // Create a new user
    const newUser = new User({firstName, lastName, userType, email, password: password.length >= 6 ? hashPass : false})
    try{
        await newUser.save()
        res.status(200).json({success: {message: "Successfully created a new user!"}})
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// User login
exports.userLogin = async (req, res) => {
    const {email, password} = req.body

    // Check if email matches
    const user = await User.findOne({email})
    if(!user){
        return res.status(403).json({error: {message: "Wrong email address!"}})
    }

    // Check if password matches
    const passOk = await bcrypt.compare(password, user.password)
    if(!passOk){
        console.log(user.password)
        return res.status(403).json({error: {message: "Wrong password!"}})
    }
    // Get jwt
    const token = getLoginRegToken(user)
    res.status(200).json({success: token})
}

// Get all quizes
exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(403).json({errors: {message: err.message}})
    }
}

// Get user by id
exports.getUserById = async (req, res) => {
    const {userId} = req.params

    try{
        const user = await User.findById(userId)
        res.status(200).json(user)
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Update user
exports.updateUser = async (req, res) => {
    const {userId} = req.params
    const {email, password} = req.body

    // Password hashing
    const hashPass = await bcrypt.hash(password, 8)

    // Check if email already exist
    const user = await User.findOne({email})
    if(user){
        if(user.id !== userId){
            return res.status(403).json({error: {message: "Email already exist!"}})
        }
    }

    // Add hashed password
    req.body.password = password.length >= 6 ? hashPass : false
    try{
        await User.findOneAndUpdate({_id: userId}, req.body, {new: true, runValidators: true})
        res.status(200).json({success: {message: "User successfully updated!"}})
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    const {userId} = req.params

    try{
        await User.findByIdAndDelete(userId)
        res.status(200).json({success: {message: "User successfully deleted!"}})
    }catch(err){
        res.status(403).json({errors: {message: Object.entries(err.errors)[0][1].message}})
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
