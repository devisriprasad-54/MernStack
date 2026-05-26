import exp from "express"
import {register,authenticateUser} from '../Services/authService.js'
import UserTypeModel from '../Models/UserModel.js'
import { verifyToken } from "../Middlewares/verifyToken.js"
import bcrypt from 'bcrypt'
 const commonRouter = exp.Router()

//login
commonRouter.post('/login',async(req,res)=>{
    try {
        //get user credentials from request body
        const userObj=req.body
        console.log(`DEBUG: login request body:`, JSON.stringify(userObj))
        // determine the role from the request body, defaulting to 'USER' if not provided
        // Use a separate variable to avoid conflict if userObj already has a 'role' key
        const userRole = (userObj.role || 'USER').toUpperCase()
        
        console.log(`Login attempt for ${userObj.email} as ${userRole}`)

        //authenticate user
        const {user,token}=await authenticateUser({...userObj, role: userRole})
        
        console.log(`Login successful for ${userObj.email}`)

        //save token in cookie
        res.cookie('token',token,{httpOnly:true,sameSite:'none',secure:true})
        //send response
        res.status(200).json({message:"User authenticated",payload:user})
    } catch(err) {
        console.log(`Login failed for ${req.body.email || "unknown"}: ${err.message}`)
        res.status(err.status||500).json({message:err.message||"Login failed"})
    }
})
//forgot password
commonRouter.post('/forgot-password', async (req, res) => {
    try {
        const { email, role, newPassword } = req.body;
        if(!email || !role || !newPassword) {
            return res.status(400).json({ message: "Email, role and new password are required" });
        }
        
        // find user
        const user = await UserTypeModel.findOne({ email, role: role.toUpperCase() });
        if(!user) {
            return res.status(404).json({ message: "User not found with this email and role" });
        }
        
        // hash new password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        
        res.status(200).json({ message: "Password reset successful. You can now login." });
    } catch(err) {
        console.log(`Forgot password failed for ${req.body.email}: ${err.message}`);
        res.status(500).json({ message: "Failed to reset password" });
    }
});

//logout
commonRouter.get('/logout',(req,res)=>{
    //clear the cookie named 'token'
    res.clearCookie('token',{
        httpOnly:true,//for server security from client
        sameSite:'none',//for cross domain requests
        secure:true//for https
    })
    res.json({message:"Logged out successfully"})
})
//change password(protected route)
commonRouter.put('/change-password', verifyToken('USER', 'AUTHOR', 'ADMIN'), async (req, res) => {
   //get current password and new password
   const {email,currentPassword,newPassword}=req.body
   //check the current password is correct or not
   const user=await UserTypeModel.findOne({email})
   if(!user)
   {
    return res.status(200).json({message:"user not exists"});
   }
   const isMatch=await bcrypt.compare(currentPassword,user.password)
   if(!isMatch)
   {
    return res.status(200).json({message:"password not match"});
   }
   if(currentPassword===newPassword)
   {
    return res.status(200).json({message:"new password should be different from current password"});
   }
   //replace current password with new password
   user.password=await bcrypt.hash(newPassword,10)
   //save the new password 
   await user.save()
   //send response
   res.status(200).json({message:"password changed successfully",user});
})

//get user by token
commonRouter.get('/user', verifyToken('USER', 'AUTHOR', 'ADMIN'), (req, res) => {
    res.status(200).json({ message: "User session found", payload: req.user })
})

//page refresh
commonRouter.get('/check-auth',verifyToken("USER","AUTHOR","ADMIN"),(req,res)=>{
    res.status(200).json({
        message:'authenticated',
        payload:req.user
    })
})
export default commonRouter