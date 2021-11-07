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

exports.upload = multer({
    storage: storage
}).single("quizImage")