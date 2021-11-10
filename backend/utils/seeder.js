const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
//this is importing all of the products from the database
const products = require('../data/products');

//setting up the dotenv file 
dotenv.config({path: 'backend/config/config.env'});

connectDatabase();

const seedProducts = async () => {
    try {
        //this will delete the complete collection of the products
        await Product.deleteMany();
        console.log('Products are deleted successfully')
        //this will import all of the products that we have imported on line 5
        await Product.insertMany(products);
        console.log('Products are inserted successfully')
        //this exits the process all together after it is finished
        process.exit();
        
    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()