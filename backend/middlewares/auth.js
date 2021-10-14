const jwt = require('jsonwebtoken')

// JWT validation
exports.authUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY)
                req.user = user
                return next()
            }catch(err){
                return res.status(404).json({error: {message: "Invalid or expired token!"}})
            }
        }
        else{
            return res.status(403).json({error: {message: "Authorization token must be Bearer [token]"}})
        }
    }
    else{
        return res.status(403).json({error: {message: "Authorization header must be provided!"}})
    }
}