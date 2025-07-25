const joi = require('joi')
exports.productSchema =  joi.object({
    product_id:joi.string().min(4).max(60),
    product_name:joi.string().min(7).max(100),
    product_category:joi.string().min(7).max(100),
    product_price:joi.number().min(1).max(1000000),
    stock_qty:joi.number().min(0).max(100000000),
    is_available:joi.boolean().default(true),



})