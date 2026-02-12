import express from 'express';
import { hash } from 'bcryptjs';
import { UserModel } from '../modules/UserModel.js';
import { ProductModel } from '../modules/ProductModule.js';
import { cartModel } from '../modules/cartModel.js';

// Create a new Express router for user-related APIs
export const userAPI = express.Router();


// ------------------------------------------------------
// CREATE USER
// Route: POST /user-API/users
// Purpose:
// - Create a new user account
// - Hash the password before saving
// ------------------------------------------------------
userAPI.post('/users', async (req, res) => {
   try {
      // Read user data (name, email, password, etc.) from request body
      const newUser = req.body;

      // Hash the plain-text password for security
      // 12 = salt rounds (higher = more secure, slower)
      const hashedPassword = await hash(newUser.password, 12);
      newUser.password = hashedPassword;

      // Create a new MongoDB user document using the UserModel
      const newUserDoc = new UserModel(newUser);

      // Save the user document into the database
      await newUserDoc.save();

      // Send success response with created user data
      res.status(201).json({
         message: "User created successfully",
         payload: newUserDoc
      });

   } catch (error) {
      // If any error occurs (validation, DB issue), send error response
      res.status(400).json({
         error: error.message
      });
   }
});


// ------------------------------------------------------
// UPDATE USER (⚠️ LOGIC ISSUE – explained in comments)
// Route: PUT /users/:id
// NOTE:
// - This route currently CREATES a new user instead of updating
// - Normally, PUT should update existing user using findByIdAndUpdate
// ------------------------------------------------------
userAPI.put('/users/:id', async (req, res) => {
   try {
      // Read updated user data from request body
      const newUser = req.body;

      // Hash the new password before saving
      const hashedPassword = await hash(newUser.password, 12);
      newUser.password = hashedPassword;

      // This creates a NEW user document instead of updating
      const newUserDoc = new UserModel(newUser);

      // Save new user document
      await newUserDoc.save();

      // Send response
      res.status(201).json({
         message: "User created successfully",
         payload: newUserDoc
      });

   } catch (error) {
      // Handle errors
      res.status(400).json({
         error: error.message
      });
   }
});


// ------------------------------------------------------
// ADD PRODUCT TO USER CART
// Route: PUT /user-cart/user-id/:id/product-id/:pid
// Purpose:
// - Add product to cart
// - If product exists → increase quantity
// - If not → add new product with quantity = 1
// ------------------------------------------------------
userAPI.put('/user-cart/user-id/:id/product-id/:pid', async (req, res) => {

   // Read user ID and product ID from URL parameters
   let id = req.params.id;
   let pid = req.params.pid;

   // -----------------------------
   // STEP 1: Check if user exists
   // -----------------------------
   let user = await UserModel.findById(id);
   if (!user)
      return res.status(401).json({
         message: "User not found"
      });

   // -------------------------------
   // STEP 2: Check if product exists
   // -------------------------------
   let product = await ProductModel.findById(pid);
   if (!product)
      return res.status(401).json({
         message: "Product not found"
      });

   // --------------------------------------------------
   // STEP 3: Check if product already exists in the cart
   // --------------------------------------------------
   // user.cart is an array like:
   // [{ product: ObjectId, quantity: Number }]
   let exist = user.cart.find(
      item => item.product.toString() === pid
   );

   // -----------------------------------------------
   // STEP 4A: If product already exists in the cart
   // -----------------------------------------------
   if (exist) {

      // Increase quantity of the matched product by 1
      // cart.$ targets the matched cart item
      let updatedUser = await UserModel.findOneAndUpdate(
         { _id: id, "cart.product": pid },
         { $inc: { 'cart.$.quantity': 1 } },
         { new: true }
      ).populate('cart.product');

      // Send updated cart to client
      res.json({
         message: "The item has successfully added to cart",
         payload: updatedUser.cart
      });
   }

   // -----------------------------------------------
   // STEP 4B: If product does NOT exist in the cart
   // -----------------------------------------------
   else {

      // Push a new product object into the cart array
      let updatedUser = await UserModel.findOneAndUpdate(
         { _id: id },
         { $push: { cart: { product: pid, quantity: 1 } } },
         { new: true }
      ).populate('cart.product');

      // Send updated cart to client
      res.json({
         message: "The item has successfully added to cart",
         payload: updatedUser.cart
      });
   }
});


// ------------------------------------------------------
// GET USER WITH CART DETAILS
// Route: GET /users/:id
// Purpose:
// - Fetch user details
// - Populate product details inside cart
// ------------------------------------------------------
userAPI.get('/users/:id', async (req, res) => {

   // Read user ID from URL
   let id = req.params.id;

   // Find user and populate cart.product
   // Only return selected product fields (name, price, brand)
   let user = await UserModel
      .findById(id)
      .populate('cart.product', 'name price brand');

   // Send response
   res.json({
      message: "User cart details",
      payload: user
   });
});


// ------------------------------------------------------
// REMOVE / DECREASE PRODUCT FROM CART
// Route: DELETE /user-cart/user-id/:id/product-id/:pid
// Purpose:
// - If quantity > 1 → decrease quantity
// - If quantity == 1 → remove product from cart
// ------------------------------------------------------
userAPI.delete('/user-cart/user-id/:id/product-id/:pid', async (req, res) => {

   // Extract user ID and product ID from URL
   let { id, pid } = req.params;

   // -----------------------------
   // STEP 1: Check if user exists
   // -----------------------------
   let user = await UserModel.findById(id);
   if (!user)
      return res.status(404).json({
         message: "User not found"
      });

   // ---------------------------------------
   // STEP 2: Find the product inside the cart
   // ---------------------------------------
   let cartItem = user.cart.find(
      item => item.product.toString() === pid
   );

   // If product is not found in cart
   if (!cartItem) {
      return res.status(404).json({
         message: "Product not found in cart"
      });
   }

   let updatedUser;

   // ------------------------------------------------
   // STEP 3A: If quantity is greater than 1
   // ------------------------------------------------
   if (cartItem.quantity > 1) {

      // Decrease quantity by 1 using $inc
      updatedUser = await UserModel.findOneAndUpdate(
         { _id: id, "cart.product": pid },
         { $inc: { "cart.$.quantity": -1 } },
         { new: true }
      ).populate('cart.product');

      res.json({
         message: "Product quantity decreased",
         payload: updatedUser.cart
      });
   }

   // ------------------------------------------------
   // STEP 3B: If quantity is exactly 1
   // ------------------------------------------------
   else {

      // Remove the product completely from the cart
      updatedUser = await UserModel.findByIdAndUpdate(
         id,
         { $pull: { cart: { product: pid } } },
         { new: true }
      ).populate('cart.product');

      res.json({
         message: "Product removed from cart",
         payload: updatedUser.cart
      });
   }
});



