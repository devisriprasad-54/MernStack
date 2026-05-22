import { Schema, model } from 'mongoose';


//create user schema
const userSchema = new Schema({
   username: {
      type: String,
      required: [true, 'Username is required']
   },
   password: {
      type: String,
      required: [true, 'Password is required']
   },
   age: {
      type: Number,
      required: [true, 'Age is required']
   }
},
   {
      strict: 'throw',
      timestamps: true,
   }
);



// // create user model with that schema
export const userModel = model('user', userSchema);

