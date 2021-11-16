const express = require ('express');
const app = express();

const errorMiddleware = require ('./middlewares/errors')

app.use(express.json());

//Imports for all Routes
const products = require('./routes/products')
const auth = require('./routes/auth')

app.use('/api/v1', products)
app.use('/api/v1', auth)

//Middle waare to handle errors
app.use(errorMiddleware);

module.exports =app