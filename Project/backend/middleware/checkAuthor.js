import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';

export const checkAuthor = async (req, res, next) => {
    //get author id from decoded token (set by verifyToken middleware) or from request
    let authorId = req.user?.id || req.body?.author || req.params?.authorId;

    //check if authorId exists
    if (!authorId) {
        return res.status(401).json({ message: "author id not found" })
    }
    //verify author
    let authorObj = await UserModel.findById(authorId);
    // if author not found
    if (!authorObj) {
        return res.status(401).json({ message: "author not found" })
    }
    // if author is not author
    if (authorObj.role !== "AUTHOR") {
        return res.status(403).json({ message: "user is  not authorized" })
    }
    // if author is not active
    if (!authorObj.isActive) {
        return res.status(403).json({ message: "author account is not active" })
    }
    //forward request to nect
    next();
};