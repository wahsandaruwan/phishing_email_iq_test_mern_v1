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

// Generate jwt
function getLoginRegToken(user){
    return jwt.sign({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
    }, process.env.SECRET_KEY, {expiresIn: '10m'})
}

// Construct array of db validation errors
function constructErr(err){
    let arr = new Array()
    Object.entries(err.errors).forEach((value, index) => {     
        arr.push(value[1].message) 
    })
    return arr
}