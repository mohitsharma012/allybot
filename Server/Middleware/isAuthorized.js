const jwt = require('jsonwebtoken');
const isAuthorized = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.id = token_decode.id;
        next();
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
};

module.exports = {isAuthorized};
