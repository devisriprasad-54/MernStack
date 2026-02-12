import { Schema, model } from "mongoose";

//product schema

const productSchema = new Schema({
   
   productName: {
      type: String,
      required: [true, "product name is requires"]
   },
   price: {
      type: Number,
      required: [true, "product price is required"]
   },
   brand: {
      type: String,
      required: [true, "product brand is required"]
   }
});

export const ProductModel = model("product", productSchema);