import ex from 'express'
import ArticleTypeModel from '../Models/ArticleModel.js'
import UserTypeModel from '../Models/UserModel.js'
import {register,authenticateUser} from '../Services/authService.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import upload from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
const UserRouter=ex.Router()
//Register user
UserRouter.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );
//Autheticate user

//read all articles(protected route)
UserRouter.get('/articles',verifyToken('USER', 'AUTHOR', 'ADMIN'),async(req,res)=>{
    let articles = await ArticleTypeModel.find({ isArticleActive: true }).populate("author", "firstName lastName")
    res.status(200).json({message:"Articles",articles})
})
//Add comment to an article(protected route)
UserRouter.put('/articles',verifyToken('USER', 'AUTHOR'),async(req,res)=>{
    const {user,comment,articleId}=req.body
    //check user(req.user)
    if(user != req.user.userId)
    {
        return res.status(403).json({message:"Forbidden"})
    }

    //find arcticle by id and update
    let articleWithComment=await ArticleTypeModel.findOneAndUpdate({
        _id:articleId,
        isArticleActive:true
    },
    {$push:{comments:{user,comment}}}
    ,{new:true,runValidators:true}).populate("comments.user", "firstName lastName")
    if(!articleWithComment){
        return res.status(404).json({message:"Article not found"})
    }
    res.status(201).json({message:"Comment added",articleWithComment})
})
//read single article by id
UserRouter.get('/article/:id',verifyToken('USER', 'AUTHOR', 'ADMIN'),async(req,res)=>{
    const {id}=req.params
    let article=await ArticleTypeModel.findById(id)
      .populate("author","firstName lastName")
      .populate("comments.user", "firstName lastName")
    if(!article){
        return res.status(404).json({message:"Article not found"})
    }
    res.status(200).json({message:"Article",payload:article})
})

export default UserRouter