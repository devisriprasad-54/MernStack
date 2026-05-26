
import UserTypeModel from "../Models/UserModel.js"
export const CheckAuthor = async(req,  res, next) => {
    //get author id
    let authorid=req.body?.author||req.params.id
    //check the author is active
    let author=await UserTypeModel.findById(authorid)
    if(!author){
        return res.status(401).json({message:"Author not found"})
    }
    if(author.role!='AUTHOR' ){
        return res.status(403).json({message:"user  is not an author"})
    }
    if(!author.isActive){
        return res.status(403).json({message:"author is not active"})
    }
    //forward the request to next middleware
    next()
}