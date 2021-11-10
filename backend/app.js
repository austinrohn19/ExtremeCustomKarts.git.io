const express = require ('express');
const product = require('./models/product');
const app = express();

app.use(express.json());

//Imports for all Routes
const products = require('./routes/products')


app.use('/api/v1', products )

module.exports =app