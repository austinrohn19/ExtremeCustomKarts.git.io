const express = require ('express');
const app = express();

const errorMiddleware = require ('./middlewares/errors')

app.use(express.json());

//Imports for all Routes
const products = require('./routes/products')


app.use('/api/v1', products )

//Middle waare to handle errors
app.use(errorMiddleware);

module.exports =app