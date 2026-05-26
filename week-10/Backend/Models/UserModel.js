import {Schema,model} from "mongoose"
const userSchema = new Schema({
  firstName:{
    type:String,
    required:[true,"First name required"]
  },
  lastName:{
    type:String,
  },
  email:{
    type:String,
    required:[true,"Email required"],
    unique:[true,"Email already exists"]
  },
  password:{
    type:String,
    required:[true,"Password required"]
  },
  profileImageUrl:{
    type:String
  },
  role:{
    type:String,
    enum:["AUTHOR","USER","ADMIN"],
    required:[true,"{value} is not a valid role"]
  },
  isActive:{
    type:Boolean,
    default:true
  }
},{
    timestamps:true,
    strict:'throw',
    versionKey:false
})
//create model
const UserTypeModel = model("User",userSchema)
export default UserTypeModel