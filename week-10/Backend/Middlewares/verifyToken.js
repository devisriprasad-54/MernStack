import jwt from "jsonwebtoken"
import {config} from "dotenv"
config()
export const verifyToken = (...allowedRoles) => {
    return (req,res,next)=>{
    //read token from req
    let token=req.cookies.token
    if(!token) 
    {
        return res.status(401).json({message:"Unauthorized access"})
    }
    //verify the validity of the token(decoding the token)
    try{
    let decodedToken=jwt.verify(token,process.env.JWT_SECRET)
    if(!allowedRoles.includes(decodedToken.role))
    {
        return res.status(403).json({message:"Forbidden  you dont have access"})
    }
    req.user=decodedToken
    next()}
    catch(err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired" })
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" })
      }
      return res.status(401).json({ message: err.message })
    }
    }
    
}