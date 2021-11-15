const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//create a new product that goes to /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    //this is the create function that creates the body to create the product tag.
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// get all products => /api/v1/product?keyword=cart
exports.getProducts = catchAsyncErrors (async (req, res, next) => {

    //how many results I want to display per page
    const resPerPage = 4; 
    const productCount= await Product.countDocuments();

    //req.query = req.queryStr= req.query, and the req.queryStr is already calling by keyword.
    const apiFeatures = new APIFeatures(Product.find(), req.query)
          .search()
          .filter()
          .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        sucess: true,
        count: products.length,
        productCount,
        products 
    })   
})

//get a single Product => /api/v1/product/:id
exports.getsingleProduct = catchAsyncErrors (async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    //if product is not found then it will send this message out.
    if(!product) {
        return next(new ErrorHandler('Product not found, Please try again.', 404));
    }

    //this will send in the product if it is actually found
    res.status(200).json({
        success: true,
        product
    })
})

//update the products => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors (async (req, res, next) => {

    //we change this to let because it will then let us reassign it.
    let product = await Product.findById(req.params.id);

    if (!product){
        return res.status(404).json({
            success: false,
            message: "Product is not found please try again."
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        //this makes it so that we have to be admin
        runValidators: true,
    });

    res.status(200).json ({
        sucess: true,
        product
    })

})

// delete prodcuts => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product is not found please try again."
        })
    }

    await product.deleteOne();

    res.status(200).json ({
        sucess: true,
        message: " your product has been deleted."
    })
})