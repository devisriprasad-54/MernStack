import exp from 'express'
import { register, login } from '../services/authService.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { UserModel } from '../models/UserModel.js'
import { checkAuthor } from '../middleware/checkAuthor.js'
import { verifyToken } from '../middleware/verifyToken.js'
export const authorRouter = exp.Router()

//Register Author(public)
authorRouter.post('/authors', async (req, res) => {
    //get user obj
    let userObj = req.body;
    //call service  
    const newUserObj = await register({ ...userObj, role: "AUTHOR" });
    //send response
    res.status(201).json({ message: 'author created successfully', payload: newUserObj });
});

//authenticate author(public)
authorRouter.post('/authenticate-author', async (req, res) => {
    //get user obj
    let userCredentials = req.body;
    //call service
    let { token, user } = await login(userCredentials);
    //send response
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false });
    res.status(200).json({ message: 'author logged in successfully', payload: user });
});

//create article(protected)
authorRouter.post('/articles', verifyToken, checkAuthor, async (req, res) => {
    //get article obj from req
    let articleObj = req.body;
    //check fro the author
    let authorObj = await UserModel.findById(articleObj.author);
    if (!authorObj) {
        return res.status(404).json({ message: "author not found" })
    }
    //create article document
    let newArticleObj = new ArticleModel(articleObj);
    //save
    let result = await newArticleObj.save();
    //sned response
    res.status(201).json({ message: 'article created successfully', payload: result });
});

//read article of author(protected) 
authorRouter.get('/articles/:authorId', verifyToken, checkAuthor, async (req, res) => {
    let authorId = req.params.authorId;
    //check the author
    // let authorObj = await UserModel.findById(authorId);
    // if (!authorObj) {
    //     return res.status(404).json({ message: "author not found" })
    // }
    // //get all articles of author
    let articles = await ArticleModel.find({ author: authorId, isArticleActive: true }).populate("author.user", "firstName", "lastName", "email");
    //send response
    res.status(200).json({ message: 'articles fetched successfully', payload: articles });
});


//edit artcle(protected)
authorRouter.put('/articles', verifyToken, checkAuthor, async (req, res) => {
    //get article obj from req
    let { articleId, title, category, content } = req.body;
    //find article
    let result = await ArticleModel.findById(articleId);
    if (!result) {
        return res.status(404).json({ message: "article not found" })
    }
    //check the article is published by the author received from client

    //update article document
    let updatedArticle = await ArticleModel.findByIdAndUpdate(articleId,
        {
            $set: { title, category, content }
        },
        { new: true }
    );
    //sned response
    res.status(201).json({ message: 'article updated successfully', payload: updatedArticle });
});

//delete(soft) article(protected)
authorRouter.delete('/articles/:articleId', verifyToken, checkAuthor, async (req, res) => {
    //find article
    let articleId = req.params.articleId;
    //check article is exist
    let articleObj = await ArticleModel.findById(articleId);
    if (!articleObj) {
        return res.status(404).json({ message: "article not found" })
    }
    //delete article
    let result = await ArticleModel.findByIdAndUpdate(articleId,
        {
            $set: { isArticleActive: false }
        },
        { new: true }
    );

    res.status(201).json({ message: 'article deleted successfully', payload: result });
});

//logout for user,author and admin
authorRouter.post('/logout', (req, res) => {
    //clear the cookie  
    res.clearCookie('token',
        {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        }
    );
    //send response
    res.status(200).json({ message: 'author logged out successfully' });
});
