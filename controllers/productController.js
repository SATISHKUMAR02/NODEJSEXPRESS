const { productSchema } = require('../middlewares/validator');
const Product = require('../model/Productmodel')


exports.getAllproducts = async (req, res) => {

    try {
        const page = Number(req.query.page)||1;
        const limit = Number(req.query.limit)||10;
        const skip = (page-1)*limit
        const queryObject = {}
        const {category} = req.query;
        if(category && category!=='all'){
            queryObject.product_category = category
        }
  
        const queryResult = await Product.find(queryObject).skip(skip).limit(limit);
        
        if (!queryResult) {
            return res.status(204).json({
                success: false,
                message: "no products available"
            })
        }
        res.status(200).json({
            success: true,
            message: 'products',
            data: queryResult
        })
    } catch (error) {
        console.log(error);
    }

}


exports.createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'invalid input fields',
        data:error.details
      });
    }

    const exproduct = await Product.findOne({ product_id: value.product_id }).exec();
    if (exproduct) {
      return res.status(400).json({
        success: false,
        message: 'product already exists'
      });
    }

    const result = await Product.create(value);
    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Error occurred while creating product',
      data: error.message
    });
  }
};



exports.getProductById = async(req,res)=>{
    try{
        
        if(!req.params.id){
            return res.status(400).json({
                success:false,
                message:'Product_id is required'
            })
        }
        const product = await Product.findOne({product_id:req.params.id}).exec();
        if(!product){
            return res.status(404).json({
                success:false,
                message:'product not found'
            })
        }
        res.status(200).json({
            success:true,
            message:'',
            data:product
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'an error occured'
        })
    }
}

