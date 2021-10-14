const mongoose = require('mongoose')
require('dotenv/config')

// DB connection
const dbConn = async () => {
    try{
        await mongoose.connect(process.env.DB_CONN)
        console.log("Connected to DB!")
    }catch(err){
        console.log(err.message)
    }
}

dbConn()