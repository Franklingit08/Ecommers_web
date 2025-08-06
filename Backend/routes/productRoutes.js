import express from 'express';


const productRoute = express.Router()

import { admin, protect } from '../middlewares/authMiddlewares.js'
import { createProduct, deleteProduct, updateProduct, getProducts, getProductsByid } from '../controllers/productController.js'
import { productParser } from '../config/uploads.js'



productRoute
.route('/')
.get(getProducts)
. post(protect, admin, productParser.single('image'), createProduct);

productRoute
    .route('/:id')
    .get(getProductsByid)
    .put(protect, admin, productParser.single('image'), updateProduct)
    .delete(protect, admin, deleteProduct)



export default productRoute;
