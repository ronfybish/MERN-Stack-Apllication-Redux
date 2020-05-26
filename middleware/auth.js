const jwt=require('jsonwebtoken')
const JWT_TOKEN = require('config').get('JWT_TOKEN');

module.exports=(req,res,next)=>{
    console.log(req.user)
    //Get token from header
    const token=req.header('Authorization')
    
    
    if(!token){
        return res.status(404).json({msg:'No token,authorization denied'})
    }
    
    // Verify token
    try {
        const decoded=jwt.verify(token,JWT_TOKEN)
        console.log(decoded.user)
        req.user=decoded.user
        next()    
    } catch (error) {
        res.status(401).json({msg:'Token is not valid'})
    }

}