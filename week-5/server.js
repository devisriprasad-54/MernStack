import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv'; 
import { userRouter } from './APIs/UserAPI.js';
import { authorRouter } from './APIs/AuthorAPI.js';
import { adminRouter } from './APIs/AdminAPI.js';  
import cookieParser from 'cookie-parser';
import { commonRouter } from './APIs/commonAPI.js';
config() //process.env

const app = exp()
// add body parser middleware
app.use(exp.json())
//cookie parser middleware
app.use(cookieParser())
// connect api
app.use("/user-api",userRouter)
app.use("/author-api",authorRouter)
app.use("/admin-api",adminRouter)
app.use("/common-api",commonRouter)


const connection = async() => {
    try
    {
    //connect to db
    await connect(process.env.DB_URL)
    console.log("Connected to DB")
    //start http server
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
    }
    catch(error){
        console.log('Error: ',error)
    }
};
connection()

app.use("/test",(req,res)=>{
    res.json({message:`${req.url} is invalid path`})
});

//error handling middleware
app.use((err,req,res,next)=>{
    console.log('Error: ',err)
    res.status(500).json({message:"Internal Server Error"})
})

