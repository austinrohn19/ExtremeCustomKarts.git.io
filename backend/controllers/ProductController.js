const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//create a new product that goes to /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    //this is getting the id of the currently logged in user
    req.body.user = req.user.id;

    //this is the create function that creates the body to create the product tag.
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// get all products => /api/v1/product?keyword=cart
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    //how many results I want to display per page
    const resPerPage = 8;
    const productsCount = await Product.countDocuments();

    //req.query = req.queryStr= req.query, and the req.queryStr is already calling by keyword.
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const products = await apiFeatures.query;

        res.status(200).json({
            sucess: true,
            resPerPage,
            productsCount,
            products
        })
})

//get a single Product => /api/v1/product/:id
exports.getsingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    //if product is not found then it will send this message out.
    if (!product) {
        return next(new ErrorHandler('Product not found, Please try again.', 404));
    }

    //this will send in the product if it is actually found
    res.status(200).json({
        success: true,
        product
    })
})

//update the products => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    //we change this to let because it will then let us reassign it.
    let product = await Product.findById(req.params.id);

    if (!product) {
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

    res.status(200).json({
        sucess: true,
        product
    })

})

// delete prodcuts => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product is not found please try again."
        })
    }

    await product.deleteOne();

    res.status(200).json({
        sucess: true,
        message: " your product has been deleted."
    })
})


//create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    //this is pulling all of the 3 things into the review
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numofReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        sucess: true
    })
})

//get Products Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.id)

    res.status(200).json({
        sucess: true,
        reviews: product.reviews
    })
})

// delete Reviews => /api/v1/admin/review/:id
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    console.log(reviews);

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        sucess: true,
        message: " your review has been deleted."
    })
})