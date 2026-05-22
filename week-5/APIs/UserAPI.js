import exp from 'express'
import { register, login } from '../services/authService.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { checkUser } from '../middleware/checkUser.js'
import { ArticleModel } from '../models/ArticleModel.js'
export const userRouter = exp.Router()

//Register User
userRouter.post('/users', async (req, res) => {
    //get user obj
    let userObj = req.body;
    //call service
    const newUserObj = await register({ ...userObj, role: "USER" });
    //send response
    res.status(201).json({ message: 'user created successfully', payload: newUserObj });
});
//authenticate user
userRouter.post('/authenticate-user', async (req, res) => {
    //get user obj
    let userCredentials = req.body;
    //call service
    let { token, user } = await login(userCredentials);
    //send response
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false });
    res.status(200).json({ message: 'user logged in successfully', payload: user });
});

//read article of user
userRouter.get('/read-articles', verifyToken, checkUser, async (req, res) => {
    //get all active articles
    let articles = await ArticleModel.find({ isArticleActive: true }).populate("author", "firstName lastName email");
    res.status(200).json({ message: 'articles fetched successfully', payload: articles });
})

//add comment to an article