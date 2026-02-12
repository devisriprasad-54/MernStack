import express from 'express';
import { ProductModel } from '../modules/ProductModule.js';


export const productAPI = express.Router();

// Route to create new product
productAPI.post('/products', async (req, res) => {
   try {
      // Get product data from request body
      const productObj = req.body;
      // Create and save product in one step
      const product = await ProductModel.create(productObj);
      // Send success response
      res.status(201).json({
         message: "Product is added",
         payload: product
      });

   } catch (error) {
      res.status(400).json({
         error: error.message
      });
   }
});
