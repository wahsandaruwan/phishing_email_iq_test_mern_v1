const Test = require('../models/Test')

// Get all tests
exports.getAllTests = async (req, res) => {
    try{
        const tests = await Test.find()
        res.status(200).json(tests)
    }catch(err){
        res.json({errors: {message: err.message}})
    }
}

// Add new test
exports.addTest = async (req, res) => {
    const {userEmail, currentDate, currentTime, timeDuration, correct, recommendation} = req.body

    // Create a new user
    const newTest = new Test({
        userEmail,
        currentDate, 
        currentTime, 
        timeDuration, 
        correct, 
        recommendation
    })
    console.log(newTest)
    try{
        await newTest.save()
        res.status(200).json({created: true, success: {message: "Successfully created a new test!"}})
    }catch(err){
        res.json({errors: {message: Object.entries(err.errors)[0][1].message}})
    }
}

// Get all test by user email
exports.getTestsByEmail = async (req, res) => {
    const { userEmail } = req.params

    try {
        const tests = await Test.find({userEmail})
        res.status(200).json(tests)
    } catch (err) {
        res.json({ errors: {message: err.message} })
    }
}