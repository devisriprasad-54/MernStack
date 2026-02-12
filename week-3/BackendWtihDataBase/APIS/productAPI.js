import express from 'express'
import { ProductModel } from '../model/productModel.js'
export const productApp = express.Router()

//Create Products
productApp.post('/products', async (req, res) => {
    let newProduct = req.body
    let newProductDoc = new ProductModel(newProduct)
    await ProductModel.create(newProductDoc)
    res.status(201).json({ message: "Product added" })


})

//Read Products
productApp.get('/products', async (req, res) => {
    let productList = await ProductModel.find()
    res.status(200).json({ message: "Products", payload: productList })
})

//Read products by Id
productApp.get('/products/:id', async (req, res) => {
    let objId = req.params.id
    let product = await ProductModel.findById(objId)
    res.status(200).json({ message: "Product ", payload: product })
})

//update Products by Id
productApp.put('/products/:id', async (req, res) => {
    let objId = req.params.id
    let modifiedProduct = req.body
    let latestProduct = await ProductModel.findByIdAndUpdate(objId, { ...modifiedProduct }, { new: true })
    res.status(200).json({ message: "Product Updated ", payload: latestProduct })
})

//delete Products by Id
productApp.delete('/products/:id', async (req, res) => {
    let objId = req.params.id
    await ProductModel.findByIdAndDelete(objId)
    res.status(200).json({ message: "Product Deleted " })
})