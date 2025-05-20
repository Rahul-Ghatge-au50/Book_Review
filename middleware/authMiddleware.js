const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {

    //It checks if `authorization` exists, then splits it to get the token part
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({message:'Not Authorized'});

    try{
        // Verify the token using the JWT secret key
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(error){
        res.status(401).json({message:'Not Authorized'});
    }
};

module.exports = authMiddleware;