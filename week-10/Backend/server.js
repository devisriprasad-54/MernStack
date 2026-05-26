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
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config()
const app = exp()

//use cors middleware
app.use(cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (mobile apps, curl requests)
      if (!origin) {
        return callback(null, true);
      }
      
      // Allow all Vercel domains, localhost, and Render domains
      const allowedPatterns = [
        'vercel.app',
        'localhost',
        'onrender.com'
      ];
      
      const isAllowed = allowedPatterns.some(pattern => origin.includes(pattern));
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, false); // Silently reject non-allowed origins
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    maxAge: 86400
}))
//add body parser middleware
app.use(exp.json())//to parse the incoming requests with JSON payloads
//cookie parser middleware
app.use(cookieParser())

// Serve static files from Frontend dist
app.use(exp.static(path.join(__dirname, '../Frontend/dist')))
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

// Serve React frontend for all other routes (SPA)
app.use('/', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/user-api') || req.path.startsWith('/author-api') || req.path.startsWith('/admin-api') || req.path.startsWith('/common-api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'))
})

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