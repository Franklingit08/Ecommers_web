import Products from "../models/productModel.js";
import Users from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js'


const getProducts = asyncHandler(async (req, res) => {

    let pageSize = 2

    let page = Number(req.query.pageNumber) || 1

    let keywordCondition = req.query.keyword ?
        { name: { $regex: req.query.keyword, $options: 'i' } }
        : {};

    let count = await Products.countDocuments({ ...keywordCondition })

    let products = await Products.find({ ...keywordCondition })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })

})



const getProductByid = asyncHandler(async (req, res) => {
    let product = await Products.findById(req.params.id)
    if (product) {
        return res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found');
    }
})


const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, category, description, price, countInStock } = req.body;


    console.log(req)

    const image = req.file ? req.file.path : null;

    console.log(image)

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

    let product = await Products.findById(req.params.id)
    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock
        product.brand = brand || product.brand
        product.description = description || product.description
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

    if (product) {
        await product.deleteOne({ _id: Product._id })
        res.json({ message: "product removed" })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})


const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Products.find()
    res.json(products)
})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Products.findById(req.params.id)

    if (product) {

        const alreadyReviewed = product.reviews.find((item) => item.user.toString() == req.user._id.toString())

        if (alreadyReviewed) {
            res.status(404)
            throw new Error('Already Reviewed')
        }

        const review = {
            name: req.user.name,
            rating,
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating =
            product.reviews.reduce((acc, item)=> item.rating, 0) / 
            product.revi.length

        const updatedProduct = await product.save()

        res.status(201).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductByid,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    createProductReview
}