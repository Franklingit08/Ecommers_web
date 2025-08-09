import Products from "../models/productModel.js";
import Users from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js'


const getProducts = asyncHandler(async (req, res) => { })



const getProductsByid = asyncHandler(async (req, res) => {
    let product = await Products.findById(req.params.id)
    if (product) {
        return res.json(products)
    } else {
        res.status(404)
        throw new Error('Product Not Found');
    }
})


const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, category, description, countInStock } = req.body;

    const image = req.file ? req.file.path : null;
    const product = await Products.create({
        user: req.user._id,
        name,
        brand,
        category,
        description,
        price,
        countInStock,
        image
    })
    if (product) {
        res.status(201).json(product);
    }
});


const updateProduct = asyncHandler(async (req, res) => {
    let { name, price, category, countInStock, brand, description } = req.body;

    let product = await Products.finndById(req.params.id)
    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock
        product.brand = brand || product.brand
        product.descriptiion = description || product.description
        product.image = req.file ? req.file.path : product.image

        const productUpdate = await product.save()

        res.json(productUpdate)
    } else {
        req.status(404)
        throw new Error("Product Not Found")
    }
});


const deleteProduct = asyncHandler(async (req, res) => { 
    let product = await Products.findById(req.params.id)

    if(product){
        await Product.deleteOne({_id:Product._id})
        res.json({message: "product removed"})
    }else{
        res.status(404)
        throw new Error ('Product Not Found')
    }
})




export {
    getProducts,
    getProductsByid,
    createProduct,
    updateProduct,
    deleteProduct
}