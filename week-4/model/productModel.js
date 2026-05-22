import { Schema, model } from "mongoose"

const productSchema = new Schema({
    pid:{
        type:String, 
        required: [true, "Product Id is required"],
        unique:true
    },
    productName:{
        type:String,
        required: [true, "Product name is required"],
    },
    price:{
        type:Number,
        required:[true,"Product price is required"],
    }
},{
    strict:"throw",
    timestamps:true
})

export const ProductModel=model("product",productSchema)