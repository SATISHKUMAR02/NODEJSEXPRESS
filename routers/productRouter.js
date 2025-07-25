const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController')
router.get('/getproduct',productController.getAllproducts)
router.get('/getproducts/:id',productController.getProductById)
router.post('/create-product',productController.createProduct)

module.exports = router;



