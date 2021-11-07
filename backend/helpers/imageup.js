const multer = require('multer')

// Image uploading
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../frontend/public/uploads/")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        callback(null, true)
    }
    else{
        callback(null, false)
    }
}

exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single("quizImage")