import exp from "express"
import { authenticate } from "../services/authService.js";
import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs"
export const commonRouter=exp.Router()

//login

commonRouter.post("/login",async(req,res)=>{
 //get user cred obj
        let userCred = req.body;
        //call authenticate service
        let { token, user } = await authenticate({ ...userCred });
        //save response token as httpOly cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        });
    
        //send response
        res.status(200).json({ message: "User authenticated successfully", payload: user })
});


//logout
commonRouter.get("/logout",async(req,res)=>{
    // clear cookie
    res.clearCookie('token',
        {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        }
    );
    //send response
    res.status(200).json({ message: "User logged out successfully" });
});

//change the password
commonRouter.put("/change-password",async(req,res)=>{
    //get current password and new password
    let {userId,currentPassword,newPassword}=req.body;
    //check the current password is correct   
    const user=await UserModel.findById({_id:userId}) 
    let isCurrentPasswordValid=await bcrypt.compare(currentPassword,user.password)
    if(!isCurrentPasswordValid)
        {
        return res.status(401).json({message:"Invalid current password"})
    }
    //repalce the current password with new password
    user.password=await bcrypt.hash(newPassword,10);
    await user.save();
    //send req
    res.status(200).json({message:"Password changed successfully"})
})