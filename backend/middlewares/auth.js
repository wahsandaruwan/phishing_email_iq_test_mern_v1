const jwt = require('jsonwebtoken')

// JWT validation
exports.authUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY)
                console.log(user)
                req.user = user
                return next()
            }catch(err){
                return res.status(404).json({error: {message: "Invalid or expired token!"}})
            }
        }
        return res.status(403).json({error: {message: "Authorization token must be Bearer [token]"}})
    }
    return res.status(403).json({error: {message: "Authorization header must be provided!"}})
}

// User role validation
exports.authRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.userType
        console.log(userRole)
        if(roles.includes(userRole)){
            next()
        }
        else{
            return res.status(401).json({error: {message: "You don't have permission!"}})
        }
    }
}