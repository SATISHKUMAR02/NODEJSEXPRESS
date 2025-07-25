const { required, boolean } = require('joi')
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:[true,'product id is required']
    },
    product_name:{
        type:String,
        required:[true,'product name is required']
    },
    product_category:{
        type:String,
        required:[true,'category is required']
    },
    product_price:{
        type:Number,
        required:[true,'price is required']
    },
    stock_qty:{
        type:Number,
        required:[true,'available qty is required']
    },
    is_available:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
})
module.exports = mongoose.model('Product',productSchema)

