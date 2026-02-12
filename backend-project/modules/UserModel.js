import { Schema, model } from "mongoose";

//create cart schema
const cartSchema = new Schema({
   product: {
      type: Schema.Types.ObjectId,
      ref: 'product'
   },
   quantity: {
      type: Number,
      default: 1,
      min: 1
   }
});

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, "name is required"]
   },
   email: {
      type: String,
      required: (true, "email is required"),
      unique: true,
   },
   password: {
      type: String,
      required: [true, "password is rrequired"],
   },
   cart: {
      type: [cartSchema],
   },


});
export const UserModel = model("user", userSchema)