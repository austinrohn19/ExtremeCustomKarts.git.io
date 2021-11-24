const express = require ('express');
const app = express();

//this allows us to call the npm package up cookie-parser so the app can use it.
const cookieParser = require('cookie-parser')

const errorMiddleware = require ('./middlewares/errors')

app.use(express.json());
//this will actually allow the app to use the cookie-parser
app.use(cookieParser());

//Imports for all Routes
const products = require('./routes/products')
const auth = require('./routes/auth')

app.use('/api/v1', products)
app.use('/api/v1', auth)

//Middle waare to handle errors
app.use(errorMiddleware);

module.exports =app