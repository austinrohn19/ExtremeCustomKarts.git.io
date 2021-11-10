const Product = require('../models/product')

//create a new product that goes to api/v1/product/new
exports.newProduct = async (req, res, next) => {
    //this is the create function that creates the body to creatye the product tag.
    const product = await Product.create(req.body)

    res.status(201).json({
        sucess: true,
        product
    })
}

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        message: "this route will show all products in our database."
    })
    
}