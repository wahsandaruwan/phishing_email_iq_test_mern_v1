const User = require('../models/User')

exports.userRegistration = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    const user = await User.findOne({email})
    // Check if email already exist
    if(user){
        return res.status(403).json({error: {message: 'Email already exist!'}})
    }

    // Create a new user
    const newUser = new User({firstName, lastName, email, password})
    try{
        await newUser.save()
        res.status(200).json({error: {message: 'User successfully registered'}})
    }catch(err){
        res.status(403).json({error: {message: constructErr(err)}})
    }
}

// Construct array of db validation errors
function constructErr(err){
    let arr = new Array()
    Object.entries(err.errors).forEach((value, index) => {     
        arr.push(value[1].message) 
    })
    return arr
}