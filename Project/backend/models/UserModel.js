import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        requires: [true, "First name is required"]
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        requires: [true, "Email is required"],
        unique: [true,"Email already exists"]
    },
    password: {
        type: String,
        requires: [true, "Password is required"]
    },
    profileImageURL: {
        type: String,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN", "AUTHOR"],
        requirs: [true, "{Value} is not valid"]
    },
    isActive: {
        type: Boolean,
        default: true
    },

}, {               
    timestamps: true,
    strict: "throw",
    versionKey: false
});

//create model
export const UserModel = model("User", userSchema)