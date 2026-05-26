import {Schema,model} from 'mongoose'
//create user comment schema
const userCommentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User" //name of the model
    },
    comment:{
        type:String
    }
})
const articleSchema = new Schema({
  author:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:[true,"Author required"]
  },
  title:{
    type:String,
    required:[true,"Title required"]
  },
  content:{
    type:String,
    required:[true,"Content required"]
  },
  category:{
    type:String,
    required:[true,"Category required"]
  },
 comments:[userCommentSchema],
 isArticleActive:{
    type:Boolean,
    default:true
 }
},{
    timestamps:true,
    strict:'throw',
    versionKey:false,
    
})
//create article model
const ArticleModel = model("Article",articleSchema)
export default ArticleModel