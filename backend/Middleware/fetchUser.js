const jwt = require('jsonwebtoken');

const JWT_SECRET="thisisakshay";

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({error: 'please authenticate first'});
    }
    try{
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
    }
    catch(error){
        return res.status(401).json({error: 'please authenticate first'});
        
    }
}
module.exports = fetchUser;