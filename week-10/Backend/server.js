import exp from "express"
import {connect} from "mongoose"
import {config} from "dotenv"
import UserRouter from './APIs/UserAPI.js'
import AuthorRouter from './APIs/AuthorAPI.js'
import AdminRouter from  './APIs/AdminAPI.js'
import mongoose, { mongo } from "mongoose"
import cookieParser from "cookie-parser"  
import commonRouter from './APIs/CommonAPI.js' 
import cors from 'cors' 
config()
const app = exp()
//use cors middleware
app.use(cors({
    origin: true,
    credentials: true, // required to allow cookies to be sent/received cross-origin
}))
//add body parser middleware
app.use(exp.json())//to parse the incoming requests with JSON payloads
//cookie parser middleware
app.use(cookieParser())
//connect to DB
const connectDB=async()=>{
   try{ await connect(process.env.DB_URL)//process.env is used to access the environment variables
console.log("Connected to DB")
//start http server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
}catch(error){
    console.log(error)
}
}

connectDB()
//connect apis
app.use('/user-api',UserRouter)
app.use('/author-api',AuthorRouter)
app.use('/admin-api',AdminRouter)
app.use('/common-api',commonRouter)
//dealing with invalid paths
app.use((req,res)=>{
    res.status(404).json({message:`${req.url} is Invalid path`})
})
//error handling middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000 || (err.cause && err.cause.code === 11000) || (err.name === 'MongooseError' && err.message.includes('already exists'))) {
    return res.status(409).json({
      message: "Email already registered",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});