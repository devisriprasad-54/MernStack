import ex from 'express'
import UserTypeModel from '../Models/UserModel.js'
import ArticleTypeModel from '../Models/ArticleModel.js'
import {register,authenticateUser} from '../Services/authService.js'
import {CheckAuthor} from '../Middlewares/CheckAuthor.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import upload from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

const AuthorRouter=ex.Router()
//DRY principle-Don't Repeat Yourself
//Register author
AuthorRouter.post(
  "/users",
  upload.single("profileImageUrl"),
  async (req, res, next) => {
    let cloudinaryResult;

    try {
      let authorObj = req.body;

      //  Step 1: upload image to cloudinary from memoryStorage (if exists)
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      // Step 2: call existing register()
      const newAuthorObj = await register({
        ...authorObj,
        role: "AUTHOR",
        profileImageUrl: cloudinaryResult?.secure_url,
      });

      res.status(201).json({
        message: "Author created",
        payload: newAuthorObj,
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
//authenticate author
AuthorRouter.post('/login',async(req,res)=>{
    try{
        //get user credentials from request body
        const userObj=req.body
        //authenticate user
        let {user,token}=await authenticateUser({...userObj,role:'AUTHOR'})
        //save token in cookie
        res.cookie('token',token,{httpOnly:true,sameSite:'none',secure:true})
        //send response
        res.status(200).json({message:"User authenticated",user})
    }catch(err){
        res.status(err.status||500).json({message:err.message})
    }
})
//create article(protected route)
AuthorRouter.post('/articles',verifyToken('AUTHOR'),async(req,res)=>{
    try {
        const articleObj=req.body 
        const article=new ArticleTypeModel(articleObj)
        await article.save()
        res.status(201).json({message:"Article created",article})
    } catch(err) {
        res.status(err.status || 500).json({message:err.message || "Failed to create article"})
    }
})
//edit article(protected route)
AuthorRouter.put('/articles/:articleid/:authorid',verifyToken('AUTHOR'),async(req,res)=>{
  const articleid  = req.params.articleid;
  const authorid=req.params.authorid;
  const {title,content,category } = req.body

  let article = await ArticleTypeModel.findOne({
    _id: articleid,
    author: authorid
  })

  if (!article)
    return res.status(404).json({ message: "Article not found" })

  if (title) article.title = title
  if (content) article.content = content
  if (category) article.category = category

  await article.save()

  res.status(200).json({ message: "Article updated", article })
})
//read articles of author(protected route)
AuthorRouter.get('/articles/:id',verifyToken('AUTHOR'),async(req,res)=>{
    let authorid=req.params.id
    // Return all articles belonging to this author, whether active or soft-deleted
    let articles=await ArticleTypeModel.find({author:authorid}).populate("author")
    if(articles.length===0) return res.status(404).json({message:"Articles not found"})
    res.status(200).json({message:"Articles",articles})
})
//delete(soft delete) article(Protected route)
AuthorRouter.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleTypeModel.findById(id); //.populate("author");
  //console.log(article)
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" && 
    article.author.toString() !== req.user.userId) {
    return res
    .status(403)
    .json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    article,
  });
});
export default AuthorRouter