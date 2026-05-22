// Import Express framework to create API routes
import express from 'express';

// Import Mongoose user model to interact with users collection
import { userModel } from '../model/userModel.js';

// Import bcrypt functions for password hashing and verification
import { hash, compare } from 'bcryptjs';

// Import JWT library for token-based authentication
import jwt from 'jsonwebtoken';

// Create a router instance for user-related routes
export const userApp = express.Router();

import { verifytoken } from '../middleware/verifytoken.js';



// ======================================================
// USER API ROUTES
// ======================================================


// ------------------------------------------------------
// CREATE USER
// Route: POST /users-API/users
// Purpose:
//   - Register a new user
//   - Hash password before saving
//   - Store user securely in database
// ------------------------------------------------------
userApp.post('/users', async (req, res) => {

   // Extract new user data from request body
   // Example: { username, email, password }
   let newUser = req.body;

   // Hash the plain-text password
   // 7 = salt rounds (higher = more secure, slower)
   let hashedPassword = await hash(newUser.password, 12);

   // Replace original password with hashed password
   newUser.password = hashedPassword;

   // Create a new Mongoose document using user model
   let newUserDoc = new userModel(newUser);

   // Save the user document to MongoDB
   await newUserDoc.save();

   // Send success response to client
   res.status(201).json({
      message: "User created successfully",
      payload: newUserDoc
   });
});


// ------------------------------------------------------
// READ ALL USERS
// Route: GET /users-API/users
// Purpose:
//   - Fetch all users from database
// ------------------------------------------------------
userApp.get('/users', async (req, res) => {

   // Retrieve all user documents from MongoDB
   let users = await userModel.find();

   // Send list of users to client
   res.status(200).json({
      message: "List of users",
      payload: users
   });
});


// ------------------------------------------------------
// READ USER BY ID
// Route: GET /users-API/users/:id
// Purpose:
//   - Fetch a single user using MongoDB ObjectId
// ------------------------------------------------------
userApp.get('/users/:id', async (req, res) => {

   // Extract ObjectId from URL parameter
   let objId = req.params.id;

   // Find user document matching the given ObjectId
   let userObj = await userModel.findById(objId);

   // Send found user to client
   res.status(200).json({
      message: "User found",
      payload: userObj
   });
});


// ------------------------------------------------------
// UPDATE USER BY ID
// Route: PUT /users-API/users/:id
// Purpose:
//   - Update user details using ObjectId
//   - Partial updates supported
// ------------------------------------------------------
userApp.put('/users/:id', async (req, res) => {

   // Extract ObjectId from URL
   let objId = req.params.id;

   // Extract updated user data from request body
   let modifiedUser = req.body;

   // Update user in database
   // $set ensures only provided fields are updated
   // new: true returns updated document
   let latestUser = await userModel.findByIdAndUpdate(
      objId,
      { $set: { ...modifiedUser } },
      { new: true }
   );

   // Send updated user data
   res.status(200).json({
      message: "User modified",
      payload: latestUser
   });
});


// ------------------------------------------------------
// DELETE USER
// Route: DELETE /users-API/users/:id
// Purpose:
//   - Remove a user permanently from database
// ------------------------------------------------------
userApp.delete('/users/:id', async (req, res) => {

   // Extract ObjectId from URL parameters
   let objId = req.params.id;

   // Delete user document matching ObjectId
   let deletedObj = await userModel.findByIdAndDelete(objId);

   // Send confirmation response
   res.status(200).json({
      message: "User deleted successfully",
      payload: deletedObj
   });
});


// ------------------------------------------------------
// USER AUTHENTICATION (LOGIN)
// Route: POST /users-API/auth
// Purpose:
//   - Authenticate user credentials
//   - Verify password
//   - Generate JWT token
//   - Store token in HTTP-only cookie
// ------------------------------------------------------
userApp.post('/auth', async (req, res) => {

   // Extract login credentials from request body
   let { username, password } = req.body;

   // Find user in database by username
   let userOfDb = await userModel.findOne({ username });

   // If user does not exist, return error
   if (userOfDb === null) {
      return res.status(404).json({ message: "Invalid Username" });
   }

   // Compare entered password with hashed password in DB
   let status = await compare(password, userOfDb.password);

   // If password does not match, deny access
   if (status === false) {
      return res.status(401).json({ message: "Invalid Password" });
   }

   // Create JWT token containing username
   // expiresIn: token valid for 1 hour
   let signedToken = jwt.sign(
      { username: userOfDb.username },
      "secret",
      { expiresIn: '10s' }
   );

   // Store JWT in HTTP-only cookie
   // httpOnly → JS cannot access cookie (prevents XSS)
   // secure → false for localhost (true in production HTTPS)
   // sameSite → CSRF protection
   res.cookie('token', signedToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
   });

   // Send success response
   res.status(200).json({
      message: "Login Successful"
   });
});


// ------------------------------------------------------
// TEST ROUTE
// Route: GET /users-API/test
// Purpose:
//   - Verify users API is working
// ------------------------------------------------------
userApp.get('/test', verifytoken, (req, res) => {
   res.json('test route');
});