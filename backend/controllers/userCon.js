const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')

exports.userRegistration = async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    // Password hashing
    const hashPass = password !== undefined ? await bcrypt.hash(password, 8) : undefined

    // Check if email already exist
    const user = await User.findOne({email})
    if(user){
        return res.status(403).json({error: {message: "Email already exist!"}})
    }

    // Create a new user
    const newUser = new User({firstName, lastName, email, password: hashPass})
    try{
        await newUser.save()
        // Get jwt
        const token = getLoginRegToken(newUser)
        res.status(200).json({success: token})
    }catch(err){
        res.status(403).json({error: {message: constructErr(err)}})
    }
}

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
        lastName: user.lastName
    }, process.env.SECRET_KEY, {expiresIn: '1m'})
}

// Construct array of db validation errors
function constructErr(err){
    let arr = new Array()
    Object.entries(err.errors).forEach((value, index) => {     
        arr.push(value[1].message) 
    })
    return arr
}