import ex from 'express'
import Articles from '../Models/ArticleModel.js'
import UserTypeModel from '../Models/UserModel.js'
import { register } from '../Services/authService.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
const AdminRouter = ex.Router()

// Register admin
AdminRouter.post('/users', async (req, res, next) => {
    try {
        const newAdmin = await register({ ...req.body, role: 'ADMIN' })
        res.status(201).json({ message: 'Admin created', payload: newAdmin })
    } catch (err) {
        next(err)
    }
})

//authenticate admin
//read all articles(optional)
// AdminRouter.get('/articles',async(req,res)=>{
//     let articles=await Articles.find();
//     if(!articles)
//     {
//         return res.status(200).json({message:"articles not exists"});
//     }
//     res.status(200).json({message:"articles are",payload:articles});
// })
//block users
AdminRouter.put('/block/:id', verifyToken('ADMIN'), async(req,res)=>{
    let id=req.params.id
    let user=await UserTypeModel.findById(id)
    if(!user)
    {
        return res.status(200).json({message:"user not exists"});
    }
    user.isActive=false
    await user.save()
    res.status(200).json({message:"user blocked",user});
})
//unblock users
AdminRouter.put('/unblock/:id', verifyToken('ADMIN'), async(req,res)=>{
    let id=req.params.id
    let user=await UserTypeModel.findById(id)
    if(!user)
    {
        return res.status(200).json({message:"user not exists"});
    }
    user.isActive=true
    await user.save()
    res.status(200).json({message:"user unblocked",user});
})

// Get all users
AdminRouter.get('/users-list', verifyToken('ADMIN'), async (req, res, next) => {
    try {
        const users = await UserTypeModel.find({ role: 'USER' });
        res.status(200).json({ message: "Users list fetched", payload: users });
    } catch (err) {
        next(err);
    }
});

// Get all authors
AdminRouter.get('/authors-list', verifyToken('ADMIN'), async (req, res, next) => {
    try {
        const authors = await UserTypeModel.find({ role: 'AUTHOR' });
        res.status(200).json({ message: "Authors list fetched", payload: authors });
    } catch (err) {
        next(err);
    }
});

export default AdminRouter
