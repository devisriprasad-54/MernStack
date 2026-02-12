import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';
import dotenv from 'dotenv';
dotenv.config()

export const checkUser = async (req, res, next) => {
    //get user id from decoded token (set by verifyToken middleware)
    let userId = req.user?.id || req.body?.user || req.params?.userId;

    //check if userId exists
    if (!userId) {
        return res.status(401).json({ message: "user id not found" })
    }

    //verify user
    let userObj = await UserModel.findById(userId);
    // if user not found
    
    if (!userObj) {
        return res.status(401).json({ message: "user not found" })
    }
    // if user is not user
    if (userObj.role !== "USER") {
        return res.status(403).json({ message: "user is not authorized" })
    }
    // if user is not active
    if (!userObj.isActive) {
        return res.status(403).json({ message: "user account is not active" })
    }
    //forward request to next
    next();
}