const express = require ('express');
const app = express();

//this allows us to call the npm package up cookie-parser so the app can use it.
const cookieParser = require('cookie-parser')
//pulling in Cloudiary
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')

const errorMiddleware = require ('./middlewares/errors')

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
//this will actually allow the app to use the cookie-parser
app.use(cookieParser());
app.use(fileUpload());

//Imports for all Routes
const products = require('./routes/products');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)

//Middle waare to handle errors
app.use(errorMiddleware);

module.exports =app