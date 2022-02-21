const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const {JWT_SECRET} = process.env;
    let auth = req.header('Authorization');
    if(auth) {
        let token = auth.split(" ")[1];
        if(!token) {
            return  res.status(300).json({message: "Please enter token."});
        }
    
        jwt.verify(token, JWT_SECRET, (err, data) => {
            if(err) {
                return res.status(300).json({message: "Invalid token or expired time"})
            }
            req.user = data;
            next()
        })
    }else {
        return  res.status(300).json({message: "Please enter header value"})
    }
}