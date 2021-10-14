const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.userRegistration = async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    // Password hashing
    const hashPass = password !== undefined ? await bcrypt.hash(password, 8) : undefined

    // Check if email already exist
    const user = await User.findOne({email})
    if(user){
        return res.status(403).json({error: {message: 'Email already exist!'}})
    }

    // Create a new user
    const newUser = new User({firstName, lastName, email, password: hashPass})
    try{
        await newUser.save()
        res.status(200).json({error: {message: 'User successfully registered!'}})
    }catch(err){
        res.status(403).json({error: {message: constructErr(err)}})
    }
}

exports.userLogin = async (req, res) => {
    const {email, password} = req.body

    // Check if email matches
    const user = await User.findOne({email})
    if(!user){
        return res.status(403).json({error: {message: 'Wrong email address!'}})
    }

    // Check if password matches
    if(password !== user.password){
        return res.status(403).json({error: {message: 'Wrong password!'}})
    }

    res.status(200).json({error: {message: 'User successfully logged in!'}})
}

// Construct array of db validation errors
function constructErr(err){
    let arr = new Array()
    Object.entries(err.errors).forEach((value, index) => {     
        arr.push(value[1].message) 
    })
    return arr
}